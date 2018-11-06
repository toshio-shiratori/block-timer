/**
 * アプリの状態定義
 */
const STATE_SETTING     = 'SETTING'
const STATE_MAIN_INIT   = 'MAIN-INIT'
const STATE_MAIN_EXEC   = 'MAIN-EXEC'
const STATE_MAIN_STOP   = 'MAIN-STOP'
const STATE_MAIN_TIMEUP = 'MAIN-TIMEUP'
const STATE_MAIN_FINISH = 'MAIN-FINISH'

/**
 * イベントの定義
 */
const EVENT_MAIN_INIT      = 'main:init'
const EVENT_MAIN_EXEC      = 'main:exec'
const EVENT_MAIN_STOP      = 'main:stop'
const EVENT_MAIN_RESUME    = 'main:resume'
const EVENT_MAIN_RETURN    = 'main:return'
const EVENT_MAIN_TIMEUP    = 'main:timeup'
const EVENT_MAIN_FINISH    = 'main:finish'
const EVENT_SETTING_EXEC   = 'setting:exec'
const EVENT_SETTING_FINISH = 'setting:finish'
const EVENT_SETTING_RESET  = 'setting:reset'
const EVENT_GRID_EXEC      = 'grid:exec'
const EVENT_GRID_STOP      = 'grid:stop'
const EVENT_GRID_RESUME    = 'grid:resume'
const EVENT_ARAKIN_EXEC    = 'arakin:exec'
const EVENT_ARAKIN_STOP    = 'arakin:stop'
const EVENT_ARAKIN_RESUME  = 'arakin:resume'
const EVENT_SHOW_DIALOG    = 'dialog:show'
const EVENT_SHOW_SHARE_DIALOG = 'share-dialog:show'
const EVENT_TIME_INPUT_REQ = 'time-input:request'
const EVENT_TIME_INPUT_RES = 'time-input:response'
const EVENT_DESTROY        = 'destroy'

/**
 * 管理タグの定義
 */
const TAG_CONTENT_HEADER = 'my-header'
const TAG_CONTENT_FOOTER = 'my-footer'
const TAG_CONTENT_DIALOG = 'my-dialog'
const TAG_CONTENT_INPUT = 'content-input'
const TAG_CONTENT_MAIN  = 'content-main'
const TAG_GRID_TIMER = 'grid-timer'
const TAG_ARAKIN_TIMER = 'arakin-timer'
const TAG_TIME_INPUT = 'time-input'

/**
 * ダイアログの管理
 */
const DIALOG_ID_SETTING_RESET = 1
const DIALOG_ID_SHARE_QR_CODE = 2
const DIALOG_YES = 'yes'
const DIALOG_NO = 'no'
const DIALOG_OK = 'ok'

/**
 * ローカルストレージのキーバリュー
 */
const LOCAL_STORAGE_TEST = 'isSupport'
const LOCAL_STORAGE_SETTING = 'bTimerSetting'

/**
 * 画面サイズを取得
 * 
 * @return json 画面サイズ
 */
function getWindowSize() {
  return {
    'height': window.screen.availHeight,
    'width': window.screen.availWidth
  }
}

/**
 * システム設定を取得
 * 
 * バージョン（version）の数値を上げることで
 * ユーザー設定情報を強制的に上書きします。
 * 
 * そのためユーザーが変更する値については
 * 定義しないように注意してください。
 * 
 * @see getVersionSetting
 * @return システム設定
 */
function getSystemSetting() {
  var param = {
    "version": 0,
    "timeLimit": {
      "color":  "#0c6693"
    },
    "section1": {
      "color":  "#3dad6b"
    },
    "section2": {
      "color":  "#e5b829"
    },
    "section3": {
      "color":  "#bf3254"
    },
    "display": {
      "blockNumHorizon":  20,
      "blockNumVertical": 25
    }
  }
  return param
}

/**
 * 設定情報の初期値を取得
 * 
 * @return 初期設定
 */
function getDefaultSetting() {
  var param = {
    "version": 0,
    "timeLimit": {
      "minite": 3,
      "sec":    0,
      "color":  "#0c6693"
    },
    "section1": {
      "minite": 1,
      "sec":    0,
      "color":  "#3dad6b"
    },
    "section2": {
      "minite": 0,
      "sec":    30,
      "color":  "#e5b829"
    },
    "section3": {
      "minite": 0,
      "sec":    10,
      "color":  "#bf3254"
    },
    "display": {
      "timeLimit": true,
      "timeOverAnimation": true,
      "blockNumHorizon":  20,
      "blockNumVertical": 25
    }
  }
  return param
}

/**
 * ローカルストレージの利用可否
 * 
 * @return true 利用できる
 * @return false 利用できない
 */
function isLocalStorageAvailable() {
  let isAvailable = false;

  try {
    localStorage.setItem(LOCAL_STORAGE_TEST, 'test')
    isAvailable = true
  } catch(e) {
    alert('LocalStorage は利用できない端末です。');
  }

  // test-code-start
  //isAvailable = false
  // test-code-end

  return isAvailable
}

/**
 * 設定情報のバージョン比較と適用
 * 
 * システム設定のバージョンと比較して
 * 新バージョンとなっていたら、システム設定部分のみ
 * 強制的に更新する。
 * 
 * @param uSetting ユーザーの設定情報
 */
function getVersionSetting(uSetting) {
  if (typeof uSetting.version === 'undefined') {
    uSetting.version = 0
  }

  var sSetting = getSystemSetting()
  if (sSetting.version > uSetting.version) {
    uSetting.timeLimit = Object.assign({}, uSetting.timeLimit, sSetting.timeLimit);
    uSetting.section1 = Object.assign({}, uSetting.section1, sSetting.section1);
    uSetting.section2 = Object.assign({}, uSetting.section2, sSetting.section2);
    uSetting.section3 = Object.assign({}, uSetting.section3, sSetting.section3);
    uSetting.display = Object.assign({}, uSetting.display, sSetting.display);
    uSetting.version = sSetting.version
  }
  return uSetting
}

/**
 * ローカルストレージから設定情報を取得
 * 
 * @return json 設定情報
 */
function getSetting() {
  var setting = localStorage.getItem(LOCAL_STORAGE_SETTING)
  if (setting == null) {
    setting = getDefaultSetting()
  }
  else {
    setting = JSON.parse(setting)
  }
  setting = getVersionSetting(setting)
  return setting
}

/**
 * ローカルストレージに設定情報を保存
 * 
 * @param json setting 
 */
function setSetting(setting) {
  if (!isLocalStorageAvailable()) {
    // ローカルストレージが利用できない場合は何もしない。
    return
  }

  if (typeof setting === 'undefined') {
    console.error('setting param is undefined.')
    setting = null;
  }

  var obj = JSON.stringify(setting)
  localStorage.setItem(LOCAL_STORAGE_SETTING, obj)
}

/**
 * ローカルストレージの設定情報を初期化
 * 
 * @return json 設定情報
 */
function initSetting() {
  if (!isLocalStorageAvailable()) {
    // ローカルストレージが利用できない場合は何もしない。
    return
  }

  var setting = getDefaultSetting()
  var obj = JSON.stringify(setting)
  localStorage.setItem(LOCAL_STORAGE_SETTING, obj)
  return setting
}
