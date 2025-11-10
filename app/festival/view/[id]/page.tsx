import SceneViewer from "@/components/festival-viewer/scene-viewer";
import { festival_props, prop_groups } from "@/types/database-types";
import { ItemGroup } from "@/types/festival-viewer-types";
import { getAllPropsFromGroup, getAllPropGroups } from "@/lib/supabase/queries";
import { Providers } from "@/components/providers";

export default async function FestivalViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const itemGroups: ItemGroup[] = [];
  const dbGroups: prop_groups[] = await getAllPropGroups();
  for (const group of dbGroups) {
    const propsInGroup: festival_props[] = await getAllPropsFromGroup(
      group.id as number
    );
    const itemGroup: ItemGroup = {
      id: group.id as number,
      groupName: group.group_name,
      items: propsInGroup.map((prop) => ({
        id: prop.id as number,
        imagePath: prop.image_path,
        label: prop.label,
        recommendedSizeX: prop.recommended_size_x,
        recommendedSizeY: prop.recommended_size_y,
      })),
    };
    itemGroups.push(itemGroup);
  }

  const { id } = await params;

  return (
    <Providers>
      <SceneViewer itemGroups={itemGroups} isNew={false} id={Number(id)} />
    </Providers>
  );
}
