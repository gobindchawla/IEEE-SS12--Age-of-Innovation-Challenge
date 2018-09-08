<template>
    <div class="app-search-page">
        <header>
            <v-btn light icon class="search-btn" @click.native="$router.go(-1)">
                <v-icon class="search-icon">arrow_back</v-icon>
            </v-btn>
            <form @submit.prevent="search">
                <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="Keywords"
                       autocapitalize="off"/>
            </form>
            <v-btn light icon class="search-btn" @click.native="query = ''">
                <v-icon class="search-icon">close</v-icon>
            </v-btn>
        </header>

        <div v-if="loading" class="search-loading">
            <v-progress-circular indeterminate v-bind:size="70" class="primary--text"></v-progress-circular>
        </div>
        <div v-if="data && data.length" class="search-content">
            <v-list two-line>
                <!--<template v-for="(item, index) in data">-->
                    <!--<v-list-tile avatar ripple v-bind:key="item.title">-->
                        <!--<v-list-tile-content>-->
                            <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
                            <!--<v-list-tile-sub-title class="grey&#45;&#45;text text&#45;&#45;darken-4">{{ item.org }}-->
                            <!--</v-list-tile-sub-title>-->
                            <!--<v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>-->
                        <!--</v-list-tile-content>-->
                        <!--<v-list-tile-action>-->
                            <!--<v-list-tile-action-text>{{ item.location }}</v-list-tile-action-text>-->
                        <!--</v-list-tile-action>-->
                    <!--</v-list-tile>-->
                    <!--<v-divider light v-if="index + 1 < data.length"></v-divider>-->
                <!--</template>-->
               <v-container text-xs-center justify-center class="display-1">
                   <v-icon large>error</v-icon>
                      <p>No result</p>
               </v-container>
            </v-list>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import axios from 'axios';

    let state = {
        appHeaderState: {
            show: false
        }
    };

    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
    }

    export default {
        name: 'search',
        metaInfo: {
            title: 'Search',
            titleTemplate: '%s - HelpinBees',
            meta: [
                {name: 'keywords', content: 'HelpinBees PWA'},
                {name: 'description', content: 'A PWA for IEEE'}
            ]
        },
        data() {
            return {
                query: '',
                loading: false,
                data: [],
            };
        },
        computed: {
            ...mapState('ieee/newsList', [
                'newsList'
            ])
        },
        methods: {
            async search() {

                // 把数据清空
                this.data = [];

                // 显示加载动画
                this.loading = true;

                // 让当前输入框失去焦点
                this.$el.querySelector('.search-input').blur();

                // 等待 1s，模拟加载中的效果
                await new Promise(resolve => {
                    setTimeout(resolve, 1000);
                });

                // 设置搜索结果数据
                this.data = [
                    {
                        id:1,
                        location: 'Thailand',
                        title: 'Floods in plenty areas',
                        description:'Around 400,000 Hit by Floods in South',
                        img:'http://floodlist.com/wp-content/uploads/2017/11/floods-in-Phatthalung-thailand-november-2017-768x576.jpg',
                        org:'Ban Khru Noi',
                        date: '12 April',
                        goal: 12000,
                        achive: 8000
                    },
                    {
                        id:2,
                        location: 'Africa',
                        title: 'Children need help',
                        description:'Nearly half of them cannot afford education fee.',
                        // img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJtpU8cJ0NrYMveZHBfRRxjzYPAWtXa-xIK4UdbvsEhyAfwdPEg',
                        org:'Kru Ban Nok',
                        date: '06 April',
                        goal: 25000,
                        achive: 12000
                    },
                    {
                        id:3,
                        location: 'Africa',
                        title: 'Starvation never goes a way ',
                        description:'This is just a description,This is just a description,This is just a description',
                        img:'https://c1.staticflickr.com/4/3720/9291527361_9571b51f4d_b.jpg',
                        org:'Ban Khru Noi',
                        date: '05 April',
                        goal: 32000,
                        achive: 10000
                    },
                    {
                        id:4,
                        location: 'Thailand',
                        title: 'Earthquake in capital',
                        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5M37N36AIRiu8KxUJ7tKxzr85icRtz3hmqXkQIzpp28EyDcHL',
                        description:'There is a 8.0 earthquake in Thailand.',
                        org:'Ruamkatanyu Foundation',
                        date: '01 April',
                        goal: 20000,
                        achive: 15000
                    }
                ];

                this.loading = false;
            }
        },
        async asyncData({store, route}) {
            setState(store);
        },
        activated() {
            setState(this.$store);
        }
    };
</script>

<style lang="stylus" scoped>
    header
        display flex
        align-items center
        height 52px
        box-shadow 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px rgba(0, 0, 0, .14), 0 1px 10px rgba(0, 0, 0, .12)

    form
        flex 1

    .search-input
        width 100%
        outline none
        font-size 16px
        height 50px

    .search-btn
        color #959595

    .search-loading
        margin-top 30%
        display flex
        justify-content center

    .search-content
        margin-top 20px

    li
        list-style-type none
</style>
