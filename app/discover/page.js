'use client';

import { useEffect, useState } from "react";
import Grid from "../(components)/Grid";

export default function Discover() {
	const [results, setResults] = useState({});

	useEffect(() => {
		async function load() {
			let res = await fetch(`https://api-music.inspare.cc/playlist/3155776842`);
			res = await res.json();
			console.log(res.tracks.data)
			setResults(res.tracks.data);
		}
		load();
	}, [])

	return (
		<>
			<Grid results={results}></Grid>
		</>
	);
}