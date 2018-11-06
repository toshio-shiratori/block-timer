/*
 * Partのインクルード
 */
import ArakinPart          from "./arakin_part.js";
import ArakinPartImage     from "./arakin_part_image.js";
import ArakinPartImageTile from "./arakin_part_image_tile.js";
import ArakinPartLine      from "./arakin_part_line.js";
import ArakinPartRect      from "./arakin_part_rect.js";
import ArakinPartText      from "./arakin_part_text.js";
import ArakinPartHanabi    from "./arakin_part_hanabi.js";
import ArakinPartMessage   from "./arakin_part_message.js";
import ArakinPartScribble  from "./arakin_part_scribble.js";
import ArakinAnimBuilder   from "./arakin_anim_builder.js";
import ArakinPartGridRect  from "./arakin_part_grid_rect.js";

export default class ArakinPartBuilder {
	constructor() {
	}

	/**
	* パーツ構築(複数)
	* @param array params パーツ定義配列
	* @return array パーツクラス配列
	*/
	static builds(params) {
		var parts = new Array();
		for (var i in params) {
			var part = ArakinPartBuilder.build(params[i]);
			if (part == null) {
				continue;
			}
			parts.push(part);
		}

		return parts;
	}

	/**
	* パーツ構築
	* @param array params パーツ定義配列
	* @return array パーツクラス配列
	*/
	static build(param) {
		var className  = param['class'];
		var classParam = param['param'];
		var part = ArakinPartBuilder.create(className, classParam);
		if (part == null) {
			return null;
		}
		if ( classParam['anims'] != null ) {
			ArakinAnimBuilder.builds( part, classParam['anims']);
		}
		return part;
	}

	/*
	* Partクラスの作成
	*/
	static create(className, params) {

		// Partクラスの作成
		// Partクラスが増えたらここに追加してください
		var part = null;
		switch (className) {
			case 'ArakinPart':
				part = new ArakinPart(params);
				break;
			case 'ArakinPartImage':
				part = new ArakinPartImage(params);
				break;
			case 'ArakinPartImageTile':
				part = new ArakinPartImageTile(params);
				break;
			case 'ArakinPartText':
				part = new ArakinPartText(params);
				break;
			case 'ArakinPartRect':
				part = new ArakinPartRect(params);
				break;
			case 'ArakinPartLine':
				part = new ArakinPartLine(params);
				break;
			case 'ArakinPartHanabi':
				part = new ArakinPartHanabi(params);
				break;
			case 'ArakinPartMessage':
				part = new ArakinPartMessage(params);
				break;
			case 'ArakinPartScribble':
				part = new ArakinPartScribble(params);
				break;
			case 'ArakinPartGridRect':
				part = new ArakinPartGridRect(params);
				break;
			default:
				return null;
		}

		// 作成したパーツを返す
		return part;
	}

	/*
	* Partクラス一覧を取得
	*/
	static getList() {
		var params = new Array();
		params['ArakinPart']          = 'ArakinPart';
		params['ArakinPartImage']     = 'ArakinPartImage';
		params['ArakinPartImageTile'] = 'ArakinPartImageTile';
		params['ArakinPartText']      = 'ArakinPartText';
		params['ArakinPartRect']      = 'ArakinPartRect';
		params['ArakinPartLine']      = 'ArakinPartLine';
		params['ArakinPartHanabi']    = 'ArakinPartHanabi';
		params['ArakinPartMessage']   = 'ArakinPartMessage';
		params['ArakinPartScribble']  = 'ArakinPartScribble';
		params['ArakinPartGridRect']  = 'ArakinPartGridRect';
		// Partクラスが増えたらここに追加してください
		return params;
	}

	/*
	* Partクラスのプロパティ一覧を取得
	*/
	static getPropertyList(className) {
		switch (className) {
			case 'ArakinPart':
				return ArakinPart.getPropertyList();
			case 'ArakinPartImage':
				return ArakinPartImage.getPropertyList();
			case 'ArakinPartImageTile':
				return ArakinPartImageTile.getPropertyList();
			case 'ArakinPartText':
				return ArakinPartText.getPropertyList();
			case 'ArakinPartRect':
				return ArakinPartRect.getPropertyList();
			case 'ArakinPartLine':
				return ArakinPartLine.getPropertyList();
			case 'ArakinPartHanabi':
				return ArakinPartHanabi.getPropertyList();
			case 'ArakinPartMessage':
				return ArakinPartMessage.getPropertyList();
			case 'ArakinPartScribble':
				return ArakinPartScribble.getPropertyList();
			case 'ArakinPartGridRect':
				return ArakinPartGridRect.getPropertyList();
		}
		return null;
	}
}
