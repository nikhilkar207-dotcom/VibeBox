import supabase from "./supabase";
import {useState, useEffect} from "react";

export function getSongs() {
    const setSongs = useSong(state => state.setSongs)

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
}


import { create } from "zustand";

export const useSong = create((set) => ({
    songs: [],
    
    currentSongIndex: 0,
    isPlaying: false,
    currentSong: null,

    playlist: null,
    setPlaylist: (playlist) => set({playlist}),
    setCurrentSong: (currentSong) => set({currentSong}),

    search: "",

    setSongs: (songs) => set({ songs }),
    setSearch: (search) => set({ search }),

    setSongs: (songs) => set({ songs }),

    setCurrentSongIndex: (index) => set({ currentSongIndex: index }),

    setIsPlaying: (value) => set({ isPlaying: value }),
}));
