// インクルード
import ArakinScene from './arakin_scene.js';

export default class ArakinSceneScribbleTop extends ArakinScene {
	
    constructor(param) {
        super(param);
		this.nowMouseDown = false;
	}

	onEvent(name, data, timerValue) {
		super.onEvent(name, data, timerValue);
		switch ( name ) {
		case 'mousemove':
			if ( this.nowMouseDown ) {
				var scribble = this.getPart('scribble');
				var x = data.e.layerX;
				var y = data.e.layerY;
				scribble.drawMove(x,y);
			}
			break;

		case 'mouseup':
			this.nowMouseDown = false;
			var scribble = this.getPart('scribble');
			var x = data.e.layerX;
			var y = data.e.layerY;
			scribble.drawEnd(x,y);
			break;

		case 'mousedown':
			this.nowMouseDown = true;
			var scribble = this.getPart('scribble');
			var x = data.e.layerX;
			var y = data.e.layerY;
			scribble.drawStart(x,y);
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
													"fillStyle":"rgb(255,255,255)"
												}
											}
										]
									, timerValue);


			// 落書き
			this.onEvent( 'part_entry', 
										[
											{
												"class":"ArakinPartScribble",
												"param": 
												{ 
													"name":"scribble",
													"priority":40,
													"x":0,
													"y":0,
													"w":500,
													"h":500,
													"workCanvasId": "canvas2"
												}
											}
										]
									, timerValue);


			break;
		}
	}
}
	