/**
 * メイン処理のインスタンス取得
 */
function getArakinMain() {
  return window.arakinMain
}

/**
 * 現在時間の取得
 * 
 * @return 現在時間
 */
function getTimeValue() {
  var dt = new Date()
  return dt.getTime()
}

/**
 * 同期処理
 * 各シーンの同期を行います。
 */
function syncArakinMain() {
  // 同期処理を行う
  window.arakinMain.onEvent('proc', null, getTimeValue());
}
