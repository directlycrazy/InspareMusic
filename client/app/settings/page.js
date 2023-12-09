'use client';

import { DocumentCheckIcon } from "@heroicons/react/24/solid";

export default function Settings() {
	return (
		<div className="md:grid grid-cols-2">
			<div
				href="#"
				className="block w-full p-6 bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-800"
			>
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
					Inspare Music
				</h5>
				<p className="mt-2 mb-2 opacity-50">
					Your private, easy, and free to use music streaming application with over
					100 million songs.
				</p>
				<div className="col-span-full">Version 1.0.0</div>
			</div>
			<div
				href="#"
				className="block w-full p-6 bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-800 md:ml-3 mt-5 md:mt-0"
			>
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
					Settings
				</h5>
				<div className="sm:col-span-3 mt-3">
					<label
						htmlFor="country"
						className="block text-sm font-medium leading-6 text-zinc-900 dark:text-white"
					>
						Quality
					</label>
					<div className="mt-2">
						<select
							defaultValue={3}
							className="block w-full rounded-md border-0 p-2 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						>
							<option value={1}>128kbps (MP3)</option>
							<option value={3}>
								320kbps (MP3)
							</option>
							<option value={9}>1411kbps (FLAC)</option>
						</select>
					</div>
				</div>
				<button
					type="button"
					className="selected-page mt-4 rounded-md p-2.5 text-zinc-700 dark:text-white"
					onClick={save}
					style={{ width: 90 }}
				>
					<span className="sr-only">Close menu</span>
					<DocumentCheckIcon className="h-6 w-6 mr-2"></DocumentCheckIcon>
					Save
				</button>
			</div>
		</div>
	);
}