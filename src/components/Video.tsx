import type { JSX } from "react";

interface VideoProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    isMuted: boolean;
    videoUrl: string;
    aspect: string;
    repeat: boolean;
    onDurationChange: (duration: number) => void;
    onToggleVideo: () => void;
}

export default function Video({ videoRef, isMuted, videoUrl, aspect, repeat, onDurationChange, onToggleVideo }: VideoProps): JSX.Element {

    return (
        <video
            src={videoUrl || ""}
            ref={videoRef}
            onEnded={(e) => {
                e.currentTarget.currentTime = 0;

                if (!repeat) onToggleVideo();
            }}
            onLoadedMetadata={(e) => onDurationChange(e.currentTarget.duration)}
            muted={isMuted}
            className="absolute left-0 top-0 w-full h-full"
            style={{
                width: "100%",
                height: "100%",
                objectFit: aspect as React.CSSProperties['objectFit'],
            }}
        />
    )
}
