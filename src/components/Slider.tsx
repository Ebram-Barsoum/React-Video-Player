import type { JSX } from "react";

interface SliderProps {
    title: string;
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    className?: string;
}

export default function Slider({ title, label, min, max, value, onChange, className }: SliderProps): JSX.Element {
    return (
        <input
            type="range"
            title={title}
            aria-label={label}
            min={min}
            max={max}
            value={value}
            step={0.1}
            onChange={(e) => onChange(e.target.valueAsNumber)}
            onMouseUp={(e) => e.currentTarget.blur()}
            className={`${className || 'accent-pink-500! '}`}

        />
    )
}
