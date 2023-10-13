'use client';

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { set, set_queue } from '../(stores)/playerSlice';

export default function Grid(props) {
	const [isOpen, setIsOpen] = useState(false);
	const [playlists, setPlaylists] = useState([]);
	const [modalTrack, setModalTrack] = useState(null);
	let tracks = props.tracks;
	const dispatch = useDispatch();

	async function openModal(track) {
		setIsOpen(true);
		setModalTrack(track);
		let playlists = await fetch(`https://api-music.inspare.cc/user/${localStorage.account_key}/playlists`);
		playlists = await playlists.json();
		setPlaylists(Object.values(playlists));
	}

	async function addToPlaylist(playlist) {
		let a = await fetch(`https://api-music.inspare.cc/user/${localStorage.account_key}/playlists/addremove/${playlist.id}/true/${modalTrack.id}`);
		if (a.ok) {
			setIsOpen(false);
		} else {
			alert('An error occurred.');
		}
	}

	function copy(track) {
		const e = document.createElement('textarea');
		if (isNaN(track.id)) {
			e.value = `https://youtu.be/${track.id}`;
		} else {
			e.value = `https://music.inspare.cc/track/${track.id}`;
		}
		document.body.appendChild(e);
		e.select();
		document.execCommand('copy');
		document.body.removeChild(e);
	}

	function play(track, index) {
		dispatch(set(track));
		dispatch(set_queue({
			queue_pos: index,
			tracks: tracks
		}));
	}
	return (
		<>
			<ul role="list" className="divide-y divide-zinc-100 dark:divide-zinc-900 mt-5">
				{tracks && (tracks?.length > 0) && tracks.map((track, index) => {
					return (
						<li
							key={index}
							className="flex justify-between gap-x-6 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer hover:shadow-inner p-2"
						>
							<div className="flex min-w-0 gap-x-4 w-full" onClick={() => { play(track, index); }}>
								<img loading="lazy" className="h-12 w-12 flex-none rounded-md bg-zinc-50" src={track?.album?.cover_small} alt="" />
								<div className="min-w-0 flex-auto">
									<p className="text-md font-bold leading-6 text-zinc-900 dark:text-zinc-200">
										{track?.title}
									</p>
									<p className="mt-1 truncate text-sm leading-5 text-zinc-500 dark:text-zinc-400">
										{track?.artist?.name}
									</p>
								</div>
							</div>
							<div className="shrink-0 flex flex-col items-end h-full">
								<Menu as='div' className="relative inline-block text-left">
									<Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
										<EllipsisHorizontalIcon className="m-0.5 h-8 w-8" aria-hidden="true"></EllipsisHorizontalIcon>
									</Menu.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items style={{ zIndex: 1000 }} className="absolute right-0 mt-2 w-56 origin-top-right divide-y light:divide-zinc-100 rounded-md bg-white dark:bg-zinc-900 dark:text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<div className="px-1 py-1">
												<Menu.Item>
													<a href='#' className='group flex w-full items-center rounded-md px-2 py-2 text-sm' onClick={() => { copy(track); }}>Copy Link</a>
												</Menu.Item>
												<Menu.Item>
													<a href='#' className='group flex w-full items-center rounded-md px-2 py-2 text-sm' onClick={() => { openModal(track); }}>Add to Playlist</a>
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</li>
					);
				})}
			</ul>
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
										Add to Playlist
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-zinc-500 dark:text-zinc-400">
											Please select which playlist you would like to add this song to.
										</p>
									</div>

									{playlists && playlists?.length > 0 && playlists.map((playlist, index) => {
										return (
											<div className="mt-2 w-full" key={index}>
												<button
													type="button"
													className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-blue-900 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
													onClick={() => { addToPlaylist(playlist); }}
												>
													{playlist.name}
												</button>
											</div>
										);
									})}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}