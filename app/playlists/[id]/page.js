'use client';

import Header from "@/app/components/Header";
import Grid from "@/app/components/Grid";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import ImageCard from "@/app/components/ImageCard";
import PocketBase from 'pocketbase';

export default function album({ params }) {
	const [data, setData] = useState({});
	const [loadFinished, setLoadFinished] = useState(false);
	const [image, setImage] = useState(null);
	const [tracks, setTracks] = useState([]);

	const pb = new PocketBase(process.env.NEXT_PUBLIC_PB);

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists/get/${params.id}`, {
				headers: {
					'authorization': pb.authStore.model.id
				}
			});
			let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists/tracks/${params.id}`, {
				headers: {
					'authorization': pb.authStore.model.id
				}
			});
			res = await res.json();
			data = await data.json();
			setData({
				type: 'Playlist',
				title: res?.name,
				artist: 'Created by You',
				subtitle: `0 songs`
			});

			let t = [];
			let image_tracks = [];

			data?.items.forEach((track, i) => {
				if (track === undefined) return;
				if (!track?.id && !track?.youtube === true) return;
				t.push(track?.expand?.track?.data);
				if (i < 4) image_tracks.push(track?.expand?.track);
			});

			setLoadFinished(true);
			setTracks(t);
			let image = await ImageCard(image_tracks);
			setImage(image);
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data} img={image} subtitle={`${tracks?.length} songs`} tracks={tracks}></Header>
			{!tracks?.length && !loadFinished && <Loading></Loading>}
			<Grid tracks={tracks}></Grid>
		</>
	);
}