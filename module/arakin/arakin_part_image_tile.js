// インクルード
import ArakinPart from './arakin_part.js';

export default class ArakinPartImageTile extends ArakinPart {
  constructor(params) {
      super(params);
      this.src    = this.profile.getProfileData('src');
      this.bindProperty('tileWidth',     this.profile.getProfileData('tileWidth',       0));
      this.bindProperty('tileHeight',     this.profile.getProfileData('tileHeight',       0));
  }

  static getPropertyList() {
    var params = super.getPropertyList();
    params['tileWidth']  = 0;
    params['tileHeight'] = 0;
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
      var w = this.getCalcValue('w');
      var h = this.getCalcValue('h');
      ctx.translate( w / 2 + x,
                  h / 2 + y);
      ctx.rotate(angle);
      ctx.scale(this.getCalcValue('scalex'), this.getCalcValue('scaley'));
      ctx.globalAlpha = this.getCalcValue('a');
      var img = new Image();
      img.src = this.src;

      var tileWidth = this.getCalcValue('tileWidth');
      var tileHeight = this.getCalcValue('tileHeight');

      // タイルの幅または高さが0の場合の
      // 無限ループ防止
      if ( !tileWidth || !tileHeight ) {
        return;
      }

      var tileColCount = Math.floor(tileWidth / w);
      var tileWidthMod = tileWidth % w;
      if ( tileWidthMod ) {
        // 余りがある場合はタイル数を１つ増やす
        tileColCount ++;
      }

      var tileRowCount = Math.floor(tileHeight / h);
      var tileHeightMod = tileHeight % h;
      if ( tileHeightMod ) {
        // 余りがある場合はタイル数を１つ増やす
        tileRowCount ++;
      }

      // クリッピング処理
      ctx.beginPath();
      ctx.fillStyle="rgba(0,0,0,0)";
      ctx.rect( - w / 2 + x, - h / 2 + y, tileWidth, tileHeight);
      ctx.fill();
      ctx.clip();
  // var pattern = ctx.createPattern( img, 'repeat' );
  // ctx.fillStyle = pattern;
      var sx = Math.floor( this.getCalcValue('sx') );
      var sy = Math.floor( this.getCalcValue('sy') );
      var sw = Math.floor( this.getCalcValue('sw') );
      var sh = Math.floor( this.getCalcValue('sh') );
      var w = this.getCalcValue('w');
      var h = this.getCalcValue('h');
      for (i=0; i<tileRowCount; i++) {
        for (j=0; j<tileColCount; j++) {
          if ( this.getCalcValue('sw') && this.getCalcValue('sh') ) {
            ctx.drawImage(img, 
                        sx,
                        sy,
                        sw,
                        sh,
                        - w / 2 + j * w,
                        - h / 2 + i * h,
                        w,
                        h
                      );
          }
          else {
            ctx.drawImage(img, 
                        - w / 2,
                        - h / 2,
                        w + j * w,
                        h + i * h
                      );
        }
      }
    }
      ctx.restore();
  }
}