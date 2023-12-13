'use client';

import { useState } from "react";
import Link from "next/link";
import Grid from "../components/Grid";
import Loading from "../components/Loading";
import Card from "../components/Card";

export default function Search() {
	const [results, setResults] = useState({});
	const [artists, setArtists] = useState([]);
	const [startTyping, setStartTyping] = useState(false);
	let timeout;

	async function search(value) {
		let val = encodeURIComponent(value);

		let artists = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/artist?q=${val}`);
		artists = await artists.json();
		setArtists(artists?.data);

		let tracks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${val}`);
		tracks = await tracks.json();
		setResults(tracks?.data);
	}

	function type(e) {
		if (!e.target.value.length) return setStartTyping(false);
		setStartTyping(true);
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(async () => {
			search(e.target.value);
		}, 200);
	}

	return (
		<>
			<input onChange={type} type="text" placeholder="Find a song..." className="w-full p-4 rounded-md text-black dark:text-white bg-white border dark:border-zinc-700 dark:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"></input>
			{artists && artists.length > 0 && <>
				<div className='flex pt-5 overflow-x-auto pb-5'>
					{artists.map((artist, index) => {
						let a = {
							title: artist?.name,
							img: artist?.picture_medium,
							subtitle: `${artist?.nb_fan} fans`
						};
						return (
							<Link key={index} href={`/artist/${artist?.id}`}>
								<Card {...a}></Card>
							</Link>
						);
					})}
				</div>
			</>}
			{startTyping && !results?.length && <Loading></Loading>}
			<Grid tracks={results}></Grid>
		</>
	);
}