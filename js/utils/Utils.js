import {findNodeHandle, UIManager} from "react-native";

export default class Utils {

    static getMeasuredData(image) {
        let handle = findNodeHandle(image);
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            console.log(x);
            console.log(y);
            console.log(width);
            console.log(height);
            console.log(pageX);
            console.log(pageY);
        })
        return {x:x,y:y,width:width,height:height}
    }
}