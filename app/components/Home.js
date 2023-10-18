'use client';

import Image from "next/image";

export default function Homepage() {
	return (
		<>
			<div className="overflow-hidden bg-transparent py-10 sm:py-10">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
						<div className="lg:pr-8 lg:pt-4">
							<div className="lg:max-w-lg">
								<h2 className="text-base font-semibold leading-7 text-blue-600">
									Introducing...
								</h2>
								<p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
									Inspare Music
								</p>
								<p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
									Your private, easy, and free to use music streaming application with
									over 100 million songs.
								</p>
								<dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-zinc-600 dark:text-zinc-400 lg:max-w-none">
									<div className="relative pl-9">
										<dt className="inline font-semibold text-zinc-900 dark:text-white">
											<svg
												className="absolute left-1 top-1 h-5 w-5 text-blue-600"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
													clipRule="evenodd"
												/>
											</svg>
											Easy to Use
										</dt>
										<dd className="inline">
											&nbsp;Inspare Music is designed to be incredibly easy to use.
										</dd>
									</div>
									<div className="relative pl-9">
										<dt className="inline font-semibold text-zinc-900 dark:text-white">
											<svg
												className="absolute left-1 top-1 h-5 w-5 text-blue-600"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
													clipRule="evenodd"
												/>
											</svg>
											Private and Secure
										</dt>
										<dd className="inline">
										&nbsp;Your data is stored safe and sound on Inspare servers. We also
											allow self-hosting.
										</dd>
									</div>
									<div className="relative pl-9">
										<dt className="inline font-semibold text-zinc-900 dark:text-white">
											<svg
												className="absolute left-1 top-1 h-5 w-5 text-blue-600"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
												<path
													fillRule="evenodd"
													d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
													clipRule="evenodd"
												/>
											</svg>
											Fast
										</dt>
										<dd className="inline">
										&nbsp;Inspare clients are optimized to run at their very best on any
											device or network.
										</dd>
									</div>
								</dl>
							</div>
						</div>
						<div className="relative mx-auto border-black dark:border-black bg-black border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
							<div className="w-[148px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute" />
							<div className="h-[46px] w-[3px] bg-black absolute -left-[17px] top-[124px] rounded-l-lg" />
							<div className="h-[46px] w-[3px] bg-black absolute -left-[17px] top-[178px] rounded-l-lg" />
							<div className="h-[64px] w-[3px] bg-black absolute -right-[17px] top-[142px] rounded-r-lg" />
							<div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-black">
								<Image
									src="/hero.png"
									className="w-[272px] h-[572px]"
									width='272'
									height='572'
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
