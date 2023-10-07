import { BackwardIcon, PlayIcon, ForwardIcon, SpeakerWaveIcon, PauseIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { set, set_queue } from "../(stores)/playerSlice";

export default function Player(props) {
    const track = useSelector(state => state.player.value);
    const queue = useSelector(state => state.player.queue);
    const queue_pos = useSelector(state => state.player.queue_pos);
    const [percentage, setPercentage] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [tooltipData, setTooltipData] = useState({ style: { visibility: 'hidden' } });
    const tooltipRef = useRef(null);
    const progress = useRef(null);
    const audioRef = useRef(null);

    const dispatch = useDispatch();

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

    function skip() {
        if (queue_pos >= queue.length - 1) return;
        dispatch(set_queue({
            queue_pos: queue_pos + 1,
            tracks: queue
        }));
        dispatch(set(queue[queue_pos + 1]));
    }

    function back() {
        if (queue_pos <= 0) return;
        dispatch(set_queue({
            queue_pos: queue_pos - 1,
            tracks: queue
        }));
        dispatch(set(queue[queue_pos - 1]));
    }

    function mediaSession() {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track?.title,
            artist: track?.artist?.name,
            album: track?.album?.title,
            artwork: [
                { src: `https://music-proxy.inspare.cc/image?q=https://e-cdns-images.dzcdn.net/images/cover/${track?.album?.md5_image}/96x96-000000-80-0-0.jpg`, sizes: '96x96', type: 'image/jpg' },
                { src: `https://music-proxy.inspare.cc/image?q=https://e-cdns-images.dzcdn.net/images/cover/${track?.album?.md5_image}/128x128-000000-80-0-0.jpg`, sizes: '128x128', type: 'image/jpg' },
                { src: `https://music-proxy.inspare.cc/image?q=https://e-cdns-images.dzcdn.net/images/cover/${track?.album?.md5_image}/192x192-000000-80-0-0.jpg`, sizes: '192x192', type: 'image/jpg' },
                { src: `https://music-proxy.inspare.cc/image?q=https://e-cdns-images.dzcdn.net/images/cover/${track?.album?.md5_image}/256x256-000000-80-0-0.jpg`, sizes: '256x256', type: 'image/jpg' },
                { src: `https://music-proxy.inspare.cc/image?q=https://e-cdns-images.dzcdn.net/images/cover/${track?.album?.md5_image}/384x384-000000-80-0-0.jpg`, sizes: '384x384', type: 'image/jpg' },
                { src: `https://music-proxy.inspare.cc/image?q=https://e-cdns-images.dzcdn.net/images/cover/${track?.album?.md5_image}/512x512-000000-80-0-0.jpg`, sizes: '512x512', type: 'image/jpg' },
                { src: `https://music-proxy.inspare.cc/image?q=https://e-cdns-images.dzcdn.net/images/cover/${track?.album?.md5_image}/1000x1000-000000-80-0-0.jpg`, sizes: '1000x1000', type: 'image/jpg' }
            ]
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            back();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            skip();
        });
        navigator.mediaSession.setActionHandler('play', () => {
            togglePlay();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            togglePlay();
        });
        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.fastSeek && 'fastSeek' in document.querySelector('audio')) {
                document.querySelector('audio').fastSeek(details.seekTime);
                return;
            }
            setCurrentTime(details.seekTime);
        });
    }

    async function play() {
        if (localStorage.account_key) {
            let a = await fetch(`https://api-music.inspare.cc/request_streamkey/${localStorage.account_key}`);
            audioRef.current.src = `https://api-music.inspare.cc/lossless/${localStorage.account_key}/${track.id}.mp3`;
            audioRef.current.load();
            await audioRef.current.play();
            mediaSession();
            audioRef.current.volume = volume;
        } else {
            if (track?.preview) {
                audioRef.current.src = track.preview;
                audioRef.current.load();
                await audioRef.current.play();
                mediaSession();
                audioRef.current.volume = volume;
            }
        }
    }

    function tooltip(e) {
        let percentage = (e.pageX / window.innerWidth) * 100;
        let point_time = (percentage / 100) * duration;
        let readable = formatTime(point_time);
        setTooltipData({
            value: readable,
            style: {
                left: e.clientX - 25,
                top: document.documentElement.clientHeight - 125,
                visibility: 'visible'
            }
        });
    }

    function seek(e) {
        let outside = document.querySelectorAll('#player_progress')[0];
        let percentage = Math.floor((e.pageX / outside.offsetWidth) * 100);
        document.querySelector('audio').currentTime = Math.floor(duration * (percentage / 100));
    }

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

    useEffect(() => {
        if (!track?.id) return;
        play();
    }, [track]);

    return (
        <>
            <div id="progress-bar-tooltip" ref={tooltipRef} className='fixed text-black z-100 bg-white dark:bg-zinc-600 dark:text-white rounded-lg p-2' style={tooltipData?.style}>{tooltipData?.value}</div>
            <div className="w-full bg-white dark:bg-zinc-800 pb-5 md:pb-2">
                <div
                    className="relative h-4 dark:bg-zinc-700"
                    id="player_progress"
                    onMouseMove={tooltip}
                    onClick={(e) => { seek(e); }}
                    onMouseLeave={() => { setTooltipData({ style: { visibility: 'hidden' } }); }}
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
                        <h3 className="text-lg font-bold cursor-pointer">
                            <Link href={`/album/${track?.album?.id}`}>
                                {track?.title}
                            </Link>
                        </h3>
                        <p className="text-sm cursor-pointer">
                            <Link href={`/artist/${track?.artist?.id}`}>
                                {track?.artist?.name}
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="md:absolute flex items-right md:items-center justify-end md:justify-center space-x-4 flex-grow left-2/4 pb-5 md:pb-0">
                    <button className="text-black dark:text-white"></button>
                    <button onClick={back} className="invisible fixed sm:visible sm:static">
                        <BackwardIcon theme='solid' className="h-9 w-9" aria-hidden="true"></BackwardIcon>
                    </button>
                    <button onClick={togglePlay}>
                        {playing ? <PauseIcon className="h-9 w-9" aria-hidden="true"></PauseIcon> : <PlayIcon theme='solid' className="h-9 w-9" aria-hidden="true"></PlayIcon>}
                    </button>
                    <button onClick={skip}>
                        <ForwardIcon theme='solid' className="h-9 w-9" aria-hidden="true"></ForwardIcon>
                    </button>
                </div>
                <div className="flex items-center justify-end space-x-4 invisible fixed md:absolute md:visible right-0 mr-3">
                    <button>
                        {/* <Icon src={Microphone} theme='solid' class="h-6 w-6" aria-hidden="true" /> */}
                    </button>
                    <button>
                        <SpeakerWaveIcon className="h-6 w-6"></SpeakerWaveIcon>
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
            <div id='song_id' className='fixed invisible'>{track?.id}</div>
            <audio volume={volume} onEnded={skip} autoPlay ref={audioRef}></audio>
        </>
    );
}