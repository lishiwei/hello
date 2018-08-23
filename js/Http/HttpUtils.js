/*global fetch*/

// race all, 都是并行执行promise，前者的状态由最先改变的那个决定。all则是全部通过才算成功
import Mystorage from "../utils/Mystorage";
import Constant from "../utils/Constant";
import UserProfile from "../SingleTon/UserProfile";

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject({status: -1, message: "网络超时"})

        }, ms)
    })
}

const fetchWithTimeout = (promise) => { // race并行执行多个promise，结果由最先结束的Promise决定


    return Promise.race([promise, delay(10000)])
}


const HttpUtils = {

    baseApi: '',
    LoginApi: "",
    AppConfig: "",
    HomeData: "",
    TabConfig: "",
    MyselfConfig: "",
    SearchAll: "",
    SearchProduct: "",
    SearchOrder: "",
    SearchLearn: "",
    SearchCustomer: "",
    SearchHistory: "",
    post(url, formData) {
        return new Promise((resolve, reject) => {
            fetch(this.baseApi + url, {
                method: 'post',
                headers: this.getHeader(),
                body: JSON.stringify(formData),

            })
                .then((response) => {
                    return response.json()
                })
                .then((response) => {

                    if (undefined != response.data) {
                        resolve(response.data);
                    }
                    else {
                        reject({status: response.status, message: response.message})
                    }
                }).catch((error) => {

                reject({status: error.code, message: error.message})
            })


        })

    },

    get(url, params) {
        if (params) {
            let paramsArray = [];
            //encodeURIComponent
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        return new Promise((resolve, reject) => {
            fetch(this.baseApi + url, {
                method: 'GET',
                headers: this.getHeader(),
            })
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    if (undefined != response.data) {
                        resolve(response.data);
                    }
                    else {
                        reject({status: response.status, message: response.message})
                    }
                })
        })

    },
    getHeader() {
        let header = {};
        header["token"] = ""
        header["t"] = "android"
        header["v"] = "1.0.0"
        header["osVersion"] = "android"
        header["osDevice"] = "oneplus"
        header["Content-Type"] = "application/json;charset=UTF-8"
        header["Accept"] = "*/*"
        header["appFlag"] = "app_baoa"
        return header;
    },
    login(name, password) {
        let formData = {};
        formData["loginName"] = name;
        formData["password"] = password;
        formData["ip"] = "";
        return fetchWithTimeout(this.post(this.LoginApi, formData)).then((user) => {
            let newUser = user;
            newUser.token = user.id + "_" + user.token;
            Mystorage._sava(Constant.sUser, JSON.stringify(newUser))

            return newUser
        })
    },
    getAppConfig() {
        let formData = {};
        return UserProfile.getInstance().getUser().then((user) => {
            formData["userId"] = user.id
            return formData

        }).catch((error) => {
        }).then((formData) => {
            return fetchWithTimeout(this.post(this.AppConfig, formData))
        })
    },
    getHomeData() {
        let formData = {};
        return UserProfile.getInstance().getUser().then((user) => {
            formData["userId"] = user.id
            return formData

        }).catch((error) => {
        }).then((formData) => {
            return fetchWithTimeout(this.post(this.HomeData, formData))
        })


    }, getBottomTabData() {
        let formData = {};
        return UserProfile.getInstance().getUser().then((user) => {
            formData["userId"] = user.id
            return formData

        }).catch((error) => {
        }).then((formData) => {
            return fetchWithTimeout(this.post(this.TabConfig, formData))
        })
    },
    getMyselfConfigData() {
        let formData = {};
        return UserProfile.getInstance().getUser().then((user) => {
            formData["userId"] = user.id
            return formData

        }).catch((error) => {
        }).then((formData) => {
            return fetchWithTimeout(this.post(this.MyselfConfig, formData))
        })


    },
    searchAll(text) {
        let searchParam = {};
        searchParam["from"] = 0;
        searchParam["size"] = 3;
        searchParam["content"] = text;
        return UserProfile.getInstance().getUser().then((user) => {
            return this.getBaseSearchParam(user, searchParam)

        }).catch((error) => {
        }).then((formData) => {
            console.log(formData)
            return fetchWithTimeout(this.post(this.SearchAll, formData))
        })
    }, searchOrder(text) {
        let searchParam = {};
        searchParam["from"] = 0;
        searchParam["size"] = 3;
        searchParam["content"] = text;
        return UserProfile.getInstance().getUser().then((user) => {
            return this.getBaseSearchParam(user, searchParam)

        }).catch((error) => {
        }).then((formData) => {
            console.log(formData)
            return fetchWithTimeout(this.post(this.SearchOrder, formData))
        })
    }, searchCustomer(text) {
        let searchParam = {};
        searchParam["from"] = 0;
        searchParam["size"] = 3;
        searchParam["content"] = text;
        return UserProfile.getInstance().getUser().then((user) => {
            return this.getBaseSearchParam(user, searchParam)

        }).catch((error) => {
        }).then((formData) => {
            console.log(formData)
            return fetchWithTimeout(this.post(this.SearchCustomer, formData))
        })
    }, searchProduct(text) {
        let searchParam = {};
        searchParam["from"] = 0;
        searchParam["size"] = 3;
        searchParam["content"] = text;
        return UserProfile.getInstance().getUser().then((user) => {
            return this.getBaseSearchParam(user, searchParam)

        }).catch((error) => {
        }).then((formData) => {
            console.log(formData)
            return fetchWithTimeout(this.post(this.SearchProduct, formData))
        })
    },searchLearn(text) {
        let searchParam = {};
        searchParam["from"] = 0;
        searchParam["size"] = 3;
        searchParam["content"] = text;
        return UserProfile.getInstance().getUser().then((user) => {
            return this.getBaseSearchParam(user, searchParam)

        }).catch((error) => {
        }).then((formData) => {
            console.log(formData)
            return fetchWithTimeout(this.post(this.SearchLearn, formData))
        })
    },
    searchHistory()
    { let formData = {};
        return UserProfile.getInstance().getUser().then((user) => {
            formData["userId"] = user.id
            return formData

        }).catch((error) => {
        }).then((formData) => {
            return fetchWithTimeout(this.get(this.SearchHistory+formData["userId"]))
        })

    },
    getBaseSearchParam(user, searchParam) {
        let baseSearchParam = {};
        baseSearchParam["userId"] = user.id;
        baseSearchParam["tenantId"] = user.tenantId;
        baseSearchParam["agencyId"] = user.subAgencyId;
        baseSearchParam["from"] = searchParam.from;
        baseSearchParam["color"] = "#00bd96";
        baseSearchParam["size"] = searchParam.size;
        baseSearchParam["content"] = searchParam.content;
        return baseSearchParam;
    }
}

module.exports = HttpUtils
