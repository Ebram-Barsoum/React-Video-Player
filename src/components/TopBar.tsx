import type { JSX } from "react";
import { SquareX } from "lucide-react";

import ControlBtn from "./ControlBtn";
import type { VideoState } from "../hooks/useVideoState";

interface TopBarProps {
    videoState: VideoState;

    onRemoveVideo: () => void
}

export default function TopBar({ videoState, onRemoveVideo }: TopBarProps): JSX.Element | null {
    const { video, showControls } = videoState;

    if (!video || !showControls) return null;

    return (
        <div className='absolute top-0 left-0 right-0 z-2 px-4 py-2 flex items-center justify-between bg-white/24 backdrop-blur-sm border-b-gray-300'>
            <p>{video?.name}</p>
            <ControlBtn
                title="close video"
                label="close-video"
                onClick={onRemoveVideo}

                icon={<SquareX />}
            />
        </div>
    )
}
