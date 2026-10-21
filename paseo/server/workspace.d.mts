export interface DesignPackage {
  slug: string;
  title: string;
  path: string;
}

interface PluginConfig {
  config: {
    get(): Promise<{ config: { plugins?: Record<string, unknown> } }>;
  };
}

export function findSkillCatalog(startDirectory: string): string | null;
export function resolveSkillCatalog(paseo: PluginConfig): Promise<string>;
export function materializeSkills(catalog: string, workspaceDirectory: string): string;
export function listDesignPackages(workspaceDirectory: string): DesignPackage[];
