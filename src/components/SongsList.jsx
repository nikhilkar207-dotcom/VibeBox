import "../styles/SongsList.css";

import { useSong } from "../musicStore";
import { useEffect } from "react"

function SongsList() {
    const { songs } = useSong()
    const { setCurrentSongIndex, setIsPlaying } = useSong();


    const search = useSong(state => state.search);

    const filteredSongs = songs.filter(song =>
        song.song_name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredHindiSongs = songs.filter(song => song.language === "hindi");
    const filteredHaryanviSongs = songs.filter(song => song.language === "haryanvi");
    const filteredPunjabiSongs = songs.filter(song => song.language === "punjabi");
    const filteredSadRomanticSongs = songs.filter(song => song.moods?.includes("sad") &&
        song.moods?.includes("romantic"));
    const filteredRomanticSongs = songs.filter(song => song.moods?.includes("romantic") &&  (song.moods?.includes("happy") || song.moods?.includes("chill") || songs.moods?.includes("happy")));

    function playSong(song) {
        const index = songs.findIndex(s => s.id === song.id);
        setCurrentSongIndex(index);
        setIsPlaying(true);
    }

    return (
        <div className="songs-list">
            <section>
                {search.trim() !== "" ? (
                    <h3>For you</h3>
                ) : (
                    <></>
                )}
                <ul className="songs for-you">
                    {search.trim() !== "" ? (
                        filteredSongs && filteredSongs.map((song, index) => (
                            <li
                                onClick={() => playSong(song)}
                                key={index}
                                className="bg"
                                style={{
                                    backgroundImage: `url(${song.cover_url})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            >
                                <div className="overlay">
                                    <p>{song.song_name}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <></>
                    )}
                </ul>
            </section>

            <section>
                <h3>Hindi Songs</h3>

                <ul className="songs hindi-songs">
                    {filteredHindiSongs && filteredHindiSongs.map((song, index) => (
                        <li
                            onClick={() => playSong(song)}
                            key={index}
                            className="bg"
                            style={{
                                backgroundImage: `url(${song.cover_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        ><div className="overlay"><p>{song.song_name}</p></div></li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Haryanvi Songs</h3>

                <ul className="songs haryanvi-songs">
                    {filteredHaryanviSongs && filteredHaryanviSongs.map((song, index) => (
                        <li
                            onClick={() => playSong(song)}
                            key={index}
                            className="bg"
                            style={{
                                backgroundImage: `url(${song.cover_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        ><div className="overlay"><p>{song.song_name}</p></div></li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Punjabi Songs</h3>

                <ul className="songs punjabi-songs">
                    {filteredPunjabiSongs && filteredPunjabiSongs.map((song, index) => (
                        <li
                            onClick={() => playSong(song)}
                            key={index}
                            className="bg"
                            style={{
                                backgroundImage: `url(${song.cover_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        ><div className="overlay"><p>{song.song_name}</p></div></li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Romantic Sad Songs</h3>

                <ul className="songs romantic-sad-songs">
                    {filteredSadRomanticSongs && filteredSadRomanticSongs.map((song, index) => (
                        <li
                            onClick={() => playSong(song)}
                            key={index}
                            className="bg"
                            style={{
                                backgroundImage: `url(${song.cover_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        ><div className="overlay"><p>{song.song_name}</p></div></li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Romantic Songs</h3>

                <ul className="songs romantic-songs">
                    {filteredRomanticSongs && filteredRomanticSongs.map((song, index) => (
                        <li
                            onClick={() => playSong(song)}
                            key={index}
                            className="bg"
                            style={{
                                backgroundImage: `url(${song.cover_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        ><div className="overlay"><p>{song.song_name}</p></div></li>
                    ))}
                </ul>
            </section>

        </div>
    );
}

export default SongsList;
