import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useSong } from "../musicStore";
import "../styles/SearchPage.css";

function SongSection({ songs, playSong }) {
  return (
    <section className="song-section">
      <ul className="songs">
        {songs && songs.map((song, index) => (
          <li
            onClick={() => playSong(song)}
            key={song.id || index}
            className="song-item"
            style={{
              backgroundImage: `url(${song.cover_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="song-overlay">
              <p>{song.song_name}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SearchPage() {
  const { songs, setIsPlaying, setCurrentSongIndex, setPlaylist } = useSong();
  const [search, setSearch] = useState("");

  const filteredSongs = songs.filter(song => {
    if (!search.trim()) return false;
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
    <div className="search-page">
      <header className="search-header">
        <h2 className="app-title">VibeBox</h2>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search for songs..." 
            className="search-input"
          />
        </div>
      </header>

      <main className="search-content">
        {search.trim() === "" ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <h1 className="empty-state-title">Nothing to show</h1>
              <p className="empty-state-subtitle">Start typing to search 🎵</p>
            </div>
          </div>
        ) : filteredSongs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <h1 className="empty-state-title">No results found</h1>
              <p className="empty-state-subtitle">Try a different search term 🎵</p>
            </div>
          </div>
        ) : (
          <SongSection 
            songs={filteredSongs} 
            playSong={(song) => playSong(song, filteredSongs)}
          />
        )}
      </main>
    </div>
  );
}

export default SearchPage;