import type { PluginClientContext, PluginSidebarItemProps } from "@getpaseo/plugin/client";
import { SidebarRow } from "@getpaseo/plugin/client/ui";
import { ProductDesignScreen } from "./client/home";
import { PackagePanel } from "./client/packages";
import { bindPrepareSkills, startWorkflow } from "./client/run";
import { workflows } from "./shared/prompt.mjs";

function ProductDesignItem({ currentScreen, openScreen }: PluginSidebarItemProps) {
  return (
    <SidebarRow
      icon="PenLine"
      active={currentScreen?.screenId === "product-design"}
      onPress={() => openScreen({ screenId: "product-design" })}
    />
  );
}

export default function contribute(client: PluginClientContext) {
  client.addScreen({ id: "product-design", title: "Product design", Component: ProductDesignScreen });
  client.addSidebarHeaderItem({ id: "product-design", title: "Product design", Component: ProductDesignItem });
  client.addWorkspacePanel({
    id: "packages",
    title: "Product design packages",
    icon: "FolderKanban",
    context: "workspace",
    locations: ["workspace", "explorer"],
    Component: PackagePanel,
  });
  client.addCommandCenterItem({
    id: "open-packages",
    title: "Open product design packages",
    icon: "FolderKanban",
    keywords: ["design", "docs"],
    context: "workspace",
    onSelect({ openPanel }) {
      openPanel("packages");
    },
  });
  for (const workflow of workflows) {
    client.addSlashCommand({
      name: workflow.id,
      description: workflow.description,
      argumentHint: workflow.argumentHint,
      context: "agent",
      async onSubmit({ args, agent, workspace, rpc, paseo }) {
        await startWorkflow({
          id: workflow.id,
          args,
          directory: workspace.directory,
          agentId: agent.id,
          prepareSkills: bindPrepareSkills(rpc),
          paseo,
        });
      },
    });
    client.addCommandCenterItem({
      id: workflow.id,
      title: workflow.title,
      icon: workflow.icon,
      keywords: [...workflow.keywords],
      context: "agent",
      async onSelect({ agent, workspace, rpc, paseo }) {
        await startWorkflow({
          id: workflow.id,
          args: "",
          directory: workspace.directory,
          agentId: agent.id,
          prepareSkills: bindPrepareSkills(rpc),
          paseo,
        });
      },
    });
  }
  return () => {};
}
