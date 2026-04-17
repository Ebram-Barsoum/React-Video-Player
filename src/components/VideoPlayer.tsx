import type { JSX } from "react";
import useVideoState from "../hooks/useVideoState";

import TopBar from "./TopBar";
import Video from "./Video";
import VideoSelector from "./VideoSelector";
import VideoControllers from "./VideoControllers";

export default function VideoPlayer(): JSX.Element {
    const {
        state,
        containerRef,
        videoRef,
        handleToggleControls,
        handleRemoveVideo,
        handleTimeUpdate,
        handleVolumeChange,
        handleToggleVideo,
        handleDurationChange,
        handleAddVideo,
        handleSkipSeconds,
        handleSpeedChange,
        handleAspectChange,
        handleRepeatVideo,
        handleMuteToggle,
        handleToggleFullscreen
    } = useVideoState();

    const { video, videoUrl, aspect, repeat, isMuted } = state;

    return (
        <div
            ref={containerRef}
            onMouseLeave={() => handleToggleControls(false)}
            onMouseEnter={() => handleToggleControls(true)}
            className="relative w-[80%] h-137.5 flex items-center justify-center text-white border-2 border-gray-600 rounded-lg overflow-hidden"

        >
            <TopBar videoState={state} onRemoveVideo={handleRemoveVideo} />

            {(video && videoUrl) && <Video
                videoUrl={videoUrl}
                isMuted={isMuted}
                aspect={aspect}
                repeat={repeat}
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                onDurationChange={handleDurationChange}
                onToggleVideo={handleToggleVideo}
            />}

            <VideoSelector videoUrl={videoUrl} onSelectVide={handleAddVideo} />

            <VideoControllers
                state={state}
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                onTimeUpdate={handleTimeUpdate}
                onSkipSeek={handleSkipSeconds}
                onToggleMute={handleMuteToggle}
                onToggleVideo={handleToggleVideo}
                onVolumeChange={handleVolumeChange}
                onSpeedChange={handleSpeedChange}
                onToggleRepeat={handleRepeatVideo}
                onToggleFullScreen={handleToggleFullscreen}
                onAspectChange={handleAspectChange}
            />
        </div>
    )
}
