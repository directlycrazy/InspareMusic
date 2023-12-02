'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { HomeIcon, MagnifyingGlassIcon, RocketLaunchIcon, Squares2X2Icon, CogIcon, UserIcon, PlayIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Player from './components/Player';
import store from './store';
import { Provider } from 'react-redux';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
	const [username, setUsername] = useState('Log In');
	const [menuOpen, setMenuOpen] = useState(false);

	const pb = new PocketBase(process.env.NEXT_PUBLIC_PB);

	async function login() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
		setUsername(pb.authStore.model.username);
	}

	useEffect(() => {
		const setup = async () => {
			if (!pb.authStore.isValid) return;
			setUsername(pb.authStore.model.username);
		};
		setup();
	}, []);

	const links = [
		['Home', '/', <HomeIcon className="-ml-0.5 mr-1.5 h-5 w-5"></HomeIcon>],
		['Search', '/search', <MagnifyingGlassIcon className="-ml-0.5 mr-1.5 h-5 w-5"></MagnifyingGlassIcon>],
		['Discover', '/discover', <RocketLaunchIcon className="-ml-0.5 mr-1.5 h-5 w-5"></RocketLaunchIcon>],
		['Playlists', '/playlists/', <Squares2X2Icon className="-ml-0.5 mr-1.5 h-5 w-5"></Squares2X2Icon>],
		['Settings', '/settings', <CogIcon className="-ml-0.5 mr-1.5 h-5 w-5"></CogIcon>]
	];

	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
				/>
				<link rel="manifest" href="/manifest.json" />
				<link rel="shortcut icon" type="image/png" href="/img/logo_large.png" />
				<link rel="apple-touch-icon" href="/img/logo_large.png" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-title" content="Inspare Music" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splashscreens/iPhone_14_Pro_Max_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splashscreens/iPhone_14_Pro_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/iPhone_11__iPhone_XR_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/12.9__iPad_Pro_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/10.9__iPad_Air_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/10.5__iPad_Air_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/10.2__iPad_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splashscreens/8.3__iPad_Mini_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splashscreens/iPhone_14_Pro_Max_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splashscreens/iPhone_14_Pro_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/iPhone_11__iPhone_XR_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/12.9__iPad_Pro_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/10.9__iPad_Air_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/10.5__iPad_Air_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/10.2__iPad_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splashscreens/8.3__iPad_Mini_portrait.png"
				/>
				<meta name="theme-color" content="#18181b" />
				<meta name="color-scheme" content="light dark" />
			</head>
			<body className={inter.className}>
				<Provider store={store}>
					<main className="flex flex-col h-screen z-10 dark:text-white">
						<header
							className="bg-zinc-50 dark:bg-zinc-900 border-b dark:border-zinc-800 w-full justify-end fixed right-0"
							style={{ zIndex: 100, WebkitAppRegion: "drag" }}
						>
							<nav
								className="mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8"
								aria-label="Global"
							>
								<div className="flex md:hidden">
									<button
										type="button"
										className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700 dark:text-zinc-300"
										onClick={() => { setMenuOpen(true); }}
									>
										<span className="sr-only">Open main menu</span>
										<Bars3Icon className="h-6 w-6" aria-hidden="true"></Bars3Icon>
									</button>
								</div>
								<div className="hidden md:flex md:flex-1 md:justify-end">
									<a id='global_back_button' className="text-sm invisible font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
										Back
									</a>
								</div>
							</nav>
							{menuOpen && <>
								<div className="lg:hidden">
									<div className="fixed inset-0 z-10">
										<div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-zinc-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-zinc-900/10">
											<div className="flex items-center justify-between">
												<Link href="/" className="-m-1.5 p-1.5">
													<PlayIcon className="h-8 w-auto text-black dark:text-white"></PlayIcon>
												</Link>
												<button
													type="button"
													className="-m-2.5 rounded-md p-2.5 text-zinc-700 dark:text-white"
													onClick={() => { setMenuOpen(false); }}
												>
													<span className="sr-only">Close menu</span>
													<XMarkIcon className="h-6 w-6"></XMarkIcon>
												</button>
											</div>
											<div className="mt-6 flow-root">
												<div className="-my-6 divide-y divide-zinc-500/10">
													<div className="space-y-2 py-6">
														{links.map((link, index) => {
															return (
																<Link key={index} onClick={() => { setMenuOpen(false); }} type='button' href={link[1]} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700">
																	{link[0]}
																</Link>
															);
														})}
													</div>
													<div className="py-6">
														<a
															href="#"
															className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700"
															onClick={login}
														>
															{username}
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>}
						</header>
						<div className="flex flex-row h-full">
							<aside
								className="w-1/8 overflow-y-auto border-r bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 text-black dark:text-white invisible fixed md:static md:visible z-1000"
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
									</div>
									<div className="absolute bottom-0 left-0 ml-5 mb-20">
										<button
											type="button"
											className="inline-flex items-center rounded-md w-full bg-transparent mb-2 px-3 py-2 text-sm font-semibold text-black dark:text-white"
											onClick={login}
										>
											<UserIcon className="-ml-0.5 mr-1.5 h-5 w-5"></UserIcon>
											&nbsp;
											{username}
										</button>
									</div>
								</div>
							</aside>
							<main
								className="w-full overflow-y-auto bg-white dark:bg-zinc-950 mb-20"
								style={{ marginTop: 72, zIndex: 10 }}
							>
								<div className='p-5 md:p-10'>
									{children}
								</div>
							</main>
						</div>
						<div
							className="bg-white w-full dark:bg-zinc-900 border-t dark:border-zinc-800 fixed bottom-0"
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
