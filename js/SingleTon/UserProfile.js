import Mystorage from "../utils/Mystorage";
import Constant from "../utils/Constant";


export default class UserProfile {

    user = "null";

    static getInstance() {
        if (!UserProfile.instance) {
            UserProfile.instance = new UserProfile();
        }
        return UserProfile.instance;
    }

    setUser(user) {
        this.user = user;
    }

    getUser() {
        return new Promise((resolve, reject) => {
            if (this.user!==null)
            {
                 resolve(this.user)
            }
            Mystorage._load(Constant.sUser).then(user => {
                {
                     resolve(JSON.parse(user))
                    this.setUser(JSON.parse(user))

                }
            }).catch((error) => {

                this.setUser(null)
                 reject(null)

            });
        });
    }

    clearUser()
    {
            Mystorage._remove(Constant.sUser)

    }
}
