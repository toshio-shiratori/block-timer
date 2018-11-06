// インクルード
import ArakinPart from './arakin_part.js';

export default class ArakinPartGridRect extends ArakinPart {
    constructor(params) {
        super(params);
        this.fillStyle = this.profile.getProfileData('fillStyle', 'rgb(0,0,0)');
        this.bindProperty('distanceX',     this.profile.getProfileData('distanceX', 1));
        this.bindProperty('distanceY',     this.profile.getProfileData('distanceY', 1));
        this.bindProperty('subW',     this.profile.getProfileData('subW', 5));
        this.bindProperty('subH',     this.profile.getProfileData('subH', 5));
        this.bindProperty('startIndex',     this.profile.getProfileData('startIndex', 0));
        this.drawInfo = new Array();
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params['distanceX'] = 1;
        params['distanceY'] = 1;
        params['subW'] = 5;
        params['subH'] = 5;
        return params;
    }

    setDrawInfo(drawInfo) {
        this.drawInfo = drawInfo;
    }

	/**
	* 子矩形のX座標を要素番号から取得
	* @param int index 要素番号
    * @return int 子矩形のX座標
    * @note このメソッドはグリッドで描画される矩形の番号(0～)からX座標を取得します。
    * 例えば横に10個の矩形が描画されている場合9と指定した場合10個目の子矩形のX座標を返します。
    * 10と指定した場合は次の行の先頭の矩形のX座標となるため0となります。
	*/
    getSubRectXFromIndex(index) {
        // 属性を取得
        var distanceX = this.getCalcValue('distanceX');
        var subW = this.getCalcValue('subW');

        // 横の矩形数を取得
        var xCount = this.getSubRectXCount();

        // この計算でx方向に対する矩形番号を取得
        var xIndex = (index % xCount);

        // 幅と間隔を計算
        return xIndex * (distanceX + subW);
    }

	/**
	* 子矩形の列数を取得
    * @return int 子矩形の列数
	*/
    getSubRectXCount() {
        // 属性を取得
        var w = this.getCalcValue('w');
        var distanceX = this.getCalcValue('distanceX');
        var subW = this.getCalcValue('subW');

        // 横の矩形数を取得
        return Math.floor( w / ( distanceX + subW ) );
    }

	/**
	* 子矩形のY座標を要素番号から取得
	* @param int index 要素番号
    * @return int 子矩形のY座標
    * @note このメソッドはグリッドで描画される矩形の番号(0～)からY座標を取得します。
    * 例えば横に10個の矩形が描画されている場合9と指定した場合10個目までのY座標は0となります。
    * 10と指定した場合は次の行となるため2行目のY座標を返します。
    * なお、この関数は要素番号が行数を超えた場合の考慮をしていないので注意してください。
	*/
    getSubRectYFromIndex(index) {

        var w = this.getCalcValue('w');
        var distanceX = this.getCalcValue('distanceX');
        var subW = this.getCalcValue('subW');
        var distanceY = this.getCalcValue('distanceY');
        var subH = this.getCalcValue('subH');

        // 横の矩形数を取得
        var xCount = Math.floor( w / ( distanceX + subW ) );

        // この計算でx方向に対する矩形番号を取得
        var yIndex = Math.floor(index / xCount);

        // 幅と間隔を計算
        return yIndex * (distanceY + subH);
    }

	/**
	* 子矩形の列数を取得
    * @return int 子矩形の列数
	*/
    getSubRectYCount() {
        // 属性を取得
        var h = this.getCalcValue('h');
        var distanceY = this.getCalcValue('distanceY');
        var subH = this.getCalcValue('subH');

        // 横の矩形数を取得
        return Math.floor( h / ( distanceY + subH ) );
    }

	/**
	* 子矩形の総数を取得
    * @return int 子矩形総数
	*/
    getSubRectTotalCount() {
        return this.getSubRectXCount() * this.getSubRectYCount();
    }

    draw() {
        var canvas = document.getElementById(this.canvasId);
        if( !canvas || !canvas.getContext ) return false;
        var ctx = canvas.getContext('2d');
        var angle = this.getCalcValue('angle') * Math.PI / 180;
        ctx.save( );
        ctx.translate( this.getCalcValue('centerx') + this.getCalcValue('x'),
                    this.getCalcValue('centery') + this.getCalcValue('y'));
        ctx.rotate(angle);
        ctx.scale(this.getCalcValue('scalex'), this.getCalcValue('scaley'));
        ctx.globalAlpha = this.getCalcValue('a');
        ctx.fillStyle = this.fillStyle;

        // w / ( distanceX + subW ) これで幅に描画できる矩形数を計算
        var centerx = this.getCalcValue('centerx');
        var centery = this.getCalcValue('centery');
        var w = this.getCalcValue('w');
        var h = this.getCalcValue('h');
        var distanceX = this.getCalcValue('distanceX');
        var distanceY = this.getCalcValue('distanceY');
        var subW = this.getCalcValue('subW');
        var subH = this.getCalcValue('subH');
        var xCount = Math.floor( w / ( distanceX + subW ) );
        var yCount = Math.floor( h / ( distanceY + subH ) );

        // 空いている配列を使いまわす
        // 空いていない場合は末尾に要素を追加
        for (var i in this.drawInfo) {
            this.drawFromIndexRange(ctx,this.drawInfo[i]['startIndex'], this.drawInfo[i]['endIndex'], this.drawInfo[i]['fillStyle'] );
        }
        ctx.restore();
//        console.log( this.getSubRectTotalCount() );
    }

	/**
    * 矩形要素番号に該当する矩形を描画する
    * @param context ctx コンテキスト情報
    * @param int index 子矩形の要素番号
    * @param string fillStyle 塗りつぶし色情報
	*/
    drawFromIndex(ctx, index, fillStyle) {
        ctx.fillStyle = fillStyle;
        var centerx = this.getCalcValue('centerx');
        var centery = this.getCalcValue('centery');
        var subW = this.getCalcValue('subW');
        var subH = this.getCalcValue('subH');
        var x = this.getSubRectXFromIndex(index);
        var y = this.getSubRectYFromIndex(index);
        ctx.fillRect( -centerx + x,
        -centery + y,
        subW,
        subH
        );
    }

	/**
    * 矩形要素番号に該当する矩形を描画する(要素範囲指定))
    * @param context ctx コンテキスト情報
    * @param int startIndex 子矩形の開始要素番号
    * @param int endIndex 子矩形の終了要素番号
    * @param string fillStyle 塗りつぶし色情報
	*/
    drawFromIndexRange(ctx, startIndex, endIndex, fillStyle) {
        for ( var i = startIndex ; i <= endIndex ; i++ ) {
            this.drawFromIndex(ctx, i, fillStyle);
        }
    }

}

  