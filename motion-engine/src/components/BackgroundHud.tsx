import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import {
  COLOR_BG,
  COLOR_LIME,
  COLOR_MUTED,
  COLOR_WHITE,
  FONT_MONO,
  TOTAL_FRAMES,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../constants";

export const BackgroundHud: React.FC = () => {
  const frame = useCurrentFrame();

  // Progress line from 0% to 100% across the whole 450 frames
  const progressPercent = interpolate(frame, [0, TOTAL_FRAMES], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Telemetry timecode (00:00:frame)
  const currentSeconds = Math.floor(frame / 30);
  const currentSubFrame = frame % 30;
  const timecode = `00:00:${currentSeconds.toString().padStart(2, "0")}:${currentSubFrame
    .toString()
    .padStart(2, "0")}`;

  // Deterministic blinking for REC indicator
  const recDotOpacity = Math.sin(frame * 0.25) > 0 ? 1 : 0.25;

  return (
    <div
      style={{
        position: "absolute",
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        top: 0,
        left: 0,
        backgroundColor: COLOR_BG,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Ambient Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          width: 800,
          height: 800,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(182, 255, 53, 0.08) 0%, rgba(8, 9, 13, 0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Subtle Matrix / Dot Grid */}
      <svg
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        style={{ position: "absolute", opacity: 0.12 }}
      >
        <defs>
          <pattern
            id="hud-dot-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill={COLOR_LIME} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hud-dot-grid)" />
      </svg>

      {/* Top Timeline Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 4,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            backgroundColor: COLOR_LIME,
            boxShadow: `0 0 12px ${COLOR_LIME}`,
          }}
        />
      </div>

      {/* Top Left: REC Status */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: FONT_MONO,
          fontSize: 18,
          letterSpacing: "0.15em",
          color: COLOR_WHITE,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: COLOR_LIME,
            boxShadow: `0 0 10px ${COLOR_LIME}`,
            opacity: recDotOpacity,
          }}
        />
        <span>SYS // FEED 4K HDR</span>
      </div>

      {/* Top Right: Telemetry / Timecode */}
      <div
        style={{
          position: "absolute",
          top: 90,
          right: 80,
          fontFamily: FONT_MONO,
          fontSize: 18,
          letterSpacing: "0.15em",
          color: COLOR_MUTED,
        }}
      >
        <span style={{ color: COLOR_LIME }}>TC: </span>
        {timecode}
      </div>

      {/* Bottom Left: Coordinates */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 80,
          fontFamily: FONT_MONO,
          fontSize: 16,
          letterSpacing: "0.15em",
          color: COLOR_MUTED,
        }}
      >
        LOC // 37.7749° N, 122.4194° W
      </div>

      {/* Bottom Right: Frame Counter */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          right: 80,
          fontFamily: FONT_MONO,
          fontSize: 16,
          letterSpacing: "0.15em",
          color: COLOR_MUTED,
        }}
      >
        FRM: {frame.toString().padStart(3, "0")} / {TOTAL_FRAMES}
      </div>

      {/* Corner Tech Reticles */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
        }}
      >
        {/* Top-Left Bracket */}
        <path
          d="M 60 120 L 60 70 L 110 70"
          fill="none"
          stroke="rgba(182, 255, 53, 0.4)"
          strokeWidth="2"
        />
        {/* Top-Right Bracket */}
        <path
          d="M 970 70 L 1020 70 L 1020 120"
          fill="none"
          stroke="rgba(182, 255, 53, 0.4)"
          strokeWidth="2"
        />
        {/* Bottom-Left Bracket */}
        <path
          d="M 60 1800 L 60 1850 L 110 1850"
          fill="none"
          stroke="rgba(182, 255, 53, 0.4)"
          strokeWidth="2"
        />
        {/* Bottom-Right Bracket */}
        <path
          d="M 970 1850 L 1020 1850 L 1020 1800"
          fill="none"
          stroke="rgba(182, 255, 53, 0.4)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
