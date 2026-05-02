import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { useSong } from "../musicStore";
import "../styles/MusicPlayer.css";

function MusicPlayer() {
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(1);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);



    const {
        songs,
        playlist,
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying
    } = useSong();

    const currentSong = playlist[currentSongIndex];

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!("mediaSession" in navigator) || !currentSong) return;

        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentSong.song_name || "Unknown",
            artist: currentSong.artist || "Unknown Artist",
            album: "Music Player",
            artwork: [
                {
                    src: currentSong.cover_url,
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        });

        navigator.mediaSession.setActionHandler("play", () => {
            audioRef.current?.play();
        });

        navigator.mediaSession.setActionHandler("pause", () => {
            audioRef.current?.pause();
        });

        navigator.mediaSession.setActionHandler("previoustrack", playPrevious);
        navigator.mediaSession.setActionHandler("nexttrack", playNext);

    }, [currentSong]);

    // Handle seek
    function handleSeek(e) {
        const audio = audioRef.current;
        const bar = e.currentTarget;

        if (!audio || !duration) return;

        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        const percent = clickX / rect.width;
        const newTime = percent * duration;

        audio.currentTime = newTime;
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        let fadeInterval;

        function handleTimeUpdate() {
            if (!audio.duration) return;

            const remaining = audio.duration - audio.currentTime;

            // start fading last 3 seconds
            if (remaining <= 3 && remaining > 0) {
                const fadeStep = 0.02;

                if (!fadeInterval) {
                    fadeInterval = setInterval(() => {
                        if (audio.volume > 0.05) {
                            audio.volume = Math.max(0, audio.volume - fadeStep);
                        }
                    }, 100);
                }
            }
        }

        function handleEnded() {
            clearInterval(fadeInterval);
            audio.volume = volume;

            const nextIndex = (currentSongIndex + 1) % playlist.length;
            setCurrentSongIndex(nextIndex);
            setIsPlaying(true);
        }

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
            clearInterval(fadeInterval);
        };
    }, [currentSongIndex, playlist, volume]);

    // Get current time of the music

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", updateTime);

        function updateTime() {
            setCurrentTime(audio.currentTime);
        }
        return () => {
            audio.removeEventListener("timeupdate", updateTime);
        }
    }, [])

    // Get the max time of the audio

    useEffect(() => {
        const audio = audioRef.current;

        function updateDuration() {
            setDuration(audio.duration);
        }

        audio.addEventListener("loadedmetadata", updateDuration);

        return () => {
            audio.removeEventListener("loadedmetadata", updateDuration);
        }
    }, [])


    // Get the progress
    useEffect(() => {
        if (!duration) return;
        const value = (currentTime / duration) * 100;
        setProgress(Math.min(Math.max(value, 0), 100));
    }, [currentTime, duration])

    // Background support
    useEffect(() => {
        if (!("mediaSession" in navigator)) return;
        navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        function autoPlay() {
            if (!playlist.length) return;

            const nextIndex = (currentSongIndex + 1) % playlist.length;
            setCurrentSongIndex(nextIndex);
            setIsPlaying(true);
        }

        audio.addEventListener("ended", autoPlay);

        return () => {
            audio.removeEventListener("ended", autoPlay);
        };
    }, [playlist, currentSongIndex]);

    //  Handle song change
    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.load();

        if (isPlaying) {
            audioRef.current.play().catch(() => { });
        }
    }, [currentSongIndex]);

    //  Play / Pause
    function togglePlay() {
        if (!audioRef.current) return;
        const audio = audioRef.current;
        console.log(duration)
        if (audio.paused) {
            audio.play().catch(() => { });
        } else {
            audio.pause();
        }
    }

    function playNext() {
        if (!playlist.length) return;

        const next = (currentSongIndex + 1) % playlist.length;
        setCurrentSongIndex(next);
        setIsPlaying(true);
    }

    //  Previous song
    function playPrevious() {
        if (!playlist.length) return;

        setCurrentSongIndex((currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1));
    }

    // Update tab title & favicon
    useEffect(() => {
        if (!currentSong) return;

        document.title = currentSong.song_name || "Music Player";

        let favicon = document.querySelector("link[rel~='icon']");

        if (!favicon) {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            document.head.appendChild(favicon);
        }

        favicon.href = currentSong.cover_url + "?v=" + Date.now();
    }, [currentSong]);


    return (
        <div className="music-player">
            <audio src={currentSong?.audio_url} ref={audioRef} />


            <div className="controls">

                <img src={currentSong?.cover_url} alt="cover" />
                <div className="controls-buttons">
                    <button className="control-btn" onClick={playPrevious}>
                        <FaBackward />
                    </button>

                    <button className="control-btn" onClick={togglePlay}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>

                    <button className="control-btn" onClick={playNext}>
                        <FaForward />
                    </button>


                </div>
                <div className="progress-bar" onClick={handleSeek}>
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>

            </div>
        </div>
    );
}

export default MusicPlayer;



