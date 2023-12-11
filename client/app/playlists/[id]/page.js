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

	let loadingMore = false;
	let page = 1;

	const load_more = async () => {
		if (loadingMore) return;
		let div = document.querySelector('#main');
		let scrollTop = div.scrollTop;
		let scrollHeight = div.scrollHeight;
		let offsetHeight = div.offsetHeight;
		if (scrollHeight - (scrollTop + offsetHeight) <= 100) {
			loadingMore = true;
			page++;
			fetchTracks();
			return;
		}
	};

	const fetchTracks = () => {
		return new Promise(async (res) => {
			let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists/tracks/${params.id}?page=${page}`, {
				headers: {
					'authorization': pb.authStore.model.id
				}
			});

			let image_tracks = [];

			let t = [];

			data = await data.json();

			if (page > data?.totalPages) return;

			data?.items.forEach((track, i) => {
				if (track === undefined) return;
				if (!track?.id) return;
				track = track?.expand?.track;
				if (track.type === 'youtube') {
					let thumbnail = track?.data?.thumbnails?.[0]?.url;
					t.push(track = {
						id: track.id,
						album: {
							cover: thumbnail,
							title: track.title,
							cover_xl: thumbnail,
							cover_small: thumbnail,
							cover_medium: thumbnail
						},
						artist: {
							name: track.artist
						},
						title: track.title,
						contributors: [],
						youtube: true
					});
				} else {
					t.push(track?.data);
				}

				if (i < 4 && page === 1) image_tracks.push(track);
			});

			setTracks(prev => [...prev, ...t]);

			if (page === 1) {
				if (!image_tracks) return;
				let image = await ImageCard(image_tracks);
				setImage(image);
			}

			res();

			setTimeout(() => {
				loadingMore = false;
			}, 200);
		});
	};

	const fetchData = async () => {
		let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists/get/${params.id}`, {
			headers: {
				'authorization': pb.authStore.model.id
			}
		});

		res = await res.json();

		setData({
			type: 'Playlist',
			title: res?.name,
			artist: 'Created by You',
			subtitle: `0 songs`
		});

		await fetchTracks();

		setLoadFinished(true);
	};

	useEffect(() => {
		fetchData().catch(console.error);
	}, []);

	useEffect(() => {
		if (!loadFinished) return;
		document.querySelector('#main').addEventListener('scroll', load_more);
		return () => document.querySelector('#main').removeEventListener('scroll', load_more);
	}, [loadFinished]);

	return (
		<>
			<Header {...data} img={image} subtitle={`${tracks?.length} songs`} tracks={tracks}></Header>
			{!tracks?.length && !loadFinished && <Loading></Loading>}
			<Grid tracks={tracks}></Grid>
		</>
	);
}