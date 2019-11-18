class Choise {
  constructor(id, text, disp) {
    this.id = id;
    this.text = text;
    this.disp = disp;
  }
}

window.addEventListener("load", init);
let buttonCount = 3;
let sceneCount = 0;
// ラーメンスコア
let ramenScore = 0;
// 食通のコメントの数
let commentCount = 0;
// 食通のコメント
let commentText = [];
// 選択したボタン
let buttonSelected = [];
// 麺に関するボタン
let noodleBtn = [];
// 麺選択肢
let noodleChoiseArr = [];
noodleChoiseArr.push(new Choise(1, "太麺", true));
noodleChoiseArr.push(new Choise(2, "細麺", true));
noodleChoiseArr.push(new Choise(3, "ちぢれ麺", true));
noodleChoiseArr.push(new Choise(4, "フライ麺", true));
noodleChoiseArr.push(new Choise(5, "うどん", true));
noodleChoiseArr.push(new Choise(6, "スポンジケーキ", true));
// スープに関するボタン
let soupBtn = [];
// スープ選択肢
let soupChoiseArr = [];
soupChoiseArr.push(new Choise(1, "味噌", true));
soupChoiseArr.push(new Choise(2, "醤油", true));
soupChoiseArr.push(new Choise(3, "塩", true));
soupChoiseArr.push(new Choise(4, "豚骨", true));
soupChoiseArr.push(new Choise(5, "トマト", true));
soupChoiseArr.push(new Choise(6, "ホイップクリーム", true));
soupChoiseArr.push(new Choise(7, "水道水", true));
// 具材に関するボタン
let ingredientsBtn = [];
// 具材選択肢
let ingredientsChoiseArr = [];
ingredientsChoiseArr.push(new Choise(1, "味玉", true));
ingredientsChoiseArr.push(new Choise(2, "海苔", true));
ingredientsChoiseArr.push(new Choise(3, "チャーシュー", true));
ingredientsChoiseArr.push(new Choise(4, "きくらげ", true));
ingredientsChoiseArr.push(new Choise(5, "段ボール", true));
ingredientsChoiseArr.push(new Choise(6, "海老", true));
ingredientsChoiseArr.push(new Choise(7, "かにかま", true));
ingredientsChoiseArr.push(new Choise(8, "いちご", true));

function init() {
  let stage = new createjs.Stage("myCanvas");
  // stage.addChild(container);

  let question = new createjs.Text(
    "どんなラーメンを出す？",
    "24px sans-serif",
    "black"
  );
  stage.addChild(question);

  let pic = new createjs.Bitmap("picture/syugyou3_tatsujin.png");
  pic.x = 400;
  pic.y = 150;
  stage.addChild(pic);

  displayScene();

  // Stageの描画を更新します
  // createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handvarick);

  function handvarick() {
    stage.update();
  }

  /**
   * シーン表示
   */
  function displayScene() {
    switch (sceneCount) {
      case 0:
        setButton(noodleChoiseArr, noodleBtn);
        break;
      case 1:
        delButton(noodleBtn);
        setButton(soupChoiseArr, soupBtn);
        break;
      case 2:
        delButton(soupBtn);
        setButton(ingredientsChoiseArr, ingredientsBtn);
        break;
      case 3:
        delButton(ingredientsBtn);
        decideScore();
        eatAnimate();
        break;
      case 4:
        console.log(ramenScore);
        if (ramenScore > 30) {
          let strComment = `とてもおいしいラーメンを作れた！
                            点数：${ramenScore}`;
          let resultText = new createjs.Text(
            strComment,
            "30px Arial",
            "pink"
          );
          resultText.x = 450;
          resultText.y = 450;
          stage.addChild(resultText);
        } else {
          window.location.href = "./battle.html";
        }
        break;
    }
  }

  /**
   * 選択した麺・スープ・具により評価を決定
   */
  function decideScore() {
    if (buttonSelected[0] === 3) {
      ramenScore += 30;
      commentCount++;
      commentText.push("ワシはちぢれ麺が大好きなんじゃア～");
    }
    if (buttonSelected[0] === 1 && buttonSelected[1] === 1) {
      ramenScore += 40;
      commentCount++;
      commentText.push("味噌にはやっぱり太麺じゃの！");
    }
    if (buttonSelected[0] === 2 && buttonSelected[1] === 2) {
      ramenScore += 40;
      commentCount++;
      commentText.push("醤油にはやっぱり細麺じゃの！");
    }
    if (buttonSelected[0] === 4) {
      ramenScore += -1000;
      commentCount++;
      commentText.push("貴様！このワシにインスタントラーメンを食わせたのか！");
    }
    if (buttonSelected[0] === 5) {
      ramenScore += -5;
      commentCount++;
      commentText.push("麺が少々太すぎるな…。");
    }
    if (buttonSelected[1] === 4) {
      ramenScore += -20;
      commentCount++;
      commentText.push("豚骨か…儂の好みではない…。");
    }
    if (buttonSelected[1] === 5) {
      ramenScore += 50;
      commentCount++;
      commentText.push("トマトラーメンか！自然志向で大変よろしい！");
    }
    if (buttonSelected[1] === 7) {
      ramenScore += 70;
      commentCount++;
      commentText.push(
        "これは…あっさり系ラーメンの極致、目を閉じれば微かな味が感じられるような…。素晴らしい…。"
      );
    }
    if (buttonSelected[2] === 5) {
      ramenScore += -30;
      commentCount++;
      commentText.push(
        "なんだこれは！ダンボールがはいっておるではないかぁあぁアアアアァ！！"
      );
    }
    if (buttonSelected[2] === 1) {
      ramenScore += 5;
      commentCount++;
      commentText.push("具は味玉…王道でよろしい。");
    }
    if (buttonSelected[1] === 4 && buttonSelected[2] === 2) {
      ramenScore += 45;
      commentCount++;
      commentText.push(
        "濃いスープが海苔に絡みつき、旨味の相乗効果が生まれる…！"
      );
    }
    if (buttonSelected[2] === 3) {
      ramenScore += -10;
      commentCount++;
      commentText.push("儂のような老人にチャーシューは堪えるな…。");
    }
    if (buttonSelected[2] === 4) {
      commentCount++;
      commentText.push("きくらげ…可もなく不可もなく。");
    }
    if (buttonSelected[2] === 6 && buttonSelected[1] !== 7) {
      ramenScore += -10;
      commentCount++;
      commentText.push("このスープに海老は合わないだろう！");
    }
    if (buttonSelected[2] === 6 && buttonSelected[1] === 7) {
      ramenScore += 40;
      commentCount++;
      commentText.push(
        "海老で出汁をとったか！ならばこれは海鮮ラーメンだ。きっとそうだ。"
      );
    }
    if (buttonSelected[2] === 7) {
      ramenScore += -20;
      commentCount++;
      commentText.push(
        "かにかまぼこ！？ラーメンにカニカマとは！？しかもこれ3個入98円のヤツだろう！"
      );
    }
    if (
      buttonSelected[0] === 6 &&
      buttonSelected[1] === 6 &&
      buttonSelected[2] === 8
    ) {
      ramenScore += 90;
      commentCount++;
      commentText.push(
        "ケーキ系ラーメンを出してくるとは…最先端を行っておる…。"
      );
    } else if (
      buttonSelected[0] === 6 ||
      buttonSelected[1] === 6 ||
      buttonSelected[2] === 8
    ) {
      ramenScore += -310;
      commentCount++;
      commentText.push("バカにしておるのか！ラーメンの体を成しておらんわア！");
    }
  }

  /**
   * 食べるアニメーション
   */
  function eatAnimate() {
    // スコア欄を作成＆アニメーション
    let animateTweenBase = createjs.Tween.get(pic);
    for (let i = 0; i < commentText.length; i++) {
      if (i < commentText.length - 1) {
        animateTweenBase
          .to({ scaleX: 1.2, scaleY: 1.2 }, 150)
          .to({ scaleX: 1.0, scaleY: 1.0 }, 150)
          .call(dispMessage, [i])
          .wait(1000);
      } else {
        animateTweenBase
          .to({ scaleX: 1.2, scaleY: 1.2 }, 150)
          .to({ scaleX: 1.0, scaleY: 1.0 }, 150)
          //.to({ rotation: 100 * (i + 1) }, 1000)
          .call(dispMessage, [i])
          .wait(1000)
          .call(() => {
            sceneCount++;
            displayScene();
          });
      }
    }
  }

  /**
   * 食通コメント表示
   * @param {int} index コメントのインデックス
   */
  function dispMessage(index) {
    let comment = new createjs.Text(
      commentText[index],
      "24px sans-serif",
      "black"
    );
    comment.x = 200;
    comment.y = 300 + index * 50;
    stage.addChild(comment);

    return comment;
  }

  /**
   * 選択肢表示
   * @param {Choise} disp 選択肢の配列
   * @param {createjs.Container} dispButton 作成したボタンを格納
   */
  function setButton(disp, dispButton) {
    for (let i = 0, visibleCount = 0; i < disp.length; i++) {
      if (disp[i].disp) {
        let btn = createButton(disp[i].text, 180, 40);
        btn.x = (visibleCount % 5) * 200 + 30;
        btn.y = 30 + 50 * Math.floor(visibleCount / 5);
        stage.addChild(btn);
        // クリックイベントを登録
        btn.addEventListener("click", {
          handleEvent: handleButtonClick,
          arg1: disp[i].id
        });
        dispButton.push(btn);
        visibleCount++;
      }
    }
  }

  /**
   * ボタン削除
   * @param {createjs.Container} preButton 削除するボタン
   */
  function delButton(preButton) {
    for (let j = 0; j < preButton.length; j++) {
      stage.removeChild(preButton[j]);
    }
  }

  /**
   * ボタンクリック時処理
   * @param {*} event 
   */
  function handleButtonClick(event) {
    // シーンを進める
    sceneCount++;
    // 選択ボタンデータ保存
    buttonSelected.push(this.arg1);
    // シーン再表示
    displayScene();
  }
}
