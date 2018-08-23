export default class AppConfigUtils {
    static TYPE_SPLASH = "A"
    static TYPE_LOGO = "B"
    static TYPE_ACTIONBAR_COLOR = "D"
    static TYPE_MSG_OPEN = "F"
    static TYPE_MSG_CLOSE = "E"
    static TYPE_LOADING_COLOR = "G"

    static getSplashUrl(data = [], type) {
        let url = null;
        data.forEach((value) => {
            if (value.pageType === this.TYPE_SPLASH) {
                url = this.get3xImageUrl(value.imgUrl)
            }
        })
        return url;
    }
    static getTitleLogoUrl(data = []) {
        let url = null;
        data.forEach((value) => {
            if (value.pageType === this.TYPE_LOGO) {
                url = this.get3xImageUrl(value.imgUrl)
            }
        })
        return url;
    }

    static get3xImageUrl(urls = []) {
        let url = null;
        urls.forEach((value, index) => {
            if (value.includes("3x") === true) {
                url = value;
            }
        })
        return url;
    }
    static getActionbarColor(data=[])
    {
        var len = data.length;
        for (i = 0; i < len; i++) {
            item = data[i];
                if (item.pageType===this.TYPE_ACTIONBAR_COLOR) {
                return item.imgUrl;
                }
        }
    }
}