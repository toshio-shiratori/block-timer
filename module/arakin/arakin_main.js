// インクルード
// import ArakinSceneBuilder from './arakin_scene_builder.js';
import ArakinSceneBuilder from './arakin_scene_builder.js';

export default class ArakinMain {
	constructor() {
		this.scenes = new Array();
		this.globalValues = new Array();
	}

	/**
	 * シーンを設定する
	 * @param string name シーン名
	 * @param ArakinScene scene シーンオブジェクト
	 */
	setScene(name, scene) {
		// 既に存在するものは上書き
        for (var i in this.scenes) {
            if (this.scenes[i].getName() == name) {
				this.scenes[i] = scene;
				return;
            }
		}
		if (scene == null) {
			console.error('setScene() param scene is null.');
			return
		}

		// 存在しないので末尾に追加
		this.scenes.push(scene);
	}

	/**
	 * シーンを取得する
	 * @param string namae シーン名
	 * @return ArakinScene シーンオブジェクト
	 * 
	 */
	getScene(name) {
        for (var i in this.scenes) {
            if (this.scenes[i].getName() == name) {
				return this.scenes[i];
            }
		}

		return null;
	}

	/**
	 * シーンオブジェクト群を取得する
	 * @return array シーンオブジェクト配列
	 * 
	 */
	getScenes() {
		return this.scenes;
	}

	onEvent(name, data, timerValue) {
		switch ( name ) {
			// 処理イベント
		case 'proc':
			var scenes = this.getScenes();
			for (var i in scenes) {
				scenes[i].onEvent(name, data, timerValue);
				if ( scenes[i].isNextSceneRequest() ) {
					var sceneParam = new Array();
					sceneParam['class']    = scenes[i].getNextSceneName();
					sceneParam['name']     = scenes[i].getName();
					sceneParam['canvasId'] = scenes[i].getCanvasId();
					this.onEvent('next', sceneParam, timerValue);
				}
			}
			break;

			// 次のシーンへ移動するイベント
		case 'next':
			var sceneParam = new Array();
			sceneParam['class'] = data['class'];
			sceneParam['param'] = new Array()
			sceneParam['param']['canvasId'] = data['canvasId'];
			sceneParam['param']['name']     = data['name'];
			var scene = ArakinSceneBuilder.build(sceneParam);
			this.setScene(data['name'], scene);
			scene.onEvent('start', null, timerValue);
			break;
		default:
			if (data['name'] == null) {
				var scenes = this.getScenes();
				for (var i in scenes) {
					scenes[i].onEvent(name, data, timerValue);
				}
			}
			else {
				var scene = this.getScene(data['name']);
				if (scene != null) {
					scene.onEvent(name, data['params'], timerValue);
				}
			}
			break;
		}
	}
}