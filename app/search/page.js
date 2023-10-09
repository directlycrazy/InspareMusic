'use client';

import { useState } from "react";
import Grid from "../(components)/Grid";
import Loading from "../(components)/Loading";

export default function Search() {
	const [results, setResults] = useState({});
	const [startTyping, setStartTyping] = useState(false);
	let timeout;

	async function search(value) {
		let res = await fetch(`https://api-music.inspare.cc/search?q=${value}`);
		res = await res.json();
		setResults(res.data);
	}

	function type(e) {
		setStartTyping(true);
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(async () => {
			search(e.target.value);
		}, 200);
	}

	return (
		<>
			<input onChange={type} type="text" placeholder="Find a song..." className="w-full p-4 rounded-md text-black dark:text-white bg-white border dark:border-zinc-600 dark:bg-zinc-700"></input>
			{startTyping && !results?.length && <Loading></Loading>}
			<Grid tracks={results}></Grid>
		</>
	);
}