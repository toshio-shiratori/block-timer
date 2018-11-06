// インクルード
import ArakinPart from './arakin_part.js';

export default class ArakinPartImage extends ArakinPart {
    constructor(params) {
        super(params);
        this.src    = this.profile.getProfileData('src');
        this.bindProperty('sx',     this.profile.getProfileData('sx',       0));
        this.bindProperty('sy',     this.profile.getProfileData('sy',       0));
        this.bindProperty('sw',     this.profile.getProfileData('sw',       0));
        this.bindProperty('sh',     this.profile.getProfileData('sh',       0));
        this.bindProperty('index',  this.profile.getProfileData('index',    0));
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params['src'] = '';
        params['sx'] = 0;
        params['sy'] = 0;
        params['sw'] = 0;
        params['sh'] = 0;
        params['index'] = 0;
        return params;
    }

    draw() {
        var canvas = document.getElementById(this.canvasId);
        if( !canvas || !canvas.getContext ) return false;
        var ctx = canvas.getContext('2d');
        var angle = this.getCalcValue('angle') * Math.PI / 180;
        ctx.save( );
        ctx.translate( this.getCalcValue('w') / 2 + this.getCalcValue('x'),
                    this.getCalcValue('h') / 2 + this.getCalcValue('y'));
        ctx.rotate(angle);
        ctx.scale(this.getCalcValue('scalex'), this.getCalcValue('scaley'));
        ctx.globalAlpha = this.getCalcValue('a');
        var img = new Image();
        img.src = this.src;
        if ( this.getCalcValue('sw') && this.getCalcValue('sh') ) {
            ctx.drawImage(img, 
                        this.getCalcValue('sx') + (this.getCalcValue('sw')*Math.floor(this.getCalcValue('index'))),
                        this.getCalcValue('sy'),
                        this.getCalcValue('sw'),
                        this.getCalcValue('sh'),
                        -this.getCalcValue('w') / 2,
                        -this.getCalcValue('h') / 2,
                        this.getCalcValue('w'),
                        this.getCalcValue('h')
                        );
        }
        else {
            ctx.drawImage(img, 
                        -this.getCalcValue('w') / 2,
                        -this.getCalcValue('h') / 2,
                        this.getCalcValue('w'),
                        this.getCalcValue('h')
                        );
        }
        ctx.restore();
    }
}