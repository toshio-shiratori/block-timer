<content-input>

  <div if={ show }>
    <div class="area">
      <p class="description">Setting Time</p>
      <div class="input-area">
        <div class="time-form">
          <div id="total" class="time-form-label" onclick={ onSettingTotal }>
            <label for="timelimit-val">{ labelTotal }</label>
            <div id="timelimit">
              <span id="timelimit-val">{ displayTotal }</span>
            </div>
          </div>
          <div>
            <input type="color" value={ timeLimitColor } oninput={ colorTimelimit } ref="timeLimitColor">
          </div>
        </div>
        <div class="time-form">
          <div class="time-form-label point1" onclick={ onSettingPoint1 }>
            <label for="section1-val">{ labelPoint1 }</label>
            <div id="section1">
              <span id="section1-val">{ displayPoint1 }</span>
            </div>
          </div>
          <div>
            <input type="color" value={ section1Color } oninput={ colorSection1 } ref="section1Color">
          </div>
        </div>
        <div class="time-form">
          <div class="time-form-label point2" onclick={ onSettingPoint2 }>
            <label for="section2-val">{ labelPoint2 }</label>
            <div id="section2">
              <span id="section2-val">{ displayPoint2 }</span>
            </div>
          </div>
          <div>
            <input type="color" value={ section2Color } oninput={ colorSection2 } ref="section2Color">
          </div>
        </div>
        <div class="time-form">
          <div class="time-form-label point3" onclick={ onSettingPoint3 }>
            <label for="section3-val">{ labelPoint3 }</label>
            <div id="section3">
              <span id="section3-val">{ displayPoint3 }</span>
            </div>
          </div>
          <div>
            <input type="color" value={ section3Color } oninput={ colorSection3 } ref="section3Color">
          </div>
        </div>
      </div>
    </div>
    <div class="area">
      <p class="description">Option</p>
      <div class="input-area">
        <div class="switchArea">
          <span class="switchLabel">タイムアウト画面点滅</span>
          <label class="switch__label">
            <input type="checkbox" class="switch__input" checked={ isCheckFlash } onChange={ onCheckFlash } ref="checkFlash">
            <span class="switch__content"></span>
            <span class="switch__circle"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="area">
      <p class="description">Debug</p>
      <div class="input-area">
        <div class="buttonArea">
          <span class="buttonLabel">設定初期化</span>
          <label class="button__label">
            <button type="button" onclick={ initSetting }></button>
          </label>
        </div>
      </div>
    </div>
  </div>

  <style>
    :scope .time-form {
      display: flex;
      border-bottom: 1px dotted #000000;
      margin: 10px 0;
    }
    :scope .time-form-label {
      width: 100%;
    }
    :scope #total {
      font-size: 1.5em;
    }
    :scope #total .TimeFlickHour, #total .TimeFlickMinite {
      font-size: 1.26em;
    }
    :scope .time-form div input {
      display: none;
    }
    :scope #total.time-form-label label {
      padding: 15px 2px;
    }
    :scope .time-form-label label {
      background-color: #0c6693;
      color: #ffffff;
      padding: 8px 2px;
      border-radius: 3px 3px 0 3px;
      width: 30%;
      display: inline-block;
      text-align: center;
      float: left;
    }
    :scope #timelimit {
      margin-left: 0;
      display: inline-block;
      padding-top: 10px;
      float: right;
      width: 66%;
      text-align: center;
    }
    :scope #section1, #section2, #section3 {
      margin-left: 0;
      display: inline-block;
      padding: 5px 0;
      font-size: 1.2em;
      float: right;
      width: 66%;
      text-align: center;
    }
    :scope .point1 label {
      color: #000000;
      background-color: #3dad6b;
    }
    :scope .point2 label {
      color: #000000;
      background-color: #e5b829;
    }
    :scope .point3 label {
      color: #000000;
      background-color: #bf3254;
    }
    :scope button {
      margin-top: 0;
    }
    :scope .area {
      margin-bottom: 1em;
      width: 95%;
      margin: 0 auto 15px;
      background-color: #2c3e50;
      padding: 10px 0;
      border-radius: 5px;
    }
    :scope .input-area {
      padding-left: 0;
      width: 93%;
      margin: 0 3% 0 auto;
    }
    :scope .description {
      background-color: #2c3e50;
      color: #ffffff;
      padding: 0 10px 15px;
      line-height: 1em;
      margin: 0;
    }
    :scope input, select, textarea {
      font-family : 'Lucida Console', sans-serif;
      font-size : 100%;
      padding-left: 4px;
      width: 3em;
      margin-bottom: 0.5em;
    }

    :scope .switchArea {
      display: flex;
      border-bottom: 1px dotted #2c3e50;
    }
    :scope .switchLabel {
      vertical-align: middle;
      margin-top: 0.3em;
      margin-right: 1em;
      width: 80%;
    }
    :scope .switch__label {
      width: 50px;
      position: relative;
      display: inline-block;
    }
    :scope .switch__content {
      display: block;
      cursor: pointer;
      position: relative;
      border-radius: 30px;
      height: 31px;
    overflow: hidden;
    }
    :scope .switch__content:before {
      content: "";
      display: block;
      position: absolute;
      width: calc(100% - 3px);
      height: calc(100% - 3px);
      top: 0;
      left: 0;
      border: 1.5px solid #E5E5EA;
      border-radius: 30px;
      background-color: #fff;
    }
    :scope .switch__content:after {
      content: "";
      display: block;
      position: absolute;
      background-color: transparent;
      width: 0;
      height: 0;
      top: 50%;
      left: 50%;
      border-radius: 30px;
      -webkit-transition: all .5s;
         -moz-transition: all .5s;
          -ms-transition: all .5s;
           -o-transition: all .5s;
              transition: all .5s;
    }
    :scope .switch__input {
      display: none;
    }
    
    :scope .switch__circle {
      display: block;
      top: 2px;
      left: 2px;
      position: absolute;
      -webkit-box-shadow: 0 2px 6px #999;
              box-shadow: 0 2px 6px #999;
      width: 27px;
      height: 27px;
      -webkit-border-radius: 20px;
              border-radius: 20px;
      background-color: #fff;
      -webkit-transition: all .5s;
         -moz-transition: all .5s;
          -ms-transition: all .5s;
           -o-transition: all .5s;
              transition: all .5s;
    }
    :scope .switch__input:checked ~ .switch__circle {
      left: 21px;
    }
    
    :scope .switch__input:checked ~ .switch__content:after {
      background-color: #4BD964;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    :scope .buttonArea {
      display: flex;
      border-bottom: 1px dotted #2c3e50;
    }
    :scope .buttonLabel {
      vertical-align: middle;
      margin-top: 0.3em;
      margin-right: 1em;
      width: 80%;
    }
    :scope .button__label {
      width: 50px;
      position: relative;
      display: inline-block;
    }
    :scope button {
      margin-right: 1em;
      width: 50px;
      height: 100%;
      background-color: #ea2b2b;
      box-shadow: 5px 4px black;
      border-radius: 15px;
      transition: .4s;
    }
  </style>

  <script>
    const myTagName = 'content-input'
    var self = this
    self.observer = opts.observer
    self.observer.on(EVENT_DESTROY, function(param) {
      if (param.includes(myTagName)) {
        self.show = false
        self.update()
      }
    })
    self.show = opts.show
    self.finishMsg = '設定完了'
    self.labelTotal = 'Total'
    self.labelPoint1 = 'Point-1'
    self.labelPoint2 = 'Point-2'
    self.labelPoint3 = 'Point-3'
    self.displayTotal = '---'
    self.displayPoint1 = '---'
    self.displayPoint2 = '---'
    self.displayPoint3 = '---'

    // 制限時間の入力 : Total
    onSettingTotal(e) {
      const inputID = 'timelimit-val'
      const lable   = self.labelTotal
      const minite  = self.timeLimitMinite
      const sec     = self.timeLimitSec
      self.settingTimer(inputID, lable, minite, sec);
    }

    // 制限時間の入力 : Point1
    onSettingPoint1(e) {
      const inputID = 'section1-val'
      const lable   = self.labelPoint1
      const minite  = self.section1Minite
      const sec     = self.section1Sec
      self.settingTimer(inputID, lable, minite, sec);
    }

    // 制限時間の入力 : Point2
    onSettingPoint2(e) {
      const inputID = 'section2-val'
      const lable   = self.labelPoint2
      const minite  = self.section2Minite
      const sec     = self.section2Sec
      self.settingTimer(inputID, lable, minite, sec);
    }

    // 制限時間の入力 : Point3
    onSettingPoint3(e) {
      const inputID = 'section3-val'
      const lable   = self.labelPoint3
      const minite  = self.section3Minite
      const sec     = self.section3Sec
      self.settingTimer(inputID, lable, minite, sec);
    }

    // 制限時間の入力
    settingTimer(inputID, lable, minite, sec) {
      const param = {
        "id": inputID,
        "title": lable+'の時間設定',
        "minite": minite,
        "sec": sec
      }
      self.observer.trigger(EVENT_TIME_INPUT_REQ, param)
    }

    // 制限時間の入力完了イベント受信
    self.observer.on(EVENT_TIME_INPUT_RES, function(param) {
      console.log('RCV '+EVENT_TIME_INPUT_RES, param)

      switch (param.id) {
        case 'timelimit-val':
          self.timeLimitMinite = param.minite
          self.timeLimitSec = param.sec
          break;
        case 'section1-val':
          self.section1Minite = param.minite
          self.section1Sec = param.sec
          break;
        case 'section2-val':
          self.section2Minite = param.minite
          self.section2Sec = param.sec
          break;
        case 'section3-val':
          self.section3Minite = param.minite
          self.section3Sec = param.sec
          break;
        default:
          break;
      }
      self.setDisplay()
      self.update()
    })

    setDisplay() {
      // Total の表示文字列
      if (self.timeLimitMinite == 0 && self.timeLimitSec == 0) {
        self.displayTotal = '---'
      }
      else {
        self.displayTotal = self.timeLimitMinite + ' 分 ' + self.timeLimitSec + ' 秒'
      }

      // Point-1 の表示文字列
      if (self.section1Minite == 0 && self.section1Sec == 0) {
        self.displayPoint1 = '---'
      }
      else {
        self.displayPoint1 = self.section1Minite + ' 分 ' + self.section1Sec + ' 秒'
      }

      // Point-2 の表示文字列
      if (self.section2Minite == 0 && self.section2Sec == 0) {
        self.displayPoint2 = '---'
      }
      else {
        self.displayPoint2 = self.section2Minite + ' 分 ' + self.section2Sec + ' 秒'
      }

      // Point-3 の表示文字列
      if (self.section3Minite == 0 && self.section3Sec == 0) {
        self.displayPoint3 = '---'
      }
      else {
        self.displayPoint3 = self.section3Minite + ' 分 ' + self.section3Sec + ' 秒'
      }
    }

    self.on('mount', function() {
      self.init(opts.setting)
    })

    // 初期処理
    init(param) {
      if (isLocalStorageAvailable()) {
        param = getSetting()
      }
      self.settingVersion   = param.version
      self.timeLimitMinite  = param.timeLimit.minite
      self.timeLimitSec     = param.timeLimit.sec
      self.timeLimitColor   = param.timeLimit.color
      self.section1Minite   = param.section1.minite
      self.section1Sec      = param.section1.sec
      self.section1Color    = param.section1.color
      self.section2Minite   = param.section2.minite
      self.section2Sec      = param.section2.sec
      self.section2Color    = param.section2.color
      self.section3Minite   = param.section3.minite
      self.section3Sec      = param.section3.sec
      self.section3Color    = param.section3.color
      self.isCheckRemain    = param.display.timeLimit
      self.isCheckFlash     = param.display.timeOverAnimation
      self.blockNumHorizon  = param.display.blockNumHorizon
      self.blockNumVertical = param.display.blockNumVertical
      self.setDisplay()
    }

    // 制限時間の指定色の取得
    colorTimelimit() {
      self.timeLimitColor = self.refs.timeLimitColor.value
    }

    colorSection1() {
      self.section1Color = self.refs.section1Color.value
    }

    colorSection2() {
      self.section2Color = self.refs.section2Color.value
    }

    colorSection3() {
      self.section3Color = self.refs.section3Color.value
    }

    onCheckRemain() {
      console.log('onCheckRemain() '+self.refs.checkRemain.checked)
      self.isCheckRemain = self.refs.checkRemain.checked
    }

    onCheckFlash() {
      console.log('onCheckFlash() '+self.refs.checkFlash.checked)
      self.isCheckFlash = self.refs.checkFlash.checked
    }

    // 設定開始イベント受信
    self.observer.on(EVENT_SETTING_EXEC, function(param) {
      self.show = true
      self.update()
    })

    // 設定情報の取得
    getSetting() {
      var param = {
        "version":  self.settingVersion,
        "timeLimit": {
          "minite": parseInt(self.timeLimitMinite),
          "sec":    parseInt(self.timeLimitSec),
          "color":  self.timeLimitColor
        },
        "section1": {
          "minite": parseInt(self.section1Minite),
          "sec":    parseInt(self.section1Sec),
          "color":  self.section1Color
        },
        "section2": {
          "minite": parseInt(self.section2Minite),
          "sec":    parseInt(self.section2Sec),
          "color":  self.section2Color
        },
        "section3": {
          "minite": parseInt(self.section3Minite),
          "sec":    parseInt(self.section3Sec),
          "color":  self.section3Color
        },
        "display": {
          "timeLimit": self.isCheckRemain,
          "timeOverAnimation": self.isCheckFlash,
          "blockNumHorizon":  self.blockNumHorizon,
          "blockNumVertical": self.blockNumVertical
        }
      }
      return param
    }

    // 設定初期化ボタン押下
    initSetting() {
      var param = {
        "id": DIALOG_ID_SETTING_RESET,
        "title": '確認',
        "msg": '設定を初期化しますか？',
        "btn": [DIALOG_YES, DIALOG_NO]
      }
      self.observer.trigger(EVENT_SHOW_DIALOG, param)
    }

    // 設定初期化イベント受信
    self.observer.on(EVENT_SETTING_RESET, function(param) {
      console.log('RCV '+EVENT_SETTING_RESET, param)
      // YESを選択されなかった場合
      if (!param.btn.includes(DIALOG_YES)) {
        // 何も処理をしない
        return
      }

      // ローカルストレージの設定情報を初期化
      var param = initSetting()
      // 初期処理
      self.init(param)
      self.update()
    })

    // ミックスインでタグを超えて機能を共有
    riot.mixin('ContentInputTag', {
      getSetting: function() {
        return self.getSetting()
      }
    })
  </script>

</content-input>
