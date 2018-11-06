// インクルード
import ArakinPart from './arakin_part.js';

export default class ArakinPartScribble extends ArakinPart {
    constructor(params) {
        super(params);

        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.drawing = false;
        this.drawBeforeX = 0;
        this.drawBeforeY = 0;
        this.drawX = 0;
        this.drawY = 0;

        // 作業用のキャンバスを取得
        var cv = document.createElement("canvas");
        cv.width  = this.getProperty('w').getValue();
        cv.height = this.getProperty('h').getValue();
        var ctxWork = cv.getContext('2d');
        ctxWork.clearRect(0, 0, cv.width, cv.height);
        this.scribbleCanvas = cv;

        var cvMask = document.createElement("canvas");
        cvMask.width  = this.getProperty('w').getValue();
        cvMask.height = this.getProperty('h').getValue();
        var ctxWorkMask = cvMask.getContext('2d');
        ctxWorkMask.clearRect(0, 0, cvMask.width, cvMask.height);
        this.scribbleCanvasMask = cvMask;

        this.scribbleItem = new Array();
        this.scribbleItem['type']  = 4;
        this.scribbleItem['src']   = 
        this.scribbleItem['img']   = new Image();
        this.scribbleItem['img'].src = 'assets/img/pen.png';
        this.scribbleItem['imgCurrentIndex'] = 0;
        this.scribbleItem['imgIndexes'] = 3;
        this.scribbleItem['imgSW'] = 30;
        this.scribbleItem['imgSH'] = 30;

        var cvImgCanvas = document.createElement("canvas");
        cvImgCanvas.width  = this.scribbleItem['imgSW'];
        cvImgCanvas.height = this.scribbleItem['imgSH'];
        this.scribbleItem['imgCanvas'] = cvImgCanvas;

        var cvImgMaskCanvas = document.createElement("canvas");
        cvImgMaskCanvas.width  = this.scribbleItem['imgSW'];
        cvImgMaskCanvas.height = this.scribbleItem['imgSH'];
        this.scribbleItem['imgMaskCanvas'] = cvImgMaskCanvas;
        this.scribbleItem['imgMask'] = new Image();
        this.scribbleItem['imgMask'].src = 'assets/img/pen_mask.png';

        this.scribbleItem['lineWidth'] = 5;
        this.scribbleItem['radius'] = 10;
        this.scribbleItem['strokeStyle'] = 'rgb(0,255,0)';
        this.scribbleItem['fillStyle'] = 'rgb(0,255,255)';
        this.scribbleItem['distance'] = 1;
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        return params;
    }

    setScribbleItem( scribbleItem ) {
        this.scribbleItem = scribbleItem;
    }

    draw() {
        if ( this.scribbleItem == null ) {
            return;
        }
        var canvas = document.getElementById(this.canvasId);
        if( !canvas || !canvas.getContext ) return false;
        var ctx = canvas.getContext('2d');
        ctx.save( );        
        ctx.drawImage(this.scribbleCanvas, 
            0,
            0
                    );
        ctx.restore();
    }

    drawLiner() {
        var xDiff = this.currentX-this.drawX;
        var yDiff = this.currentY-this.drawY;
        var distance = Math.floor( Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) ) );
        if ( distance < this.scribbleItem['distance'] ) {
            return;
        }
        // y = ax + b
        // 三平方の定理より距離を求める
        var startX = this.drawX;
        var startY = this.drawY;
        var distanceX = xDiff / distance;
        var distanceY = yDiff / distance;
        for (var i=this.scribbleItem['distance'];i<distance;i=i+this.scribbleItem['distance']) {
            this.drawX = startX + distanceX * i;
            this.drawY = startY + distanceY * i;
            this.drawScribble();
        }
    }

    drawScribble() {
        if ( this.scribbleItem == null ) {
            return;
        }

        var ctxWork = this.scribbleCanvas.getContext('2d');
        var ctxWorkMask = this.scribbleCanvasMask.getContext('2d');
        switch ( this.scribbleItem['type'] ) {
            // 単純な線を描画
        case 0:
            ctxWork.save();
            ctxWork.strokeStyle = this.scribbleItem['strokeStyle'];
            ctxWork.lineCap = 'round';
            ctxWork.lineJoin = 'round';
//            ctxWork.setLineDash([1,10]);
//            ctxWork.globalCompositeOperation = 'lighter';
            ctxWork.lineWidth = this.scribbleItem['lineWidth'];
            ctxWork.beginPath();
            ctxWork.moveTo(this.drawBeforeX,this.drawBeforeY);
            ctxWork.lineTo(this.drawX, this.drawY);
            ctxWork.stroke();
            ctxWork.restore();
            break;
            // 淵付きの円を連続して描画して線を作る
        case 1:
            ctxWork.save();
            ctxWork.strokeStyle = this.scribbleItem['strokeStyle'];
            ctxWork.fillStyle = this.scribbleItem['fillStyle'];
            ctxWork.lineWidth = this.scribbleItem['lineWidth'];
            ctxWork.globalCompositeOperation = 'lighter';
            ctxWork.beginPath();
//            ctxWork.moveTo(this.lastX,this.lastY);
  //          ctxWork.lineTo(this.currentX, this.currentY);
            ctxWork.arc(this.drawX, this.drawY, this.scribbleItem['radius'], 0, Math.PI * 2, false);
            ctxWork.closePath();
            ctxWork.fill();
            ctxWork.stroke();
            ctxWork.restore();
            break;
            // コロコロスタンプ
        case 2:
            ctxWork.save();
            ctxWorkMask.save();
//            ctxWork.globalCompositeOperation = 'lighter';
            ctxWork.drawImage( this.scribbleItem['img'], this.scribbleItem['imgSW'] * this.scribbleItem['imgCurrentIndex']
                                                       , 0
                                                       , this.scribbleItem['imgSW']
                                                       , this.scribbleItem['imgSH']
                                                       , this.drawX
                                                       , this.drawY
                                                       , this.scribbleItem['imgSW']
                                                       , this.scribbleItem['imgSH']
                                                    );
            this.scribbleItem['imgCurrentIndex'] ++;
            if (this.scribbleItem['imgCurrentIndex'] >= this.scribbleItem['imgIndexes']) {
                this.scribbleItem['imgCurrentIndex'] = 0;
            }
           /*
            var imgData = ctxWork.getImageData(this.drawX, this.drawY, 10, 10);
            var data = imgData.data;
            for (var i = 0; i < data.length; i += 4) {
                data[i] = 255;
                data[i+1] = 255;
                data[i+2] = 255;
                data[i+3] += 10;
            }
            ctxWork.putImageData(imgData,this.drawX,this.drawY);
            */
            ctxWorkMask.restore();
            ctxWork.restore();
            break;
        // スタンプ
        case 3:
            ctxWork.save();

            var imgData = null ;
            var data = null;

            var ctxWorkImage = this.scribbleItem['imgCanvas'].getContext('2d');
            var imgData2 = ctxWorkImage.getImageData(0, 0, this.scribbleItem['imgSW'], this.scribbleItem['imgSH']);
            var dataPen = imgData2.data;

            // 初回でない場合は一つ前の書き込み情報を復元
            if ( this.firstDrew == true ) { 
                imgData = ctxWork.getImageData(this.drawBeforeX, this.drawBeforeY, this.scribbleItem['imgSW'], this.scribbleItem['imgSH']);
                data = imgData.data;
                // 一つ前の書き込み情報を復元
                for (var i = 0; i < data.length; i += 4) {
                        data[i]   = dataPen[i];
                        data[i+1] = dataPen[i+1];
                        data[i+2] = dataPen[i+2];
                        data[i+3] = dataPen[i+3];
                }
                ctxWork.putImageData(imgData2,this.drawBeforeX,this.drawBeforeY);
            }

            // 現在書き込まれている情報を保持
            imgData = ctxWork.getImageData(this.drawX, this.drawY, this.scribbleItem['imgSW'], this.scribbleItem['imgSH']);
            data = imgData.data;
            for (var i = 0; i < data.length; i += 4) {
                    dataPen[i]   = data[i];
                    dataPen[i+1] = data[i+1];
                    dataPen[i+2] = data[i+2];
                    dataPen[i+3] = data[i+3];
            }
            ctxWorkImage.putImageData(imgData2,0,0);



            ctxWork.drawImage( this.scribbleItem['img'], this.scribbleItem['imgSW'] * this.scribbleItem['imgCurrentIndex']
                                                       , 0
                                                       , this.scribbleItem['imgSW']
                                                       , this.scribbleItem['imgSH']
                                                       , this.drawX
                                                       , this.drawY
                                                       , this.scribbleItem['imgSW']
                                                       , this.scribbleItem['imgSH']
                                                    );


            

            ctxWork.restore();
            break;

        // マスク情報を含んだ画像で描画
        case 4:
            ctxWork.save();
            ctxWorkMask.save();

//            ctxWork.globalCompositeOperation = 'lighter';
/*
            ctxWork.drawImage( this.scribbleItem['img'], this.scribbleItem['imgSW'] * this.scribbleItem['imgCurrentIndex']
                                                       , 0
                                                       , this.scribbleItem['imgSW']
                                                       , this.scribbleItem['imgSH']
                                                       , this.drawX
                                                       , this.drawY
                                                       , this.scribbleItem['imgSW']
                                                       , this.scribbleItem['imgSH']
                                                    );
*/


            // 描画対象のピクセル情報を取得する
            var canvasImageData = ctxWork.getImageData(this.drawX, this.drawY, this.scribbleItem['imgSW'], this.scribbleItem['imgSH']);
            var canvasPixelData = canvasImageData.data;

            // 描画対象のマスクピクセル情報を取得する
            var canvasMaskImageData = ctxWorkMask.getImageData(this.drawX, this.drawY, this.scribbleItem['imgSW'], this.scribbleItem['imgSH']);
            var canvasMaskPixelData = canvasMaskImageData.data;

            var contextPen = this.scribbleItem['imgCanvas'].getContext('2d');
            contextPen.drawImage(this.scribbleItem['img'],0,0);

            var contextMaskPen = this.scribbleItem['imgMaskCanvas'].getContext('2d');
            contextMaskPen.drawImage(this.scribbleItem['imgMask'],0,0);

            var penImageData = contextPen.getImageData(0, 0, this.scribbleItem['imgSW'], this.scribbleItem['imgSH']);
            var penPixelData = penImageData.data;

            var penMaskImageData = contextMaskPen.getImageData(0, 0, this.scribbleItem['imgSW'], this.scribbleItem['imgSH']);
            var penMaskPixelData = penMaskImageData.data;

            for (var i = 0; i < canvasMaskPixelData.length; i += 4) {
                if ( canvasMaskPixelData[i] < penMaskPixelData[i]) {
                    canvasPixelData[i]   = penPixelData[i];
                    canvasPixelData[i+1] = penPixelData[i+1];
                    canvasPixelData[i+2] = penPixelData[i+2];
                    canvasPixelData[i+3] = penPixelData[i+3];
                    canvasMaskPixelData[i]   = penMaskPixelData[i];
                    canvasMaskPixelData[i+1] = penMaskPixelData[i+1];
                    canvasMaskPixelData[i+2] = penMaskPixelData[i+2];
                    canvasMaskPixelData[i+3] = penMaskPixelData[i+3];
                }
            }
            ctxWork.putImageData(canvasImageData,this.drawX,this.drawY);
            ctxWorkMask.putImageData(canvasMaskImageData,this.drawX,this.drawY);

            ctxWorkMask.restore();
            ctxWork.restore();
            break;            
        }

        this.drawBeforeX = this.drawX;
        this.drawBeforeY = this.drawY;
        this.firstDrew = true;
    }

    drawStart(x, y) {
        this.drawing = true;
        this.startX = x-1;
        this.startY = y-1;
        this.currentX = x-1;
        this.currentY = y-1;
        this.drawBeforeX = x-1;
        this.drawBeforeY = y-1;
        this.drawX = x-1;
        this.drawY = y-1;
        this.firstDrew = false;
        this.drawScribble();
    }

    drawMove(x, y) {
        if ( this.drawing == false ) {
            return;
        }
        this.currentX = x;
        this.currentY = y;
        this.drawLiner();
    }

    drawEnd(x, y) {
        this.drawing = false;
        this.currentX = x;
        this.currentY = y;
        this.lastX = x;
        this.lastY = y;
        this.drawX = x;
        this.drawY = y;
        this.drawLiner();
    }
}