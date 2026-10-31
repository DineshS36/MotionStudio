import React from "react";
import { Composition, Sequence } from "remotion";
import {
  COLOR_BG,
  SCENE_DURATIONS,
  TOTAL_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./constants";
import { BackgroundHud } from "./components/BackgroundHud";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";

export const MotionGraphicsReel: React.FC = () => {
  const scene1Start = 0;
  const scene2Start = scene1Start + SCENE_DURATIONS.scene1;
  const scene3Start = scene2Start + SCENE_DURATIONS.scene2;
  const scene4Start = scene3Start + SCENE_DURATIONS.scene3;
  const scene5Start = scene4Start + SCENE_DURATIONS.scene4;

  return (
    <div
      style={{
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        backgroundColor: COLOR_BG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Web Fonts Embed */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;700;800;900&display=swap');
      `}</style>

      {/* Persistent Cinematic Background & Telemetry HUD */}
      <BackgroundHud />

      {/* Scene 1: 0 - 3s (Frames 0 - 90) */}
      <Sequence
        from={scene1Start}
        durationInFrames={SCENE_DURATIONS.scene1}
        name="Scene 1: Everything Changes"
      >
        <Scene1 />
      </Sequence>

      {/* Scene 2: 3 - 6s (Frames 90 - 180) */}
      <Sequence
        from={scene2Start}
        durationInFrames={SCENE_DURATIONS.scene2}
        name="Scene 2: The World Moves Fast"
      >
        <Scene2 />
      </Sequence>

      {/* Scene 3: 6 - 10s (Frames 180 - 300) */}
      <Sequence
        from={scene3Start}
        durationInFrames={SCENE_DURATIONS.scene3}
        name="Scene 3: Build What Comes Next"
      >
        <Scene3 />
      </Sequence>

      {/* Scene 4: 10 - 13s (Frames 300 - 390) */}
      <Sequence
        from={scene4Start}
        durationInFrames={SCENE_DURATIONS.scene4}
        name="Scene 4: Create The Future"
      >
        <Scene4 />
      </Sequence>

      {/* Scene 5: 13 - 15s (Frames 390 - 450) */}
      <Sequence
        from={scene5Start}
        durationInFrames={SCENE_DURATIONS.scene5}
        name="Scene 5: The Future Is Built"
      >
        <Scene5 />
      </Sequence>
    </div>
  );
};

export const FirstReelComposition: React.FC = () => {
  return (
    <Composition
      id="FutureIsBuilt"
      component={MotionGraphicsReel}
      durationInFrames={TOTAL_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
