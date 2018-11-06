// インクルード
import ArakinPart from './arakin_part.js';

export default class ArakinPartRect extends ArakinPart {
    constructor(params) {
        super(params);
        this.fillStyle = this.profile.getProfileData('fillStyle', 'rgb(0,0,0)');
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params['fillStyle'] = 'rgb(0,0,0)';
        return params;
    }

    draw() {
        var canvas = document.getElementById(this.canvasId);
        if( !canvas || !canvas.getContext ) return false;
        var ctx = canvas.getContext('2d');
        var angle = this.getCalcValue('angle') * Math.PI / 180;
        ctx.save( );
        ctx.translate( this.getCalcValue('centerx') + this.getCalcValue('x'),
                    this.getCalcValue('centery') + this.getCalcValue('y'));
        ctx.rotate(angle);
        ctx.scale(this.getCalcValue('scalex'), this.getCalcValue('scaley'));
        ctx.globalAlpha = this.getCalcValue('a');
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect( -this.getCalcValue('centerx'),
                    -this.getCalcValue('centery'),
                    this.getCalcValue('w'),
                    this.getCalcValue('h')
                    );
        ctx.restore();
    }
}

  