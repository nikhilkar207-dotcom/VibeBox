import "../styles/SongsList.css";
import { useSong } from "../musicStore";
import usePlaylist from "../playlists";

function SongSection({ songs, playSong, sectionTitle }) {
  return (
    <section className="song-section">
      {sectionTitle && (
        <h2 className="section-title">{sectionTitle}</h2>
      )}
      <ul className="songs-grid">
        {songs && songs.map((song, index) => (
          <li
            key={song.id || index}
            onClick={() => playSong(song)}
            className="song-item"
          >
            {/* COVER */}
            <img
              src={song.cover_url}
              alt={song.song_name}
              className="song-cover"
              loading="lazy"
            />

            {/* DETAILS */}
            <div className="song-info">
              <h3 className="song-title">
                {song.song_name}
              </h3>

              <div className="song-meta">
                <span>{song.artist || "Unknown Artist"}</span>
                <span>•</span>
                <span>{song.duration || "0:00"}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SongsList() {
  const { songs, setIsPlaying, setCurrentSongIndex, setPlaylist } = useSong();
  const search = useSong(state => state.search);
  const { languagePlaylists, moodPlaylist} = usePlaylist();

  const filteredSongs = songs.filter(song => {
    if (!search) return true;
    return song.song_name
      ?.toLowerCase()
      .includes(search.toLowerCase());
  });

  function playSong(song, playlist) {
    const index = playlist.findIndex(s => s.id === song.id);
    if (index === -1) return;
    
    setPlaylist(playlist);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  }

  return (
    <div className="songs-list-container">
      {search.trim() !== "" && (
        <SongSection
          songs={filteredSongs}
          playSong={(song) => playSong(song, filteredSongs)}
          sectionTitle="Search Results"
        />
      )}

      {Object.entries(languagePlaylists).map(([lang, langSongs]) => (
        <SongSection 
          songs={langSongs} 
          key={lang} 
          playSong={(song) => playSong(song, langSongs)} 
          sectionTitle={`${lang.charAt(0).toUpperCase() + lang.slice(1)} Songs`} 
        />
      ))}

      {Object.entries(moodPlaylist).map(([mood, moodSong]) => (
        <SongSection 
          songs={moodSong} 
          key={mood} 
          playSong={(song) => playSong(song, moodSong)} 
          sectionTitle={`${mood.charAt(0).toUpperCase() + mood.slice(1)} Songs`} 
        />
      ))}
    </div>
  );
}

export {SongsList};
