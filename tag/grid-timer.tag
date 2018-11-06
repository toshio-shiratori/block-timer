<grid-timer>

  <div if={ show }>
    <div if={ lifeTimeShow }>
      <p class="time-limit">Time { displayLifeTime }</p>
    </div>  
    <div class="grid-area" style="grid-template-columns: { gridTemplateCol };">
      <div  each={ cell in blocks }>
        <div class="block-unit" style="grid-row: { cell.col }/{ cell.col+1 }; grid-column: { cell.row }/{ cell.row+1 }; background-color: { cell.color }; color: { cell.color }" ref={ cell.ref }>
        .
        </div>
      </div>
    </div>
  </div>

  <style>
    :scope .grid-area {
      display: grid;
    }
    :scope .block-unit {
      background-color: #00ff00;
      color: #00ff00;
      margin-right: 2px;
      margin-bottom: 2px;
      font-size: x-small;
    }
    :scope .time-limit {
      margin-top: 0px;
      margin-bottom: 0px;
      font-size: 1.2em;
    }
  </style>

  <script>
    const myTagName = TAG_GRID_TIMER
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

    // グリッドエリアの部品配置
    calcGridArea(colNum, rowNum) {
      const MARGIN_WIDTH = 16
      var width = window.screen.availWidth - MARGIN_WIDTH
      var colSize = width / colNum + 'px'
      //console.log('colSize:'+colSize)

      var gridTemplateCol = []
      for(var col = 1; col <= colNum; col++) {
        gridTemplateCol.push(colSize)
      }
      var gridTemplateColValue = gridTemplateCol.join(' ')
      if (self.gridTemplateCol != gridTemplateColValue) {
        self.gridTemplateCol = gridTemplateColValue
        //console.log(self.gridTemplateCol)
      }
    }

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

    // メイン初期処理
    init(param, show) {
      self.show = show
      self.hideIndex = 0  // 非表示にしたブロックのインデックス
      // 制限時間を秒に変換して保持
      self.timeLimitSec = (param.timeLimit.minite * 60) + param.timeLimit.sec
      self.section1Sec = (param.section1.minite * 60) + param.section1.sec
      self.section2Sec = (param.section2.minite * 60) + param.section2.sec
      self.section3Sec = (param.section3.minite * 60) + param.section3.sec      
      self.currentLifeTime = self.timeLimitSec
      self.lifeTimeShow = param.display.timeLimit
      self.setDisplayLifeTime(self.currentLifeTime)

      var colNum = param.display.blockNumHorizon
      var rowNum = param.display.blockNumVertical
      self.lifeBlockMax = colNum * rowNum

      // グリッドエリアの部品配置
      self.calcGridArea(colNum, rowNum)

      self.blocks = []
      var lifeTimeOnce = self.timeLimitSec / self.lifeBlockMax
      var lifeTimeExpire = self.timeLimitSec
      for(var row = 1; row <= rowNum; row++) {
        for(var col = 1; col <= colNum; col++) {
          lifeTimeExpire = lifeTimeExpire - lifeTimeOnce
          if (lifeTimeExpire < 0) {
            lifeTimeExpire = 0
          }
          var color = self.getBlockColor(lifeTimeExpire, param)
          var cell = {
            "row": row,
            "col": col,
            "ref": 'blockUnit_'+row+'_'+col,
            "lifeTime": lifeTimeExpire,
            "color": color
          }
          self.blocks.push(cell)
        }
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
      }
    }

    // タイマー終了
    stopTimer() {
      if (self.timer != null) {
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
      self.hideBlock(self.currentLifeTime)
      self.setDisplayLifeTime(self.currentLifeTime)
      self.update()
    }

    // 表示用の残り時間を設定
    setDisplayLifeTime(currentLifeTime) {
      var min = Math.floor(currentLifeTime / 60)
      var sec = Math.floor(currentLifeTime % 60)
      displayLifeTime = min + ':' + ('00' + sec).slice(-2)
    }

    // ブロックの非表示
    hideBlock(currentLifeTime) {
      var currentIndex = self.hideIndex
      for (var index = self.hideIndex; index < self.lifeBlockMax; index++) {
        var cell = self.blocks[index]
        if (cell.lifeTime >= currentLifeTime) {
          self.refs[cell.ref].style.backgroundColor = 'black'
          self.refs[cell.ref].style.color = 'black'
          continue
        }
        self.hideIndex = index
        //console.log('hideIndex=', self.hideIndex)
        break
      }
    }

    // ミックスインでタグを超えて機能を共有
    riot.mixin('GridTimerTag', {
      startTimer: function() {
        return self.startTimer()
      },
      stopTimer: function() {
        return self.stopTimer()
      }
    })
  </script>

</grid-timer>
