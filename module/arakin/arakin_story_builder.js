/**
* Story構築クラス
*/
export default class ArakinStoryBuilder {

	/**
	* Storyの作成(複数)
	*/
	static build(params, timerValue) {
		var stories = new Array();
		for (var i in params) {
			var story = ArakinStoryBuilder.create(params[i]['name']
											, params[i]['startTime']
											, params[i]['params']
											, timerValue
										);
			stories.push(story);
		}
		return stories;
	}

	/**
	* Storyの作成
	*/
	static create(name, startTime, params, timerValue) {
		// ストーリー情報を追加
		var story = new Array();
		story['enable']     = true;
		story['name']       = name;
		story['startTime']  = startTime;
		story['params']     = params;
		story['timerValue'] = timerValue;
		return story;
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
        params['part_entry']    = 'パーツ追加';
        params['part_property'] = 'パーツ属性編集';
        params['part_restart']  = 'パーツ再スタート';
        // 増えたらここに追加してください
        return params;
    }
}