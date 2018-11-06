// インクルード
import ArakinAnim from './arakin_anim.js';

export default class ArakinAnimRandom extends ArakinAnim {
    constructor(params) {
        super(params);
        this.minValue = this.profile.getProfileData('minValue', 0);
        this.maxValue = this.profile.getProfileData('maxValue', 0);
    };

    static getPropertyList() {
        var params = super.getPropertyList();
        params['minValue'] = 0;
        params['maxValue'] = 0;
        // プロパティが増えたらここに追加してください
        return params;
    }

    calc(rate) {
    }

    onEventLoopStart(data) {
        super.calc(data);
        var val = Math.floor(Math.random() * Math.floor(this.maxValue-this.minValue))+this.minValue;
        this.setValue( parseInt(val) );
    };
}