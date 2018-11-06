// インクルード
import ArakinAnim from './arakin_anim.js';

export default class ArakinAnimSin extends ArakinAnim {
    constructor(params) {
        // 親クラスのコンストラクタの呼び出しには call を使用
        super(params);
        this.range      = this.profile.getProfileData('range', 0);
        this.startAngle = this.profile.getProfileData('startAngle', 0);
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params['range'] = 0;
        params['startAngle'] = 0;
        // プロパティが増えたらここに追加してください
        return params;
    }

    calc(rate) {
        super.calc(rate);
        this.setValue( Math.sin( Math.PI / 180 * (360 * rate +this.startAngle) ) * this.range );
    }
}