import { createClient } from "./server";
import {
  users,
  festivals,
  festival_props,
  prop_groups,
  placed_props,
} from "@/types/database-types";

async function queries() {
  const supabase = await createClient();

  const getUserById = async (userId: number) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }

    const user: users = {
      id: data.id,
      created_at: data.created_at,
      username: data.username,
      email: data.email,
      password_hash: data.password_hash,
      pfp_url: data.pfp_url,
    };

    return user;
  };

  const getUserByUsername = async (username: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error) {
      throw new Error("Error fetching user: " + error.message);
    }

    const user: users = {
      id: data.id,
      created_at: data.created_at,
      username: data.username,
      email: data.email,
      password_hash: data.password_hash,
      pfp_url: data.pfp_url,
    };

    return user;
  };

  const getAllProps = async () => {
    const { data, error } = await supabase.from("festival_props").select("*");

    if (error) {
      throw new Error("Error fetching props: " + error.message);
    }

    const props: festival_props[] = [];

    data.map((prop: any) =>
      props.push({
        id: prop.id,
        created_at: prop.created_at,
        label: prop.label,
        image_path: prop.image_path,
        group_id: prop.group_id,
        recommended_size_x: prop.recommended_size_x,
        recommended_size_y: prop.recommended_size_y,
      })
    );

    return props;
  };

  const getAllPropsFromGroup = async (groupId: number) => {
    const { data, error } = await supabase
      .from("festival_props")
      .select("*")
      .eq("group_id", groupId);

    if (error) {
      throw new Error("Error fetching props: " + error.message);
    }

    const props: festival_props[] = [];
    data.map((prop: any) =>
      props.push({
        id: prop.id,
        created_at: prop.created_at,
        label: prop.label,
        image_path: prop.image_path,
        group_id: prop.group_id,
        recommended_size_x: prop.recommended_size_x,
        recommended_size_y: prop.recommended_size_y,
      })
    );

    return props;
  };

  const getAllPropGroups = async () => {
    const { data, error } = await supabase.from("prop_groups").select("*");
    if (error) {
      throw new Error("Error fetching prop groups: " + error.message);
    }

    const propGroups: prop_groups[] = [];

    data.map((group: any) => {
      propGroups.push({
        id: group.id,
        created_at: group.created_at,
        group_name: group.group_name,
      });
    });

    return propGroups;
  };

  return {
    getUserById,
    getUserByUsername,
    getAllProps,
    getAllPropsFromGroup,
    getAllPropGroups,
  };
}

export const {
  getUserById,
  getUserByUsername,
  getAllProps,
  getAllPropsFromGroup,
  getAllPropGroups,
} = await queries();
