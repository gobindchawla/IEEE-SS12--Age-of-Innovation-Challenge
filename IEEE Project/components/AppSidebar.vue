<template>
    <sidebar v-model="sidebarStatus"
             :enable="enableSidebar"
    >
        <!-- sidebar 内容部分 -->
        <div
            class="app-sidebar-content">
            <!-- 头部 -->
            <div v-if="title" class="app-sidebar-title" @click.stop="closeAndGo('/')">
                <span class="app-sidebar-title-left-icon">
                    <img v-if="title.imageLeft" :src="title.imageLeft" :alt="title.altLeft"></img>
                    <v-icon color="white" v-else-if="title.iconLeft">{{ title.iconLeft }}</v-icon>
                </span>
                <span><img :src="title.logoWithText" id="sidebar-logo-text"></span>
                <slot name="logo" class="app-sidebar-title-right-logo">
                    <span class="app-sidebar-title-right-logo">
                        <img v-if="title.imageRight" :src="title.imageRight" :alt="title.altRight"></img>
                        <v-icon v-else-if="title.iconRight">{{ title.iconRight }}</v-icon>
                    </span>
                </slot>
            </div>


            <div v-if="!user.isLogin" class="app-sidebar-user">
                <div class="user-info">
                    <v-form ref="form" v-model="valid">
                        <v-text-field
                            v-model="userName"
                            :rules="userNameRules"
                            label="Username"
                            required
                            v-if="registration"
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :append-icon="pwdShow ? 'visibility_off' : 'visibility'"
                            :rules="pwdRules"
                            :type="pwdShow ? 'text' : 'password'"
                            hint="At least 6 characters"
                            class="input-group--focused"
                            counter
                            label="Password"
                            required
                            @click:append="pwdShow = !pwdShow"
                        ></v-text-field>
                        <v-text-field
                        v-model="age"
                        label="Age"
                        mask="###"
                        v-if="registration"
                        :rules="ageRules"
                        >
                        </v-text-field>
                        <v-btn
                            color="success"
                            :disabled="!valid"
                            @click="submit"
                        >
                            {{registration ? 'Sign Up' : 'Sign In'}}
                        </v-btn>
                        <v-btn @click="clear">clear</v-btn>

                        <div class="loginFiled caption" v-if="loginRejected">Email or password wong, please try agin
                        </div>

                        <v-flex>
                            <div class="register caption">
                                <span
                                    @click="registration=!registration">{{registration ? 'Already have account?' : 'Don\'t have account?'}}</span>
                                <span>   Forgot password?</span>

                            </div>
                        </v-flex>
                    </v-form>
                </div>
            </div>

            <!-- 用户信息 -->
            <div v-if="user.isLogin" class="app-sidebar-user">
                <div class="user-avatar">
                    <v-icon class="user-avatar-icon">face</v-icon>
                </div>
                <div class="user-info">
                    <div class="userInfoEdit" @click.stop="closeAndGo('user-info-edit')">
                        <v-icon>edit</v-icon>
                        Edit
                    </div>
                    <div class="user-name">
                        <v-icon>person</v-icon>
                        {{user.name}}
                    </div>
                    <div class="user-location">
                        <v-icon>room</v-icon>
                        {{user.location}}
                    </div>
                    <div class="user-email">
                        <v-icon>email</v-icon>
                        {{user.email}}
                    </div>
                    <v-btn color="error" @click="logOut">Log Out</v-btn>
                </div>

            </div>

            <!-- 导航列表分区块 -->
            <div v-if="blocks" class="app-sidebar-blocks">
                <ul>
                    <!-- 单个区块 -->
                    <li v-for="(block, index) in blocks" :key="index" class="app-sidebar-block">
                        <div v-if="block.sublistTitle" class="sub-list-title">{{ block.sublistTitle }}</div>
                        <ul v-if="block.list">
                            <!--<li v-for="item in block.list" :key="item.text" @click.stop="closeAndGo(item.route)"-->
                                <!--v-if="user.isLogin || !item.needLogin">-->
                                <!--<span v-if="item.icon || item.image" class="app-sidebar-block-left-icon">-->
                                    <!--<img v-if="item.image" :src="item.image" :alt="item.alt"></img>-->
                                    <!--<v-icon v-else-if="item.icon">{{ item.icon }}</v-icon>-->
                                <!--</span>-->
                                <!--<span v-if="item.text" class="app-sidebar-block-text">{{ item.text }}</span>-->
                            <!--</li>-->

                            <li @click.stop="closeAndGo('/contact_us')">
                                <span class="app-sidebar-block-left-icon">
                                    <v-icon>contacts</v-icon>
                                </span>
                                <span class="app-sidebar-block-text">Contact Us</span>
                            </li>

                            <li @click.stop="closeAndGo('/settings')">
                                <span class="app-sidebar-block-left-icon">
                                    <v-icon>settings</v-icon>
                                </span>
                                <span class="app-sidebar-block-text">Settings</span>
                            </li>

                            <li @click.stop="closeAndGo('/change-location')">
                                <span class="app-sidebar-block-left-icon">
                                    <v-icon>location_on</v-icon>
                                </span>
                                <span class="app-sidebar-block-text">Change prefer location</span>
                            </li>

                            <li @click.stop="closeAndGo('/profile')" v-if="user.isLogin">
                                <span class="app-sidebar-block-left-icon">
                                    <v-icon>person</v-icon>
                                </span>
                                <span class="app-sidebar-block-text">Profile</span>
                            </li>


                            <li @click.stop="closeAndGo('/post')"  v-if="user.isLogin && user.isOrg">
                                <span class="app-sidebar-block-left-icon">
                                    <v-icon>subject</v-icon>
                                </span>
                                <span class="app-sidebar-block-text">Post</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </sidebar>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import Sidebar from './Sidebar';
    import axios from 'axios';

    export default {
        data: () => ({
            registration: false,
            pwdShow: false,
            valid: true,
            loginRejected: false,
            userName: '',
            userNameRules: [
                v => !!v || 'Username is required',
                v => (v && v.length >= 3) || 'Username must be more than 2 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            pwdRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || 'Password must be more than 6 characters'
            ],
            ageRules:[
                v=> !!v || 'Age is required',
                v => (v && v >16) || 'Age must above 18'
            ]
        }),

        components: {
            Sidebar
        },
        computed: {
            ...mapState('appShell/appSidebar', [
                'show',
                'title',
                'blocks'
            ]),
            ...mapState('ieee/userInfo', [
                'user',
            ]),
            sidebarStatus: {
                get() {
                    return this.show;
                },
                set(val) {
                    if (val) {
                        this.$emit('show-sidebar');
                    }
                    else {
                        this.$emit('hide-sidebar');
                    }
                }
            },
            enableSidebar() {
                return this.$store.state.appShell.appHeader.show
                    && this.$store.state.appShell.appHeader.showMenu;
            }
        },
        methods: {
            ...mapActions('ieee/userInfo', [
                'setLogin',
                'logOut'
            ]),
            close() {
                this.sidebarStatus = false;
            },
            closeAndGo(route) {
                this.$router.push(route);
                this.close();
            },
            setLogin(user) {
//            user.name = this.userName?this.userName:'Andrew';
//            user.email = this.email;
//            user.location = 'Thailand';
                this.$store.dispatch('ieee/userInfo/setLogin', user)
            this.$refs.form.reset()
            },
            logOut() {
                this.$store.dispatch('ieee/userInfo/logOut')
            },
            submit() {
                if (this.$refs.form.validate()) {
                    if (this.registration) {
                        axios.post('/api/submit', {
                            type: 'register',
                            userName: this.userName,
                            password: this.password,
                            email: this.email
                        })
                            .then((res) => {
                                var data = res.data;

                                if (data.state == "success") {
                                    var user = {};
                                    user.name = data.userName;
                                    user.email = this.email;
                                    user.location = data.location;
                                    this.setLogin(user);
                                } else {
                                    var user = {};
                                    user.name = this.userName;
                                    user.email = this.email;
                                    user.location = 'Thailand';
                                    this.setLogin(user);
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    } else {
                        axios.post('/api/submit', {
                            type: 'login',
                            password: this.password,
                            email: this.email
                        }).then((res) => {
                            var data = res.data;

                            if (data.state == "success") {
                                var user = {};
                                user.name = data.userName;
                                user.email = this.email;
                                user.location = data.location;
                                user.position = data.position;
                                this.setLogin(user);
                            } else {
                                this.loginRejected = true;
                            }
                        })
                            .catch((error) => {
                                console.log(error)
                            });
                    }
                }
            },
            clear() {
                this.$refs.form.reset();
                this.loginRejected = false
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'
    // 左侧触发滑动宽度
    $swipe-width = 20px
    #sidebar-logo-text
        padding-bottom 30px
        width 200px

    ul, li
        padding 0
        margin 0
        list-style none

    a
        text-decoration none
        color #333

    .app-sidebar-content
        &.app-sidebar-content-right
            box-shadow -3px 0 8px 1px rgba(0, 0, 0, 0.4)

            &.app-sidebar-title,
            &.app-sidebar-blocks
                text-align right

        .app-sidebar-title-left-icon,
        .app-sidebar-block-left-icon
            display inline-block
            width ($app-sidebar-left-icon-size + 10) px
            height 100%

            img
                vertical-align middle
                width ($app-sidebar-left-icon-size + 50) px
                height ($app-sidebar-left-icon-size + 50) px

            .material-icons
                font-size ($app-sidebar-left-icon-size) px

        .app-sidebar-block-text
            display inline-block
            height 100%
            vertical-align middle

        .app-sidebar-title-right-logo,
        .app-sidebar-block-right-logo
            float right

            img
                width 20px
                height 20px
                margin-right 10px

        .app-sidebar-title
            color #fff
            padding 0 10px
            font-size 16px
            font-weight bold
            height $app-sidebar-title-height
            line-height $app-sidebar-title-height
            background: $colorPrimaryPink
            text-align left

        .app-sidebar-user
            padding 0 10px
            font-size 16px
            .user-avatar
                margin 30px auto 0 auto
                height 100px
                width 100px
                i
                    font-size 100px
                    line-height 100px
                    color #666
            .user-info
                .userInfoEdit
                    font-size small;
                .register
                    text-align left
                .loginFiled
                    text-align left
                    color red
                padding 20px 0
                text-align center
                border-bottom 1px solid #e0e0e0
                > div
                    margin 5px 0
                    i
                        font-size 18px
                        margin-right 5px

        .app-sidebar-blocks
            text-align left

            .app-sidebar-block
                padding 10px 0
                border-bottom 1px solid #e0e0e0
                color #333

                .sub-list-title
                    height $app-sidebar-nav-height
                    line-height $app-sidebar-nav-height
                    text-indent ($app-sidebar-left-icon-size) px
                    font-weight bold
                    color #888

                li
                    padding-left 15px
                    height $app-sidebar-nav-height
                    line-height $app-sidebar-nav-height

                    &:last-child
                        border none

                &:last-child
                    border-bottom none
</style>
