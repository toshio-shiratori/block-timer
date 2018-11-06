<my-header>

  <header style={ myStyle }>
    <h1>BlockTIMER</h1>
    <div class="btn">
      <img if={ showSetting } class="icon" alt="setting" src="assets/img/ic-setting.png" onclick={ onSetting }>
      <img if={ showReturn } class="icon" alt="return" src="assets/img/ic-return.png" onclick={ onMain }>
    </div>
    <div class="btn2">
      <img if={ showShare } class="icon" alt="share" src="assets/img/ic-share.png" onclick={ onShare }>
    </div>
  </header>

  <style>
    :scope .icon {
      width: 30px;
      height: 30px;
      margin-right: 1em;
      margin-top: 0.5em;
    }
    :scope header {
      width: 100%;
      /* Set the fixed height of the header here */
      color: #fff;
      background: #3f3f3f;
      background: -webkit-linear-gradient(
        #3f3f3f 0% ,
        #6f6f6f 100%);
      background: none;
      border: 0;
      text-align:center;
      margin-bottom: 1em;
    }
    :scope h1 {
      display: inline-block;
      font-size: 1.2rem;
      margin: 0;
      font-weight: normal;
      background-color: #2c3e50;
      padding: 5px 20px;
    }
    :scope .btn {
      position: fixed;
      right: 0;
      top: 5px;
    }
    :scope .btn2 {
      position: fixed;
      right: 40px;
      top: 5px;
    }
  </style>

  <script>
    const myTagName = TAG_CONTENT_HEADER
    var self = this
    self.observer = opts.observer
    self.showSetting = true
    self.showReturn = false
    self.showShare = true

    self.myStyle = {
      height: opts.height+'px'
    }

    // メイン処理の開始イベント受信
    self.observer.on('*', function(param) {
      //console.log('header event rcv!!')
      if (self.showReturn == false) {
        var state = self.mixin('ControllerTag').getState()
        switch (state) {
          case STATE_MAIN_INIT:
          case STATE_MAIN_STOP:
            self.showSetting = true
            self.showShare = true
            break
          case STATE_MAIN_EXEC:
            self.showSetting = false
            self.showShare = false
            break
        }
        self.update()
      }
    })

    onSetting(e) {
      self.showSetting = false
      self.showReturn = true
      self.showShare = false
      self.update()

      self.mixin('GridTimerTag').stopTimer()
      self.observer.trigger(EVENT_MAIN_FINISH, null)
    }

    onMain(e) {
      self.showSetting = true
      self.showReturn = false
      self.showShare = true
      self.update()

      var param = self.mixin('ContentInputTag').getSetting()
      setSetting(param)
      self.observer.trigger(EVENT_SETTING_FINISH, param)
    }

    onShare(e) {
      console.log('onShare()', e)
      var param = {
        "id": DIALOG_ID_SHARE_QR_CODE,
        "title": '共有',
        "msg": 'QRリーダーでスキャンして下さい。',
        "btn": [DIALOG_OK]
      }
      self.observer.trigger(EVENT_SHOW_SHARE_DIALOG, param)
    }
  </script>

</my-header>
