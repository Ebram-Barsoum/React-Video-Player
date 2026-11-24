import { useEffect, useReducer, useRef } from "react";

export interface VideoState {
    video: File | null;
    videoUrl: string | null;
    subtitles: File | null;
    subtitlesUrl: string | null;
    duration: number;
    showControls: boolean;
    volume: number;
    isPaused: boolean;
    isMuted: boolean;
    repeat: boolean;
    currentTime: number;
    maximized: boolean;
    speed: number;
    aspect: string
}

type VideoAction = "VIDEO/ADDED" | "VIDEO/REMOVED" | "SUBTITLES/ADDED" | "SUBTITLES/REMOVED" | "TOGGLE_CONTROLS" | "VOLUME/CHANGED" | "DURATION/SET" |
    "PLAY" | "PAUSE" | "TIME/UPDATED" | "TOGGLE_FULLSCREEN" | "TOGGLE_REPEAT" |
    "ASPECT/CHANGED" | "SPEED/CHANGED" | "TOGGLE_MUTE" | "RESET";

interface Action {
    type: VideoAction;
    payload?: {
        video?: File;
        subtitles?: File;
        duration?: number;
        volume?: number;
        currentTime?: number;
        showControls?: boolean;
        maximized?: boolean,
        speed?: number;
        aspect?: string;
        isMuted?: boolean
    };
}

function reducer(state: VideoState, action: Action): VideoState {
    switch (action.type) {
        case "VIDEO/ADDED":
            return {
                ...state,
                video: action.payload?.video as File,
                videoUrl: action.payload?.video ? URL.createObjectURL(action.payload.video as File) : null
            };
        case "VIDEO/REMOVED":
            return initialState;
        case "SUBTITLES/ADDED":
            return {
                ...state,
                subtitles: action.payload?.subtitles as File,
                subtitlesUrl: action.payload?.subtitles ? URL.createObjectURL(action.payload.subtitles as File) : null
            };
        case "SUBTITLES/REMOVED":
            return {
                ...state,
                subtitles: null,
                subtitlesUrl: null
            };
        case "DURATION/SET":
            return { ...state, duration: action.payload?.duration as number };
        case "TOGGLE_CONTROLS":
            return { ...state, showControls: action.payload?.showControls as boolean };
        case "VOLUME/CHANGED":
            return { ...state, volume: action.payload?.volume as number };
        case "PLAY":
            return { ...state, isPaused: false };
        case "PAUSE":
            return { ...state, isPaused: true };
        case "TIME/UPDATED":
            return { ...state, currentTime: action.payload?.currentTime as number };
        case "TOGGLE_FULLSCREEN":
            return { ...state, maximized: action.payload?.maximized as boolean };
        case "SPEED/CHANGED":
            return { ...state, speed: action.payload?.speed as number };
        case "TOGGLE_MUTE":
            return { ...state, isMuted: !state.isMuted };
        case "TOGGLE_REPEAT":
            return { ...state, repeat: !state.repeat };
        case "ASPECT/CHANGED":
            return { ...state, aspect: action.payload?.aspect as string };
        case "RESET":
            return {
                ...state,
                showControls: true,
                repeat: false,
                volume: .5,
                isPaused: true,
                currentTime: 0,
                maximized: false,
                speed: 1,
                aspect: 'none'
            };
        default:
            return state;
    }
}

const addVideoAction = (video: File): Action => ({ type: "VIDEO/ADDED", payload: { video } });
const removeVideoAction = (): Action => ({ type: "VIDEO/REMOVED" });
const addSubtitlesAction = (subtitles: File): Action => ({ type: "SUBTITLES/ADDED", payload: { subtitles } });
const removeSubtitlesAction = (): Action => ({ type: "SUBTITLES/REMOVED" });
const setDurationAction = (duration: number): Action => ({ type: "DURATION/SET", payload: { duration } });
const toggleControlsAction = (showControls: boolean): Action => ({ type: "TOGGLE_CONTROLS", payload: { showControls } });
const changeVolumeAction = (volume: number): Action => ({ type: "VOLUME/CHANGED", payload: { volume } });
const playAction = (): Action => ({ type: "PLAY" });
const pauseAction = (): Action => ({ type: "PAUSE" });
const updateTimeAction = (currentTime: number): Action => ({ type: "TIME/UPDATED", payload: { currentTime } });
const toggleFullScreenAction = (maximized: boolean): Action => ({ type: "TOGGLE_FULLSCREEN", payload: { maximized } });
const changeSpeedAction = (speed: number): Action => ({ type: "SPEED/CHANGED", payload: { speed } });
const changeAspectAction = (aspect: string): Action => ({ type: "ASPECT/CHANGED", payload: { aspect } });
const toggleMuteAction = (): Action => ({ type: "TOGGLE_MUTE" });
const toggleRepeatAction = (): Action => ({ type: "TOGGLE_REPEAT" });
const resetAction = (): Action => ({ type: "RESET" });

const initialState: VideoState = {
    video: null,
    videoUrl: null,
    subtitles: null,
    subtitlesUrl: null,
    duration: 0,
    showControls: false,
    volume: .5,
    isPaused: true,
    isMuted: false,
    currentTime: 0,
    maximized: false,
    repeat: false,
    speed: 1,
    aspect: 'none'
};

const aspects = ['none', 'cover', 'contain', 'fill'];

export default function useVideoState() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { videoUrl, subtitlesUrl, volume, maximized, speed, aspect, isMuted, duration, isPaused } = state;

    const handlePlayVideo = () => {
        const video = videoRef?.current;
        if (!video) return;

        video.play();
        dispatch(playAction());
    }

    const handlePauseVideo = () => {
        const video = videoRef?.current;
        if (!video) return;

        video.pause();
        dispatch(pauseAction());
    }

    const handleSkipSeconds = (direction: "forward" | "backward") => {
        const video = videoRef?.current;
        if (!video) return;

        let time;
        if (direction === "forward") time = Math.min(video.currentTime + 10, duration);
        else time = Math.max(video.currentTime - 10, 0);

        video.currentTime = time;
        dispatch(updateTimeAction(time));
    }

    const handleVolumeChange = (volume: number) => {
        const video = videoRef?.current;
        if (!video) return;

        dispatch(changeVolumeAction(volume));
        video.volume = volume;
        video.muted = volume === 0;

        if (volume === 0 && !isMuted) dispatch(toggleMuteAction());
        if (volume > 0 && isMuted) dispatch(toggleMuteAction());
    }

    const handleMuteToggle = () => {
        const video = videoRef?.current;
        if (!video) return;

        video.muted = !isMuted;
        video.volume = !isMuted ? 0 : volume;
        dispatch(toggleMuteAction());
    }

    const handleTimeUpdate = (time: number) => {
        const video = videoRef?.current;
        if (!video) return;

        video.currentTime = time;
        dispatch(updateTimeAction(time));
    }

    const handleToggleFullscreen = () => {
        const container = containerRef?.current;
        if (!container) return;

        if (!maximized) {
            container.requestFullscreen();
            dispatch(toggleFullScreenAction(true));
        }
        else {
            document.exitFullscreen();
            dispatch(toggleFullScreenAction(false));
        }
    }

    const handleRepeatVideo = () => {
        const video = videoRef?.current;
        if (!video) return;

        video.loop = !video.loop;
        dispatch(toggleRepeatAction());
    }

    const handleSpeedChange = (type: "inc" | "dec") => {
        const video = videoRef?.current;
        if (!video) return;

        const newSpeed = type === "inc" ? Math.min(speed + .25, 3) : Math.max(speed - .25, .25);
        dispatch(changeSpeedAction(newSpeed));
        video.playbackRate = newSpeed;
    }

    const handleAspectChange = () => {
        const video = videoRef.current;
        if (!video) return;

        const newAspect = aspects[(aspects.indexOf(aspect) + 1) % aspects.length];
        dispatch(changeAspectAction(newAspect));
    }

    const handleToggleControls = (show: boolean) => {
        dispatch(toggleControlsAction(show));
    }

    const handleAddVideo = (video: File) => {
        dispatch(addVideoAction(video));
    }

    const handleRemoveVideo = () => {
        dispatch(removeVideoAction());
    }

    const handleAddSubtitles = (subtitles: File) => {
        dispatch(addSubtitlesAction(subtitles));
    }

    const handleRemoveSubtitles = () => {
        dispatch(removeSubtitlesAction());
    }
    const handleDurationChange = (duration: number) => {
        dispatch(setDurationAction(duration));
    }

    const handleResetVideoState = () => {
        dispatch(resetAction());
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen = !!document.fullscreenElement;
            dispatch(toggleFullScreenAction(isFullscreen));
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () =>
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    // handle keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case ' ':
                    if (isPaused) handlePlayVideo(); else handlePauseVideo();
                    break;
                case 'ArrowRight':
                    handleSkipSeconds("forward");
                    break;
                case 'ArrowLeft':
                    handleSkipSeconds("backward");
                    break;
                case 'ArrowUp':
                    handleVolumeChange(Math.min(volume + 0.1, 1));
                    break;
                case 'ArrowDown':
                    handleVolumeChange(Math.max(volume - 0.1, 0));
                    break;
                default:
                    break;
            }
        }

        document.addEventListener('keydown', handleKeyPress);

        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [state]);

    useEffect(() => {
        if (videoUrl) {
            handleResetVideoState();
        }

        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
                console.log("Video URL revoked...");
            }
        }
    }, [videoUrl]);

    useEffect(() => {
        return () => {
            if (subtitlesUrl) {
                URL.revokeObjectURL(subtitlesUrl);
                console.log("Subtitles URL revoked...");
            }
        }
    }, [subtitlesUrl]);

    return {
        state,
        containerRef,
        videoRef,
        handleRemoveVideo,
        handleAddVideo,
        handlePlayVideo,
        handlePauseVideo,
        handleToggleControls,
        handleAspectChange,
        handleSpeedChange,
        handleRepeatVideo,
        handleToggleFullscreen,
        handleTimeUpdate,
        handleMuteToggle,
        handleVolumeChange,
        handleSkipSeconds,
        handleDurationChange,
        handleResetVideoState,
        handleAddSubtitles,
        handleRemoveSubtitles
    }
}