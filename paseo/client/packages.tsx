import type { PluginWorkspacePanelProps } from "@getpaseo/plugin/client";
import { useRpc, useWorkspace } from "@getpaseo/plugin/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { listPackagesRpc } from "../shared/contract";

export function PackagePanel({ theme, layout, workspaceId }: PluginWorkspacePanelProps) {
  const workspace = useWorkspace(workspaceId, ({ name, directory }) => ({ name, directory }));
  const listPackages = useRpc(listPackagesRpc);
  const directory = workspace?.directory ?? "";
  const packages = useQuery({
    queryKey: ["product-design", "packages", directory],
    queryFn: () => listPackages({ directory }),
    enabled: directory.length > 0,
  });
  const styles = useMemo(
    () => ({
      screen: { flex: 1, backgroundColor: theme.colors.surface0 },
      content: { padding: layout.compact ? 16 : 24, gap: layout.compact ? 10 : 14 },
      title: { color: theme.colors.foreground, fontSize: layout.compact ? 20 : 24 },
      muted: { color: theme.colors.foregroundMuted, fontSize: 15, lineHeight: 21 },
      error: { color: theme.colors.statusDanger, fontSize: 15, lineHeight: 21 },
      action: { color: theme.colors.accent, fontSize: 15 },
      card: {
        gap: 4,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
      },
      packageTitle: { color: theme.colors.foreground, fontSize: 16 },
      path: { color: theme.colors.foregroundMuted, fontSize: 13 },
    }),
    [layout.compact, theme],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{workspace?.name ?? "Workspace"}</Text>
      <Text style={styles.muted}>Design packages in this workspace. Focus an agent and run /design-product to start one.</Text>
      <Pressable accessibilityRole="button" onPress={() => void packages.refetch()} disabled={!directory}>
        <Text style={styles.action}>Refresh</Text>
      </Pressable>
      {directory && packages.isLoading ? <Text style={styles.muted}>Reading packages.</Text> : null}
      {packages.isError ? <Text style={styles.error}>{packages.error instanceof Error ? packages.error.message : "Could not read design packages."}</Text> : null}
      {packages.data?.packages.length === 0 ? <Text style={styles.muted}>No packages in docs/product-design yet.</Text> : null}
      {packages.data?.packages.map((item) => (
        <View key={item.slug} style={styles.card}>
          <Text style={styles.packageTitle}>{item.title}</Text>
          <Text style={styles.path}>{item.path}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
