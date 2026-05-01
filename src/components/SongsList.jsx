import "../styles/SongsList.css";

import { useSong } from "../musicStore";
import { useEffect } from "react"

function SongsList() {
    const { songs } = useSong()
    const { setCurrentSongIndex, setIsPlaying } = useSong();


    const search = useSong(state => state.search);

    const filteredSongs =
        search.trim() === ""
            ? songs
            : songs.filter(song =>
                song.song_name.toLowerCase().includes(search.toLowerCase())
            );

    function playSong(song) {
        const index = songs.findIndex(s => s.id === song.id);
        setCurrentSongIndex(index);
        setIsPlaying(true);
    }

    return (
        <div className="songs-list">
            <section>
                <h3>For you</h3>

                <ul className="songs for-you">
                    {filteredSongs && filteredSongs.map((song, index) => (
                        <li
                            onClick={() => playSong(song)}
                            key={index}
                            className="bg"
                            style={{
                                backgroundImage: `url(${song.cover_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        ><div className="overlay"><p>{song.song_name}</p></div></li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default SongsList;
