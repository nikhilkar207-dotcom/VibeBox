import { React } from "react";
import MusicPlayer from "../components/MusicPlayer";
import "../styles/HomeStyle.css";
import { FiSearch } from "react-icons/fi";

function HomePage() {
    return (
        <div>
            <header>
                <h2>VibeBox</h2>
                <div className="search-container">
                   <FiSearch />
                    <input type="text" placeholder="Search" />
                </div>
            </header>
            <MusicPlayer />
        </div>
    );
}


export default HomePage;
