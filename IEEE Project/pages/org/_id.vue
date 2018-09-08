<template>
    <div class="detail-wrapper">
        <v-layout row wrap>
            <v-flex xs10 offset-xs1>
                <article class="detail-content">
                    <header class="detail-title">

                        {{$route.params.id}}
                    </header>
                    <v-divider light></v-divider>
                    <!--<router-link :to="{-->
                        <!--name: 'detailId',-->
                        <!--params: {-->
                            <!--id: Number($route.params.id) + 1-->
                        <!--}-->
                    <!--}">-->
                        <!--Detail {{Number($route.params.id) + 1}}-->
                    <!--</router-link>-->
                    <p></p>
                    <div v-if="data && data.length" class="search-content">
                        <v-list two-line>
                            <template v-for="(item, index) in data" >
                                <v-list-tile avatar ripple v-bind:key="item.title" @click.stop="closeAndGo('/detail/'+item.id)">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                        <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.org }}
                                        </v-list-tile-sub-title>
                                        <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-list-tile-action-text>{{ item.location }}</v-list-tile-action-text>
                                    </v-list-tile-action>
                                </v-list-tile>
                                <v-divider light v-if="index + 1 <= data.length"></v-divider>
                            </template>
                        </v-list>
                    </div>
                </article>
                <!--<v-progress-circular-->
                    <!--:rotate="360"-->
                    <!--:size="150"-->
                    <!--:width="15"-->
                    <!--:value="(newsList[$route.params.id-1].achive/newsList[$route.params.id-1].goal)*100"-->
                    <!--color="teal"-->
                <!--&gt;-->
                    <!--${{newsList[$route.params.id-1].achive}}/${{ newsList[$route.params.id-1].goal }}-->
                <!--</v-progress-circular>-->
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex></v-flex>
        </v-layout>

    </div>
</template>

<script>

import {mapState} from 'vuex';
let state = {
    appHeaderState: {
        show: true,
        title: 'Group posts',
        showMenu: true,
        showBack: true,
        showLogo: false,
        actions: [
            {
                icon: 'home',
                route: {
                    name: 'index'
                }
            }
        ]
    }
};

function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
}

export default {
    data () {
        return {
            query: '',
            loading: false,
            data: [],
        }
    },
    name: 'orgId',
    metaInfo() {
        return {
            title: `Location of ${this.$route.params.id}`,
            titleTemplate: '%s - HelpinBees',
            meta: [
                {name: 'keywords', content: 'HelpinBees PWA'},
                {name: 'description', content: 'A PWA for IEEE based on Lavas'}
            ]
        }
    },
    computed: {
        ...mapState('ieee/userInfo',[
            'user',
        ]),
        ...mapState('ieee/newsList', [
            'newsList'
        ])
    },
    async asyncData({store, route}) {
        setState(store);
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 500);
        });
    },
    activated() {
        setState(this.$store);
    },
    created:function () {
        var org = this.$route.params.id;
        var list = this.newsList;

        for(var i=0;i<list.length;i++){
            if(list[i].org == org){
                this.data.push(list[i])
            }
        }
    },
    methods: {
        close() {
            this.sidebarStatus = false;
        },
        closeAndGo(route) {
            this.$router.push(route);
            this.close();
        }
    }
};
</script>

<style lang="stylus" scoped>
.detail-content
    font-size 16px
    line-height 30px
    margin-top 30px
    text-align left
    >img
        width 100%

    .detail-title
        margin-bottom 20px
        padding 10px 0
        font-size 36px
        font-weight bold

    .search-content
        margin-top 20px

    li
        list-style-type none


</style>
