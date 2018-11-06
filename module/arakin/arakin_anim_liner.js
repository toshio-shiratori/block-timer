// インクルード
import ArakinAnim from './arakin_anim.js';

export default class ArakinAnimLiner extends ArakinAnim {
    constructor(params) {
        super(params);
        this.startValue = this.profile.getProfileData('startValue', 0);
        this.endValue   = this.profile.getProfileData('endValue'  , 0);
        this.exp        = this.profile.getProfileData('exp'       , 1);
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params['startValue'] = 0;
        params['endValue'] = 0;
        params['exp'] = 1;
        // プロパティが増えたらここに追加してください
        return params;
    }

    calc(rate) {
        var nowValue = (this.endValue - this.startValue) * Math.pow(rate, this.exp);
        this.setValue(this.startValue + nowValue);
    }
}