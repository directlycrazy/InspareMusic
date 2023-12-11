'use client';

import Header from "@/app/components/Header";
import Grid from "@/app/components/Grid";
import Link from "next/link";
import Card from "@/app/components/Card";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import CardList from "@/app/components/CardList";

export default function album({ params }) {
	const [data, setData] = useState({});
	const [playlists, setPlaylists] = useState([]);
	const [related, setRelated] = useState([]);
	const [topTracks, setTopTracks] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${params.id}`);
			res = await res.json();
			setData({
				img: res?.picture_medium,
				type: res?.type ? (res?.type.charAt(0).toUpperCase() + res?.type.slice(1)) : null,
				title: res?.name,
				artist: `${res?.nb_album} Albums`
			});

			let top = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${params.id}/top`)
			top = await top.json();
			setTopTracks(top?.data);

			let res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${params.id}/albums`);
			res2 = await res2.json();
			setPlaylists(Object.values(res2.data));

			let res3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${params.id}/related`);
			res3 = await res3.json();
			setRelated(res3?.data);
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data}></Header>
			{!topTracks?.length && <Loading></Loading>}
			{topTracks && topTracks.length > 0 && <>
				<h1 className='font-black text-2xl md:text-4xl'>Top Tracks</h1>
				<Grid tracks={topTracks}></Grid>
			</>}
			<CardList>
				{playlists && playlists.length > 0 && playlists.map((playlist, index) => {
					let a = {
						title: playlist?.title,
						img: playlist?.cover_medium,
						subtitle: `${playlist?.fans} fans`
					};
					return (
						<Link key={index} href={`/album/${playlist.id}`}>
							<Card {...a}></Card>
						</Link>
					);
				})}
			</CardList>

			{related && related.length > 0 && <>
				<h1 className='font-black text-2xl md:text-4xl mt-5'>Related</h1>
				<div className='flex pt-5 overflow-x-auto pb-5'>
					{related.map((artist, index) => {
						let a = {
							title: artist?.name,
							img: artist?.picture_medium,
							subtitle: `${artist?.nb_fan} fans`
						};
						return (
							<Link key={index} href={`/artist/${artist?.id}`}>
								<Card {...a}></Card>
							</Link>
						);
					})}
				</div>
			</>}
		</>
	);
}