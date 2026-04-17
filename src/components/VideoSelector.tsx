import type { JSX } from "react";
import { Upload } from "lucide-react";

interface VideoSelectorProps {
    videoUrl: string | null;
    onSelectVide: (video: File) => void;
}

export default function VideoSelector({ videoUrl, onSelectVide }: VideoSelectorProps): JSX.Element | null {
    if (videoUrl) return null;

    return (
        <label htmlFor="video-selector" className="cursor-pointer flex flex-col gap-4 items-center justify-center text-gray-600">
            <input
                type="file"
                accept="video/*"
                multiple={false}
                onChange={(e) => onSelectVide(e.target.files![0])}
                id="video-selector"
                className="hidden"
            />

            <span className='flex items-center justify-center h-12 w-12 border rounded-full'>
                <Upload />
            </span>

            <p> Drop video here or click to browse</p>
        </label>
    )
}
