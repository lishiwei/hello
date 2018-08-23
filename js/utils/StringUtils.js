export default class StringUtils {
    static get3xUrlFromString(url="") {
        let urls = url.split(";")
        var len = urls.length;
        for (i = 0; i < len; i++) {
            urlItem = urls[i];
            if (urlItem.includes("3x")) {
                return urlItem;
            }
        }
    }
}