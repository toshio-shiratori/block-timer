<content-main>

  <div if={ show } style={ myStyle } class="relative">
    <div if={ showTimeOverAnimation } class="flash overlay-flash"></div>
    <div if={ startBtnShow } class="overlay">
      <a href="#" class="square_btn" onclick={ onStart }><img class="icon" alt="start" src="assets/img/ic_startBtn_3.png"></a>
    </div>
    <div if={ stopBtnShow } class="overlay-return">
      <img class="icon" alt="stop" src="assets/img/ic_stop2.png" onclick={ onStop }>
    </div>
    <grid-timer parent={ opts } setting={ setting }></grid-timer>
  </div>

  <style>
    :scope .icon {
      width: 30px;
      height: 30px;
      margin: 0;
    } 
    :scope .square_btn .icon {
      width: 160px;
      height: 160px;
      margin: 0;
    } 
    :scope .relative {
      position: relative;
      width: 100%;
    }
    :scope .overlay {
      position: absolute;
      top: 45%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      -o-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);      
    }
    :scope .overlay-stop {
      position: absolute;
      top: -6%;
      left: 7%;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      -o-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);      
    }
    :scope .overlay-return {
      position: fixed;
      top: 32px;
      right: 0px;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      -o-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);      
    }
    :scope .square_btn {
      display: inline-block;
      padding: 0.5em 1em;
      text-decoration: none;
      border-radius: 4px;
      color: #ffffff;
    }
    :scope .square_btn:active {
      -ms-transform: translateY(4px);
      -webkit-transform: translateY(4px);
      transform: translateY(4px);
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
      border-bottom: none;
    }
    :scope .square_btn img {
      width: 200px;
    }
    :scope .transparent_btn {
      display: inline-block;
      padding: 0.5em 1em;
      text-decoration: none;
      border-radius: 4px;
      color: #ffffff;
    }
    :scope .transparent_btn:active {
      -ms-transform: translateY(4px);
      -webkit-transform: translateY(4px);
      transform: translateY(4px);
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
      border-bottom: none;
    }
    :scope .transparent_btn img {
      width: 64px;
    }    
    :scope .overlay-flash {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      -o-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);      
    }
    :scope .flash {
      display: table;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background: #ce2828;
      color: #ffffff;
      float: left;
      margin-right: 10px;
      animation: flash 0.5s infinite linear;
      -webkit-animation: flash 0.5s infinite linear;
      -moz-animation: flash 0.5s infinite linear;
    }
    @keyframes flash {
      0% { visibility: hidden; }
      50% { visibility: hidden; }
      100% { visibility: visible; }
    }
    @-webkit-keyframes flash {
      0% { visibility: hidden; }
      50% { visibility: hidden; }
      100% { visibility: visible; }
    }
    @-moz-keyframes flash {
      0% { visibility: hidden; }
      50% { visibility: hidden; }
      100% { visibility: visible; }
    }
    :scope .flash:last-child {
      margin-right: 0;
    }
    :scope .flash span {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
  </style>

  <script>
    const myTagName = 'content-main'
    var self = this
    self.observer = opts.observer
    self.observer.on(EVENT_DESTROY, function(param) {
      if (param.includes(myTagName)) {
        self.show = false
        self.update()
      }
    })

    self.show = opts.show
    self.myStyle = {
      height: opts.height+'px'
    }
    self.startBtnShow = true
    self.stopBtnShow = false
    self.showTimeOverAnimation = false

    // スリープを抑制する NoSleep クラスのインスタンス生成
    self.noSleep = new NoSleep();

    // マウントイベント受信
    self.on('mount', function() {
      self.init(opts.setting)
      riot.mount('grid-timer')
    })

    // メイン初期処理イベント受信
    self.observer.on(EVENT_MAIN_INIT, function(param) {
      self.init(param)
      self.startBtnShow = true
      self.stopBtnShow = false
      self.update()
    })

    // メインタイムアップイベント受信
    self.observer.on(EVENT_MAIN_TIMEUP, function(param) {
      self.startBtnShow = false
      self.stopBtnShow = true
      if (self.setting.display.timeOverAnimation) {
        self.timeOverAnimation()
      }
      self.update()      
    })

    // メイン初期処理
    init(param) {
      self.show = true
      self.setting = param
      if (isLocalStorageAvailable()) {
        self.setting = getSetting()
      }
      self.update()
    }

    // タイムオーバーアニメーション
    timeOverAnimation() {
      console.log('timeOverAnimation')
      self.showTimeOverAnimation = true
      setTimeout(function() {
        self.showTimeOverAnimation = false
        self.update()
      }, 5000)
    }

    // 開始ボタンを押下
    onStart(e) {
      console.log('onStart')

      // 画面のスリープ制御を無効化
      self.noSleep.enable();
      console.log('call noSleep.enable()')

      self.startBtnShow = false
      self.stopBtnShow = true
      self.update()
      self.observer.trigger(EVENT_MAIN_EXEC, null)
    }

    // 停止ボタンを押下
    onStop(e) {
      console.log('onStop')

      // 画面のスリープ制御を有効化
      self.noSleep.disable();
      console.log('call noSleep.disable()')

      // タイマー停止
      self.mixin('GridTimerTag').stopTimer()
      self.showTimeOverAnimation = false
      self.update()

      var param = self.mixin('ContentInputTag').getSetting()
      self.observer.trigger(EVENT_MAIN_RETURN, param)
    }
  </script>

</content-main>
