'use client';

import Header from "@/app/(components)/Header";
import Card from "../(components)/Card";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../(components)/Loading";

export default function Playlists() {
	const data = {
		title: 'Playlists',
		artist: "0 playlists"
	};
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`https://api-music.inspare.cc/user/${localStorage.account_key}/playlists`);
			res = await res.json();
			setPlaylists(Object.values(res));
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data} artist={`${playlists?.length} playlists`}></Header>
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
				{playlists && playlists.length > 0 && playlists.map((playlist, index) => {
					let songs;
					if (playlist?.data) {
						songs = Object.values(playlist?.data);
					}
					let a = {
						title: playlist?.name,
						img: songs?.[0]?.album?.cover_medium
					};
					return (
						<Link key={index} href={`/playlists/${playlist.id}`}>
							<Card {...a}></Card>
						</Link>
					);
				})}
				{!playlists?.length && <Loading></Loading>}
			</div>
		</>
	);
}