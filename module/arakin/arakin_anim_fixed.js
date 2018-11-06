// インクルード
import ArakinAnim from './arakin_anim.js';

export default class ArakinAnimFixed extends ArakinAnim {
    constructor(params) {
        super(params);
        this.values = this.profile.getProfileData('values', [0] );
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params['values'] = [0];
        // プロパティが増えたらここに追加してください
        return params;
    }

    calc(rate) {
        var nowIndex =Math.floor(rate * (this.values.length)); 
        this.setValue( this.values[nowIndex] );
    }
}