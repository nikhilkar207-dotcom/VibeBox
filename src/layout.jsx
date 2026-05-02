import { Outlet } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer";
import { useSong, getSongs } from "./musicStore"; 


export default function Layout() {
    const playlist = useSong(state => state.playlist)

    getSongs();
    return (
        <div>
            {/* Page content changes here */}
            <Outlet />

            {/* Always visible player */}
             {playlist && <MusicPlayer />}
        </div>
    );
} 