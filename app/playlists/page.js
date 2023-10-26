'use client';

import Header from "@/app/components/Header";
import Card from "../components/Card";
import { useEffect, useState, Fragment, useRef } from "react";
import { Transition, Dialog } from '@headlessui/react';
import Link from "next/link";
import fetchTimeout from '../components/fetchTimeout';
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import ImageCard from "../components/ImageCard";

export default function Playlists() {
	const router = useRouter();

	const data = {
		title: 'Playlists',
		artist: "0 playlists"
	};

	const playlistName = useRef();
	const [playlists, setPlaylists] = useState([]);
	const [exists, setExists] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	const fetchData = async () => {
		try {
			let res = await fetchTimeout(`https://api-music.inspare.cc/user/${localStorage.account_key}/playlists`, {
				timeout: 2000
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
		let res = await fetch(`https://api-music.inspare.cc/user/${localStorage.account_key}/playlists/create/${playlistName.current.value}`);
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
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
				{playlists && playlists.length > 0 && playlists.map(async (playlist, index) => {
					let songs;

					if (playlist?.data) {
						songs = Object.values(playlist?.data);
					}

					let image = await ImageCard(songs.slice(0, 4))

					let a = {
						title: playlist?.name,
						img: image ? image : songs?.[0].album?.cover_medium
					};
					
					return (
						<Link key={index} href={`/playlists/${playlist.id}`}>
							<Card {...a}></Card>
						</Link>
					);
				})}
				{!playlists?.length && exists && <Loading></Loading>}
				<button onClick={() => { setIsOpen(true); }}>
					<Card title="Create New" img="https://ui-avatars.com/api/?name=%2B&background=222222&color=fff&size=512"></Card>
				</button>
			</div>
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
												className="block w-full rounded-md border-0 bg-white dark:bg-zinc-700 dark:text-white p-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
											/>
										</div>
										<div className="mt-2">
											<button
												type="button"
												onClick={createPlaylist}
												className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-blue-900 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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