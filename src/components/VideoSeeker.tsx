/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type JSX } from "react";
import Slider from "./Slider";
import { formatDuration } from "../utls/healpers";

interface VideoSeekerProps {
    videoRef: React.RefObject<HTMLVideoElement>
    duration: number,
    currentTime: number,
    showControls: boolean
    onTimeUpdate: (value: number) => void
}

export default function VideoSeeker({ currentTime, duration, videoRef, showControls, onTimeUpdate }: VideoSeekerProps): JSX.Element {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !showControls) return;

        const handleTimeUpdate = () => setTime(video.currentTime);

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }, [videoRef?.current, showControls]);

    useEffect(() => {
        setTime(currentTime);
    }, [currentTime]);

    return (
        <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2'>
            <span className='text-xs'>{formatDuration(Math.floor(time))}</span>

            <Slider
                title="seek video"
                label="seek-video"
                min={0}
                max={duration}
                value={time}
                onChange={(value) => onTimeUpdate(value)}
                className="w-full h-1 rounded-lg cursor-pointer focus:outline-none"
            />

            <span className='text-xs'>{formatDuration(Math.round(duration))}</span>
        </div>
    )
}
