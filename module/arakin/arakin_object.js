// インクルード
import ArakinProfile from './arakin_profile.js';

export default class ArakinObject {
    constructor(params) {
        this.profile  = new ArakinProfile(params);
        this.childs   = new Array();
        this.name     = this.profile.getProfileData('name', null);
        this.value    = this.profile.getProfileData('value', null);
        this.enable   = this.profile.getProfileData('enable', true);
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getValue() {
        var value = this.value;
    //    if ( !value ) {
    //      value = 0;
        //}
        for (var i in this.childs) {
            value = value + this.childs[i].getValue();
        }
        return value;
    }

    setValue(value) {
        this.value = value;
    }

    static getPropertyList() {
        var params = new Object();
        params.name   = '[オブジェクトの名称]';
        params.value  = null;
        params.enable = true;
        // プロパティが増えたらここに追加してください
        return params;
    }    

    getChild(key) {
        for (var i in this.childs) {
            if ( this.childs[i].getName() == key )
            {
                return this.childs[i];
            }
        }
        return null;
    }

    deleteChild(key) {
        for (var i in this.childs) {
            if ( this.childs[i].getName() == key )
            {
                this.childs.splice(i, 1);
                return;
            }
        }
    }

    addChild(part) {
        this.childs.push(part);
    }

    onEvent(name, data, timerValue) {
        for (var i in this.childs) {
            this.childs[i].onEvent(name, data, timerValue);
        }
    }
}