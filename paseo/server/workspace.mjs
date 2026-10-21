import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, realpathSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";

const SKILL_MARKER = join("design-product", "SKILL.md");
const COPY_README = `This folder is a local copy of the Product Design skill catalog, written by the Paseo plugin so the agent in this workspace can read it.

Do not commit it. Add \`.paseo/\` to \`.gitignore\` when this project is under git.
`;

function inside(parent, child) {
  const fromParent = relative(parent, child);
  return fromParent === "" || (!fromParent.startsWith(`..${sep}`) && fromParent !== ".." && !isAbsolute(fromParent));
}

function existingDirectory(directory) {
  const resolved = resolve(directory);
  if (!existsSync(resolved) || !statSync(resolved).isDirectory()) {
    throw new Error(`Directory does not exist: ${resolved}`);
  }
  return realpathSync(resolved);
}

export function findSkillCatalog(startDirectory) {
  let current = resolve(startDirectory);
  for (let depth = 0; depth < 8; depth += 1) {
    const candidate = join(current, "skills");
    if (existsSync(join(candidate, SKILL_MARKER))) return realpathSync(candidate);
    const parent = dirname(current);
    if (parent === current) return null;
    current = parent;
  }
  return null;
}

function pluginPaths(plugins) {
  if (!plugins) return [];
  const paths = [];
  for (const entry of Object.values(plugins)) {
    if (!entry || typeof entry !== "object") continue;
    const path = entry.path;
    if (typeof path === "string" && path.trim()) paths.push(path);
  }
  return paths;
}

export async function resolveSkillCatalog(paseo) {
  const { config } = await paseo.config.get();
  const catalogs = new Set();
  for (const pluginPath of pluginPaths(config.plugins)) {
    const manifestPath = join(pluginPath, "paseo-plugin.json");
    if (!existsSync(manifestPath)) continue;
    let id;
    try {
      id = JSON.parse(readFileSync(manifestPath, "utf8")).id;
    } catch {
      continue;
    }
    if (id !== "product-design") continue;
    const catalog = findSkillCatalog(pluginPath);
    if (catalog) catalogs.add(catalog);
  }
  if (catalogs.size === 1) return [...catalogs][0];
  if (catalogs.size > 1) {
    throw new Error(`Product Design found more than one skill catalog: ${[...catalogs].join(", ")}`);
  }
  throw new Error(
    "Product Design could not find skills/design-product/SKILL.md beside the installed plugin. Install the paseo directory from the product-design repository so the skills directory stays next to it.",
  );
}

function catalogStamp(catalog) {
  const hash = createHash("sha256");
  const files = [];
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) files.push(path);
    }
  }
  walk(catalog);
  files.sort();
  for (const file of files) {
    const info = statSync(file);
    hash.update(relative(catalog, file));
    hash.update(String(info.size));
    hash.update(String(info.mtimeMs));
  }
  return hash.digest("hex");
}

export function materializeSkills(catalog, workspaceDirectory) {
  const workspace = existingDirectory(workspaceDirectory);
  const source = existingDirectory(catalog);
  if (!existsSync(join(source, SKILL_MARKER))) {
    throw new Error(`Skill catalog is missing design-product/SKILL.md: ${source}`);
  }
  const owned = join(workspace, "skills");
  if (existsSync(join(owned, SKILL_MARKER)) && realpathSync(owned) === source) return source;

  const destination = join(workspace, ".paseo", "product-design", "skills");
  if (!inside(workspace, destination) || inside(source, destination)) {
    throw new Error("Refusing to write the skill catalog outside the workspace.");
  }
  const stamp = catalogStamp(source);
  const stampPath = join(workspace, ".paseo", "product-design", "stamp");
  if (existsSync(stampPath) && readFileSync(stampPath, "utf8") === stamp && existsSync(join(destination, SKILL_MARKER))) {
    return destination;
  }
  mkdirSync(dirname(destination), { recursive: true });
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: true });
  writeFileSync(join(dirname(destination), "README.md"), COPY_README);
  writeFileSync(stampPath, stamp);
  return destination;
}

function packageTitle(file, slug) {
  if (!existsSync(file)) return slug;
  const heading = /^#\s+(.+)$/m.exec(readFileSync(file, "utf8").slice(0, 4096));
  const title = heading?.[1]?.trim();
  return title || slug;
}

export function listDesignPackages(workspaceDirectory) {
  const workspace = existingDirectory(workspaceDirectory);
  const root = join(workspace, "docs", "product-design");
  if (!existsSync(root) || !statSync(root).isDirectory()) return [];
  const packages = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
    const folder = join(root, entry.name);
    if (!inside(root, folder)) continue;
    packages.push({
      slug: entry.name,
      title: packageTitle(join(folder, "product-design.md"), entry.name),
      path: join("docs", "product-design", entry.name),
    });
  }
  packages.sort((left, right) => left.slug.localeCompare(right.slug));
  return packages;
}
