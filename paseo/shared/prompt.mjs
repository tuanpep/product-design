import { agentPrompts } from './agent-prompts.mjs';

export const workflows = [
  { id: 'design-product', title: 'Design product', description: 'Develop or revise one phase; next opens the next phase without another interview.', argumentHint: '[advise] [level] <idea>', icon: 'PenLine', keywords: ['discovery', 'proposal', 'product'], skillFile: 'design-product/SKILL.md', role: 'You are the product design agent.', procedure: agentPrompts['design-product'] },
  { id: 'review-design', title: 'Review design', description: 'Read-only review requires an enforced host profile; the send-only Paseo adapter refuses unsafe launch.', argumentHint: '[package]', icon: 'ScanSearch', keywords: ['review', 'critique', 'handoff'], skillFile: 'review-design/SKILL.md', role: 'You are the read-only review design agent.', procedure: agentPrompts['review-design'] },
  { id: 'technical-design', title: 'Technical design', description: 'Continue an explicitly opened Full technical slice with only justified views.', argumentHint: '[package]', icon: 'Waypoints', keywords: ['architecture', 'contract', 'erd'], skillFile: 'design-product/references/phases/technical.md', role: 'You are the technical design agent.', procedure: agentPrompts['technical-design'] },
];

export function workflowById(id) {
  const workflow = workflows.find((item) => item.id === id);
  if (!workflow) throw new Error(`Unknown product design workflow: ${id}`);
  return workflow;
}

export function assertWorkflowLaunch(id) {
  workflowById(id);
  if (id === 'review-design') throw new Error('This Paseo send-only adapter cannot enforce read-only tools. Run review-design in its configured Cursor/Claude/OpenCode read-only profile; repairs stay with the authoring owner. No review prompt was sent.');
}

export function workflowPrompt(id, skillRoot, request) {
  const workflow = workflowById(id);
  const brief = request.trim() || `The human ran /${id} without additional text. Use this project and any open package under docs/product-design/.`;
  return `Installed skill catalog: ${skillRoot}
Read ${skillRoot}/${workflow.skillFile}. Read only needed procedures and reference sections from this same catalog, never the entire catalog. Disabled automatic invocation does not prevent reading the file. If required sources are inaccessible, report it and stop affected work.
The .paseo/product-design/skills copy is local agent support; do not commit .paseo/.
Paseo sends this to the selected existing agent; this does not enforce a new role, reset history or configure worker models/permissions. Only delegate when the underlying host can enforce the required boundaries; otherwise do bounded work inline. Do not claim runtime isolation or read-only enforcement from this prompt.

${workflow.procedure}

Human request:
${brief}`;
}
