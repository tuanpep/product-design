import { defineRpc } from "@getpaseo/plugin";
import { z } from "zod";

export const listPackagesRpc = defineRpc({
  name: "product-design.list-packages",
  input: z.object({ directory: z.string().min(1) }),
  output: z.object({
    packages: z.array(
      z.object({
        slug: z.string(),
        title: z.string(),
        path: z.string(),
      }),
    ),
  }),
});

export const prepareSkillsRpc = defineRpc({
  name: "product-design.prepare-skills",
  input: z.object({ directory: z.string().min(1) }),
  output: z.object({ skillRoot: z.string() }),
});
