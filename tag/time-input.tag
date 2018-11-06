<time-input>

  <div if={ show } class="disabledArea">
    <div class="dialogArea">
      <div class="titleArea">
        <div class="title">{ title }</div>
      </div>
      <div class="displayArea">
        <span class="display">{ display }</span>
      </div>
      <div class="buttonArea">
        <button class="buttonEx" type="button" onclick={ onPushButton }>7</button>
        <button class="buttonEx" type="button" onclick={ onPushButton }>8</button>
        <button class="buttonEx" type="button" onclick={ onPushButton }>9</button>
        <button class="buttonEx" type="button" onclick={ onPushButton }>4</button>
        <button class="buttonEx" type="button" onclick={ onPushButton }>5</button>
        <button class="buttonEx" type="button" onclick={ onPushButton }>6</button>
        <button class="buttonEx" type="button" onclick={ onPushButton }>1</button>
        <button class="buttonEx" type="button" onclick={ onPushButton }>2</button>
        <button class="buttonEx" type="button" onclick={ onPushButton }>3</button>
        <button class="buttonAC" type="button" onclick={ onAllClear }>AC</button>
        <button class="buttonEx" type="button" onclick={ onPushButton }>0</button>
        <button class="buttonDisable" type="button"></button>
        <button class="buttonFunction" type="button" onclick={ onMinConfirm }>分</button>
        <button class="buttonFunction" type="button" onclick={ onSecConfirm }>秒</button>
        <button class="buttonFunction" type="button" onclick={ onConfirm }>確定</button>
      </div>
    </div>
  </div>

  <style>
    :scope .disabledArea {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(00,00,00, 0.6);
    }
    :scope .dialogArea {
      position: absolute;
      top: calc(50% - 150px);
      left: calc(50% - 150px);
      width: 300px;
      height: auto;
      background-color: #336699;
      border-radius: 10px;
    }
    :scope .titleArea {
      background-color: #225588;
      height: auto;
      border-radius: 10px 10px 0 0;
    }
    :scope .title {
      color: black;
      text-align: center;
      font-size: 1.3em;
      padding: 5px 0;
      color: #ffffff;
      letter-spacing: 0.1em;
    }
    :scope .displayArea {
      margin-top: 1em;
      margin-bottom: 1em;
      padding-right: 1em;
      text-align: right;
    }
    :scope .display {
      font-size: 1.3em;
    }
    :scope .displayMin {
      grid-column-start: 2;
      grid-column-end: 5;
    }
    :scope .displaySec {
      grid-column-start: 5;
      grid-column-end: 9;
    }
    :scope .buttonArea {
      background-color: #b3b0b5;
      height: auto;
      text-align: center;
      border-radius: 0 0 10px 10px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    :scope .buttonEx {
      margin: 6px 10px 10px;
      padding: 5px;
    }
    :scope .buttonAC {
      background-color: #b3b0b5;
      margin: 6px 10px 10px;
      padding: 5px;
      background-color: #f39a9a;
    }
    :scope .buttonDisable {
      pointer-events: none;
      margin: 6px 10px 10px;
      padding: 5px;
      background-color: #9e9e9e;
    }
    :scope .buttonFunction {
      margin: 6px 10px 10px;
      padding: 5px;
      background-color: #fdff79;
      box-shadow: 1px 2px black;
    }
  </style>

  <script>
    const myTagName = TAG_TIME_INPUT
    var self = this
    self.observer = opts.observer
    self.show = opts.show

    self.setMin = false
    self.setSec = false
    self.display = null
    self.input = 0

    // 時間入力ダイアログ表示イベント受信
    self.observer.on(EVENT_TIME_INPUT_REQ, function(param) {
      console.log('RCV '+EVENT_TIME_INPUT_REQ, param)
      // ダイアログ表示
      self.showDialog(param)
    })

    // ダイアログ非表示
    hideDialog() {
      self.show = false
      self.id = null
      self.title = null
      self.minite = 0
      self.sec = 0
      self.setMin = false
      self.setSec = false
      self.display = null
      self.input = 0
      self.update()
    }

    // ダイアログ表示
    showDialog(param) {
      self.show = true
      self.id = param.id
      self.title = param.title
      self.minite = param.minite
      if (self.minite != 0) {
        self.setMin = true
      }
      self.sec = param.sec
      if (self.sec != 0) {
        self.setSec = true
      }
      self.setDisplay()
      self.update()
    }

    // 制限時間の表示設定
    setDisplay() {
      self.display = ''

      // 分が設定済
      if (self.setMin) {
        const MIN_MAX = 24*60
        if (self.minite > MIN_MAX) {
          self.setMin = false
          self.minite = 0
          self.display = '分は ' + MIN_MAX + ' まで'
          return 
        }
        self.display = self.minite + ' 分'
      }

      // 秒が設定済
      if (self.setSec) {
        const SEC_MAX = 59
        if (self.sec > SEC_MAX) {
          self.setSec = false
          self.sec = 0
          self.display = '秒は ' + SEC_MAX + ' まで'
          return 
        }
        if (self.setMin) {
          self.display += ' '
        }
        self.display += self.sec + ' 秒'
      }

      if (self.input != 0) {
        if (self.setMin) {
          self.display += ' '
        }
        self.display += self.input
      }

      // 何も設定されていない場合
      if (self.display == '') {
        self.display = '入力してください。'
      }
    }

    // 数字ボタン押下
    onPushButton(e) {
      console.log('onPushButton()', e.srcElement.innerText)
      if (self.input == 0) {
        self.input = e.srcElement.innerText
      }
      else {
        self.input += e.srcElement.innerText
      }
      self.setDisplay()
    }

    // ACボタン押下
    onAllClear() {
      console.log('onAllClear()', e)
      self.setMin = false
      self.setSec = false
      self.minite = 0
      self.sec = 0
      self.input = 0
      self.setDisplay()
      self.update()
    }

    // 分ボタン押下
    onMinConfirm() {
      console.log('onMinConfirm()', e)
      self.setMin = true
      self.minite = self.input
      self.input = 0
      self.setDisplay()
      self.update()
    }

    // 秒ボタン押下
    onSecConfirm() {
      console.log('onSecConfirm()', e)
      self.setSec = true
      self.sec = self.input
      self.input = 0
      self.setDisplay()
      self.update()
    }

    // 確定ボタン押下
    onConfirm(e) {
      console.log('onConfirm()', e)
      var param = {
        "id": self.id,
        "minite": self.minite,
        "sec": self.sec,
      }
      self.observer.trigger(EVENT_TIME_INPUT_RES, param)
      self.hideDialog()
    }
  </script>

</time-input>
