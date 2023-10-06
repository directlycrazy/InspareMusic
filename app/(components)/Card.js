export default function Card({ title, subtitle, img }) {
	return (
		<div className="max-w-sm mr-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700 h-full">
			<img
				className="rounded-lg w-full"
				src={img}
				alt=""
				style={{ minWidth: 130 }}
			/>
			<div className="p-5">
				<h5
					className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical"
					}}
				>
					{title}
				</h5>
				{subtitle && <p className="mb-2 tracking-tight text-gray-600 dark:text-zinc-400">
					{subtitle}
				</p>}
			</div>
		</div>
	);
}