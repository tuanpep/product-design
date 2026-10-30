import type { PluginScreenProps } from "@getpaseo/plugin/client";
import { ExternalLink } from "@getpaseo/plugin/client/ui";
import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { workflows } from "../shared/prompt.mjs";

export function ProductDesignScreen({ theme, layout }: PluginScreenProps) {
  const styles = useMemo(
    () => ({
      screen: {
        flex: 1,
        backgroundColor: theme.colors.surface0,
      },
      content: {
        padding: layout.compact ? 16 : 24,
        gap: layout.compact ? 12 : 16,
      },
      title: { color: theme.colors.foreground, fontSize: layout.compact ? 22 : 28 },
      body: { color: theme.colors.foreground, fontSize: 16, lineHeight: 22 },
      muted: { color: theme.colors.foregroundMuted, fontSize: 15, lineHeight: 21 },
      command: { color: theme.colors.foreground, fontSize: 16 },
      hint: { color: theme.colors.foregroundMuted, fontSize: 14 },
    }),
    [layout.compact, theme],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Product design</Text>
      <Text style={styles.body}>
        Focus an agent in the project you want designed, then run a command from the composer. The agent reads the skill catalog and writes the package under docs/product-design.
      </Text>
      {workflows.map((workflow) => (
        <View key={workflow.id}>
          <Text style={styles.command}>{`/${workflow.id} ${workflow.argumentHint}`}</Text>
          <Text style={styles.hint}>{workflow.description}</Text>
        </View>
      ))}
      <Text style={styles.muted}>
        /design-product runs one essentials phase and stops: Understand, then Shape (documents), then Specify (Full). Say next to open the next phase. No screens, mockups, or technical design. Say advise to recommend inside the open phase.
      </Text>
      <Text style={styles.muted}>
        Documentero-based Markdown templates keep the package small: a decision brief, a Test Plan with cases from Shape, and an SRS with a Requirements Matrix at Full Specify. No Documentero account or external upload is needed; planned checks are not completed results.
      </Text>
      <Text style={styles.muted}>
        Open Product design packages from the command center to see packages already in the workspace. A copied catalog under .paseo/ is for the agent; leave it uncommitted.
      </Text>
      <ExternalLink href="https://github.com/tuanpep/product-design">Open the product design guide</ExternalLink>
    </ScrollView>
  );
}
