import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

let ipCounter = 0;

/** Chaque requête vient d'une IP différente, pour ne pas déclencher la limite de débit par erreur. */
function request(body: unknown, ip = `10.0.0.${++ipCounter}`) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const valid = {
  name: "Ada <Lovelace>",
  email: "ada@example.com",
  message: "Bonjour, j'aimerais discuter d'un projet.",
};

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("CONTACT_TO", "moi@example.com");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("POST /api/contact", () => {
  it("refuse un corps qui n'est pas du JSON", async () => {
    const res = await POST(request("pas du json"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "invalid" });
  });

  it("répond ok sans rien envoyer quand le champ piège est rempli", async () => {
    const res = await POST(request({ ...valid, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ["nom vide", { ...valid, name: "  " }],
    ["nom trop long", { ...valid, name: "a".repeat(101) }],
    ["e-mail invalide", { ...valid, email: "pas-un-email" }],
    ["message trop court", { ...valid, message: "Salut" }],
    ["message trop long", { ...valid, message: "a".repeat(5001) }],
  ])("refuse les champs invalides (%s)", async (_, body) => {
    const res = await POST(request(body));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("répond 503 quand RESEND_API_KEY est absente", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await POST(request(valid));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("envoie le message via Resend, avec le HTML échappé", async () => {
    const res = await POST(request(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    const payload = JSON.parse(init.body);
    expect(payload.to).toEqual(["moi@example.com"]);
    expect(payload.reply_to).toBe("ada@example.com");
    expect(payload.html).toContain("Ada &lt;Lovelace&gt;");
    expect(payload.html).not.toContain("<Lovelace>");
  });

  it("répond 502 quand Resend échoue", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockResolvedValue(new Response("boom", { status: 500 }));
    const res = await POST(request(valid));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "send_failed" });
  });

  it("limite à 5 messages par IP sur 10 minutes", async () => {
    const ip = "192.0.2.1";
    for (let i = 0; i < 5; i++) {
      expect((await POST(request(valid, ip))).status).toBe(200);
    }
    const res = await POST(request(valid, ip));
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ error: "rate_limited" });
  });
});
