'use client';

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Grid from "../(components)/Grid";
import Card from "../(components)/Card";
import Loading from "../(components)/Loading";

export default function Discover() {
	const [results, setResults] = useState([]);
	const [artists, setArtists] = useState([]);

	useEffect(() => {
		async function load() {
			let a = await fetch(`https://api-music.inspare.cc/chart`);
			a = await a.json();
			setArtists(Object.values(a?.artists?.data));
			let res = await fetch(`https://api-music.inspare.cc/playlist/3155776842`);
			res = await res.json();
			setResults(res.tracks?.data);
		}
		load();
	}, []);

	return (
		<>
			<h1 className='font-bold text-4xl'>Trending Artists</h1>
			<div className='flex pt-5 overflow-x-scroll pb-5'>
				{artists.map((artist, index) => {
					let a = {
						title: artist?.name,
						img: artist?.picture_medium
					};
					return (
						<Link key={index} href={`/artist/${artist.id}`}>
							<Card {...a}></Card>
						</Link>
					);
				})}
			</div>
			<Suspense fallback={<Loading></Loading>}>
				<Grid tracks={results}></Grid>
			</Suspense>
		</>
	);
}