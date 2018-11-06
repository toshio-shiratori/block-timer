export default class ArakinProfile {
    constructor(params = null) {
        this.params = new Array();
        if ( params ) {
            this.params = params;
        }
    }

    getProfileData(key, defaultValue=null) {
        if (this.params[key] != null)  {
            return this.params[key];
        }
        return defaultValue;
    }
}