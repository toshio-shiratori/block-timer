// インクルード
import ArakinPart from './arakin_part.js';

export default class ArakinPartLine extends ArakinPart {
    constructor(params) {
        super(params);
        this.bindProperty('strokeStyleR',     this.profile.getProfileData('strokeStyleR', 0));
        this.bindProperty('strokeStyleG',     this.profile.getProfileData('strokeStyleG', 0));
        this.bindProperty('strokeStyleB',     this.profile.getProfileData('strokeStyleB', 0));
        this.lines = params['lines'];
        for (var i in this.lines) {
            var data = this.lines[i];
            this.bindProperty('x[' + i + ']', data['x']);
            this.bindProperty('y[' + i + ']', data['y']);
            this.bindProperty('cpx[' + i + ']', data['cpx']);
            this.bindProperty('cpy[' + i + ']', data['cpy']);
            this.bindProperty('cp1x[' + i + ']', data['cp1x']);
            this.bindProperty('cp1y[' + i + ']', data['cp1y']);
            this.bindProperty('cp2x[' + i + ']', data['cp2x']);
            this.bindProperty('cp2y[' + i + ']', data['cp2y']);
        }
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params['strokeStyleR'] = 0;
        params['strokeStyleG'] = 0;
        params['strokeStyleB'] = 0;
        return params;
    }

    draw() {
        var canvas = document.getElementById(this.canvasId);
        if( !canvas || !canvas.getContext ) return false;
        var ctx = canvas.getContext('2d');
        var angle = this.getCalcValue('angle') * Math.PI / 180;
        ctx.save( );
        var x = this.getCalcValue('x');
        var y = this.getCalcValue('y');
        var centerx = this.getCalcValue('centerx');
        var centery = this.getCalcValue('centery');
        ctx.translate( centerx + x,
                    centery + y);
        ctx.rotate(angle);
        ctx.scale(this.getCalcValue('scalex'), this.getCalcValue('scaley'));
        ctx.globalAlpha = this.getCalcValue('a');
        var r = Math.floor(this.getCalcValue('strokeStyleR'));
        var g = Math.floor(this.getCalcValue('strokeStyleG'));
        var b = Math.floor(this.getCalcValue('strokeStyleB'));
        ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.beginPath();
        ctx.moveTo( -centerx, -centery );
        for (var i in this.lines) {
            var data = this.lines[i];
            switch ( data['type']) {
            case 'l':
                ctx.lineTo( this.getCalcValue('x[' + i + ']') - centerx
                        , this.getCalcValue('y[' + i + ']') - centery
                        );
                break;
            case 'q':
                ctx.quadraticCurveTo( this.getCalcValue('cpx[' + i + ']') - centerx
                                    , this.getCalcValue('cpy[' + i + ']') - centery
                                    , this.getCalcValue('x[' + i + ']')   - centerx
                                    , this.getCalcValue('y[' + i + ']')   - centery
                                    );
                break;
            case 'b':
                ctx.bezierCurveTo( this.getCalcValue('cp1x[' + i + ']') - centerx
                                , this.getCalcValue('cp1y[' + i + ']') - centery
                                , this.getCalcValue('cp2x[' + i + ']') - centerx
                                , this.getCalcValue('cp2y[' + i + ']') - centery
                                , this.getCalcValue('x[' + i + ']')    - centerx
                                , this.getCalcValue('y[' + i + ']')    - centery
                                );
                break;
            }
        }
        ctx.stroke();
        ctx.restore();
    }
}
  