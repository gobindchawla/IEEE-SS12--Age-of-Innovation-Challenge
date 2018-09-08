<template>
    <div>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs10 offset-xs1>
                    <div class="headline">
                        Pleas choose the country you prefered
                    </div>
                    <v-select
                        :items="items"
                        label="Country"
                        v-model="selection"
                    ></v-select>
                    <v-btn
                        block
                        color="success"
                        @click="confirm"
                    >Confirm</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>

    import {mapState,mapActions} from 'vuex';

    let state = {
        appHeaderState: {
            dialog: false,
            show: true,
            title: 'Change location',
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
        props: {
            value: {
                type: String
            },
            accept: {
                type: String,
                default: '*'
            },
            selectLabel: {
                type: String,
                default: 'Select an image'
            },
            removeLabel: {
                type: String,
                default: 'Remove'
            }
        },
        data() {
            return {
                selection:'',
                items: ['Thailand', 'Africa', 'Japan', 'England']
            }
        },
        name: 'locationId',
        metaInfo() {
            return {
                title: `Change location`,
                titleTemplate: '%s - HelpinBees',
                meta: [
                    {name: 'keywords', content: 'HelpinBees PWA'},
                    {name: 'description', content: 'A PWA for IEEE based on Lavas'}
                ]
            }
        },
        computed: {
            ...mapState('appShell/appSidebar', [
                'localLocation'
            ]),
        },
        async asyncData({store, route}) {
            setState(store);
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 500);
            });
        },
        activated() {
            setState(this.$store);
        }, methods: {
            ...mapActions('ieee/appSidebar', [
                'changeLocation'
            ]),
            confirm(){
                this.$store.dispatch('appShell/appSidebar/changeLocation',this.selection);
                this.$router.push({path: '/'});
                this.sidebarStatus = false;

            }
        }
    };
</script>

<style lang="stylus" scoped>
    input[type=file] {
        position absolute
        left -99999px
    }


</style>
