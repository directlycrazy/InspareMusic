import mergeImages from "merge-images";

export default async function (tracks) {
    let merge = [];
    tracks.forEach((track, index) => {
        if (track?.title && !track?.data) track.data = track;
        let src = track?.data?.album?.cover_medium || track?.data?.thumbnails?.[0]?.url;
        if (index >= 4) return;
        //first, third values stay on the left
        let x = (index === 0 || index === 2) ? 0 : 250;
        //first, second values stay on top
        let y = index < 2 ? 0 : 250;
        merge.push({ src: `https://music-proxy.inspare.cc/image?q=${src}`, x: x, y: y });
    });
    let res = await mergeImages(merge, {
        height: 500,
        width: 500,
        crossOrigin: "anonymous"
    });
    return res;
}