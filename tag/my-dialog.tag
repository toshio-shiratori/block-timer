<my-dialog>

  <div if={ show } class="disabledArea">
    <div class="dialogArea">
      <div class="titleArea">
        <div class="title">{ title }</div>
      </div>
      <div class="messageArea">
        <div class="message">{ msg }</div>
      </div>
      <div class="buttonArea">
        <button if={ btnYes } class="buttonEx" type="button" onclick={ onYes }>Yes</button>
        <button if={ btnNo } class="buttonEx" type="button" onclick={ onNo }>No</button>
        <button if={ btnOk } class="buttonEx" type="button" onclick={ onOk }>OK</button>
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
    :scope .messageArea {
      height: 200px;
    }
    :scope .message {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 1em;
    }
    :scope .buttonArea {
      background-color: #b3b0b5;
      height: auto;
      text-align: center;
      border-radius: 0 0 10px 10px;
    }
    :scope .buttonEx {
      width: 6em;
      margin-left: 1em;
      margin-right: 1em;
      margin: 6px 10px 10px;
      padding: 5px;
    }
  </style>

  <script>
    const myTagName = TAG_CONTENT_DIALOG
    var self = this
    self.observer = opts.observer
    self.show = opts.show

    // ダイアログ表示イベント受信
    self.observer.on(EVENT_SHOW_DIALOG, function(param) {
      console.log('RCV '+EVENT_SHOW_DIALOG, param)
      // ダイアログ表示
      self.showDialog(param)
    })

    // ダイアログ非表示
    hideDialog() {
      self.show = false
      self.id = null
      self.title = null
      self.msg = null
      self.btnYes = false
      self.btnNo = false
      self.btnOk = false
      self.update()
    }

    // ダイアログ表示
    showDialog(param) {
      self.show = true
      self.id = param.id
      self.title = param.title
      self.msg = param.msg
      if (param.btn.includes(DIALOG_YES)) {
        self.btnYes = true
      }
      if (param.btn.includes(DIALOG_NO)) {
        self.btnNo = true
      }
      if (param.btn.includes(DIALOG_OK)) {
        self.btnOk = true
      }
      self.update()
    }

    // YESボタン押下
    onYes(e) {
      var param = {
        "btn": DIALOG_YES
      }
      // TODO : IDによって処理分岐とか
      self.observer.trigger(EVENT_SETTING_RESET, param)
      self.hideDialog()
    }

    // NOボタン押下
    onNo(e) {
      var param = {
        "btn": DIALOG_NO
      }
      // TODO : IDによって処理分岐とか
      //self.observer.trigger(EVENT_SETTING_RESET, param)
      self.hideDialog()
    }

    // OKボタン押下
    onOk(e) {
      var param = {
        "btn": DIALOG_OK
      }
      // TODO : IDによって処理分岐とか
      //self.observer.trigger(EVENT_SETTING_RESET, param)
      self.hideDialog()
    }
  </script>

</my-dialog>
