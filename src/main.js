import Phaser from "phaser";
import TitleScreen from "./scenes/TitleScreen";
import Game, { MAX_HEIGHT, MAX_WIDTH } from "./scenes/Game";
const config = {
  width: MAX_WIDTH,
  height: MAX_HEIGHT,
  type: Phaser.AUTO,
  //   backgroundColor: "#457b9d",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 40 },
      // debug: true,
    },
  },
  //   se
};

const game = new Phaser.Game(config);
// game.scale.startFullScreen(true);
game.scene.add("titleScreen", TitleScreen);
game.scene.add("game", Game);
// let sound1 = game.add.audio("winning");

// game.scene.start("titleScreen");
game.scene.start("game");
