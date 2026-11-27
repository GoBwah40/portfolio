"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVER_ERRORS: Record<string, string> = {
  invalid: "Certains champs sont invalides. Vérifie-les et réessaie.",
  rate_limited: "Trop de messages envoyés d'un coup. Réessaie dans quelques minutes.",
  not_configured: "L'envoi n'est pas encore activé sur ce site.",
  send_failed: "Le message n'est pas parti, le service d'envoi a refusé la demande.",
};

function validate(data: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Indique ton nom.";
  if (!EMAIL_RE.test(data.email.trim())) errors.email = "Indique une adresse e-mail valide, par exemple nom@exemple.fr.";
  if (data.message.trim().length < 10) errors.message = "Écris au moins quelques mots (10 caractères).";
  return errors;
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      const body = await res.json().catch(() => ({}));
      setServerError(SERVER_ERRORS[body.error] ?? SERVER_ERRORS.send_failed);
    } catch {
      setServerError("Pas de connexion au serveur. Vérifie ta connexion et réessaie.");
    }
    setStatus("error");
  }

  const clear = (field: keyof Errors) => () => errors[field] && setErrors((e) => ({ ...e, [field]: undefined }));

  if (status === "sent") {
    return (
      <div className="form-sent" role="status">
        <strong>Message envoyé.</strong> Je te réponds dès que possible.
        <button type="button" className="link" onClick={() => setStatus("idle")}>Écrire un autre message</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="contact-name">Nom</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Camille Martin" maxLength={100}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} onInput={clear("name")} />
          {errors.name && <p className="field-error" id="err-name">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="contact-email">E-mail</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="camille@entreprise.fr" maxLength={200}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} onInput={clear("email")} />
          {errors.email && <p className="field-error" id="err-email">{errors.email}</p>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows={5} maxLength={5000}
          placeholder="Bonjour, je recrute un développeur full-stack pour…"
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} onInput={clear("message")} />
        {errors.message && <p className="field-error" id="err-message">{errors.message}</p>}
      </div>
      {/* Champ piège anti-robots, invisible pour les humains. */}
      <div className="hp" aria-hidden>
        <label htmlFor="contact-website">Site web</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" && (
        <p className="form-error" role="alert">
          {serverError} Tu peux aussi m&apos;écrire directement à <span className="select-all">{fallbackEmail}</span>.
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
