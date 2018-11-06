// インクルード
import ArakinScene from './arakin_scene.js';

export default class ArakinSceneHanabiTop extends ArakinScene {
	
    constructor(param) {
        super(param);
		this.hanabiTimer = 0;
		this.messageTimer = 0;
		this.hanabiCount = 0;
		this.messageQueue = new Array();
		this.messageQueue.push('タイミングをあわせて\nがめんをタッチ！\nめざせ100コンボ！');
	}

	addMessage(text) {
		this.messageQueue.push(text);
	}
	
	onEvent(name, data, timerValue) {
		super.onEvent(name, data, timerValue);
		switch ( name ) {
		case 'start':
	        this.hanabiTimer = timerValue;
	        this.messageTimer = timerValue;
			break;
		case 'proc':
			if (timerValue >= this.messageTimer) {
				if (this.messageQueue.length > 0) {
					this.messageTimer = timerValue + 5000;
					var message = this.getPart('message');
					message.setMessage(this.messageQueue[0]);
					this.messageQueue.shift();
				}
			}

			if (timerValue >= this.hanabiTimer) {
				var hanabiCountMod = this.hanabiCount % 6;
				switch (hanabiCountMod) {
				case 2:
				case 5:
					this.hanabiTimer = timerValue + 1000;
					break;
				default:
					this.hanabiTimer = timerValue + 500;
					break;
				}
				this.hanabiCount ++;
				var hanabi = this.getPart('hanabi');
				hanabi.initHanabi();
			}
			break;
		case 'mousedown':
			var hanabi = this.getPart('hanabi');
			hanabi.hanteiHanabi(timerValue);
			var nowCombo = hanabi.getNowCombo();
			switch (nowCombo) {
			case 10:
				this.addMessage('10コンボたっせい！\nそのちょうし！');
				break;
			case 20:
				this.addMessage('20コンボたっせい！\nいいかんじ！');
				break;
			case 30:
				this.addMessage('30コンボたっせい！');
				break;
			case 40:
				this.addMessage('40コンボたっせい！');
				break;
			case 50:
				this.addMessage('50コンボたっせい！\nすごい！');
				break;
			case 100:
				this.addMessage('100コンボたっせい！\nおめでとう！');
				break;
			}
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

			// 花火
			this.onEvent( 'part_entry', 
										[
											{
												"class":"ArakinPartHanabi",
												"param": 
												{ 
													"name":"hanabi",
													"priority":10,
													"x":0,
													"y":0,
													"w":500,
													"h":500,
													"fillStyle":"rgb(255,255,0)"
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
											}
										}
									]
								, timerValue);



			break;
		}
	}
}
	