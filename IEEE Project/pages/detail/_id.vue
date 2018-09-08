<template>
    <div class="detail-wrapper">
        <v-layout row wrap>
            <v-flex xs10 offset-xs1>
                <article class="detail-content">
                    <header class="detail-title">

                        {{newsList[$route.params.id-1].title}}
                    </header>
                    <div class="detailHeader">
                        Date: {{newsList[$route.params.id-1].date}}
                        <v-spacer></v-spacer>
                    </div>
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
                    <p>
                        Flooding has affected parts of southern Thailand since 25 November. Heavy rain has triggered rivers to overflow and flash flooding.
                    </p>
                    <p>
                        According to Thailand’s The Department of Disaster Prevention and Mitigation (DDPM), the floods have affected the provinces of Phatthalung, Trang, Nakhon Si Thammarat, Pattani, Songkhla, Narathiwat, Yala, Satun and Surat Thani.
                    </p>
                    <p>
                        Flooding has affected a total of 74 districts, 113,900 households, and 385,498 people. DDPM said that at least 5 people have lost their lives in the flooding. The deaths occurred in Songkhla (2), Pattani (2) and Yala.
                    </p>
                    <img :src="newsList[$route.params.id-1].img">
                    <p></p>
                    <div class="detailFooter">
                        <v-divider light></v-divider>
                        <v-icon>group</v-icon>: {{newsList[$route.params.id-1].org}}
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
                <div class="progress text-xs-center">
                    <v-progress-linear
                        id="progressBar"
                        height="10"
                        background-color="orange lighten-4"
                        color="light-green accent-5"
                        :value="(newsList[$route.params.id-1].achive/newsList[$route.params.id-1].goal)*100">
                    </v-progress-linear>
                    ${{newsList[$route.params.id-1].achive}}/${{ newsList[$route.params.id-1].goal }} (Ends in 6 days)
                </div>
                <div class="donate">
                    <v-btn
                        block
                        color="error"
                        @click.stop="dialog = true"
                    >
                        Donate
                    </v-btn>

                    <v-dialog v-model="dialog" persistent max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Transfer money</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md v-if="payMethod==1">
                                    <v-layout wrap>
                                        <v-btn
                                            color="success"
                                            @click="payMethod = 2"
                                        block>
                                            Use PayPal
                                        </v-btn>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field label="Amount" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field label="Card number" :mask="cardMask" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs4 sm3 md3>
                                            <v-text-field label="MM" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs4 sm3 md3>
                                            <v-text-field label="YY" required></v-text-field>
                                        </v-flex><v-flex xs4 sm3 md3>
                                        <v-text-field label="CVC" required></v-text-field>
                                    </v-flex>

                                        <v-flex xs12 sm6 md4>
                                            <v-text-field label="Cardholder name" hint="Must match the name for open the account"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field
                                                label="Billing address"
                                                persistent-hint
                                                required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Email" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Password" type="password" required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>


                                <v-container grid-list-md  v-if="payMethod==2" >
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md4>
                                            <v-btn
                                                color="success"
                                                @click="payMethod = 1"
                                                block>
                                                Use Credit Card
                                            </v-btn>
                                            <v-text-field label="Amount" required></v-text-field>
                                        </v-flex>
                                        <PayPal
                                            amount="10.00"
                                            currency="USD"
                                            :client="credentials"
                                            env="sandbox">
                                        </PayPal>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="dialog = false">Confirm</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex></v-flex>
        </v-layout>

    </div>
</template>

<script>

import {mapState} from 'vuex';
import PayPal from 'vue-paypal-checkout';

let state = {
    appHeaderState: {
        show: true,
        title: 'Details',
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
            payMethod:1,
            dialog: false,
            cardMask: 'credit-card',
            paypal: {
                sandbox: '<sandbox client id>',
                production: '<production client id>'
            },
            credentials: {
                sandbox: '<sandbox client id>',
                production: '<production client id>'
            }
        }
    },
    components: {
        PayPal
    },
    name: 'detailId',
    metaInfo() {
        return {
            title: `Detail ${this.$route.params.id}`,
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
    },method:{
        paypalRequest(){

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



</style>
