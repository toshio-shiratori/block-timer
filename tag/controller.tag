<controller>

  <script>
    var self = this
    self.observer = opts.observer
    self.state = STATE_MAIN_INIT
    var subRoute = route.create() // create another routing context

    self.events = [
      {
        "eventRecieved": EVENT_MAIN_EXEC,
        "eventNext":     EVENT_GRID_EXEC,
        "stateCurrent":  [STATE_MAIN_INIT],
        "stateNext":     STATE_MAIN_EXEC,
        "destroy": null
      },
      {
        "eventRecieved": EVENT_MAIN_TIMEUP,
        "eventNext":     null,
        "stateCurrent":  [STATE_MAIN_EXEC],
        "stateNext":     STATE_MAIN_TIMEUP,
        "destroy": null
      },
      {
        "eventRecieved": EVENT_MAIN_STOP,
        "eventNext":     EVENT_GRID_STOP,
        "stateCurrent":  [STATE_MAIN_EXEC],
        "stateNext":     STATE_MAIN_STOP,
        "destroy": null
      },
      {
        "eventRecieved": EVENT_MAIN_RESUME,
        "eventNext":     EVENT_GRID_RESUME,
        "stateCurrent":  [STATE_MAIN_STOP],
        "stateNext":     STATE_MAIN_EXEC,
        "destroy": null
      },
      {
        "eventRecieved": EVENT_MAIN_RETURN,
        "eventNext":     EVENT_MAIN_INIT,
        "stateCurrent":  [STATE_MAIN_EXEC, STATE_MAIN_TIMEUP],
        "stateNext":     STATE_MAIN_INIT,
        "destroy": null
      },
      {
        "eventRecieved": EVENT_SETTING_FINISH,
        "eventNext":     EVENT_MAIN_INIT,
        "stateCurrent":  [STATE_SETTING],
        "stateNext":     STATE_MAIN_INIT,
        "destroy": [TAG_CONTENT_INPUT]
      },
      {
        "eventRecieved": EVENT_MAIN_FINISH,
        "eventNext":     EVENT_SETTING_EXEC,
        "stateCurrent":  [STATE_MAIN_INIT, STATE_MAIN_STOP, STATE_MAIN_TIMEUP],
        "stateNext":     STATE_SETTING,
        "destroy": [TAG_CONTENT_MAIN]
      }
    ]

    // 状態取得
    getState() {
      return self.state
    }

    // 設定完了イベント受信
    self.observer.on(EVENT_SETTING_FINISH, function(param) {
      var event = eventDispatch(EVENT_SETTING_FINISH, param)
      // Do nothing.
      eventNotify(event.eventNext, param)
    })

    // メイン開始イベント受信
    self.observer.on(EVENT_MAIN_EXEC, function(param) {
      var event = eventDispatch(EVENT_MAIN_EXEC, param)
      // Do nothing.
      eventNotify(event.eventNext, param)
    })

    // メイン停止イベント受信
    self.observer.on(EVENT_MAIN_STOP, function(param) {
      var event = eventDispatch(EVENT_MAIN_STOP, param)
      // Do nothing.
      eventNotify(event.eventNext, param)
    })

    // メイン再開イベント受信
    self.observer.on(EVENT_MAIN_RESUME, function(param) {
      var event = eventDispatch(EVENT_MAIN_RESUME, param)
      // Do nothing.
      eventNotify(event.eventNext, param)
    })

    // メイン再試行イベント受信
    self.observer.on(EVENT_MAIN_RETURN, function(param) {
      var event = eventDispatch(EVENT_MAIN_RETURN, param)
      // Do nothing.
      eventNotify(event.eventNext, param)
    })

    // メインタイムアップイベント受信
    self.observer.on(EVENT_MAIN_TIMEUP, function(param) {
      var event = eventDispatch(EVENT_MAIN_TIMEUP, param)
      // Do nothing.
      eventNotify(event.eventNext, param)
    })

    // メイン終了イベント受信
    self.observer.on(EVENT_MAIN_FINISH, function(param) {
      var event = eventDispatch(EVENT_MAIN_FINISH, param)
      // Do nothing.
      eventNotify(event.eventNext, param)
    })

    // イベント受信ディスパッチ
    function eventDispatch(eventMsg, param) {
      console.log('RCV '+eventMsg, param)
      var event = null
      self.events.some(function(info) {
        if (eventMsg == info.eventRecieved) {
          event = info
          if (!info.stateCurrent.includes(self.state)) {
              console.error(self.state)
          }
          return true
        }
      })
      if (event == null) {
        throw "target event not defined."
      }

      // 状態更新
      if (self.state != event.stateNext) {
        self.state = event.stateNext
        console.log('state changed : '+self.state)
      }

      // 不要タグの削除
      if (event.destroy != null) {
        eventNotify(EVENT_DESTROY, event.destroy)
      }

      return event
    }

    // イベント通知
    // ログ出力 ON/OFF の切り替えを制御するためにラッパーを作成
    function eventNotify(event, param) {
      if (event == null) {
        return
      }
      self.observer.trigger(event, param)
      console.log('SND ' + event, param)
    }

    // ミックスインでタグを超えて機能を共有
    riot.mixin('ControllerTag', {
      getState: function() {
        return self.getState()
      }
    })
  </script>

</controller>