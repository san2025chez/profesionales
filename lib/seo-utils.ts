export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getPlural(name: string): string {
  const n = name.toLowerCase();
  if (n.endsWith("ción") || n.endsWith("sión"))
    return name.slice(0, -4) + name.slice(-4).replace("ción", "ciones").replace("sión", "siones");
  if (n.endsWith("o")) return name.slice(0, -1) + "os";
  if (n.endsWith("a")) return name.slice(0, -1) + "as";
  if (n.endsWith("or")) return name + "es";
  if (n.endsWith("e") || n.endsWith("í")) return name + "s";
  return name + "s";
}
