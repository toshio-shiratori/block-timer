// インクルード
import ArakinScene from './arakin_scene.js';

export default class ArakinSceneTop extends ArakinScene {
	onEventStory(name, data, timerValue) {
		super.onEventStory(name, data, timerValue);
		switch (name) {
		case 'init':
			var canvas = document.getElementById(this.canvasId);
			if( !canvas || !canvas.getContext ) return false;
			
			var canvas = document.getElementById(this.canvasId);
			this.onEvent( 'part_entry', {
										"class":"ArakinPartRect",
										"params": 
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
									, timerValue);

			this.entryPart( {
				"class":"ArakinPartLine",
				"params": 
				{ 
					"name":"line1",
					"priority":0,
					"x":100,
					"y":100,
					"w":100,
					"h":100,
					"strokeStyleR":0,
					"strokeStyleG":255,
					"strokeStyleB":255,
					"lines":
					[
						{"type":"q", "cpx":0,   "cpy":50,  "x":0,   "y":100},
						{"type":"q", "cpx":50,  "cpy":100, "x":100, "y":100},
						{"type":"q", "cpx":100, "cpy":50,  "x":100, "y":0  },
						{"type":"q", "cpx":50,  "cpy":0,   "x":0,   "y":0  },
					]
				}
				, "anims": 
				[
					{ "class":"ArakinAnimLiner", "target":"cpx[0]", "params": { "name":"cpx[0]", "loopCount":0, "loopReturn":true, "timerDelay":0, "timerDistance":1000, "startValue":50, "endValue":-50 } },
					{ "class":"ArakinAnimLiner", "target":"cpy[1]", "params": { "name":"cpy[1]", "loopCount":0, "loopReturn":true, "timerDelay":0, "timerDistance":1000, "startValue":-50, "endValue":50 } },
					{ "class":"ArakinAnimLiner", "target":"cpx[2]", "params": { "name":"cpx[0]", "loopCount":0, "loopReturn":true, "timerDelay":0, "timerDistance":1000, "startValue":-50, "endValue":50 } },
					{ "class":"ArakinAnimLiner", "target":"cpy[3]", "params": { "name":"cpy[1]", "loopCount":0, "loopReturn":true, "timerDelay":0, "timerDistance":1000, "startValue":50, "endValue":-50 } },
					{ "class":"ArakinAnimLiner", "target":"angle", "params": { "name":"angle" , "loopCount":0, "loopReturn":false, "timerDistance":1400, "startValue":0, "endValue":360, "exp":1} }
				]
			}
			, timerValue);
							
									/*
			this.entryPart( {
				"class":"ArakinPartLine",
				"params": 
				{ 
					"name":"line1",
					"priority":0,
					"x":0,
					"y":100,
					"w":100,
					"h":100,
					"strokeStyleR":0,
					"strokeStyleG":255,
					"strokeStyleB":255,
					"lines":
					[
						{"type":"q", "cpx":0, "cpy":50, "x":0, "y":100},
						{"type":"q", "cpx":25, "cpy":110, "x":50, "y":100},
						{"type":"q", "cpx":50, "cpy":50, "x":50, "y":0},
					]
				}
				, "anims": 
				[
					{ "class":"ArakinAnimLiner", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":5000, "startValue":0, "endValue":500 } },
					{ "class":"ArakinAnimSin", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":0, "range":10 } },
					{ "class":"ArakinAnimSin", "target":"y", "params": { "name":"y", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":90, "range":-10 } },
					{ "class":"ArakinAnimSin", "target":"x[0]", "params": { "name":"x[0]", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":0, "range":20 } },
					{ "class":"ArakinAnimSin", "target":"x[1]", "params": { "name":"x[1]", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":0, "range":20 } },
				]
			}
			, timerValue);

			this.entryPart( {
				"class":"ArakinPartLine",
				"params": 
				{ 
					"name":"line2",
					"priority":0,
					"x":0,
					"y":100,
					"w":100,
					"h":100,
					"strokeStyleR":0,
					"strokeStyleG":255,
					"strokeStyleB":255,
					"lines":
					[
						{"type":"q", "cpx":0, "cpy":50, "x":0, "y":100},
						{"type":"q", "cpx":25, "cpy":110, "x":50, "y":100},
						{"type":"q", "cpx":50, "cpy":50, "x":50, "y":0},
					]
				}
				, "anims": 
				[
					{ "class":"ArakinAnimLiner", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":5000, "startValue":0, "endValue":500 } },
					{ "class":"ArakinAnimSin", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":1000, "startAngle":0, "range":10 } },
					{ "class":"ArakinAnimSin", "target":"y", "params": { "name":"y", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":1000, "startAngle":90, "range":-10 } },
					{ "class":"ArakinAnimSin", "target":"x[0]", "params": { "name":"x[0]", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":1000, "startAngle":0, "range":20 } },
					{ "class":"ArakinAnimSin", "target":"x[1]", "params": { "name":"x[1]", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":1000, "startAngle":0, "range":20 } },
				]
			}
			, timerValue);

			this.entryPart( {
				"class":"ArakinPartLine",
				"params": 
				{ 
					"name":"line3",
					"priority":0,
					"x":0,
					"y":50,
					"w":100,
					"h":100,
					"strokeStyleR":0,
					"strokeStyleG":255,
					"strokeStyleB":255,
					"lines":
					[
						{"type":"q", "cpx":0, "cpy":50, "x":0, "y":100},
						{"type":"q", "cpx":12, "cpy":110, "x":25, "y":100},
						{"type":"q", "cpx":25, "cpy":50, "x":25, "y":0},
					]
				}
				, "anims": 
				[
					{ "class":"ArakinAnimLiner", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":5000, "startValue":0, "endValue":500 } },
					{ "class":"ArakinAnimSin", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":1000, "startAngle":0, "range":10 } },
					{ "class":"ArakinAnimSin", "target":"y", "params": { "name":"y", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":1000, "startAngle":90, "range":-5 } },
					{ "class":"ArakinAnimSin", "target":"x[0]", "params": { "name":"x[0]", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":1000, "startAngle":0, "range":20 } },
					{ "class":"ArakinAnimSin", "target":"x[1]", "params": { "name":"x[1]", "loopCount":0, "loopReturn":false, "timerDelay":500, "timerDistance":1000, "startAngle":0, "range":20 } },
				]
			}
			, timerValue);

			this.entryPart( {
				"class":"ArakinPartLine",
				"params": 
				{ 
					"name":"line4",
					"priority":0,
					"x":0,
					"y":50,
					"w":100,
					"h":100,
					"strokeStyleR":0,
					"strokeStyleG":255,
					"strokeStyleB":255,
					"lines":
					[
						{"type":"q", "cpx":0, "cpy":50, "x":0, "y":100},
						{"type":"q", "cpx":12, "cpy":110, "x":25, "y":100},
						{"type":"q", "cpx":25, "cpy":50, "x":25, "y":0},
					]
				}
				, "anims": 
				[
					{ "class":"ArakinAnimLiner", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":5000, "startValue":0, "endValue":500 } },
					{ "class":"ArakinAnimSin", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":0, "range":10 } },
					{ "class":"ArakinAnimSin", "target":"y", "params": { "name":"y", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":90, "range":-5 } },
					{ "class":"ArakinAnimSin", "target":"x[0]", "params": { "name":"x[0]", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":0, "range":20 } },
					{ "class":"ArakinAnimSin", "target":"x[1]", "params": { "name":"x[1]", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":0, "range":20 } },
				]
			}
			, timerValue);		
	*/

									this.entryPart( {
				"class":"ArakinPartImageTile",
				"params": 
				{ 
					"visible":true,
					"name":"gtp2",
					"src":"assets/img/g2.png",
					"priority":10,
					"x":0,
					"y":0,
					"w":50,
					"h":50,
					"sx":0,
					"sy":0,
					"sw":200,
					"sh":200,
					"tileWidth":50,
					"tileHeight":50,
				}
				, "anims": 
				[
					{ "class":"ArakinAnimLiner", "target":"sx", "params": { "name":"sx", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startValue":0, "endValue":200 } },
					{ "class":"ArakinAnimLiner", "target":"sy", "params": { "name":"sy", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startValue":0, "endValue":200 } }
				]
				}
				, timerValue);
							

			this.entryPart( {
										"class":"ArakinPartText",
										"params": 
										{ 
											"name":"denko",
											"priority":0,
											"text":"何が出るかな？",
											"x":0,
											"y":400,
											"fillStyleR":0,
											"fillStyleG":255,
											"fillStyleB":0,
											"shadowBlur": 3,
											"shadowOffsetX": 3,
											"shadowOffsetY": 3
										}
										, "anims": 
										[
											{ "class":"ArakinAnimLiner", "target":"x", "params": { "name":"denko" , "loopCount":1, "loopReturn":false, "timerDistance":5000, "startValue":canvas.width, "endValue":-600, "exp":1} }
										]
									}
									, timerValue);

									this.entryPart( {
										"class":"ArakinPartText",
										"params": 
										{ 
											"name":"mes",
											"priority":0,
											"text":"あい�?えおあい�?えおあい�?えおあい�?えお\nかきくけこかきくけこかきくけこかきくけこ\nさしすせそさしすせそさしすせそさしすせそ",
											"x":50,
											"y":100,
											"fontSize": 16,
											"fillStyleR":255,
											"fillStyleG":255,
											"fillStyleB":255,
											"shadowBlur": 3,
											"shadowOffsetX": 3,
											"shadowOffsetY": 3
										}
										, "anims": 
										[
											{ "class":"ArakinAnimLiner", "target":"textLength", "params": { "name":"mes" , "loopCount":1, "loopReturn":false, "timerDelay":0, "timerDistance":2000, "startValue":-60, "endValue":0, "exp":1} },
											{ "class":"ArakinAnimLiner", "target":"fillStyleR", "params": { "name":"mes_fillr", "loopCount":0, "loopReturn":true, "timerDelay":0, "timerDistance":2000, "startValue":-255, "endValue":0 } }
										]
									}
									, timerValue);


									this.entryPart( {
										"class":"ArakinPartText",
										"params": 
										{ 
											"name":"tnext",
											"priority":0,
											"text":"もう一度？",
											"maxWidth":300,
											"x":(canvas.width/2-150),
											"y":80,
											"fillStyleR":0,
											"fillStyleG":255,
											"fillStyleB":0,
											"shadowBlur": 3,
											"shadowOffsetX": 3,
											"shadowOffsetY": 3
										}
										, "anims": 
										[
											{ "class":"ArakinAnimLiner", "target":"a", "params": { "name":"a" , "loopCount":0, "loopReturn":true, "timerDistance":0, "startValue":-1.0, "endValue":-1.0, "exp":1} },
											{ "class":"ArakinAnimLiner", "target":"a", "params": { "name":"a" , "loopCount":0, "loopReturn":true, "timerDelay":9000,"timerDistance":1000, "startValue":0.0, "endValue":1.0, "exp":1} }
										]
									}
									, timerValue);

									
			// 
			this.entryPart( {
										"class":"ArakinPart",
										"params": 
										{ 
											"name":"gtpsubparent",
											"priority":10,
											"x":0,
											"y":420,
										}
										, "anims": 
										[
											{ "class":"ArakinAnimLiner", "target":"x", "params": { "name":"denko" , "loopCount":1, "loopReturn":false, "timerDistance":5000, "startValue":canvas.width, "endValue":-600, "exp":1} },
										]
										, "childs":
										[
											{
												"class":"ArakinPartImage",
												"params": 
												{ 
													"name":"gtpsubparent1",
													"src":"assets/img/gtp.png",
													"priority":10,
													"index":0,
													"x":0,
													"y":0,
													"w":50,
													"h":50,
													"sx":0,
													"sy":0,
													"sw":200,
													"sh":200
												}
												, "anims": 
												[
													{ "class":"ArakinAnimLiner", "target":"y", "params": { "name":"y" , "loopCount":0, "loopReturn":true, "timerDistance":500, "startValue":-20, "endValue":0, "exp":2} },
													{ "class":"ArakinAnimLiner", "target":"angle", "params": { "name":"gtpsub2" , "loopCount":0, "loopReturn":true, "timerDistance":1000, "startValue":-45, "endValue":45, "exp":1} }
												]
											},
											{
												"class":"ArakinPartImage",
												"params": 
												{ 
													"name":"gtpsubparent2",
													"src":"assets/img/gtp.png",
													"priority":10,
													"index":1,
													"x":100,
													"y":0,
													"w":50,
													"h":50,
													"sx":0,
													"sy":0,
													"sw":200,
													"sh":200
												}
												, "anims": 
												[
													{ "class":"ArakinAnimLiner", "target":"y", "params": { "name":"y" , "loopCount":0, "loopReturn":true, "timerDistance":500, "startValue":-20, "endValue":0, "exp":2} },
													{ "class":"ArakinAnimLiner", "target":"angle", "params": { "name":"gtpsub2" , "loopCount":0, "loopReturn":true, "timerDistance":1000, "startValue":-45, "endValue":45, "exp":1} }
												]
											},
											{
												"class":"ArakinPartImage",
												"params": 
												{ 
													"name":"gtpsubparent3",
													"src":"assets/img/gtp.png",
													"priority":10,
													"index":2,
													"x":200,
													"y":0,
													"w":50,
													"h":50,
													"sx":0,
													"sy":0,
													"sw":200,
													"sh":200
												}
												, "anims": 
												[
													{ "class":"ArakinAnimLiner", "target":"y", "params": { "name":"y" , "loopCount":0, "loopReturn":true, "timerDistance":500, "startValue":-20, "endValue":0, "exp":2} },
													{ "class":"ArakinAnimLiner", "target":"angle", "params": { "name":"gtpsub2" , "loopCount":0, "loopReturn":true, "timerDistance":1000, "startValue":-45, "endValue":45, "exp":1} }
												]
											}
										]
									}
									, timerValue);
							
								
			// ?��?
			this.entryPart( {
										"class":"ArakinPartImage",
										"params": 
										{ 
											"visible":true,
											"name":"gtp",
											"src":"assets/img/gtp.png",
											"priority":10,
											"x":(canvas.width/2-100),
											"y":(canvas.height/2-100),
											"w":200,
											"h":200,
											"sx":0,
											"sy":0,
											"sw":200,
											"sh":200
										}
										, "anims": 
										[
											{ "class":"ArakinAnimLiner", "target":"index",  "params": { "stopValueDisable":true, "name":"pata", "loopCount":0, "loopReturn":false, "timerDistance":250, "startValue":0, "endValue":3 } },
											{ "class":"ArakinAnimLiner", "target":"a",      "params": { "name":"a", "loopCount":1, "loopReturn":false, "timerDelay":3000, "timerDistance":1000, "startValue":0.0, "endValue":-1.0 } },
											{ "class":"ArakinAnimLiner", "target":"scalex", "params": { "name":"scalex", "loopCount":1, "loopReturn":false, "timerDelay":5000, "timerDistance":3000, "startValue":-1.0, "endValue":0.0 } },
											{ "class":"ArakinAnimLiner", "target":"scaley", "params": { "name":"scaley", "loopCount":1, "loopReturn":false, "timerDelay":5000, "timerDistance":3000, "startValue":-1.0, "endValue":0.0 } },
											{ "class":"ArakinAnimLiner", "target":"a",      "params": { "name":"a2", "loopCount":1, "loopReturn":false, "timerDelay":5000, "timerDistance":0, "startValue":0.0, "endValue":1.0 } },
	//			                        	{ "class":"ArakinAnimLiner", "target":"angle", "params": { "name":"angle", "loopCount":0, "loopReturn":false, "timerDelay":6000, "timerDistance":1000, "startValue":0, "endValue":360 } },
									//    	{ "class":"ArakinAnimLiner", "target":"a", "params": { "name":"b", "loopCount":1, "loopReturn":false, "timerDelay":7000, "timerDistance":1000, "startValue":0.0, "endValue":1.0 } },
										]
									}
									, timerValue);
			var gtp = this.getPart('gtp');

			// 初期の設�?
			var rnd = Math.floor( Math.random( ) * 10 );
			switch (rnd) {
				case 0:
				case 1:
				case 2:
				this.entryAnims( gtp, 
				[
					{ "class":"ArakinAnimSin", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":0, "range":20 } },
					{ "class":"ArakinAnimSin", "target":"y", "params": { "name":"y", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":1000, "startAngle":90, "range":20 } }
				]
				, timerValue);
				break;
			case 3:
			case 4:
			case 5:
			this.entryAnims( gtp, 
				[
					{ "class":"ArakinAnimRandom", "target":"x", "params": { "name":"x", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":10, "minValue":-5, "maxValue":5 } },
					{ "class":"ArakinAnimRandom", "target":"y", "params": { "name":"y", "loopCount":0, "loopReturn":false, "timerDelay":0, "timerDistance":10, "minValue":-5, "maxValue":5 } }
				]
				, timerValue);
				break;
			case 6:
			case 7:
			case 8:
				this.entryAnims( gtp, 
					[
						{ "class":"ArakinAnimLiner", "target":"scalex", "params": { "name":"rand_scalex", "loopCount":0, "loopReturn":true, "timerDelay":0, "timerDistance":1000, "startValue":0.0, "endValue":0.2 } },
						{ "class":"ArakinAnimLiner", "target":"scaley", "params": { "name":"rand_scaley", "loopCount":0, "loopReturn":true, "timerDelay":0, "timerDistance":1000, "startValue":0.0, "endValue":0.2 } }
					]
					, timerValue);
					break;
			default:
				break;
			}

			// 消えてから出現するとき�?�設�?
			rnd = Math.floor( Math.random( ) * 10 );
			switch (rnd) {
				case 0:
				case 1:
				case 2:
					this.entryAnims( gtp, 
						[
							{ "class":"ArakinAnimLiner", "target":"angle", "params": { "name":"rand_angle", "loopCount":0, "loopReturn":true, "timerDelay":5000, "timerDistance":0, "startValue":135, "endValue":135 } },
						]
						, timerValue);
						break;
			}
		
			// 出現アニメーション終�?�?
			rnd = Math.floor( Math.random( ) * 10 );
			switch (rnd) {
			case 0:
			case 1:
			case 2:
			/*
				this.entryAnims( gtp, 
					[
						{ "class":"ArakinAnimLiner", "target":"angle", "params": { "name":"rand_angle", "loopCount":0, "loopReturn":true, "timerDelay":9000, "timerDistance":1000, "startValue":-15, "endValue":15 } },
					]
					, timerValue);
					break;
					*/
			}


			// フェー�?
			this.entryPart( {
										"class":"ArakinPartRect",
										"params": 
										{ 
											"visible":true,
											"name":"fade",
											"priority":0,
											"x":0,
											"y":0,
											"w":canvas.width,
											"h":canvas.height,
											"fillStyle":"rgb(0,0,0)"
										}
										, "anims": 
										[
											{ "class":"ArakinAnimLiner", "target":"a", "params": { "name":"fade", "loopCount":1, "loopReturn":false, "timerDistance":500, "startValue":0.0, "endValue":-1.0 } },
										]
									}
									, timerValue);


			break;
		case 'sustep1':
			var gtp = this.getPart('gtp');
			var property = gtp.getProperty('index');
			property.deleteChild( "pata" );
			property.setValue(Math.floor( Math.random() * 3 ));
			break;

		case 'sustep2':
			this.nextEnable = true;
			break;
		}
	};

	onEvent(name, data, timerValue) {
		super.onEvent(name, data, timerValue);
		switch ( name ) {
		case 'start':
			this.onEvent("story_entry", {"name":"init"   , "startTime":    0}, timerValue);
			this.onEvent("story_entry", {"name":"sustep1", "startTime": 5000}, timerValue);
			this.onEvent("story_entry", {"name":"sustep2", "startTime":10000}, timerValue);

			var story = ArakinSceneBuilder.entryStory({"name":"init","startTime":0}, timerValue);
			this.onEvent("story_entry", story, timerValue);
			story = ArakinSceneBuilder.entryStory({"name":"sustep1","startTime":5000}, timerValue);
			this.onEvent("story_entry", story, timerValue);
			story = ArakinSceneBuilder.entryStory({"name":"sustep2","startTime":10000}, timerValue);
			this.onEvent("story_entry", story, timerValue);

			break;
		case 'mousedown':
			if (this.nextEnable) {
				this.nextScene('top');
			}
			break;
		}

	}
}  