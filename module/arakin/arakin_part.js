// インクルード
import ArakinObject from './arakin_object.js';
import ArakinAnimBuilder from './arakin_anim_builder.js';

export default class ArakinPart extends ArakinObject {

    constructor(params) {
        super(params);
        this.mapValue = new Array();
        this.canvasId = this.profile.getProfileData('canvasId', 'main');
        this.priority = this.profile.getProfileData('priority', 0);
        this.visible  = this.profile.getProfileData('visible', true);	
        this.child    = new Array();
        this.parent   = null;
        this.timerValue = 0;
        this.bindProperty('x',       this.profile.getProfileData('x',         0));
        this.bindProperty('y',       this.profile.getProfileData('y',         0));
        this.bindProperty('w',       this.profile.getProfileData('w',         0));
        this.bindProperty('h',       this.profile.getProfileData('h',         0));
        this.bindProperty('angle',   this.profile.getProfileData('angle',     0));
        this.bindProperty('scalex',  this.profile.getProfileData('scalex',  1.0));
        this.bindProperty('scaley',  this.profile.getProfileData('scaley',  1.0));
        this.bindProperty('a',       this.profile.getProfileData('a',       1.0));
        this.bindProperty('centerx', this.profile.getProfileData('centerx', null));
        this.bindProperty('centery', this.profile.getProfileData('centery', null));
        
        var centerx = this.getProperty('centerx').getValue( );
        if ( centerx == null ) {
            this.setPropertyValue( 'centerx', this.getProperty('w').getValue( ) / 2 );
        }
        var centery = this.getProperty('centery').getValue( );
        if ( centery == null ) {
            this.setPropertyValue( 'centery', this.getProperty('h').getValue( ) / 2 );
        }
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params.x        = 0;
        params.y        = 0;
        params.w        = 0;
        params.h        = 0;
        params.angle    = 0;
        params.scalex   = 1.0;
        params.scaley   = 1.0;
        params.a        = 1.0;
        params.centerx  = null;
        params.centery  = null;
        params.priority = 0;
        params.visible  = true;
        // プロパティが増えたらここに追加してください
        return params;
    }

    /**
     * 座標にヒットしているか？
     * 
     * @param int x x座標 
     * @param int y y座標
     */
    isHit( x, y ) {
        var objectX = this.getCalcValue( 'x' );
        var objectY = this.getCalcValue( 'y' );
        var objectW = this.getCalcValue( 'w' );
        var objectH = this.getCalcValue( 'h' );
        if ( x >= objectX && x < (objectX + objectW) && y >= objectY && y < (objectY + objectH) ) {
            return true;
        }
        return false;
    }


    show(timerValue) {
        if ( this.visible == false ) {
            return;
        }
        this.timerValue = timerValue;
        this.draw();
        
        for (var i in this.childs) {
            this.childs[i].show();
        }
    }

    draw() {
    }

    bindProperty(key, value) {
        var obj = new ArakinObject({value:value});
        this.mapValue[key] = obj;
    }

    getProperty(key) {
        if (this.mapValue[key])  {
            return this.mapValue[key];
        }
        return null;
    }

    setPropertyValue(key, value) {
        if (this.mapValue[key])  {
            this.mapValue[key].setValue(value);
        }
    }

    getParent() {
        return this.parent;
    }

    setParent(parent) {
        this.parent = parent;
    }

    setCanvasId(canvasId) {
        this.canvasId = canvasId;
    }

    addChild(part) {
        part.setParent(this);
        super.addChild(part);
    }

    addAnim(target, anim) {
        this.getProperty( target ).addChild(anim);
    }

    getCalcValue(key) {
        var property = this.getProperty(key);
        if (!property)  {
            return 0;
        }
        var value = property.getValue();
        if (!value) {
        value = 0;
        }

        var parent = this.getParent();
        if ( parent ) {
            switch (key) {
            case 'a':
            case 'angle':
            case 'scalex':
            case 'scaley':
            case 'sx':
            case 'sy':
            case 'sw':
            case 'sh':
            case 'w':
            case 'h':
                break;

            default:
                value = value + parent.getCalcValue(key);
                break;
            }
        }
        return value;
    }

    onEvent(name, data, timerValue) {
        switch ( name ) {
        case 'start':
            // アニメーション関連の処理
            for (var i in this.mapValue) {
                this.mapValue[i].onEvent('start', data, timerValue);
            }

            // 子の処理
            for (var i in this.childs) {
                this.childs[i].onEvent('start', data, timerValue);
            }
            break;
        case 'proc':
            // アニメーション関連の処理
            for (var i in this.mapValue) {
                this.mapValue[i].onEvent('proc', data, timerValue);
            }

            // 表示処理
            this.show(timerValue);

            // 子の処理
            for (var i in this.childs) {
                this.childs[i].onEvent('proc', data, timerValue);
            }
            break;
        }
    }
}
