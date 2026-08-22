"use client";

import { FaVolumeUp } from "react-icons/fa";

export default function AudioPlayer({
  path,
  className
}: {
  path: string;
  className?: string;
}) {
  const playAudio = () => {
    const audio = new Audio(path);
    audio.play().catch(error => console.error("Playback failed:", error));
  };

  return (
    <FaVolumeUp className={className} onClick={playAudio} />
  );
}