export type WorkflowId = "design-product" | "review-design" | "technical-design";

export interface Workflow {
  id: WorkflowId;
  title: string;
  description: string;
  argumentHint: string;
  icon: string;
  keywords: readonly string[];
  skillFile: string;
  role: string;
  procedure: string;
}

export const workflows: readonly Workflow[];
export function workflowById(id: WorkflowId): Workflow;
export function assertWorkflowLaunch(id: WorkflowId): void;
export function workflowPrompt(id: WorkflowId, skillRoot: string, request: string): string;
