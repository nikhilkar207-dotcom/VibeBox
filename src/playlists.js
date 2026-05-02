import { useSong } from "./musicStore";
import { useMemo } from "react";


function usePlaylist() {
    const songs = useSong(state => state.songs);

    const { languagePlaylists, moodPlaylist } = useMemo(() => {
        const moodPlaylist = {};
        const languagePlaylists = {};

        songs.forEach(song => {
            const lang = song.language || "unknown";

            if (!languagePlaylists[lang]) {
                languagePlaylists[lang] = [];
            }

            languagePlaylists[lang].push(song);
        });

        songs.forEach(song => {
            if (!song.moods) return;

            song.moods.forEach(mood => {
                if (!moodPlaylist[mood]) {
                    moodPlaylist[mood] = [];
                }

                moodPlaylist[mood].push(song);
            });
        })

        return {languagePlaylists, moodPlaylist}
    }, [songs]);


    return { languagePlaylists, moodPlaylist }
}

export default usePlaylist;