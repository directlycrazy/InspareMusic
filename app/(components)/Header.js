import {PlayIcon, ArrowsRightLeftIcon} from '@heroicons/react/24/solid'

export default function Header({img, title, type, artist, subtitle}) {
	return (
		<>
			<div>
				<img className="blurred" src={img} />
				<div
					className="md:flex border-b dark:border-zinc-700 pb-5 items-end text-center md:text-left"
					style={{ marginTop: "-200px" }}
				>
					<img
						src={img}
						alt=""
						className="max-w-xs rounded-2xl drop-shadow-2xl inline-block"
						style={{ maxWidth: 232 }}
					/>
					<div className="inline-block md:ml-5">
						<p className="text-gray-300 relative">
							{type}
						</p>
						<h1 className="font-black text-4xl mb-1 lg:text-8xl relative text-black dark:text-white">
							{title}
						</h1>
						<p className="text-gray-400 dark:text-gray-200 mb-1 ellipsis max-w-xs md:max-w-none">
							{artist} &bull; {subtitle}
						</p>
					</div>
				</div>
			</div>
			<div className="mt-5">
				<button
					type="button"
					style={{ height: 60, width: 60 }}
					className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					<PlayIcon className="m-0.5 h-8 w-8"></PlayIcon>
				</button>
				<button
					type="button"
					style={{ height: 60, width: 60 }}
					className="inline-flex items-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-600 px-3 py-2 text-sm font-semibold text-black dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					<ArrowsRightLeftIcon className="m-0.5 h-8 w-8"></ArrowsRightLeftIcon>
				</button>
			</div>
		</>
	);
}