'use client'

import { useEffect, useState } from "react";
import Homepage from "./components/Home";
import Card from "./components/Card";
import { useDispatch } from "react-redux";
import { set, set_queue } from './stores/playerSlice'

export default function Home() {
	const dispatch = useDispatch();
	
	const [recentlyPlayed, setRecentlyPlayed] = useState([]);
	const [quickPicks, setQuickPicks] = useState([]);

	function play(track) {
		if (track && recentlyPlayed.length) {
			dispatch(set(track));
			dispatch(set_queue({
				queue_pos: 0,
				tracks: recentlyPlayed
			}))
		}
	}

	const fetchData = async () => {
		if (localStorage.account_key == undefined) return;
		let res = await fetch(`https://api-music.inspare.cc/history/${localStorage.account_key}`)
		res = await res.json();
		if (res) setRecentlyPlayed(Object.values(res));
		let picks = await fetch(`https://api-music.inspare.cc/radio`);
		picks = await picks.json();
		setQuickPicks(picks?.data);
	}

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<>
			{recentlyPlayed.length === 0 && <Homepage></Homepage>}
			{recentlyPlayed.length > 0 && <>
				<h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">Recently Played</h1>
				<div className='flex pt-5 overflow-x-auto pb-5'>
					{recentlyPlayed.map((track, index) => {
						return (
							<button key={index} className="cursor-pointer text-left" onClick={() => {play(track)}}>
								<Card title={track?.title} subtitle={track?.artist?.name} img={track?.album?.cover_medium}></Card>
							</button>
						)
					})}
				</div>
				<h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">Quick Picks</h1>
				<div className='flex pt-5 overflow-x-auto pb-5'>
					{quickPicks.map((track, index) => {
						return (
							<button key={index} className="cursor-pointer text-left">
								<Card title={track?.title} subtitle='Radio' img={track?.picture_medium}></Card>
							</button>
						)
					})}
				</div>
			</>}
		</>
	);
}
