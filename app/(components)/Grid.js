import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { set } from '../(stores)/playerSlice';

export default function Grid(props) {
	const dispatch = useDispatch();
	function play(track, index) {
		dispatch(set(track));
	}
	let tracks = props.tracks;
	return (
		<ul role="list" className="divide-y divide-gray-100 dark:divide-zinc-800 mt-5">
			{tracks && (tracks?.length > 0) && tracks.map((track, index) => {
				return (
					<li
						key={index}
						onClick={() => { play(track, index); }}
						className="flex justify-between gap-x-6 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer hover:shadow-inner p-2"
					>
						<div className="flex min-w-0 gap-x-4 w-full">
							<img loading="lazy" className="h-12 w-12 flex-none rounded-md bg-gray-50" src={track?.album?.cover_small} alt="" />
							<div className="min-w-0 flex-auto">
								<p className="text-md font-bold leading-6 text-gray-900 dark:text-gray-200">
									{track?.title}
								</p>
								<p className="mt-1 truncate text-sm leading-5 text-gray-500 dark:text-gray-400">
									{track?.artist?.name}
								</p>
							</div>
						</div>
						<div className="shrink-0 flex flex-col items-end h-full">
							<Menu as='div' className="relative inline-block text-left">
								<Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
									<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="px-1 py-1">
											<Menu.Item>
												<a href='#' className='text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'>Copy Link</a>
											</Menu.Item>
											<Menu.Item>
												<a href='#' className='text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'>Add to Playlist</a>
											</Menu.Item>
											<Menu.Item>
												<a href='/' className='text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'>Favourite</a>
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
	);
}