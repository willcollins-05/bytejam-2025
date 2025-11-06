"use server";
import { createClient } from "./server";
import {
  users,
  festivals,
  festival_props,
  prop_groups,
  placed_props,
} from "@/types/database-types";

async function getAuthenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.SUPABASE_AUTH_EMAIL || "",
    password: process.env.SUPABASE_AUTH_PASSWORD || "",
  });

  if (error) {
    throw new Error("Error signing in: " + error.message);
  }

  return supabase;
}

export const getUserById = async (userId: number) => {
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .limit(1)

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }

  if (!data || (Array.isArray(data) && data.length == 0)) {
    throw new Error('User not found');
  }

  const row = Array.isArray(data) ? data[0] : data;

  const user: users = {
    id: row.id,
    created_at: row.created_at,
    username: row.username,
    email: row.email,
    password_hash: row.password_hash,
    pfp_url: row.pfp_url,
  };

  return user;
};

export const getUserByUsername = async (username: string) => {
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .limit(1)

  if (error) {
    throw new Error("Error fetching user: " + error.message);
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    throw new Error('User not found');
  }

  const row = Array.isArray(data) ? data[0] : data;

  const user: users = {
    id: row.id,
    created_at: row.created_at,
    username: row.username,
    email: row.email,
    password_hash: row.password_hash,
    pfp_url: row.pfp_url,
  };

  return user;
};

export const getUserByEmail = async (email: string) => {
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .limit(1)

    if (error) {
        throw new Error("Error fetching user: " + error.message);
    }
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
        throw new Error('User not found');
    }

    const row = Array.isArray(data) ? data[0] : data;

    const user: users = {
        id: row.id,
        created_at: row.created_at,
        username: row.username,
        email: row.email,
        password_hash: row.password_hash,
        pfp_url: row.pfp_url,
    };

    return user;
};

export const createNewUser = async (newUser: users) => {
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select()
    .limit(1)

  if (error) {
    throw new Error("Error creating user: " + error.message);
  }

  return Array.isArray(data) ? (data[0] as users): (data as users);
};

export const getAllProps = async () => {
  const supabase = await getAuthenticatedClient();
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

export const getAllPropsFromGroup = async (groupId: number) => {
  const supabase = await getAuthenticatedClient();
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

export const getAllPropGroups = async () => {
  const supabase = await getAuthenticatedClient();
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
