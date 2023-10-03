'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { HomeIcon, MagnifyingGlassIcon, RocketLaunchIcon, Squares2X2Icon, CogIcon, UserIcon, PlayIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Player from './Player';
import store from './store';
import { Provider } from 'react-redux';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
	const links = [
		['Home', '/', <HomeIcon className="-ml-0.5 mr-1.5 h-5 w-5"></HomeIcon>],
		['Search', '/search', <MagnifyingGlassIcon className="-ml-0.5 mr-1.5 h-5 w-5"></MagnifyingGlassIcon>],
		['Discover', '/discover', <RocketLaunchIcon className="-ml-0.5 mr-1.5 h-5 w-5"></RocketLaunchIcon>],
		['Playlists', '/playlists/', <Squares2X2Icon className="-ml-0.5 mr-1.5 h-5 w-5"></Squares2X2Icon>],
		['Settings', '/settings', <CogIcon className="-ml-0.5 mr-1.5 h-5 w-5"></CogIcon>]
	];

	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider store={store}>
					<main className="flex flex-col h-screen z-10 dark:text-white">
						<header
							className="bg-white dark:bg-zinc-800 border-b dark:border-zinc-700 w-full justify-end fixed right-0"
							style={{ zIndex: 100, WebkitAppRegion: "drag" }}
						>
							<nav
								className="mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8"
								aria-label="Global"
							>
								<div className="flex lg:hidden">
									<button
										type="button"
										className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"

									>
										<span className="sr-only">Open main menu</span>
										<Bars3Icon className="h-6 w-6" aria-hidden="true"></Bars3Icon>
									</button>
								</div>
								<div className="hidden lg:flex lg:flex-1 lg:justify-end">
									<a href="#" id='global_back_button' className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">
										Back
									</a>
								</div>
							</nav>
							{/* {#if mobileMenuOpen}
				<div class="lg:hidden" on:close={setMobileMenuOpen}>
					<div class="fixed inset-0 z-10" />
					<div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-zinc-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div class="flex items-center justify-between">
							<a href="#" class="-m-1.5 p-1.5">
								<Icon src={Play} class='h-8 w-auto text-black dark:text-white'></Icon>
							</a>
							<button
								type="button"
								class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
								on:click={() => setMobileMenuOpen()}
							>
								<span class="sr-only">Close menu</span>
								<Icon src={XMark} class="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div class="mt-6 flow-root">
							<div class="-my-6 divide-y divide-gray-500/10">
								<div class="space-y-2 py-6">
									{#each links as link, index}
									<a
										on:click={() => setMobileMenuOpen()}
										href={link[1]}
										class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700"
									>
										{link[0]}
									</a>
									{/each}
								</div>
								<div class="py-6">
									<a
										href="#"
										on:click={login}
										class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700"
									>
										{username}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if} */}
						</header>
						<div className="flex flex-row h-full">
							<aside
								className="w-1/8 overflow-y-auto border-r bg-white dark:border-zinc-700 dark:bg-zinc-800 text-black dark:text-white invisible fixed md:static md:visible z-1000"
								style={{ width: 300, zIndex: 100 }}
							>
								<div className="mt-10 ml-5 mr-5">
									<div className="flex lg:flex-1">
										<Link href="/" className="ml-5">
											<span className="sr-only">Inspare Music</span>
											<PlayIcon className='h-8 w-auto'></PlayIcon>
										</Link>
									</div>
									<div className="mt-12">
										{links.map((link, index) => {
											return (
												<Link key={index} type='button' href={link[1]} className='sidebar-btn'>
													{link[2]}
													&nbsp;
													{link[0]}
												</Link>
											);
										})}
										{/* {#each links as link, index}
						<a
							type="button"
							href={link[1]}
							class={$page.url.pathname === link[1] ? 'selected-page' : 'sidebar-btn'}
						>
							<Icon src={link[2]} aria-hidden="true" />
							{link[0]}
						</a>
						{/each} */}
									</div>
									<div className="absolute bottom-0 left-0 ml-5 mb-20">
										<button
											type="button"
											className="inline-flex items-center rounded-md w-full bg-transparent mb-2 px-3 py-2 text-sm font-semibold text-black dark:text-white shadow-sm"

										>
											<UserIcon className="-ml-0.5 mr-1.5 h-5 w-5"></UserIcon>
											&nbsp;
											Username
										</button>
									</div>
								</div>
							</aside>
							<main
								className="w-full overflow-y-auto bg-white dark:bg-zinc-900 mb-20"
								style={{ marginTop: 72, zIndex: 10 }}
							>
								<div className='p-5 md:p-10'>
									{children}
								</div>
							</main>
						</div>
						<div
							className="bg-white w-full dark:bg-zinc-800 border-t dark:border-zinc-700 fixed bottom-0"
							style={{ zIndex: 1000 }}
						>
							<Player></Player>
						</div>
					</main>
				</Provider>
			</body>
		</html>
	);
}
