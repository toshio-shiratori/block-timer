// インクルード
import ArakinPart from './arakin_part.js';

export default class ArakinPartHanabi extends ArakinPart {

    /**
     * コンストラクタ
     * @return array params パラメータ情報
     */
    constructor(params) {
        super(params);
        this.hanabis = new Array();
        this.summaryHantei = new Array();
        this.summaryHantei[0] = 0;
        this.summaryHantei[1] = 0;
        this.summaryHantei[2] = 0;
        this.summaryHantei[3] = 0;
        this.summaryCombo = 0;
        this.nowCombo = 0;
    }

    /**
     * プロパティ一覧を取得
     * @return array プロパティ一覧
     */
    static getPropertyList() {
        var params = super.getPropertyList();
        return params;
    }

    /**
     * 判定の集計を取得
     * @param int index 判定を示す数値
     * @return int 判定数
     */
    getSummaryHantei(index) {
        return this.summaryHantei[index];
    }

    /**
     * 最大コンボ数を取得
     * @return int コンボ数
     */
    getSummaryCombo() {
        return this.summaryCombo;
    }

    /**
     * 現在のコンボ数を取得
     * @return int コンボ数
     */
    getNowCombo() {
        return this.nowCombo;
    }

    /**
     * 花火の初期化
     */
    initHanabi() {
        var hanabi = new Array();

        // 花火を表示する位置の乱数はここで調整します
        hanabi['x'] = 300 * Math.random() - 150;
        hanabi['y'] = 100 * Math.random() - 100;
        hanabi['w'] = 3;
        hanabi['h'] = 3;
        hanabi['r'] = 30;

        // クリックするタイミングを示す円の色
        hanabi['delayColor'] = 'rgb(0,255,0)';
        // タイミングの縁の半径
        hanabi['delayR'] = 50;

        // 半径の表示する時間(ミリ秒)
        hanabi['delayTime'] = 1000;

        // 花火の色
        // この色は判定で自動処理されるのでここではダミーです。
        hanabi['hanabiColor'] = 'rgb(255,255,0)';

        hanabi['startTimer'] = this.timerValue;

        // 花火を表示する時間
        hanabi['time'] = 1000;

        // 判定関連
        // ここは判定で自動的に入ります。
        hanabi['hantei'] = 0;
        hanabi['enable'] = true;
        hanabi['minogasi'] = false;

        // 空いている配列を使いまわす
        // 空いていない場合は末尾に要素を追加
        for (var i in this.hanabis) {
            if ( this.hanabis[i]['enable'] == false ) {
                this.hanabis[i] = hanabi;
                return;
            }
        }
        this.hanabis.push(hanabi);
    }

    /**
     * 花火の判定を行う
     * @param int timerValue タイマー値
     */
    hanteiHanabi(timerValue) {
        var targetIndex = -1;
        var minHanteiTime = -800;
        for (var i in this.hanabis) {
            if ( this.hanabis[i]['enable'] == false ) {
                continue;
            }
            if ( this.hanabis[i]['hantei'] != 0 ) {
                continue;
            }

            var hanteiTime = timerValue - this.hanabis[i]['startTimer'] - this.hanabis[i]['delayTime'];
            if ( hanteiTime > 0 ) {
                continue;
            }
            if ( minHanteiTime < hanteiTime ) {
                minHanteiTime = hanteiTime;
                targetIndex = i;
            }
        }

        if (targetIndex == -1) {
            // 該当なし
            return;
        }

        var hantei = 0;
        if ( minHanteiTime >= -200 ) {
            hantei = 1;
            this.hanabis[targetIndex]['r'] = 100;
        }
        else if ( minHanteiTime >= -400 ) {
            hantei = 2;
            this.hanabis[targetIndex]['r'] = 70;
        }
        else {
            hantei = 3;
            this.hanabis[targetIndex]['r'] = 50;
        }

        this.nowCombo ++;
        this.summaryHantei[hantei] ++;
        this.hanabis[targetIndex]['hantei'] = hantei;
        if ( this.nowCombo > this.summaryCombo ) {
            this.summaryCombo = this.nowCombo;
        }
    }

    /**
     * 描画処理
     */
    draw() {
        var canvas = document.getElementById(this.canvasId);
        if( !canvas || !canvas.getContext ) return false;
        var ctx = canvas.getContext('2d');
        for ( var i in this.hanabis ) {
            this.drawHanabi(ctx, this.hanabis[i]);
        }

    }

    /**
     * 1花火の描画処理
     * @param context ctx 描画するコンテキスト情報
     * @param array data 1花火の情報
     */
    drawHanabi(ctx, data) {
        if (data['enable'] == false) {
            return;
        }

        // 現在の描画属性を保存
        ctx.save( );

        var progress = this.timerValue - data['startTimer'] - data['delayTime'];
        if ( progress <= 0 ) {
            var calcDelayR = (-progress) / data['delayTime'] * data['delayR'];
            ctx.strokeStyle = data['delayColor'];
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(data['x'] + this.getCalcValue('w') / 2 , data['y'] + this.getCalcValue('h') / 2 , calcDelayR, 0, Math.PI*2, false);
            ctx.stroke();
            ctx.restore();
            return;
        }
        else if ( progress <= data['time']) {

        }
        else {
            progress = data['time'];
        }

        switch (data['hantei']) {
        case 1:
            ctx.fillStyle = 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
            break;
        case 2:
            ctx.fillStyle = 'rgb(0,255,255)';
            break;
        case 3:
            ctx.fillStyle = 'rgb(255,128,255)';
            break;
        default:
            ctx.fillStyle = 'rgb(255,255,0)';
            if ( data['minogasi'] == false ) {
                data['minogasi'] = true;
                this.nowCombo = 0;
                this.summaryHantei[0] ++;
            }
            break;
        }

        // 実際の花火演出
        var angleDistance = 30;
        var calcR = (Math.pow(progress / (data['time']), 1 )) * data['r'];
        for ( var i = 0 ; i < 360 ; i += angleDistance ) {
            for (var j = 1 ; j <= 2 ; j++) {
                var calcX = Math.sin( Math.PI / 180 * i ) * calcR / (1+j*0.10) + data['x'] + this.getCalcValue('w') / 2;
                var calcY = Math.cos( Math.PI / 180 * i ) * calcR / (1+j*0.10) + data['y'] + this.getCalcValue('h') / 2;
                ctx.beginPath();
                ctx.arc(calcX, calcY, data['w'], 0, Math.PI*2, false);
                ctx.fill();
            }
        }

        // トータルを表示
        ctx.fillStyle = 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
        ctx.fillText( 'かんぺき！:' + this.summaryHantei[1], 10, 20 );
        ctx.fillStyle = 'rgb(0,255,255)';
        ctx.fillText( 'すごい！:' + this.summaryHantei[2], 10, 40 );
        ctx.fillStyle = 'rgb(255,0,255)';
        ctx.fillText( 'いいよ！:' + this.summaryHantei[3], 10, 60 );
        ctx.fillStyle = 'rgb(255,255,0)';
        ctx.fillText( 'みたよ！:' + this.summaryHantei[0], 10, 80 );
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText( 'れんぞく:' + this.nowCombo, 10, 100 );
        ctx.fillText( 'さいだい:' + this.summaryCombo, 10, 120 );

        // 描画属性を復元
        ctx.restore();

        if ( progress >= data['time'] ) {
            data['enable'] = false;
        }
    }
}

  