// インクルード
import ArakinPartBuilder from './arakin_part_builder.js';
import ArakinStoryBuilder from './arakin_story_builder.js';

export default class ArakinScene {
    constructor(param) {
        this.parts = new Array();
        this.stories = new Array();
        this.nextSceneRequest = false;
        this.nextSceneName = '';
        this.canvasId        = param['canvasId'];
        this.name            = param['name'];
        this.globalValues    = param['globalValues'];
        this.startTimerValue = 0;
        this.progress        = 0;
    }

    /**
     * 名前を取得
     * 
     * @return string 名前
     * 
     */
    getName() {
        return this.name;
    }

    /**
     * 進捗を取得
     * 
     * @return int 進捗(ms)
     * 
     */
    getProgress() {
        return this.progress;
    }


    /**
     * キャンバスIDを取得
     * 
     * @return string キャンバスID
     * 
     */
    getCanvasId() {
        return this.canvasId;
    }

    /**
     * パーツ群を追加する
     * 
     * @param Array arakinPart パーツ群のオブジェクト
     * 
     */
    addParts(arakinParts, timerValue) {
        for (var i in arakinParts) {
            this.addPart( arakinParts[i], timerValue);
        }
    }

    /**
     * パーツを追加する
     * 本処理でパーツの描画順番を設定しています。
     * 
     * @param ArakinPart arakinPart 1パーツのオブジェクト
     * 
     */
    addPart(arakinPart, timerValue) {
        if ( arakinPart == null ) {
            return;
        }
        this.parts.push(arakinPart);
        this.parts.sort(function(a,b){
            if(a.priority<b.priority) return -1;
            if(a.priority > b.priority) return 1;
            return 0;
        });
        arakinPart.setCanvasId(this.getCanvasId());
        arakinPart.onEvent('start', null, timerValue);
    }

    /**
     * パーツを取得する
     * 
     * @param string name 名前
     * @return ArakinPart パーツオブジェクト
     *         存在しない場合はnull
     * 
     */
    getPart(name) {
        for (var i in this.parts) {
            if (this.parts[i].getName() == name) {
                    return this.parts[i];
            }
        }

        return null;
    }

    /**
     * 次のシーンに移動する準備をする
     * この処理を呼び出すとArakinMainが検知して次のシーンに移動します。
     * 
     * @param string nextSceneName シーン名称
     * 
     */
    nextScene(nextSceneName) {
        this.nextSceneName = nextSceneName;
        this.nextSceneRequest = true;
    }

    /**
     * 次のシーン名称を取得する
     * 
     * @return string シーン名称
     * 
     */
    getNextSceneName() {
        return this.nextSceneName;
    }

    /**
     * 次のシーンのリクエストがあるか？
     * この処理はArakinMainで随時呼び出されて処理します。
     * 
     * @retval boolean false リクエストなし
     * @retval boolean true  リクエストあり
     * 
     */
    isNextSceneRequest() {
        return this.nextSceneRequest;
    }

    /**
     * グローバル値を設定する
     * この処理は別シーンで共通で使用する値を設定できます。
     * 
     * @param string key キー
     * @param mix value 値
     * 
     */
    setGlobalValue(key, value) {
        this.globalValues[key] = value;
    }

    /**
     * グローバル値を取得
     * 
     * @param string key キー
     * @return mix 値
     * 
     */
    getGlobalValue(key) {
        return this.globalValues[key];
    }

    /**
     * TODO:後で削除
     */
    onEventStory(name, data, timerValue) {
    }

    /**
     * グローバル値を取得
     * 
     * @param string name イベント名
     * @param mix    data イベントに渡す配列情報
     * @param int    timerValue タイマー値
     * 
     */
    onEvent(name, data, timerValue) {
        switch ( name ) {
        // 開始
        case 'start':
            this.startTimerValue = timerValue;
            this.progress = 0;
            this.onEvent( 'init', null, timerValue);
            break;
        // 処理
        case 'proc':
            // ストーリーの処理
            for (var i in this.stories) {
                if ( this.stories[i]['enable'] ) {
                    var startTime = this.stories[i]['startTime'];
                    var progress = timerValue - this.stories[i]['timerValue'];
                    if ( progress >= startTime ) {
                            this.stories[i]['enable'] = false;
                            this.onEvent( this.stories[i]['name'], this.stories[i]['params'], timerValue);
                    }
                }
            }

            // パーツの処理
            for (var i in this.parts) {
                this.parts[i].onEvent('proc', data, timerValue);
            }
            this.progress = timerValue - this.startTimerValue;
            break;
        // ストーリー登録
        case 'story_entry':
            var stories = ArakinStoryBuilder.build(data, timerValue);
            for (var i in stories) {
                this.stories.push(stories[i]);
            }
            break;
        // パーツ登録
        case 'part_entry':
            var parts = ArakinPartBuilder.builds(data);
            this.addParts( parts, timerValue );
            break;
        // パーツ再スタート
        case 'part_restart':
            var partName = data['name'];
            var part = this.getPart(partName);
            if ( part ) {
                part.onEvent('start', data['params'], timerValue);
            }
            break;
        // パーツのプロパティ設定
        case 'part_property':
            var propertyName = data['name'];
            var part = this.getPart(propertyName);
            if ( part ) {
                var target = data['target'];
                var value = data['value'];
                part.setPropertyValue(target, value);
            }
            break;
        }
    }
}

export {ArakinScene};
