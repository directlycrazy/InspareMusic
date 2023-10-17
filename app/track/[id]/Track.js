'use client';

import Header from "@/app/components/Header";
import Grid from "@/app/components/Grid";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

export default function Track({ params }) {
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
			<NextSeo title={tracks?.[0]?.title}></NextSeo>
			<Header {...data} tracks={tracks}></Header>
			{!tracks?.length && <Loading></Loading>}
			<Grid tracks={tracks}></Grid>
		</>
	);
}