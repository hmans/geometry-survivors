import React from "react";
import * as RC from "render-composer";
import GameplayScene from "./scenes/gameplay/GameplayScene";

export default function Game() {
  return (
    <RC.Canvas>
      <React.StrictMode>
        <RC.RenderPipeline>
          <GameplayScene />
        </RC.RenderPipeline>
      </React.StrictMode>
    </RC.Canvas>
  );
}
