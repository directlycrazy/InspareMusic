'use client';

import Header from "@/app/components/Header";
import Grid from "@/app/components/Grid";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

export default function album({ params }) {
	const [data, setData] = useState({});
	const [tracks, setTracks] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`https://api-music.inspare.cc/album/${params.id}`);
			res = await res.json();
			setData({
				img: res?.cover_medium,
				type: res?.type ? (res?.type.charAt(0).toUpperCase() + res?.type.slice(1)) : null,
				title: res?.title,
				artist: res?.artist?.name,
				subtitle: `${res?.release_date} • ${res?.nb_tracks} songs`
			});
			setTracks(res?.tracks?.data)
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			{!tracks?.length && <Loading></Loading>}
			<Header {...data} tracks={tracks}></Header>
			<Grid tracks={tracks}></Grid>
		</>
	);
}