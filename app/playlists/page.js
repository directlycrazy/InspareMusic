'use client';

import Header from "@/app/components/Header";
import Card from "../components/Card";
import { useEffect, useState, Fragment, useRef } from "react";
import { Transition, Dialog } from '@headlessui/react';
import Link from "next/link";
import fetchTimeout from '../components/fetchTimeout';
import Loading from "../components/Loading";
import ImageCard from "../components/ImageCard";
import CardList from "../components/CardList";
import PocketBase from 'pocketbase';

function Playlist(playlist) {
	const [image, setImage] = useState(null);

	useEffect(() => {
		if (!playlist?.tracks) return setImage(`https://ui-avatars.com/api/?name=%3F&background=222222&color=fff&size=512`);

		let tracks = [];

		playlist?.tracks.forEach((t) => {
			tracks.push(t?.expand?.track);
		});

		ImageCard(tracks).then(a => {
			setImage(a);
		});
	}, []);

	let a = {
		title: playlist?.playlist?.name,
		img: image
	};

	return (
		<Link href={`/playlists/${playlist?.playlist?.id}`}>
			<Card {...a}></Card>
		</Link>
	);
}

export default function Playlists() {
	const data = {
		title: 'Playlists',
		artist: "0 playlists"
	};

	const pb = new PocketBase(process.env.NEXT_PUBLIC_PB);

	const playlistName = useRef();
	const [playlists, setPlaylists] = useState([]);
	const [exists, setExists] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	const fetchData = async () => {
		try {
			if (!pb.authStore.isValid) return;

			let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists/list`, {
				headers: {
					'authorization': pb.authStore.model.id
				}
			});

			res = await res.json();
			if (!res) return setExists(false);

			setPlaylists(Object.values(res));
		} catch (e) {
			console.log(e);
			return setExists(false);
		}
	};

	async function createPlaylist() {
		let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${localStorage.account_key}/playlists/create/${playlistName.current.value}`);
		res = await res.text();
		setIsOpen(false);
		setTimeout(() => {
			fetchData();
		}, 1000);
	}

	useEffect(() => {
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			<Header {...data} artist={`${playlists?.length} playlists`}></Header>
			<CardList>
				{playlists && playlists.length > 0 && playlists.map((playlist, index) => {
					return (
						<Playlist key={index} {...playlist}></Playlist>
					);
				})}
				{!playlists?.length && exists && <Loading></Loading>}
				<button onClick={() => { setIsOpen(true); }}>
					<Card title="Create New" img="https://ui-avatars.com/api/?name=%2B&background=222222&color=fff&size=512"></Card>
				</button>
			</CardList>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => { setIsOpen(false); }}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-zinc-900 dark:text-white"
									>
										Create Playlist
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-zinc-500 dark:text-zinc-400">
											What would you like to call your playlist?
										</p>
										<div className="mt-3">
											<input
												type="text"
												id="about"
												name="about"
												ref={playlistName}
												autoComplete="off"
												placeholder="Name"
												className="block w-full rounded-md border-0 bg-white dark:bg-zinc-700 dark:text-white p-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
										<div className="mt-2">
											<button
												type="button"
												onClick={createPlaylist}
												className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-100 dark:bg-indigo-500 px-4 py-2 text-sm font-medium text-indigo-900 dark:text-white hover:bg-indigo-200 dark:hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
											>
												Save
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}