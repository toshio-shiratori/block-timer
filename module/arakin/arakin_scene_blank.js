// インクルード
import ArakinScene from './arakin_scene.js';

export default class ArakinSceneBlank extends ArakinScene {
	
	onEvent(name, data, timerValue) {
		super.onEvent(name, data, timerValue);
		switch ( name ) {
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
													"fillStyle":"rgb(67,135,233)"
												}
											}
										]
									, timerValue);
			break;
		}
	}
}
	