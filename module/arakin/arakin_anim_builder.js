/*
 * アニメーションのインクルード
 */
import ArakinAnim       from './arakin_anim.js';
import ArakinAnimFixed  from "./arakin_anim_fixed.js";
import ArakinAnimLiner  from "./arakin_anim_liner.js";
import ArakinAnimRandom from "./arakin_anim_random.js";
import ArakinAnimSin    from "./arakin_anim_sin.js";

export default class ArakinAnimBuilder {

	/*
	* 構築
	*/
	constructor() {
	}

	/**
	* アニメーション構築
	* @param ArakinPart part パーツオブジェクト
	* @param array params アニメーション定義配列
	* @return array アニメーションクラス
	*/
	static builds(part, params) {
		var anims = new Array();
		for (var i in params) {
			var anim = ArakinAnimBuilder.build(part, params[i]);
			if (anim == null) {
				continue;
			}
			anims.push(anim);
		}
		return anims;
	}

	/**
	* 1アニメーション構築
	* @param ArakinPart part パーツオブジェクト
	* @param array params アニメーション定義配列
	* @return array アニメーションクラス
	*/
	static build(part, param) {
		var className  = param['class'];
		var classParam = param['param'];
		var targetName = param['target'];
		var anim = ArakinAnimBuilder.create(className, classParam);
		part.addAnim(targetName, anim);
		return anim;
	}

	/**
	* アニメーションクラスの作成
	*/
	static create(className, param) {
		// Animクラスの作成
		// Animクラスが増えたらここに追加してください
		var anim = null;
		switch (className) {
			case 'ArakinAnim':
				anim = new ArakinAnim(param);
				break;
			case 'ArakinAnimLiner':
				anim = new ArakinAnimLiner(param);
				break;
			case 'ArakinAnimRandom':
				anim = new ArakinAnimRandom(param);
				break;
			case 'ArakinAnimSin':
				anim = new ArakinAnimSin(param);
				break;
			case 'ArakinAnimFixed':
				anim = new ArakinAnimFixed(param);
				break;
			default:
				return null;
		}
		return anim;
	}

	/*
	* 一覧を取得
	*/
	static getList() {
		var params = new Array();
		params['ArakinAnim']       = 'ArakinAnim';
		params['ArakinAnimLiner']  = 'ArakinAnimLiner';
		params['ArakinAnimRandom'] = 'ArakinAnimRandom';
		params['ArakinAnimSin']    = 'ArakinAnimSin';
		params['ArakinAnimFixed']  = 'ArakinAnimFixed';
		// Animクラスが増えたらここに追加してください
		return params;
	}

	/*
	* プロパティ一覧を取得
	* @param string className クラス名
	* @return array プロパティ一覧
	*/
	static getPropertyList(className) {
		switch (className) {
			case 'ArakinAnim':
				return ArakinAnim.getPropertyList();
			case 'ArakinAnimLiner':
				return ArakinAnimLiner.getPropertyList();
			case 'ArakinAnimRandom':
				return ArakinAnimRandom.getPropertyList();
			case 'ArakinAnimSin':
				return ArakinAnimSin.getPropertyList();
			case 'ArakinAnimFixed':
				return ArakinAnimFixed.getPropertyList();
			default:
		}
		return null;
	}
}
