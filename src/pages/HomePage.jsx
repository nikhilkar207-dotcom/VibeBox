import { React } from "react";
import MusicPlayer from "../components/MusicPlayer";
import {SongsList} from "../components/SongsList";
import "../styles/HomeStyle.css";
import { FiSearch } from "react-icons/fi";

import { getSongs, useSong} from "../musicStore";

function HomePage() {

    const search = useSong(state => state.search);
    const setSearch = useSong(state => state.setSearch);

    
    return (
        <div>
            <header>
                <h2>VibeBox</h2>
                <div className="search-container">
                   <FiSearch />
                    <input type="text" value={search} onChange = {(e) => setSearch(e.target.value)} placeholder="Search" />
                </div>
            </header>
            <SongsList />
        </div>
    );
}


export default HomePage;
