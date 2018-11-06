// インクルード
import ArakinPart from './arakin_part.js';

export default class ArakinPartMessage extends ArakinPart {
    constructor(params) {
        super(params);
    //    this.text      = this.profile.getProfileData('text');
        var text = this.profile.getProfileData('text', ' ');
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

        this.bindProperty('messageSpeed',     this.profile.getProfileData('messageSpeed', 1000));

        this.messageStartTimer = 0;
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
        params['messageSpeed']  = 1000;
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

    setMessage(text) {
        this.messageStartTimer = this.timerValue;
        this.setPropertyValue('text', text);
    } 

    draw() {
        var canvas = document.getElementById(this.canvasId);
        if( !canvas || !canvas.getContext ) return false;
        var ctx = canvas.getContext('2d');
        ctx.save( );
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect( this.getCalcValue('x'),
                    this.getCalcValue('y'),
                    this.getCalcValue('w'),
                    this.getCalcValue('h')
                    );

        ctx.strokeStyle = 'rgb(128,128,128)';
        ctx.beginPath();
        ctx.strokeRect( this.getCalcValue('x') - 1,
                    this.getCalcValue('y') - 1,
                    this.getCalcValue('w'),
                    this.getCalcValue('h')
                    );
        ctx.beginPath();
        ctx.strokeRect( this.getCalcValue('x') + 1,
                    this.getCalcValue('y') + 1,
                    this.getCalcValue('w'),
                    this.getCalcValue('h')
                    );
            
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.beginPath();
        ctx.strokeRect( this.getCalcValue('x'),
                    this.getCalcValue('y'),
                    this.getCalcValue('w'),
                    this.getCalcValue('h')
                    );

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
        var messageSpeed = this.getCalcValue('messageSpeed');

        var progress = (this.timerValue - this.messageStartTimer) / messageSpeed;
        if ( progress > 1.0 ) {
            progress = 1.0;
        }
        var subText = text.substr( 0, Math.floor( text.length * progress ) );
        var textLines = subText.split( "\n" );
        var fontSize = this.fontSize;
        for (var i=0;i<textLines.length;i+=1) {
            if ( maxWidth <= 0 ) {
                ctx.fillText( textLines[i], this.getCalcValue('x') + 20, this.getCalcValue('y') + 10 + fontSize * (i+1) );
            }
            else {
                ctx.fillText( textLines[i], this.getCalcValue('x') + 20, this.getCalcValue('y') + 10 + fontSize * (i+1), this.getCalcValue('maxWidth'));
            }
        }

        
        ctx.restore();
    }
}