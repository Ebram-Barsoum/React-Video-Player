import type { JSX } from "react";

interface ControlBtnProps {
    title: string;
    label: string;
    onClick: () => void;
    icon: JSX.Element;
    className?: string;
}

const controlBtnStyle = "cursor-pointer transition duration-300 active:scale-90 focus:outline-none";

export default function ControlBtn({ title, label, onClick, icon, className }: ControlBtnProps): JSX.Element {
    return (
        <button
            type='button'
            title={title}
            aria-label={label}
            onClick={onClick}
            onMouseUp={(e) => e.currentTarget.blur()}
            className={`${controlBtnStyle} ${className || ''}`}
        >
            {icon}
        </button >
    )
}
