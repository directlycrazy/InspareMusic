'use client';

import Header from "@/app/(components)/Header";
import Grid from "@/app/(components)/Grid";
import Link from "next/link";
import Card from "@/app/(components)/Card";
import { useEffect, useState } from "react";

export default function album({ params }) {
	const [data, setData] = useState({});
	const [playlists, setPlaylists] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`https://api-music.inspare.cc/artist/${params.id}`);
			res = await res.json();
			console.log(res)
			setData({
				img: res?.picture_medium,
				type: res?.type ? (res?.type.charAt(0).toUpperCase() + res?.type.slice(1)) : null,
				title: res?.name,
				artist: `${res?.nb_album} Albums`
			});
			let res2 = await fetch(`https://api-music.inspare.cc/artist/${params.id}/albums`)
			res2 = await res2.json();
			console.log(res2)
			setPlaylists(Object.values(res2.data))
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data}></Header>
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
				{playlists && playlists.length > 0 && playlists.map((playlist, index) => {
					let a = {
						title: playlist?.title,
						img: playlist?.cover_medium,
						subtitle: `${playlist?.fans} fans`
					};
					return (
						<Link href={`/album/${playlist.id}`}>
							<Card {...a}></Card>
						</Link>
					)
				})}
			</div>
		</>
	);
}