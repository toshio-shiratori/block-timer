// インクルード
import ArakinPart from './arakin_part.js';

export default class ArakinPartText extends ArakinPart {
    constructor(params) {
        super(params);
    //    this.text      = this.profile.getProfileData('text');
        var text = this.profile.getProfileData('text', '');
        this.bindProperty('text', text);

        this.fontSize  = this.profile.getProfileData('fontSize', "64");
        this.font      = this.profile.getProfileData('font', this.fontSize + "px arial");
        this.fillStyle = this.profile.getProfileData('fillStyle', 'rgb(0,0,0)');
        this.shadowBlur = this.profile.getProfileData('shadowBlur', 0);
        this.shadowColor = this.profile.getProfileData('shadowColor', 'rgba(0,0,0,0.5)');
        this.shadowOffsetX = this.profile.getProfileData('shadowOffsetX', 0);
        this.shadowOffsetY = this.profile.getProfileData('shadowOffsetY', 0);

        this.bindProperty('fillStyleR',     this.profile.getProfileData('fillStyleR', 0));
        this.bindProperty('fillStyleG',     this.profile.getProfileData('fillStyleG', 0));
        this.bindProperty('fillStyleB',     this.profile.getProfileData('fillStyleB', 0));

        this.bindProperty('maxWidth',     this.profile.getProfileData('maxWidth', 0));
        this.bindProperty('textLength',     this.profile.getProfileData('textLength', text.length));
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params['text']          = '';
        params['fontSize']      = 64;
        params['font']          = '64px arial';
        params['fillStyle']     = 'rgb(0,0,0)';
        params['shadowBlur']    = 0;
        params['shadowColor']   = 'rgba(0,0,0,0.5)';
        params['shadowOffsetX'] = 0;
        params['shadowOffsetY'] = 0
        params['fillStyleR']    = 0;
        params['fillStyleG']    = 0;
        params['fillStyleB']    = 0;
        params['maxWidth']      = 0;
        params['textLength']    = 64;
        return params;
    }

    setPropertyValue(key, value) {
        super.setPropertyValue(key, value);
        switch (key) {
        case 'text':
            this.setPropertyValue('textLength', value.length);
            break;
        }
        if (this.mapValue[key])  {
            this.mapValue[key].setValue(value);
        }
    }

    draw() {
        var canvas = document.getElementById(this.canvasId);
        if( !canvas || !canvas.getContext ) return false;
        var ctx = canvas.getContext('2d');
        var angle = this.getCalcValue('angle') * Math.PI / 180;
        ctx.save( );
        ctx.translate( this.getCalcValue('maxWidth') / 2 + this.getCalcValue('x'),
                        this.getCalcValue('y'));
        ctx.rotate(angle);
        ctx.scale(this.getCalcValue('scalex'), this.getCalcValue('scaley'));
        ctx.globalAlpha = this.getCalcValue('a');
        ctx.shadowBlur = this.shadowBlur;
        ctx.shadowColor = this.shadowColor;
        ctx.shadowOffsetX = this.shadowOffsetX;
        ctx.shadowOffsetY = this.shadowOffsetY;
        ctx.font = this.font;
        var r = Math.floor(this.getCalcValue('fillStyleR'));
        var g = Math.floor(this.getCalcValue('fillStyleG'));
        var b = Math.floor(this.getCalcValue('fillStyleB'));
        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';

        var maxWidth = this.getCalcValue('maxWidth');
        var text = this.getCalcValue('text');
        var textLength = this.getCalcValue('textLength');
        var subText = text.substr( 0, Math.floor(textLength) );
        var textLines = subText.split( "\n" );
        var fontSize = this.fontSize;
        for (var i=0;i<textLines.length;i+=1) {
            if ( maxWidth <= 0 ) {
                ctx.fillText( textLines[i], -this.getCalcValue('maxWidth') / 2, fontSize * i );
            }
            else {
                ctx.fillText( textLines[i], -this.getCalcValue('maxWidth') / 2, fontSize * i, this.getCalcValue('maxWidth'));
            }
        }

        
        ctx.restore();
    }
}