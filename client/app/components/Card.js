export default function Card({ title, subtitle, img }) {
	return (
		<div className="max-w-sm mr-3 bg-zinc-100 light:border border-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md shadow dark:bg-zinc-900 h-full transition-colors min-w-[calc(140px+2rem)] md:min-w-[calc(160px+2rem)]">
			<div className="p-4">
				<img
					className="rounded-md w-full"
					src={img}
					alt=""
					loading="lazy"
				/>
				<h5
					className="mt-4 mb-1 font-bold tracking-tight text-zinc-900 dark:text-white"
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical"
					}}
				>
					{title}
				</h5>
				{subtitle && <p className="mb-2 text-sm tracking-tight text-zinc-600 dark:text-zinc-400" style={{
					overflow: "hidden",
					textOverflow: "ellipsis",
					display: "-webkit-box",
					WebkitLineClamp: 2,
					WebkitBoxOrient: "vertical"
				}}>
					{subtitle}
				</p>}
			</div>
		</div>
	);
}