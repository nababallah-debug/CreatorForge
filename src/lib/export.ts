/**
 * Utilitaires d'export / copie.
 * Tout est 100 % côté client : aucune donnée ne quitte le navigateur.
 */

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback pour les navigateurs anciens / contexte non sécurisé
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

export function downloadFile(filename: string, content: string, mime = "text/plain"): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "export"
  );
}

/** Construit un Markdown exportable à partir de sections { titre, contenu }. */
export function toMarkdown(title: string, sections: Array<{ heading: string; body: string }>): string {
  const lines = [`# ${title}`, "", `> Généré par CreatorForge — ${new Date().toLocaleDateString("fr-FR")}`, ""];
  for (const s of sections) {
    lines.push(`## ${s.heading}`, "", s.body.trim(), "");
  }
  return lines.join("\n");
}
