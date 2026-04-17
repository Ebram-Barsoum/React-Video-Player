export function formatDuration(seconds: number): string {
    let h = 0, min = 0, sec = 0;

    h = Math.floor(seconds / 3600);
    min = Math.floor((seconds % 3600) / 60);
    sec = Math.floor(seconds % 60);

    if (h > 0) return `${h < 10 ? `0${h}` : h}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;

    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
}