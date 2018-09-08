/**
 * @file userInfo module
 * @author STIU
 */

export const state = () => {
    return {
        user: {
            isLogin: false,
            name: 'Andrew',
            email: 'admin@stamford.edu',
            location: 'Thailand',
            isOrg:false,
            isAdmin:false
        }
    };
};
export const mutations = {
    setLogin(state,user) {
        state.user.isLogin = true;
        state.user.name = user.name;
        state.user.email = user.email;
        state.user.location = user.location;

        if(user.position == "admin"){
            state.user.isAdmin = true;
            state.user.isOrg = true;
        }else if(user.position == "org"){
            state.user.isOrg = true;
        }
    },
    logOut(state,isLogout) {
        state.user.isLogin = false;
        state.user.isAdmin = false;
        state.user.isOrg = false;
    }
};
export const actions = {
    setLogin({commit},user) {
        commit('setLogin',user);
    },
    logOut({commit}){
        commit('logOut',true)
    }
};
