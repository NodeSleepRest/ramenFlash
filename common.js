/**
 * Canvas上にボタン作成
 * @param {String} text ボタンのラベル文言です。
 * @param {Number} width ボタンの横幅(単位はpx)です。
 * @param {Number} height ボタンの高さ(単位はpx)です。
 * @returns {createjs.Container} ボタンの参照を返します。
 */
function createButton(text, width, height) {
  // ボタン要素をグループ化
  let button = new createjs.Container();
  button.name = text; // ボタンに参考までに名称を入れておく(必須ではない)
  button.cursor = "pointer"; // ホバー時にカーソルを変更する
  // 通常時の座布団を作成
  let bgUp = new createjs.Shape();
  bgUp.graphics
    .setStrokeStyle(1.0)
    .beginStroke("DarkGreen")
    .beginFill("white")
    .drawRoundRect(0.5, 0.5, width - 1.0, height - 1.0, 4);
  button.addChild(bgUp);
  bgUp.visible = true; // 表示する
  // ロールオーバー時の座布団を作成
  let bgOver = new createjs.Shape();
  bgOver.graphics.beginFill("SlateBlue").drawRoundRect(0, 0, width, height, 4);
  bgOver.visible = false; // 非表示にする
  button.addChild(bgOver);
  // ラベルを作成
  let label = new createjs.Text(text, "18px sans-serif", "SteelBlue");
  label.x = width / 2;
  label.y = height / 2;
  label.textAlign = "center";
  label.textBaseline = "middle";
  button.addChild(label);

  return button;
}
