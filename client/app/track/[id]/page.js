import Track from "./Track";

export async function generateMetadata({ params, searchParams }, parent) {
	const id = params.id;
	const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/${id}`).then((res) => res.json());

	return {
		title: `${data?.title} on Inspare Music`,
		description: `${data?.title} by ${data?.artist?.name}`,
		themeColor: '#4338ca',
		openGraph: {
			images: data?.album?.cover_medium
		}
	};
}

export default function track({ params }) {
	return (
		<Track params={params}></Track>
	);
}