'use client';

import Header from "@/app/(components)/Header";
import Grid from "@/app/(components)/Grid";
import { useEffect, useState } from "react";

export default function album({ params }) {
	const [data, setData] = useState({});
	const [tracks, setTracks] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`https://api-music.inspare.cc/user/${localStorage.account_key}/playlists/get/${params.id}`);
			res = await res.json();
			setData({
				type: 'Playlist',
				title: res?.name,
				artist: 'Created by You',
				subtitle: `0 songs`
			});

			let t = [];

			Object.values(res.data.order).forEach((id, i) => {
				let track = res.data[id]
				if (track === undefined) return;
				if (track.album === undefined) return;
				t.push(track);
			})
			
			setTracks(t)
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data} img={tracks?.[0]?.album?.cover_medium} subtitle={`${tracks?.length} songs`} tracks={tracks}></Header>
			<Grid tracks={tracks}></Grid>
		</>
	);
}