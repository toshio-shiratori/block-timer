<arakin-timer>

  <div if={ show }>
    <div if={ lifeTimeShow }>
      <p class="time-limit">Time { displayLifeTime }</p>
    </div>
    <div>
      <!-- Grid用のキャンバス -->
      <canvas id="canvas3"></canvas>
      <!--  <canvas id="canvas3" width="500" height="500"></canvas><br />  -->
    </div>
  </div>

  <style>
    :scope .time-limit {
      margin-top: 0px;
      margin-bottom: 0px;
      font-size: 1.2em;
    }
  </style>

  <script>
    const myTagName = TAG_ARAKIN_TIMER
    var self = this
    self.observer = opts.parent.observer
    self.observer.one(EVENT_DESTROY, function(param) {
      if (param.includes(myTagName)) {
        self.show = false
        self.update()
      }
    })

    self.show = opts.parent.show
    self.blocks = null
    self.gridTemplateCol = null
    self.gridTemplateRow = null
    self.lifeTimeShow = false
    self.displayLifeTime
    self.timer = null

    // マウントイベント受信
    self.on('mount', function() {
      self.init(opts.setting, true)
    })

    // アンマウントイベント受信
    self.on('unmount', function() {
      self.observer.off(EVENT_GRID_EXEC)
      self.observer.off(EVENT_GRID_RESUME)
      self.observer.off(EVENT_GRID_STOP)
      console.log('unmount')
    })

    // メイン初期処理イベント受信
    self.observer.on(EVENT_MAIN_INIT, function(param) {
      self.init(param, true)
    })

    // メイン処理の開始イベント受信
    self.observer.on(EVENT_GRID_EXEC, function(param) {
      // タイマー開始
      self.startTimer()
    })

    // メイン処理の再開イベント受信
    self.observer.on(EVENT_GRID_RESUME, function(param) {
      // タイマー開始
      self.startTimer()
    })

    // メイン処理の停止イベント受信
    self.observer.on(EVENT_GRID_STOP, function(param) {
      self.setDisplayLifeTime(self.currentLifeTime)
    })

    // メイン処理の終了イベント受信
    self.observer.on(EVENT_MAIN_FINISH, function(param) {
      // タイマー終了
      self.stopTimer()
    })

    // 遅延処理
    const delayRun = (waitSeconds, someFunction) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(someFunction())
        }, waitSeconds)
      })  
    }

    // メイン初期処理
    init(param, show) {
      if (typeof param !== 'undefined') {
        self.show = show
        // 制限時間を秒に変換して保持
        self.timeLimitSec = (param.timeLimit.minite * 60) + param.timeLimit.sec
        self.section1Sec = (param.section1.minite * 60) + param.section1.sec
        self.section2Sec = (param.section2.minite * 60) + param.section2.sec
        self.section3Sec = (param.section3.minite * 60) + param.section3.sec      
        self.currentLifeTime = self.timeLimitSec
        self.lifeTimeShow = param.display.timeLimit
        self.setDisplayLifeTime(self.currentLifeTime)
      }

      // メイン処理用のインスタンスを取得
      self.arakinMain = getArakinMain()
      if (typeof self.arakinMain === 'undefined') {
        // インスタンスが取得できるまで1秒遅延で自身のループ処理
        delayRun(1, self.init)
        return
      }

      //console.log(self.blocks)
      self.update()
    }

    // 表示ブロックの色を取得
    getBlockColor(lifeTimeExpire, param) {
      if (lifeTimeExpire < self.section3Sec) {
        return param.section3.color
      }
      if (lifeTimeExpire < self.section2Sec) {
        return param.section2.color
      }
      if (lifeTimeExpire < self.section1Sec) {
        return param.section1.color
      }
      return param.timeLimit.color
    }

    // タイマー開始
    startTimer() {
      if (self.timer == null) {
        self.timer = setInterval(self.tick, 1000)
        console.log('startTimer()', self.timer)

        // 同期処理を10ミリ秒毎に発生させるタイマーを登録
        self.arakinTimer = setInterval(syncArakinMain, 10)
      }
    }

    // タイマー終了
    stopTimer() {
      if (self.timer != null) {
        clearInterval(self.arakinTimer)

        console.log('stopTimer()', self.timer)
        clearInterval(self.timer)
        self.timer = null
        if (self.currentLifeTime <= 0) {
          self.observer.trigger(EVENT_MAIN_TIMEUP, null)
        }
      }
    }

    tick() {
      if (self.currentLifeTime > 0) {
        --self.currentLifeTime
        //console.log(self.currentLifeTime + 's')
      }
      else {
        self.stopTimer()
      }
      self.setDisplayLifeTime(self.currentLifeTime)
      self.update()
    }

    // 表示用の残り時間を設定
    setDisplayLifeTime(currentLifeTime) {
      var min = Math.floor(currentLifeTime / 60)
      var sec = Math.floor(currentLifeTime % 60)
      displayLifeTime = min + ':' + ('00' + sec).slice(-2)
    }

    // ミックスインでタグを超えて機能を共有
    riot.mixin('ArakinTimerTag', {
      startTimer: function() {
        return self.startTimer()
      },
      stopTimer: function() {
        return self.stopTimer()
      }
    })
  </script>

</arakin-timer>
