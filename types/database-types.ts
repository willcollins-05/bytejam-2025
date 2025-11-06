export interface festival_props {
    id?: number;
    created_at: string;
    label: string;
    image_path: string;
    group_id: number;
    recommended_size_x: number;
    recommended_size_y: number;
}

export interface users {
    id?: number;
    created_at: string;
    username: string;
    email: string;
    password_hash: string;
    pfp_url: string | null;
}

export interface prop_groups {
    id?: number;
    created_at: string;
    group_name: string;
}

export interface placed_props {
    id?: number;
    prop_id: number;
    festival_id: number;
    created_at: string;
    pos_x: number;
    pos_y: number;
    rotation: number;
    scale: number;
}

export interface festivals {
    id?: number;
    created_at: string;
    user_id: number;
}