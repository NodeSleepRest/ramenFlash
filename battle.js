window.addEventListener("load", init);
let stage = new createjs.Stage("myCanvas");
let container = new createjs.Container();
let attackContainer = new createjs.Container();
let sceneCount = 0;
let isFinished = false;
let pic;
let attackButton;

function init() {
  stage.addChild(attackContainer);
  stage.addChild(container);

  let text1 = new createjs.Text(
    "よくもまずいラーメンを食わせてくれたな",
    "24px HGP行書体",
    "black"
  );
  text1.x = 20;
  text1.y = 20;

  let text2 = new createjs.Text("ぶち殺してやる", "24px HGP行書体", "black");
  text2.x = 20;
  text2.y = 70;

  container.addChild(text1);
  container.addChild(text2);

  pic = new createjs.Bitmap("picture/job_niwashi_ojiisan.png");
  pic.x = 300;
  pic.y = 150;

  attackContainer.addChild(pic);

  attackButton = createButton("攻撃", 180, 40);
  attackButton.x = 450;
  attackButton.y = 30;
  container.addChild(attackButton);
  // クリックイベントを登録
  attackButton.addEventListener("click", attackAnimate);

  createjs.Tween.get(pic)
    .to({ x: 270, y: 200, scaleX: 1.2, scaleY: 1.2 }, 500)
    .to({ x: 300, y: 210, scaleX: 1.4, scaleY: 1.4 }, 500)
    .to({ x: 270, y: 220, scaleX: 1.6, scaleY: 1.6 }, 500)
    .to({ x: 300, y: 230, scaleX: 1.8, scaleY: 1.8 }, 500)
    .to({ x: 270, y: 240, scaleX: 2.0, scaleY: 2.0 }, 500)
    .to({ x: 300, y: 250, scaleX: 2.2, scaleY: 2.2 }, 500)
    .to({ x: 270, y: 260, scaleX: 2.4, scaleY: 2.4 }, 500)
    .to({ x: 300, y: 270, scaleX: 2.6, scaleY: 2.6 }, 500)
    .to({ x: 270, y: 280, scaleX: 2.8, scaleY: 2.8 }, 500)
    .to({ x: 300, y: 290, scaleX: 3.0, scaleY: 3.0 }, 500)
    .to({ x: 270, y: 300, scaleX: 3.5, scaleY: 3.5 }, 500)
    .to({ x: 270, y: 350, scaleX: 6.5, scaleY: 6.5 }, 500)
    .call(dispWinLose, [false]);

  // Stageの描画を更新します
  createjs.Ticker.addEventListener("tick", handleTick);
}

/**
 * 勝利or敗北メッセージを表示
 * @param {Bool} isWinning True…勝利,False…敗北
 */
function dispWinLose(isWinning) {
  if (!isFinished) {
    let winloseText;

    if (isWinning) {
      winloseText = new createjs.Text("You Win!!!", "36px sans-serif", "black");
    } else {
      winloseText = new createjs.Text("You Lose…", "36px sans-serif", "black");
      container.removeChild(attackButton);
    }

    isFinished = true;

    winloseText.x = 300;
    winloseText.y = 150;

    container.addChild(winloseText);
  }
}

/**
 * 攻撃アニメーション
 */
function attackAnimate(event) {
  let ramenAttack = new createjs.Bitmap("picture/ramen_moyashi.png"); 
  ramenAttack.x = 1100;
  ramenAttack.y = 70;
  attackContainer.addChild(ramenAttack);

  createjs.Sound.on("fileload", this.loadSoundHandler, this);
  createjs.Sound.registerSound("sound/magic-flame1.mp3", "sound");

  createjs.Tween.get(ramenAttack)
    .to({ x: 0 }, 1000)
    // .call(deleteObject, [pic])
    .call(() => {
      attackContainer.removeChild(pic);
    })
    .wait(100)
    .call(dispWinLose, [true]);

  createjs.Tween.get(pic)
    .wait(450)
    .to({ x: 0 }, 300)
    .to({ scaleX: 0.01 }, 100);
}

function handleTick() {
  stage.update();
}

function loadSoundHandler(event) {
  var instance = createjs.Sound.play("sound");
  instance.on("complete", this.handleComplete, this);
  instance.volume = 0.5;
}