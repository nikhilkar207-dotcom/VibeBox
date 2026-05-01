import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lixbnupundwtlcbumzdy.supabase.co";
const supabaseKey = "sb_publishable_y8WytrQtRlZHQvef6wLBSg_ZhaIBQOn";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;