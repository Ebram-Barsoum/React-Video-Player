import type { JSX } from "react";

interface VideoProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    isMuted: boolean;
    videoUrl: string;
    subtitlesUrl: string | null;
    aspect: string;
    repeat: boolean;
    onDurationChange: (duration: number) => void;
    handlePlayVideo: () => void;
    handlePauseVideo: () => void;
    handleTimeUpdate: (time: number) => void;
}

export default function Video({
    videoRef,
    isMuted,
    videoUrl,
    subtitlesUrl,
    aspect,
    repeat,
    onDurationChange,
    handlePlayVideo,
    handlePauseVideo,
    handleTimeUpdate
}: VideoProps): JSX.Element {
    return (
        <video
            src={videoUrl || ""}
            ref={videoRef}
            onEnded={() => {
                handleTimeUpdate(0);

                if (repeat) handlePlayVideo();
                else handlePauseVideo();
            }}
            onLoadedMetadata={(e) => {
                onDurationChange(e.currentTarget.duration);
            }}
            muted={isMuted}
            className="absolute left-0 top-0 w-full h-full"
            style={{
                width: "100%",
                height: "100%",
                objectFit: aspect as React.CSSProperties["objectFit"],
            }}
        >
            {
                subtitlesUrl &&
                <track
                    kind="subtitles"
                    src={subtitlesUrl}
                    default
                />
            }
        </video>
    );
}
