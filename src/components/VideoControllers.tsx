import type { JSX } from "react";
import { CircleMinus, CirclePlay, CirclePlus, Maximize, Minimize, PauseOctagon, Proportions, Repeat, Repeat1, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react";

import type { VideoState } from "../hooks/useVideoState";

import Slider from "./Slider";
import ControlBtn from "./ControlBtn";
import VideoSeeker from "./VideoSeeker";

interface VideoControllersProps {
    state: VideoState;
    videoRef: React.RefObject<HTMLVideoElement>;
    onTimeUpdate: (time: number) => void;
    onToggleVideo: () => void;
    onSkipSeek: (direction: "forward" | "backward") => void;
    onToggleMute: () => void;
    onVolumeChange: (volume: number) => void;
    onSpeedChange: (type: "inc" | "dec") => void;
    onToggleRepeat: () => void;
    onToggleFullScreen: () => void;
    onAspectChange: () => void;
}

export default function VideoControllers({ state, videoRef, onTimeUpdate, onSkipSeek, onToggleMute, onToggleVideo, onVolumeChange, onSpeedChange, onToggleRepeat, onToggleFullScreen, onAspectChange }: VideoControllersProps): JSX.Element | null {
    const {
        video,
        showControls,
        currentTime,
        volume,
        maximized,
        speed,
        isMuted,
        duration,
        repeat,
        isPaused
    } = state as VideoState;



    if (!showControls || !video) return null;

    return (
        <div className="w-full absolute bottom-0 left-0 flex flex-col gap-4 p-4 bg-white/24 backdrop-blur-md">
            <VideoSeeker
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                duration={duration}
                currentTime={currentTime}
                showControls={showControls}
                onTimeUpdate={onTimeUpdate}
            />

            <div className='flex items-center justify-between sm:gap-6'>
                <div className="flex items-center gap-2 sm:gap-4">
                    <ControlBtn
                        title="skip 10 seconds backward"
                        label="skip 10 seconds backward"
                        onClick={() => onSkipSeek("backward")}
                        icon={<RotateCcw size={16} />}
                    />

                    <ControlBtn
                        title="play/pause video"
                        label="video-toggler"
                        onClick={onToggleVideo}
                        icon={isPaused ? <CirclePlay /> : <PauseOctagon />}
                    />

                    <ControlBtn
                        title="skip 10 seconds forward"
                        label="skip 10 seconds forward"
                        onClick={() => onSkipSeek("forward")}
                        icon={<RotateCw size={16} />}
                    />

                    <div className="flex items-center gap-2">
                        <ControlBtn
                            title={isMuted ? "unmute" : "mute"}
                            label="mute toggler button"
                            onClick={onToggleMute}
                            icon={isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        />

                        <Slider
                            title="volume slider"
                            label="volume slider"
                            min={0}
                            max={1}
                            value={volume}
                            onChange={onVolumeChange}
                            className="w-24 cursor-pointer hidden focus:outline-none sm:flex"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className='flex items-center gap-2'>
                        <ControlBtn
                            title="speed-down"
                            label="speed down button"
                            className={`flex items-center gap-1 text-xs`}
                            onClick={() => onSpeedChange("dec")}
                            icon={<CircleMinus size={20} />}
                        />

                        <span className='text-sm'>
                            {speed.toFixed(2).replace(/\.?0+$/, '')}X
                        </span>

                        <ControlBtn
                            title="speed-up"
                            label="speed up button"
                            className={`flex items-center gap-1 text-xs`}
                            onClick={() => onSpeedChange("inc")}
                            icon={<CirclePlus size={20} />}
                        />
                    </div>

                    <ControlBtn
                        title="aspect"
                        label="aspect ratio"
                        onClick={onAspectChange}
                        icon={<Proportions size={20} />}
                    />

                    <ControlBtn
                        title="repeat"
                        label="repeat video"
                        onClick={onToggleRepeat}
                        icon={repeat ? <Repeat1 size={20} /> : <Repeat size={20} />}
                    />

                    <ControlBtn
                        title="fullscreen"
                        label="fullscreen"
                        onClick={onToggleFullScreen}
                        icon={
                            maximized
                                ? <Minimize size={20} />
                                : <Maximize size={20} />
                        }
                    />
                </div>
            </div>
        </div>
    )
}