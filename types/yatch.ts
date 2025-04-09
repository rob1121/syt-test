export type Yacht = {
    id: string;
    yacht_like_id: number;
    yacht_like_type: string;
    slug: string;
    model_slug: string;
    name: string;
    imo: string;
    volume: number;
    guest_cabin_count: number | null;
    guest_count: number | null;
    crew_cabin_count: number | null;
    crew_size: number | null;
    max_speed: string;
    cruise_speed: string;
    fuel_capacity: number;
    water_capacity: number;
    draught_min: number | null;
    draught_max: string;
    hull_type: string;
    hull_configuration: string;
    number_of_masts: number | null;
    number_of_decks: number | null;
    range: string | null;
    range_at: string | null;
    type: string;
    length_overall: string;
    length_at_waterline: string | null;
    beam: string;
    electric: boolean;
    custom: boolean;
    introduction_year: number | null;
    out_of_production_year: number | null;
    weight_dry: number | null;
    engine_location: string | null;
    syt_custom_photo_collection_enabled: boolean;
    mmsi: string | null;
    official_number: string | null;
    rig_type: string | null;
    yacht_class: string | null;
    hull_materials: { id: number; name: string }[];
    superstructure_materials: { id: number; name: string }[];
    subtypes: string[];
    flag: string;
    description: string | null;
    previous_names: string[];
    engines: { model: string; manufacturer: string; type: string; hp: number; kw: number; count: number }[];
    propulsion: { type: string; count: number }[];
    designers: {
        naval: { company: { id: number; slug: string; name: string } };
        exterior: { company: { id: number; slug: string; name: string } };
    }[];
    photos: {
        id: number;
        primary: boolean;
        syt_custom_collection: boolean;
        credit: string;
        photographer_name: string | null;
        date_time: string | null;
        created_at: string;
    }[];
    video: string | null;
    phases: {
        id: number;
        type: string;
        primary: boolean;
        start_date: string;
        end_date: string;
        company: { id: number; slug: string; name: string; country: { id: number; name: string } };
        facility: { id: number; slug: string; name: string; port: string; country: { id: number; name: string } };
        hull_id: string;
    }[];
    primary_build_phase: {
        id: number;
        type: string;
        primary: boolean;
        start_date: string;
        end_date: string;
        company: { id: number; slug: string; name: string; country: { id: number; name: string } };
        facility: { id: number; slug: string; name: string; port: string; country: { id: number; name: string } };
        hull_id: string;
    };
    build_year: number;
    sales: [];
    sort_price: number | null;
    indexed_at: string;
};


export type YachtPosition = {
    _id: string;
    yacht_like_id: number;
    date_time: string;
    lat: string;
    lon: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type YachtPositionInput = {
    yacht_like_id: number;
    date_time: Date;
    lat: number;
    lon: number;
    notes: string;
}
    