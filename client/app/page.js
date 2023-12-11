'use client';

import { useEffect, useState } from "react";
import Homepage from "./components/Home";
import Card from "./components/Card";
import { useDispatch } from "react-redux";
import PocketBase from 'pocketbase';
import { set, set_queue } from './stores/playerSlice';
import Loading from "./components/Loading";
import Link from "next/link";

export default function Home() {
	const dispatch = useDispatch();

	const pb = new PocketBase(process.env.NEXT_PUBLIC_PB);

	const [recentlyPlayed, setRecentlyPlayed] = useState([]);
	const [quickPicks, setQuickPicks] = useState([]);

	function play(track, index) {
		if (track && recentlyPlayed.length) {
			dispatch(set(track));
			dispatch(set_queue({
				queue_pos: index,
				tracks: recentlyPlayed
			}));
		}
	}

	const fetchData = async () => {
		if (localStorage.pocketbase_auth == undefined) return;
		let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/get`, {
			headers: {
				'authorization': pb.authStore.model.id
			}
		});

		res = await res.json();

		let history = [];

		res?.items.forEach(track => {
			history.push(track?.expand?.track?.data);
		});

		try {
			if (res) setRecentlyPlayed(history);
		} catch (e) { }
		let picks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/radio`);
		picks = await picks.json();
		setQuickPicks(picks?.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			{recentlyPlayed.length === 0 && <Homepage></Homepage>}
			{recentlyPlayed.length > 0 && <>
				<h1 className="mt-2 text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">Recently Played</h1>
				<div className='flex pt-5 overflow-x-auto pb-5'>
					{!recentlyPlayed.length && <Loading></Loading>}
					{recentlyPlayed.map((track, index) => {
						return (
							<button key={index} className="cursor-pointer text-left" onClick={() => { play(track, index); }}>
								<Card title={track?.title} subtitle={track?.artist?.name} img={track?.album?.cover_medium}></Card>
							</button>
						);
					})}
				</div>
				<h1 className="mt-4 text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl">Quick Picks</h1>
				<div className='flex pt-5 overflow-x-auto pb-5'>
					{!quickPicks.length && <Loading></Loading>}
					{quickPicks.map((track, index) => {
						return (
							<Link prefetch={false} key={index} href={`/radio/${track?.id}`} className="cursor-pointer text-left">
								<Card title={track?.title} subtitle='Radio' img={track?.picture_medium}></Card>
							</Link>
						);
					})}
				</div>
			</>}
		</>
	);
}
