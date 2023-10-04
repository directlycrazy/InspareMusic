import { BackwardIcon, PlayIcon, ForwardIcon, SpeakerWaveIcon, PauseIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useRef, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from './store';

export default function Player(props) {
    const track = useSelector(state => state.player.value);
    const [percentage, setPercentage] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const progress = useRef(null);
    const audioRef = useRef(null);

    const pad = (num) => num.toString().padStart(2, "0");

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${pad(minutes)}:${pad(seconds)}`;
    }

    function volumeChange(e) {
        setVolume(e.target.value);
        audioRef.current.volume = volume;
    }

    function togglePlay() {
        setPlaying(!playing);
        playing ? audioRef.current.pause() : audioRef.current.play();
    }

    store.subscribe(async () => {
        let streamKey = await fetch(`https://api-music.inspare.cc/request_streamkey/`)
        streamKey = await streamKey.text()
        console.log(streamKey)
        if (!streamKey == 'OK') return;
        
        let t = store.getState().player.value;
        console.log(t.id)
        audioRef.current.src = `https://api-music.inspare.cc/lossless/${t.id}.mp3`;
        audioRef.current.load();
        audioRef.current.play();
        audioRef.current.volume = volume;
    });

    useEffect(() => {
        const audio = audioRef.current;
        const handlePlay = () => setPlaying(true);
        const handlePause = () => setPlaying(false);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.current.addEventListener('timeupdate', () => {
            let current = audioRef.current.currentTime;
            setCurrentTime(current);
            setPercentage((current / audioRef.current.duration) * 100);
        });
        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);

    return (
        <>
            {/* <div id="progress-bar-tooltip" class='fixed text-black z-100 bg-white dark:bg-zinc-600 dark:text-white rounded-lg p-2' style='z-index: 1000; visibility: {tooltip_data.visible ? 'visible' : 'hidden'}; top: {tooltip_data.top}px; left: {tooltip_data.left}px;'>{tooltip_data.value}</div> */}
            <div className="w-full bg-white dark:bg-zinc-800 pb-5 md:pb-2">
                <div
                    className="relative h-4 dark:bg-zinc-700"
                    id="player_progress"
                    style={{ height: 5, marginBottom: 66 }}
                >
                    <div className="absolute h-full bg-indigo-600" ref={progress} id="player_progress_bar" style={{ width: `${percentage}%` }} />
                </div>
            </div>
            <div
                className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-800 text-black dark:text-white p-4 flex items-center mb-2 mt-2"
                style={{ height: 58 }}
            >
                <div className="flex absolute items-center justify-start space-x-4 left-0 ml-3 pb-5 md:pb-0">
                    {track?.album?.cover_small ? <img src={track?.album?.cover_small} alt="Album Cover" className="w-12 h-12 rounded-md"></img> : null}
                    <div>
                        <h3 className="text-lg font-bold cursor-pointer">{track?.title}</h3>
                        <p className="text-sm cursor-pointer">
                            {track?.artist?.name}
                        </p>
                    </div>
                </div>
                <div className="md:absolute flex items-right md:items-center justify-end md:justify-center space-x-4 flex-grow left-2/4 pb-5 md:pb-0">
                    <button className="text-black dark:text-white"></button>
                    <button className="invisible fixed sm:visible sm:static">
                        <BackwardIcon theme='solid' className="h-9 w-9" aria-hidden="true"></BackwardIcon>
                    </button>
                    <button onClick={togglePlay}>
                        {playing ? <PauseIcon className="h-9 w-9" aria-hidden="true"></PauseIcon> : <PlayIcon theme='solid' className="h-9 w-9" aria-hidden="true"></PlayIcon>}
                        {/* <Icon src={paused ? Play : Pause} theme='solid' class="h-9 w-9" aria-hidden="true" /> */}
                    </button>
                    <button>
                        <ForwardIcon theme='solid' className="h-9 w-9" aria-hidden="true"></ForwardIcon>
                        {/* <Icon src={Forward} theme='solid' class="h-9 w-9" aria-hidden="true" /> */}
                    </button>
                </div>
                <div className="flex items-center justify-end space-x-4 invisible fixed md:absolute md:visible right-0 mr-3">
                    <button>
                        {/* <Icon src={Microphone} theme='solid' class="h-6 w-6" aria-hidden="true" /> */}
                    </button>
                    <button>
                        <SpeakerWaveIcon className="h-6 w-6"></SpeakerWaveIcon>
                        {/* <Icon src={SpeakerWave} theme='solid' class="h-6 w-6" aria-hidden="true" /> */}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        onChange={volumeChange}
                        step="0.01"
                        className="slider-input w-24 bg-zinc-700"
                    />
                    <span className="text-sm font-bold">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
            </div>
            <audio volume={volume} autoPlay ref={audioRef}></audio>
        </>
    );
}