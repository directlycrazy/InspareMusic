'use client';

import Header from "@/app/components/Header";
import Grid from "@/app/components/Grid";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

export default function album({ params }) {
	const [data, setData] = useState({});
	const [loadFinished, setLoadFinished] = useState(false);
	const [tracks, setTracks] = useState([]);

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
			if (!res.data) return setLoadFinished(true);

			let t = [];

			Object.values(res.data.order).forEach((id, i) => {
				let track = res.data[id];
				if (track === undefined) return;
				if (!track?.id && !track?.youtube === true) return;
				if (track.youtube === true) {
					track = {
						id: track.id,
						album: {
							cover: track.thumbnail,
							title: track.title,
							cover_xl: track.thumbnail,
							cover_small: track.thumbnail,
							cover_medium: track.thumbnail
						},
						artist: {
							name: track.author
						},
						title: track.title,
						duration: track.length,
						contributors: [],
						youtube: true,
						added_on: track.added_on ? track.added_on : ''
					};
				}
				// if (track.album === undefined) return;
				t.push(track);
			});

			setLoadFinished(true);
			setTracks(t);
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data} img={tracks?.[0]?.album?.cover_medium} subtitle={`${tracks?.length} songs`} tracks={tracks}></Header>
			{!tracks?.length && !loadFinished && <Loading></Loading>}
			<Grid tracks={tracks}></Grid>
		</>
	);
}