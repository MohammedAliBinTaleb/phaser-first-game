import Phaser from "phaser";
import path from "path";
let SCORE_PLAYER = 0;
let SCORE_COMPUTER = 0;
import bg from "../assets/background.jpg";
import BALL_SRC from "../assets/ball.png";
import winning from "../assets/sound/winning.wav";
import lose from "../assets/sound/lose.wav";
import hit from "../assets/sound/hit.wav";
import GameOver from "../assets/sound/game-over.wav";
import songGame from "../assets/sound/background.mp3";
export const MAX_WIDTH = window.screen.width;
export const MAX_HEIGHT = window.screen.height / 1.1;
let DIR_BALL = true;
const DEFAULT_VALUE_OF = {
  BALL: {
    x: MAX_WIDTH / 2,
    y: MAX_HEIGHT / 2,
    VELOCITY: {
      x: 500,
      y: 500,
    },
  },
  PLAYER: {
    x: 100,
    y: MAX_HEIGHT / 2,
  },
  COMPUTER: {
    x: MAX_WIDTH - 100,
    y: MAX_HEIGHT / 2,
  },
};
let SPEED = 100;
let COMBO_HIT = 0;
const TEXT_SCORE = `${SCORE_PLAYER} - ${SCORE_COMPUTER}`;
export default class Game extends Phaser.Scene {
  preload() {
    console.log(path.join("texture/background.jpg"));
    this.load.image("background", bg);
    this.load.audio("winning", winning);
    this.load.audio("lose", lose);
    this.load.audio("hit", hit);
    this.load.audio("hit2", hit);
    this.load.audio("gameOver", GameOver);
    this.load.image("ball_src", BALL_SRC);
    this.load.audio("songGame", songGame);
  }
  create() {
    let image = this.add.image(MAX_WIDTH / 2, MAX_HEIGHT / 2, "background");
    // image.scale = 4;

    this.add.line(MAX_WIDTH / 2, 0, 0, 0, 5, 2000).setStrokeStyle(2, 0xff);
    this.add.circle(MAX_WIDTH / 2, MAX_HEIGHT / 2, 50).setStrokeStyle(5, 0xff);
    let soundEffect = this.sound.add("songGame", { loop: true });
    // soundEffect.
    soundEffect.play();
    this.WINNING = this.sound.add("winning");
    this.LOSE = this.sound.add("lose");
    this.HIT = this.sound.add("hit");
    this.HIT2 = this.sound.add("hit2");
    this.GAME_OVER = this.sound.add("gameOver");

    // this.add.u
    // WIN

    // let texture = this.add.renderTexture(0, 0, MAX_WIDTH, MAX_HEIGHT);
    // texture.setf

    this.physics.world.setBounds(-200, 0, MAX_WIDTH + 500, MAX_HEIGHT);
    // const text = this.add.text(400, 250, "بدأت اللعبة");
    // text.setOrigin(0.5, 0.5);
    this.add.text(MAX_WIDTH / 2 - 40, 20, "النتيجة", { fontSize: "18px" });
    this.score = this.add.text(MAX_WIDTH / 2 - 100, 50, `${TEXT_SCORE}`, {
      fontSize: "64px",
      align: "center",
    });
    this.textComob = this.add.text(
      MAX_WIDTH / 1.2,
      50,
      ` ${COMBO_HIT} : الضربات المتكررة`,
      { fontSize: "25px" }
    );
    this.ball = this.add.image(
      DEFAULT_VALUE_OF.BALL.x,
      DEFAULT_VALUE_OF.BALL.y,
      "ball_src"
    );
    this.ball.scale = 0.2;
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true, 1, 1);
    this.ball.body.setVelocity(
      DEFAULT_VALUE_OF.BALL.VELOCITY.x,
      DEFAULT_VALUE_OF.BALL.VELOCITY.y
    );
    this.ball.body.setBounce(1, 1);

    this.playerBoard = this.add.rectangle(
      DEFAULT_VALUE_OF.PLAYER.x,
      DEFAULT_VALUE_OF.PLAYER.y,
      60,
      120,
      0x3f37c9
    );

    this.physics.add.existing(this.playerBoard, true);
    this.physics.add.collider(this.playerBoard, this.ball, (d) => {
      this.ball.body.velocity.x += SPEED;
      SPEED *= 1.2;
      this.HIT.play();
      COMBO_HIT++;
      this.textComob.text = "الضربات المتكررة " + COMBO_HIT;
      // COMBO_HIT
    });
    // this.playerBoard.body.setCollideWorldBounds();
    this.computerPlayer = this.add.rectangle(
      DEFAULT_VALUE_OF.COMPUTER.x,
      DEFAULT_VALUE_OF.COMPUTER.Y,
      60,
      120,
      0xae2012
      // 0x000000
    );
    this.physics.add.existing(this.computerPlayer, true);
    this.physics.add.collider(this.computerPlayer, this.ball, (d) => {
      this.ball.body.velocity.x -= SPEED;
      SPEED *= 1.2;
      this.HIT.play();
      COMBO_HIT++;
      this.textComob.text = "الضربات المتكررة " + COMBO_HIT;
    });
    // this.playerBoard.body.setCollideWorldBounds(true, 1, 1);
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    // /** @type {Phaser.Physics.Arcade.Body} */

    const body = this.playerBoard.body;
    const moveComputer = this.computerPlayer.body;
    const acc = 20;
    const PLAYER_LOSE = this.ball.x < 0;
    const COMPUTER_LOSE = this.ball.x > MAX_WIDTH;

    if (this.ball.y < 1) this.HIT2.play();
    if (this.ball.y > MAX_HEIGHT - 10) this.HIT2.play();
    // console.log({
    //   computerLeft: this.computerPlayer.x,
    //   ballRight: this.ball.x,
    // });
    // if(this.ball.x)
    // if()
    if (this.cursors.up.isDown) {
      if (body.top - 10 < 0) return;
      this.playerBoard.y -= 10;
      body.updateFromGameObject();
    } else if (this.cursors.down.isDown) {
      console.log(body.bottom);
      //   body.setVelocityX(100);
      console.log("down");
      if (body.bottom + 10 > MAX_HEIGHT) return;
      this.playerBoard.y += 10;
      body.updateFromGameObject();
    }

    const diff = this.ball.y - this.computerPlayer.y;

    if (Math.abs(diff) < Math.floor(Math.random() * (40 - 20 + 1) + 20)) return;
    if (diff < 0) {
      //ball above player
      this.computerPlayer.y -= 10;
      moveComputer.updateFromGameObject();
    } else if (diff > 0) {
      //ball down player

      this.computerPlayer.y += 10;
      moveComputer.updateFromGameObject();
      //   moveComputer.y += 10;
      //computer should go down
    }
    if (PLAYER_LOSE) {
      SCORE_COMPUTER += 1;
      this.score.text = `${SCORE_PLAYER} - ${SCORE_COMPUTER}`;
      this.LOSE.play();
      DIR_BALL = false;
      this.restartGame();
    } else if (COMPUTER_LOSE) {
      SCORE_PLAYER += 1;
      DIR_BALL = true;
      this.score.text = `${SCORE_PLAYER} - ${SCORE_COMPUTER}`;
      // this.scene.set;
      this.WINNING.play();
      this.restartGame();
    }
  }
  restartGame() {
    this.ball.y = -50;
    if (SCORE_COMPUTER === 5) {
      this.ball.y = -200;
      SCORE_COMPUTER = 0;
      SCORE_PLAYER = 0;
      this.GAME_OVER.play();
      this.score.text = `${SCORE_PLAYER} - ${SCORE_COMPUTER}`;
    }
    this.ball.x = DEFAULT_VALUE_OF.BALL.x;
    this.ball.body.velocity.x = DIR_BALL
      ? -DEFAULT_VALUE_OF.BALL.VELOCITY.x
      : DEFAULT_VALUE_OF.BALL.VELOCITY.x;
    // this.ball.body.velocity.y = Math.random() * 5;
    this.playerBoard.y = DEFAULT_VALUE_OF.PLAYER.y;
    this.playerBoard.x = DEFAULT_VALUE_OF.PLAYER.x;
    this.computerPlayer.y = DEFAULT_VALUE_OF.COMPUTER.y;
    this.computerPlayer.x = DEFAULT_VALUE_OF.COMPUTER.x;
    COMBO_HIT = 0;
    this.textComob.text = "الضربات المتكررة " + COMBO_HIT;
    // this.ball.body.updateFromGameObject();
    // this.playerBoard.body.updateFromGameObject();
    // this.computerPlayer.body.updateFromGameObject();
    SPEED = 100;
  }
}
