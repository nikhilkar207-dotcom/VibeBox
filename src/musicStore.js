import supabase from "./supabase";
import {useState, useEffect} from "react";

export function useSong() {
    const [songs, setSongs] = useState([]);
    // Fetch songs from Supabase
    useEffect(() => {
        async function fetchSongs() {
            const { data, error } = await supabase.from("songs").select("*");

            if (error) {
                console.error("Error fetching songs:", error);
                return;
            }

            setSongs(data);    
        }

        fetchSongs();
    }, []);

    return songs;
}


