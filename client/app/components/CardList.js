export default function CardList({ children }) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
			{children}
		</div>
	);
}