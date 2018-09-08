<template>
    <div>
        <div class="content">
            <p></p>
            <v-carousel class="importantList" v-if="importantList">
                <v-carousel-item
                    v-for="(item,i) in importantList"
                    :key="i"
                    :src="item.src"
                >
                    <v-jumbotron :gradient="gradient" dark>
                        <v-container @click.stop="closeAndGo('/news/'+item.id)">
                            <v-layout align-center>
                                <v-flex>
                                    <h3 class="title">{{ item.title }}</h3>
                                    <v-icon v-for="(rateItem,a) in item.rate" :key="a">star</v-icon>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-jumbotron>
                </v-carousel-item>
            </v-carousel>
            <v-card class="newListWrapper">
                <v-layout row wrap>
                    <v-flex
                        v-for="news in newsList.slice().reverse()"
                        :key="news.id"
                        xs12
                        class="newsList"
                    >
                        <v-card>
                            <v-layout>
                                <v-flex xs5>
                                    <v-card-media
                                        :src="news.img ? news.img:'../static/img/backgroud/Globe-Pink1.png'"
                                        flex="5"
                                        height="100%"
                                    >

                                    </v-card-media>
                                </v-flex>


                                <v-flex xs7 @click.stop="closeAndGo('/detail/'+news.id)" clss="background_pink">
                                    <v-card-title primary-title>
                                        <div class="title">{{news.title}}</div>
                                    </v-card-title>
                                    <div class="description">{{news.description}}</div>
                                </v-flex>
                            </v-layout>
                            <v-divider light></v-divider>
                            <v-card-actions class="pa-2">
                                <div @click.stop="closeAndGo('/location/'+localLocation)">
                                    <v-icon>location_on</v-icon>
                                    {{localLocation}}
                                </div>

                                <v-spacer></v-spacer>
                                <div @click.stop="closeAndGo('/org/'+news.org)">
                                    <v-icon @click.stop="closeAndGo('/org/'+news.org)">group</v-icon>
                                    {{news.org}}
                                </div>

                                <v-spacer></v-spacer>
                                {{news.date}}
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-card>


            <!--<div  class="card ">-->
            <!--<v-card>-->
            <!--<v-container-->
            <!--fluid-->
            <!--grid-list-lg-->
            <!--&gt;-->
            <!--<v-layout row wrap id="newsList">-->
            <!--<v-flex xs12 v-for="news in newsList" :key="news.id">-->
            <!--<v-card color="blue-grey lighten-5" class="black&#45;&#45;text">-->
            <!--<v-layout>-->
            <!--<v-flex xs5>-->
            <!--<v-card-media-->
            <!--:src="news.img ? news.img:'../static/img/backgroud/Globe-Pink1.png'"-->
            <!--height="145px"-->
            <!--contain-->
            <!--&gt;</v-card-media>-->
            <!--</v-flex>-->


            <!--<v-flex xs7 @click.stop="closeAndGo('/detail/'+news.id)" class="background_pink">-->
            <!--<v-card-title primary-title >-->
            <!--<div class="title" >{{news.title}}</div>-->
            <!--<div>{{news.description}}</div>-->
            <!--</v-card-title>-->
            <!--</v-flex>-->

            <!--</v-layout>-->
            <!--<v-divider light></v-divider>-->

            <!--<v-card-actions class="pa-2">-->
            <!--<v-icon>location_on</v-icon>{{news.location}}-->
            <!--<v-spacer></v-spacer>-->
            <!--{{news.date}}-->
            <!--</v-card-actions>-->
            <!--</v-card>-->
            <!--</v-flex>-->

            <!--</v-layout>-->
            <!--</v-container>-->
            <!--</v-card>-->
            <!--</div>-->


        </div>


    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    function setState(store) {
        store.dispatch("appShell/appHeader/setAppHeader", {
            show: true,
            title: "HelpinBees",
            showMenu: true,
            showBack: false,
            showLogo: false,
            showLogoText: true,
            actions: [
                {
                    icon: "search",
                    route: "/search"
                }
            ]
        });
    }

    export default {
        data: () => ({
            gradient: 'to top, rgba(0,0,0, .3), rgba(0,0,0, .3)'
        }),
        name: "index",
        metaInfo: {
            title: "Home",
            titleTemplate: "%s - HelpinBees",
            meta: [
                {name: "keywords", content: "HelpinBees PWA"},
                {
                    name: "description",
                    content:
                        "A IEEE project based on Lavas and Vue"
                }
            ]
        },
        async asyncData({store, route}) {
            setState(store);
        },
        activated() {
            setState(this.$store);
        },
        computed: {
            ...mapState('ieee/newsList', [
                'newsList',
                'importantList'
            ]),
            ...mapState('appShell/appSidebar', [
                'localLocation'
            ]),
            newsListRevers(){
                return this.newsList.reverse();
            }
        },
        mounted() {

        },
        methods: {
            ...mapActions('ieee/newsList', [
                'addData'
            ]),
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
    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex-wrap: wrap;

        h2 {
            font-size: 46px;
            font-weight: 500;
        }
        .background_pink {
            background: url("../static/img/backgroud/Globe-Pink1.png") no-repeat;
            background-size: 100px 100px;
            background-position: right center;
        }
        .newsList {
            padding-top: 10px
        }
        .newListWrapper {
            background-color #efeff1;
        }
        .importantList {
            height 200px !important
        }
        .description{
            padding 0px 0px 0px 16px
        }
    }
</style>
