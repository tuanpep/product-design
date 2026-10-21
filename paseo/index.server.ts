import type { PluginServerContext } from "@getpaseo/plugin/server";
import { listDesignPackages, materializeSkills, resolveSkillCatalog } from "./server/workspace.mjs";
import { listPackagesRpc, prepareSkillsRpc } from "./shared/contract";

export default function contribute(server: PluginServerContext) {
  server.handle(listPackagesRpc, ({ directory }) => ({ packages: listDesignPackages(directory) }));
  server.handle(prepareSkillsRpc, async ({ directory }, { paseo }) => {
    const catalog = await resolveSkillCatalog(paseo);
    const skillRoot = materializeSkills(catalog, directory);
    console.log(`Product Design skills ready at ${skillRoot}`);
    return { skillRoot };
  });
  return () => {};
}
