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
			let res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/${params.id}/albums`);
			res2 = await res2.json();
			setPlaylists(Object.values(res2.data));
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data}></Header>
			{!playlists?.length && <Loading></Loading>}
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
		</>
	);
}