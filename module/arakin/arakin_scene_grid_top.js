// インクルード
import ArakinScene from './arakin_scene.js';

export default class ArakinSceneGridTop extends ArakinScene {
	
    constructor(param) {
		super(param);

		// パーセンテージと色を渡すことで
		this.drawPercentInfo = new Array();

		var drawPercentInfo = new Array();
		drawPercentInfo[0] = new Array(); 
		drawPercentInfo[0]['percent'] = 40;
		drawPercentInfo[0]['fillStyle'] = 'rgb(0,0,255)';
		drawPercentInfo[1] = new Array(); 
		drawPercentInfo[1]['percent'] = 30;
		drawPercentInfo[1]['fillStyle'] = 'rgb(0,255,0)';
		drawPercentInfo[2] = new Array(); 
		drawPercentInfo[2]['percent'] = 20;
		drawPercentInfo[2]['fillStyle'] = 'rgb(255,255,0)';
		drawPercentInfo[3] = new Array(); 
		drawPercentInfo[3]['percent'] = 10;
		drawPercentInfo[3]['fillStyle'] = 'rgb(255,0,0)';
		this.setDrawPercentInfo(drawPercentInfo);

		this.gridRectEvent = new Array();
		this.gridRectStartTime = 0;
		this.gridRectTimeout = 0;
	}

	/**
	* パーセンテージと色を設定
	* @param array drawPercentInfo パーセンテージ情報
  * @note このメソッドはパーセンテージで矩形の色を変えます。
	*       配列の合計値が100%になるようにしてください。
	*/
	setDrawPercentInfo(drawPercentInfo) {
		this.drawPercentInfo = drawPercentInfo;
	}

	setGridRectTimeout(gridRectTimeout) {
		this.gridRectTimeout = gridRectTimeout;
	}

	convertDrawInfoWithPercent(percentInfo) {
		var convertDrawInfo = new Array();
		var grid = this.getPart('gridrect');
		var subRectTotalCount = grid.getSubRectTotalCount();
		var currentIndex = 0;
		for (var i in percentInfo) {
			var percentToCount = Math.floor(subRectTotalCount * percentInfo[i]['percent'] / 100);
			var endIndex = currentIndex + percentToCount;
			if ( endIndex > subRectTotalCount - 1 ) {
				endIndex = subRectTotalCount - 1;
			}
			convertDrawInfo.push( {'startIndex':currentIndex, "endIndex":endIndex, "fillStyle":percentInfo[i]['fillStyle']});
			currentIndex += percentToCount + 1;
		}
		return convertDrawInfo;
	}

	onEvent(name, data, timerValue) {
		super.onEvent(name, data, timerValue);
		switch ( name ) {
		case 'start':
			this.gridRectStartTime = timerValue;
			this.setGridRectTimeout(10000);
			var convertDrawInfo = this.convertDrawInfoWithPercent(this.drawPercentInfo);
			var grid = this.getPart('gridrect');
			grid.setDrawInfo(convertDrawInfo);

			this.gridRectEvent = new Array();
			var i = 0;
			for (i in convertDrawInfo) {
				this.gridRectEvent[i] = {'startIndex':convertDrawInfo[i]['startIndex'],'enable':true};
			}
			this.gridRectEvent.push( {'startIndex':convertDrawInfo[i]['endIndex'],'enable':true} );

			break;
		case 'proc':
			var grid = this.getPart('gridrect');
			var subRectTotalCount = grid.getSubRectTotalCount();
			var progressTime = (timerValue-this.gridRectStartTime);
			if ( progressTime > this.gridRectTimeout ) {
				progressTime = this.gridRectTimeout;
			}
			var rest = this.getPart('resttimer');
			rest.setPropertyValue('text', Math.ceil((this.gridRectTimeout - progressTime) / 1000) + '秒');
			var progress = progressTime / this.gridRectTimeout;
			var currentSubRectIndex = Math.floor(subRectTotalCount * progress);
			var convertDrawInfo = this.convertDrawInfoWithPercent(this.drawPercentInfo);
			convertDrawInfo.push( {'startIndex':0,'endIndex':currentSubRectIndex,'fillStyle':'rgb(0,0,0)'});
			grid.setDrawInfo(convertDrawInfo);
			for(var i in this.gridRectEvent) {

				if ( currentSubRectIndex >= this.gridRectEvent[i]['startIndex'] && this.gridRectEvent[i]['enable'] === true ) {
					this.gridRectEvent[i]['enable'] = false;
					var message = this.getPart('message');
					switch (i) {
					case '0':
						message.setMessage('開始');
						break;
					case '1':
						message.setMessage('まだまだ');
						break;
					case '2':
						message.setMessage('注意');
						break;
					case '3':
						message.setMessage('警告');
						break;
					case '4':
						message.setMessage('終了');
						break;
					}
				}
			}

			break;
		case 'mousedown':
			break;
		case 'init':
			var canvas = document.getElementById(this.canvasId);
			if( !canvas || !canvas.getContext ) return false;
			
			var canvas = document.getElementById(this.canvasId);

			// 背景
			this.onEvent( 'part_entry', 
										[
											{
												"class":"ArakinPartRect",
												"param": 
												{ 
													"name":"bg",
													"priority":0,
													"x":0,
													"y":0,
													"w":canvas.width,
													"h":canvas.height,
													"fillStyle":"rgb(0,0,0)"
												}
											}
										]
									, timerValue);

			// メッセージボックス
			this.onEvent( 'part_entry', 
									[
										{
											"class":"ArakinPartGridRect",
											"param": 
											{ 
												"name":"gridrect",
												"priority":10,
												"x":10,
												"y":50,
												"w":480,
												"h":230,
												"distanceX":1,
												"distanceY":1,
												"subW":10,
												"subH":10,												
												"fillStyle":"rgb(0,0,255)",
												"fillStyleR":255,
												"fillStyleG":255,
												"fillStyleB":255,
												"shadowBlur": 3,
												"shadowOffsetX": 3,
												"shadowOffsetY": 3,
												"fontSize": 32,
											}
										}
									]
								, timerValue);

			// メッセージボックス
			this.onEvent( 'part_entry', 
									[
										{
											"class":"ArakinPartMessage",
											"param": 
											{ 
												"name":"message",
												"priority":20,
												"x":10,
												"y":350,
												"w":480,
												"h":130,
												"fillStyle":"rgb(0,0,255)",
												"fillStyleR":255,
												"fillStyleG":255,
												"fillStyleB":255,
												"shadowBlur": 3,
												"shadowOffsetX": 3,
												"shadowOffsetY": 3,
												"fontSize": 32,
												"messageSpeed":500,
											}
										}
									]
								, timerValue);

			// テキスト
			this.onEvent( 'part_entry',
										[
											{
												"class":"ArakinPartText",
												"param": 
												{ 
													"name":"resttimer",
													"priority":30,
													"text":"xxxms",
													"x":10,
													"y":330,
													"fillStyleR":255,
													"fillStyleG":255,
													"fillStyleB":255,
													"shadowBlur": 3,
													"shadowOffsetX": 3,
													"shadowOffsetY": 3
												}
											}
										]
										, timerValue);
			break;
		}
	}
}
	