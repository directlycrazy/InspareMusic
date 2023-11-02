'use client';

import Header from "@/app/components/Header";
import Grid from "@/app/components/Grid";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

export default function album({ params }) {
	const [data, setData] = useState({});
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`https://api-music.inspare.cc/radio/${params.id}`);
			res = await res.json();
			setData({
				img: res?.picture_medium,
				type: res?.type ? (res?.type.charAt(0).toUpperCase() + res?.type.slice(1)) : null,
				title: res?.title,
				artist: `Last Updated on ${new Date(res?.last_updated).toLocaleDateString('en-US')}`
			});
			res = await fetch(`https://api-music.inspare.cc/radio/${params.id}/tracks`);
			res = await res.json();
			setTracks(res?.data);
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data} tracks={tracks}></Header>
			{!tracks?.length && <Loading></Loading>}
			<Grid tracks={tracks}></Grid>
		</>
	);
}