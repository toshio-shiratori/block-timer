/*
 * シーンのインクルード
 */
import ArakinSceneBlank     from "./arakin_scene_blank.js";
import ArakinSceneJKTop     from "./arakin_scene_jk_top.js";
import ArakinSceneHanabiTop from "./arakin_scene_hanabi_top.js";
import ArakinSceneGridTop from "./arakin_scene_grid_top.js";

export default class ArakinSceneBuilder {

	/*
	* Sceneの構築
	*/
	static build(param) {
		var scene = ArakinSceneBuilder.create( param['class'], param['param']);
		return scene;
	}

	/*
	* Sceneクラスの作成
	*/
	static create(className, param) {
		// Partクラスの作成
		// Partクラスが増えたらここに追加してください
		var scene = null;
		switch (className) {
			case 'ArakinSceneBlank':
				scene = new ArakinSceneBlank(param);
				break;
			case 'ArakinSceneJKTop':
				scene = new ArakinSceneJKTop(param);
				break;
			case 'ArakinSceneHanabiTop':
				scene = new ArakinSceneHanabiTop(param);
				break;
				case 'ArakinSceneGridTop':
				scene = new ArakinSceneGridTop(param);
				break;
			default:
				return null;
		}

		// 作成したシーンを返す
		return scene;
	}

    /**
     * 一覧を取得
     * この処理は編集ツールなどで選択するような時に使用します。
     * 
     * @return array 一覧
     * 
     */
    static getList() {
        var params = new Array();
        params['ArakinSceneBlank']     = 'ArakinSceneBlank';
        params['ArakinSceneJKTop']     = 'ArakinSceneJKTop';
        params['ArakinSceneHanabiTop'] = 'ArakinSceneHanabiTop';
        params['ArakinSceneGridTop'] = 'ArakinSceneGridTop';
        // 増えたらここに追加してください
        return params;
    }
}