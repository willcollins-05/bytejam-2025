import SceneBuilder from "@/components/festival-viewer/scene-builder";
import { festival_props, users, prop_groups, placed_props, festivals } from "@/types/database-types";
import { ItemGroup } from "@/types/festival-viewer-types";
import { getAllPropsFromGroup, getAllPropGroups } from "@/lib/supabase/queries";
export default async function FestivalViewPage() {
    const itemGroups: ItemGroup[] = []
    const dbGroups: prop_groups[] = await getAllPropGroups();
    for (const group of dbGroups) {
        const propsInGroup: festival_props[] = await getAllPropsFromGroup(group.id);
        const itemGroup: ItemGroup = {
            id: group.id,
            groupName: group.group_name,
            items: propsInGroup.map((prop) => ({
                id: prop.id, 
                imagePath: prop.image_path,
                label: prop.label,
                recommendedSizeX: prop.recommended_size_x,
                recommendedSizeY: prop.recommended_size_y,
            }))
        }
        itemGroups.push(itemGroup);
    }


    return (
        <SceneBuilder itemGroups={itemGroups} />
    );
}