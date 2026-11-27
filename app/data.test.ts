import { describe, expect, it } from "vitest";
import { projects } from "./data";

describe("Tags de stack des projets", () => {
  it("n'ont pas de numéro de version, pour rester identiques d'un projet à l'autre", () => {
    const versioned = projects.flatMap((p) => p.stack).filter((s) => /\sv?\d+(\.\d+)*$/.test(s));
    expect(versioned).toEqual([]);
  });
});
