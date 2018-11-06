// インクルード
import ArakinObject from './arakin_object.js';

export default class ArakinAnim extends ArakinObject {
    constructor(params = null) {
        super(params);
        this.loopEnable       = this.profile.getProfileData('loopEnable', true);
        this.loopCount        = this.profile.getProfileData('loopCount' , 0);
        this.loopReturn       = this.profile.getProfileData('loopReturn', false);
        this.lastLoopCount     = 0;
        this.timerDistance    = this.profile.getProfileData('timerDistance', 1000);
        this.timerNextWait    = this.profile.getProfileData('timerNextWait', 0);
        this.timerDelay       = this.profile.getProfileData('timerDelay', 0);
        this.stopValueDisable = this.profile.getProfileData('stopValueDisable', false);
    }

    static getPropertyList() {
        var params = super.getPropertyList();
        params['loopEnable']       = true;
        params['loopCount']        = 0;
        params['loopReturn']       = false;
        params['timerDistance']    = 1000;
        params['timerNextWait']    = 0;
        params['timerDelay']       = 0;
        params['stopValueDisable'] = false;
        // プロパティが増えたらここに追加してください
        return params;
    }

    calc(rate) {
    }

    onEvent(name, data, timerValue) {
        switch ( name ) {
        case 'start':
            this.startTimerValue = timerValue + this.timerDelay + this.timerNextWait;
            this.lastLoopCount = -1;
            this.enable = true;
            break;
        case 'stop':
            this.enable = false;
            if (this.stopValueDisable) {
              this.setValue( 0 );
            }
            break;
        case 'proc':
            this.onEventProc(data, timerValue);
            break;
        }
        super.onEvent(name,data, timerValue);
    }

    onEventProc(data, timerValue) {
        // 無効の場合は処理しない
        if ( !this.enable ) {
            return;
        }

        // 開始時間になっていなければ処理しない
        if ( timerValue < this.startTimerValue ) {
            return;
        }

        var progressRate = 0;
        var lastLoopCount = 0;
        if ( !this.timerDistance ) {
            // 間隔�?0なので常に1
            progressRate = 1;
        }
        else {
            // ループ回数を超えている場合は常に1
            var progress = timerValue - this.startTimerValue;
            var calcLoopCount = Math.floor(progress / this.timerDistance);
            if ((this.loopCount) && calcLoopCount >= this.loopCount ) {
                lastLoopCount = this.loopCount;
                progressRate = 1;
                this.onEvent('stop', null, timerValue);
            }
            else {
                progressRate = (progress % this.timerDistance) / this.timerDistance;
                lastLoopCount = calcLoopCount;
            }
        }

        if (progressRate > 1.0) {
            progressRate = 1;
        }
        else if (progressRate < 0.0) {
            progressRate = 0;
        }

        if ( this.loopReturn ) {
            progressRate = progressRate * 2;
            if ( progressRate > 1 ) {
                progressRate = 2 - progressRate;
            }
        }

        if ( this.lastLoopCount != lastLoopCount ) {
            this.onEventLoopStart(data);
            this.lastLoopCount = lastLoopCount;
        }

        this.calc(progressRate);
    }

    onEventLoopStart(data) {
    }
}