import {PlayIcon, ArrowsRightLeftIcon} from '@heroicons/react/24/solid'
import { useDispatch } from "react-redux";
import { set, set_queue } from '../stores/playerSlice';

export default function Header({img, title, type, artist, subtitle, tracks}) {
	const dispatch = useDispatch();

	function play() {
		if (tracks && tracks.length > 0) {
			dispatch(set(tracks[0]));
			dispatch(set_queue({
				queue_pos: 0,
				tracks: tracks
			}))
		}
	}

	function shuffle() {
		const shuffle_arr = (array) => {
			let currentIndex = array.length, randomIndex;
			while (currentIndex != 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
				[array[currentIndex], array[randomIndex]] = [
					array[randomIndex], array[currentIndex]];
			}
			return array;
		};

		if (tracks && tracks.length > 0) {
			let arr = shuffle_arr(tracks);
			dispatch(set(arr[0]));
			dispatch(set_queue({
				queue_pos: 0,
				tracks: arr
			}))
		}
	}

	return (
		<>
			<div>
				<img className="blurred" src={img} />
				<div
					className="md:flex border-b dark:border-zinc-800 pb-5 items-end text-center md:text-left"
					style={{ marginTop: "-200px" }}
				>
					<img
						src={img}
						alt=""
						className="noselect_image max-w-xs rounded-2xl drop-shadow-2xl inline-block"
						style={{ maxWidth: 232 }}
					/>
					<div className="inline-block md:ml-5">
						<p className="text-zinc-300 drop-shadow-lg relative">
							{type}
						</p>
						<h1 className="font-black text-4xl mb-1 lg:text-8xl relative drop-shadow-lg text-white">
							{title}
						</h1>
						<p className="text-zinc-100 drop-shadow-lg mb-1 ellipsis max-w-xs md:max-w-none">
							{artist}{subtitle && <> &bull; {subtitle}</>}
						</p>
					</div>
				</div>
			</div>
			<div className="mt-5">
				{subtitle && <>
					<button
						type="button"
						style={{ height: 60, width: 60 }}
						onClick={play}
						className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2"
					>
						<PlayIcon className="m-0.5 h-8 w-8"></PlayIcon>
					</button>
					<button
						type="button"
						style={{ height: 60, width: 60 }}
						onClick={shuffle}
						className="inline-flex items-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-600 px-3 py-2 text-sm font-semibold text-black dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						<ArrowsRightLeftIcon className="m-0.5 h-8 w-8"></ArrowsRightLeftIcon>
					</button>
				</>}
			</div>
		</>
	);
}