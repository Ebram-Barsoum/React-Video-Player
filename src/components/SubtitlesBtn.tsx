import { useState, type JSX } from "react";
import { Captions } from "lucide-react";

import ControlBtn from "./ControlBtn";

interface SubtitlesBtnProps {
    currentSubtitles: File | null;
    onSelectSubtitlesFile: (subtitles: File) => void;
}

export default function SubtitlesBtn({ currentSubtitles, onSelectSubtitlesFile }: SubtitlesBtnProps): JSX.Element {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div className="relative">
            <ControlBtn
                label="subtitles"
                title="subtitles"
                onClick={() => setShowMenu((prev) => !prev)}
                icon={<Captions size={24} className="mt-1" />}
            />

            {
                showMenu &&
                <div className="w-60 absolute bottom-9 right-0 z-100! p-4 rounded-lg text-black bg-white/90 backdrop-blur-sm border-b-gray-300">
                    {currentSubtitles &&
                        <p className="text-black w-full text-xs font-medium line-clamp-2">
                            Current File :
                            {currentSubtitles?.name}
                        </p>
                    }

                    <label htmlFor="subtitles" className="mt-2">
                        <span className="cursor-pointer text-sm">Choose Subtitles File</span>
                        <input
                            id="subtitles"
                            type="file"
                            accept=".vtt"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onSelectSubtitlesFile(file)
                            }}
                            className="hidden"
                        />
                    </label>
                </div>
            }
        </div>
    )
}
