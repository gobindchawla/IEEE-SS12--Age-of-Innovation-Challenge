/**
 * @file appShell/appSidebar module
 * @author lavas
 */

export const SET_SIDEBAR_VISIBILITY = 'SET_SIDEBAR_VISIBILITY';

export const state = () => {
    return {
        show: false, // 是否显示sidebar

        localLocation:'Thailand',

        // 头部条的相关配置
        title: {
            imageLeft: '',
            altLeft: '',
            iconLeft: '',
            text: 'HelpinBees',
            imageRight: '',
            altRight: '',
            iconRight: '',
            logoText:'/static/img/icons/logoText.png',
            logoWithText:'/static/img/icons/logoWithText.png'
        },

        user: {
            name: 'Andrew',
            email: 'admin@stamford.edu',
            location: 'Thailand'
        },

        // 分块组
        blocks: [
            {
                // 子列表1
                sublistTitle: 'Page Tab',
                list: [
                    {
                        needLogin:false,
                        text: 'Contact Us',
                        icon: 'contacts',
                        route: '/contact_us'
                    },
                    {
                        needLogin:false,
                        text: 'Settings',
                        // image: 'https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_mood_bad_black_48dp.png?raw=true',
                        // alt: 'mood-bad',
                        icon: 'settings',
                        route: '/settings'
                    },
                    {
                        needLogin:false,
                        text: 'Change prefer location',
                        icon: 'location_on',
                        route: '/change-location'
                    },
                    {
                        needLogin:true,
                        text: 'Profile',
                        icon: 'person',
                        route: '/profile'
                    },{
                        needLogin:true,
                        needOrg:true,
                        text: 'Post',
                        icon: 'subject',
                        route: '/post'
                    }
                ]
            }
        ]
    };
};

export const mutations = {
    changeLocation(state,location){
        state.localLocation = location;
    },
    [SET_SIDEBAR_VISIBILITY](state, sidebarVisibility) {
        state.show = sidebarVisibility;
    }
};

export const actions = {
    changeLocation({commit},location){
        commit('changeLocation',location);
    },
    /**
     * 展示侧边栏
     *
     * @param {Function} commit commit
     */
    showSidebar({commit}) {
        commit(SET_SIDEBAR_VISIBILITY, true);
    },

    /**
     * 隐藏侧边栏
     *
     * @param {Function} commit commit
     */
    hideSidebar({commit}) {
        commit(SET_SIDEBAR_VISIBILITY, false);
    }


};
