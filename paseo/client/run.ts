import { prepareSkillsRpc } from "../shared/contract";
import { workflowPrompt, type WorkflowId } from "../shared/prompt.mjs";

interface AgentApi {
  agents: {
    ref(id: string): { send(text: string): Promise<void> };
  };
}

export async function startWorkflow(options: {
  id: WorkflowId;
  args: string;
  directory: string;
  agentId: string;
  prepareSkills: (directory: string) => Promise<{ skillRoot: string }>;
  paseo: AgentApi;
}) {
  const { skillRoot } = await options.prepareSkills(options.directory);
  await options.paseo.agents.ref(options.agentId).send(workflowPrompt(options.id, skillRoot, options.args));
}

export function bindPrepareSkills(
  rpc: (contract: typeof prepareSkillsRpc, input: { directory: string }) => Promise<{ skillRoot: string }>,
) {
  return (directory: string) => rpc(prepareSkillsRpc, { directory });
}
