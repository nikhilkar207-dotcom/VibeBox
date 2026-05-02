
import "../styles/SongsList.css";

import { useSong } from "../musicStore";

import usePlaylist from "../playlists";

function SongSection({ songs, playSong, sectionTitle }) {
    return (
        <section>
            <h3>{sectionTitle}</h3>
            <ul className="songs hindi-songs">
                {songs && songs.map((song, index) => (
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
    )
}

function SongsList() {
    const { songs ,setIsPlaying, setCurrentSong, currentSongIndex, setCurrentSongIndex, setPlaylist} = useSong();

    const search = useSong(state => state.search);

    const { languagePlaylists } = usePlaylist();

    const filteredSongs = songs.filter(song => {
        if (!search) return true;
        return song.song_name
            ?.toLowerCase()
            .includes(search.toLowerCase());
    }
    );

    function playSong(song, playlist) {
        const index = playlist.findIndex(s => s.id === song.id);

        setPlaylist(playlist);
        console.log(playlist);
        setCurrentSongIndex(index);
        setIsPlaying(true);
    }

    return (
        <div className="songs-list">
            {search.trim() !== "" && (
                <SongSection
                    songs={filteredSongs}
                    playSong={(song) =>playSong(song,filteredSongs)}
                    sectionTitle="For You"
                />
            )}

            {Object.entries(languagePlaylists).map(([lang, langSongs]) => (
                <SongSection songs={langSongs} key={lang} playSong={(song) => playSong(song, langSongs)} sectionTitle={`${lang.charAt(0).toUpperCase() + lang.slice(1)} Songs`} />
            ))}

        </div>
    );
}

export default SongsList;
