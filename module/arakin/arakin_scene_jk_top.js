// インクルード
import ArakinScene from './arakin_scene.js';

export default class ArakinSceneTop2 extends ArakinScene {
	
	onEvent(name, data, timerValue) {
		super.onEvent(name, data, timerValue);
		switch ( name ) {
		case 'mousedown':
			if (this.getProgress() >= 9000 ) {
				this.nextScene( 'ArakinSceneJKTop' );
			}
			break;
		case 'init':
			var canvas = document.getElementById(this.canvasId);
			if( !canvas || !canvas.getContext ) return false;
			
			var canvas = document.getElementById(this.canvasId);
			var backColor = "rgb(67,135,233)";
			var telopHeight = canvas.height * 0.8;

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
													"fillStyle":backColor
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
													"name":"denko",
													"priority":0,
													"text":"何が出るかな？",
													"x":0,
													"y":telopHeight,
													"fillStyleR":0,
													"fillStyleG":255,
													"fillStyleB":0,
													"shadowBlur": 3,
													"shadowOffsetX": 3,
													"shadowOffsetY": 3,
													"anims": 
													[
														{ "class":"ArakinAnimLiner", "target":"x", "param": { "name":"denko" , "loopCount":1, "loopReturn":false, "timerDistance":5000, "startValue":canvas.width, "endValue":-600, "exp":1} }
													],
												}
											}
										]
										, timerValue);

			// グーチョキパー
			this.onEvent( 'part_entry',
										[
											{
												"class":"ArakinPartImage",
												"param": 
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
													"sh":200,
													"anims": 
													[
														{ "class":"ArakinAnimLiner", "target":"index",  "param": { "stopValueDisable":true, "name":"pata", "loopCount":0, "loopReturn":false, "timerDistance":250, "startValue":0, "endValue":3 } },
														{ "class":"ArakinAnimLiner", "target":"a",      "param": { "name":"a", "loopCount":1, "loopReturn":false, "timerDelay":3000, "timerDistance":1000, "startValue":0.0, "endValue":-1.0 } }
													]
												}
											},
											{
												"class":"ArakinPartImage",
												"param": 
												{ 
													"visible":true,
													"name":"gtp2",
													"src":"assets/img/gtp.png",
													"priority":10,
													"x":(canvas.width/2-100),
													"y":(canvas.height/2-100),
													"w":200,
													"h":200,
													"sx":0,
													"sy":0,
													"sw":200,
													"sh":200,
													"a":0,
													"index":0,
													"anims": 
													[
														{ "class":"ArakinAnimRandom", "target":"index", "param": { "name":"index", "loopCount":1, "loopReturn":false, "timerDelay":5000, "timerDistance":0, "minValue":0, "maxValue":3 } },
														{ "class":"ArakinAnimLiner", "target":"scalex", "param": { "name":"scalex", "loopCount":1, "loopReturn":false, "timerDelay":5000, "timerDistance":3000, "startValue":-1.0, "endValue":0.0 } },
														{ "class":"ArakinAnimLiner", "target":"scaley", "param": { "name":"scaley", "loopCount":1, "loopReturn":false, "timerDelay":5000, "timerDistance":3000, "startValue":-1.0, "endValue":0.0 } },
														{ "class":"ArakinAnimLiner", "target":"a",      "param": { "name":"a2", "loopCount":1, "loopReturn":false, "timerDelay":5000, "timerDistance":0, "startValue":0.0, "endValue":1.0 } }
													]
												}
											}					
										]
										, timerValue);

			// グーチョキパーのスクロール演出
			this.onEvent( 'part_entry',
			[
				{
					"class":"ArakinPartImage",
					"param": 
					{ 
						"name":"gtpsubparent1",
						"src":"assets/img/gtp.png",
						"priority":10,
						"index":0,
						"x":canvas.width + 100,
						"y":canvas.height - 50,
						"w":50,
						"h":50,
						"sx":0,
						"sy":0,
						"sw":200,
						"sh":200
						, "anims": 
						[
							{ "class":"ArakinAnimLiner", "target":"y", "param": { "name":"y" , "loopCount":0, "loopReturn":true, "timerDistance":500, "startValue":-20, "endValue":0, "exp":2} },
							{ "class":"ArakinAnimLiner", "target":"angle", "param": { "name":"gtpsub2" , "loopCount":0, "loopReturn":true, "timerDistance":1000, "startValue":-45, "endValue":45, "exp":1} },
							{ "class":"ArakinAnimLiner", "target":"x", "param": { "name":"x" , "loopCount":1, "loopReturn":false, "timerDistance":4000, "startValue":0, "endValue":-canvas.width - 400, "exp":1} },
						]
					}
				},
				{
					"class":"ArakinPartImage",
					"param": 
					{ 
						"name":"gtpsubparent1",
						"src":"assets/img/gtp.png",
						"priority":10,
						"index":1,
						"x":canvas.width + 200,
						"y":canvas.height - 50,
						"w":50,
						"h":50,
						"sx":0,
						"sy":0,
						"sw":200,
						"sh":200
						, "anims": 
						[
							{ "class":"ArakinAnimLiner", "target":"y", "param": { "name":"y" , "loopCount":0, "loopReturn":true, "timerDistance":500, "startValue":-20, "endValue":0, "exp":2} },
							{ "class":"ArakinAnimLiner", "target":"angle", "param": { "name":"gtpsub2" , "loopCount":0, "loopReturn":true, "timerDistance":1000, "startValue":-45, "endValue":45, "exp":1} },
							{ "class":"ArakinAnimLiner", "target":"x", "param": { "name":"x" , "loopCount":1, "loopReturn":false, "timerDistance":4000, "startValue":0, "endValue":-canvas.width - 400, "exp":1} },
						]
					}
				},
				{
					"class":"ArakinPartImage",
					"param": 
					{ 
						"name":"gtpsubparent1",
						"src":"assets/img/gtp.png",
						"priority":10,
						"index":2,
						"x":canvas.width + 300,
						"y":canvas.height - 50,
						"w":50,
						"h":50,
						"sx":0,
						"sy":0,
						"sw":200,
						"sh":200
						, "anims": 
						[
							{ "class":"ArakinAnimLiner", "target":"y", "param": { "name":"y" , "loopCount":0, "loopReturn":true, "timerDistance":500, "startValue":-20, "endValue":0, "exp":2} },
							{ "class":"ArakinAnimLiner", "target":"angle", "param": { "name":"gtpsub2" , "loopCount":0, "loopReturn":true, "timerDistance":1000, "startValue":-45, "endValue":45, "exp":1} },
							{ "class":"ArakinAnimLiner", "target":"x", "param": { "name":"x" , "loopCount":1, "loopReturn":false, "timerDistance":4000, "startValue":0, "endValue":-canvas.width - 400, "exp":1} },
						]
					}
				}

			]
			, timerValue);

			// もう一度
			this.onEvent( 'part_entry',
				[
					{
						"class":"ArakinPartText",
						"param": 
						{ 
							"name":"tnext",
							"priority":0,
							"text":"もう一度？",
							"maxWidth":300,
							"x":(canvas.width/2-150),
							"y":80,
							"a":0.0,
							"fillStyleR":0,
							"fillStyleG":255,
							"fillStyleB":0,
							"shadowBlur": 3,
							"shadowOffsetX": 3,
							"shadowOffsetY": 3
							, "anims": 
							[
								{ "class":"ArakinAnimLiner", "target":"a", "param": { "name":"a" , "loopCount":0, "loopReturn":true, "timerDelay":9000,"timerDistance":1000, "startValue":0.0, "endValue":1.0, "exp":1} }
							]
						}
					}
				]
			, timerValue);



			break;
		}
	}
}
	