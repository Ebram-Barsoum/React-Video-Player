import { type JSX } from "react";
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
        handlePlayVideo,
        handlePauseVideo,
        handleDurationChange,
        handleAddVideo,
        handleSkipSeconds,
        handleSpeedChange,
        handleAspectChange,
        handleRepeatVideo,
        handleMuteToggle,
        handleToggleFullscreen,
        handleAddSubtitles
    } = useVideoState();

    const { video, videoUrl, subtitlesUrl, aspect, repeat, isMuted } = state;

    return (
        <div
            ref={containerRef}
            onMouseLeave={() => handleToggleControls(false)}
            onMouseEnter={() => handleToggleControls(true)}
            className="relative w-[95%] h-[95%] flex items-center justify-center text-white border-2 border-gray-600 rounded-lg overflow-hidden"

        >
            <TopBar videoState={state} onRemoveVideo={handleRemoveVideo} />

            {(video && videoUrl) && <Video
                videoUrl={videoUrl}
                subtitlesUrl={subtitlesUrl}
                isMuted={isMuted}
                aspect={aspect}
                repeat={repeat}
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                onDurationChange={handleDurationChange}
                handlePlayVideo={handlePlayVideo}
                handlePauseVideo={handlePauseVideo}
                handleTimeUpdate={handleTimeUpdate}
            />}

            <VideoSelector videoUrl={videoUrl} onSelectVide={handleAddVideo} />

            <VideoControllers
                state={state}
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                onTimeUpdate={handleTimeUpdate}
                onSkipSeek={handleSkipSeconds}
                onToggleMute={handleMuteToggle}
                handlePlayVideo={handlePlayVideo}
                handlePauseVideo={handlePauseVideo}
                onVolumeChange={handleVolumeChange}
                onSpeedChange={handleSpeedChange}
                onToggleRepeat={handleRepeatVideo}
                onToggleFullScreen={handleToggleFullscreen}
                onAspectChange={handleAspectChange}
                onAddSubtitles={handleAddSubtitles}
            />
        </div>
    )
}
