'use client';

import Header from "@/app/(components)/Header";
import Grid from "@/app/(components)/Grid";
import { useEffect, useState } from "react";

export default function album({ params }) {
	const [data, setData] = useState({});
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`https://api-music.inspare.cc/track/${params.id}`);
			res = await res.json();
			setData({
				img: res?.album?.cover_medium,
				type: `Track`,
				title: res?.title,
				artist: res?.artist?.name,
				subtitle: `${res?.release_date} • 1 song`
			});
			setTracks([res]);
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data} tracks={tracks}></Header>
			<Grid tracks={tracks}></Grid>
		</>
	);
}