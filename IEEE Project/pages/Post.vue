<template>
    <div>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs10 offset-xs1>
                    <v-form>
                        <v-text-field
                            label="Title"
                            single-line
                            full-width
                            hide-details
                            v-model="postTitle"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="Description"
                            single-line
                            full-width
                            hide-details
                            required
                            v-model="postDescription"
                        ></v-text-field>
                        <v-divider></v-divider>
                        <v-textarea
                            row-height="5"
                            label="Content"
                            counter
                            full-width
                            single-line
                            auto-grow
                            required
                        ></v-textarea>
                        <v-divider></v-divider>
                        <template>
                            <div>
                                <div>
                                    <img
                                        :src="imageUrl"
                                        ref="imageUrl"
                                        height="150"
                                        @click="onPickFile"
                                        style="cursor: pointer;"
                                    >
                                </div>
                                <div>
                                    <v-btn raised @click="onPickFile" v-if="!imageUrl">
                                        {{ selectLabel }}
                                    </v-btn>
                                    <v-btn raised class="error" @click="removeFile" v-else>
                                        {{ removeLabel }}
                                    </v-btn>
                                    <input
                                        type="file"
                                        ref="image"
                                        name="image"
                                        :accept="accept"
                                        @change="onFilePicked"
                                    >
                                </div>
                            </div>
                        </template>
                        <v-divider></v-divider>
                        <v-flex xs7>
                            <v-text-field
                                label="Due Date"
                                single-line
                                hide-details
                                :value="date"
                                mask="####-##-##"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                        <v-btn color="success" @click.stop="dialog = true">
                            Pick a date
                        </v-btn>
                        </v-flex>

                        <v-flex xs7>
                            <v-text-field
                                label="Amount"
                                single-line
                                hide-details
                                v-model="postGoal"
                                mask="#############"
                            ></v-text-field>
                        </v-flex>

                        <v-btn color="success" block @click="submit">
                            Submit
                        </v-btn>
                        <v-dialog v-model="dialog" persistent>
                            <v-card>
                                    <div>
                                        <v-date-picker
                                            v-model="date"
                                            class="mt-3"
                                            :min=currentDate
                                            :max="maxDate"
                                            full-width
                                        ></v-date-picker>
                                    </div>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-divider></v-divider>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>

        <template>
            <div class="text-xs-center">
                <v-dialog
                    v-model="postDialog"
                    width="500"
                >

                    <v-card>
                        <v-card-title
                            class="headline grey lighten-2"
                            primary-title
                        >
                            Post Result
                        </v-card-title>

                        <v-card-text>
                             {{postDialogData}}
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                flat
                                @click="backToIndex"
                            >
                                OK
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </template>
    </div>
</template>

<script>

    import {mapState,mapActions} from 'vuex';

    let state = {
        appHeaderState: {
            postDialogData:'',
            dialog:false,
            show: true,
            title: 'Post',
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
                postPast:false,
                postDialogData:'',
                postDialog: false,
                postTitle:'',
                postDescription:'',
                postGoal:'',
                dialog:false,
                date: '',
                currentDate: '',
                maxDate: '',
                imageUrl: '',
            }
        },
        name: 'detailId',
        metaInfo() {
            return {
                title: `Post new request`,
                titleTemplate: '%s - HelpinBees',
                meta: [
                    {name: 'keywords', content: 'HelpinBees PWA'},
                    {name: 'description', content: 'A PWA for IEEE based on Lavas'}
                ]
            }
        },
        computed: {
            ...mapState('ieee/userInfo', [
                'user',
            ]),
            ...mapState('ieee/newsList', [
                'newsList'
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
        },
        watch: {
            value(v) {
                this.imageUrl = v
            }
        }, mounted() {
            this.imageUrl = this.value
        }, methods: {
            ...mapActions('ieee/newsList',[
                'addData'
            ]),
            backToIndex(){
                this.postDialog = false
                if(this.postPast){
                    this.$router.push({path: '/'});
                    this.sidebarStatus = false;
                }
            },
            submit(){
                var data ={}
                data.id = this.newsList.length + 1
                data.location = 'Thailand';
                data.title = this.postTitle;
                data.description = this.postDescription;
                data.goal = this.postGoal;
                data.date = '01 Aug'
                data.achive = 0;
                data.org = 'Admin';
                data.img = this.imageUrl;

                if(!this.postTitle || !this.postGoal || !this.postDescription){
                    this.postDialogData = 'Filed to create post request, please make sure all blank are filled.'
                    this.postDialog = true;
                }else {
                    this.$store.dispatch('ieee/newsList/addData',data);
                    this.postDialogData = 'Post request successfully created!'
                    this.postDialog = true;
                    this.postPast = true;
                }
            },
            onPickFile() {
                this.$refs.image.click()
            },

            onFilePicked(event) {
                const files = event.target.files || event.dataTransfer.files

                if (files && files[0]) {
                    let filename = files[0].name

                    if (filename && filename.lastIndexOf('.') <= 0) {
                        return //return alert('Please add a valid image!')
                    }

                    const fileReader = new FileReader()
                    fileReader.addEventListener('load', () => {
                        this.imageUrl = fileReader.result
                    })
                    fileReader.readAsDataURL(files[0])

                    this.$emit('input', files[0])
                }
            },
            removeFile() {
                this.imageUrl = ''
            }
        },
        mounted: function () {
            var myDate = new Date();
            var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
            var date = ('0' + myDate.getDate()).slice(-2);
            var year = myDate.getFullYear();
            var formatedDate = year + '-' + month + '-' + date;

            var newDate = new Date(myDate)
            newDate.setDate(newDate.getDate() + 30);
            var max = new Date(newDate);
            var maxMonth = ('0' + (max.getMonth() + 1)).slice(-2);
            var maxDate = ('0' + max.getDate()).slice(-2);
            var maxYear = max.getFullYear();
            var formatedMaxDate = maxYear + '-' + maxMonth + '-' + maxDate;
            this.currentDate = formatedDate;
            this.maxDate = formatedMaxDate;
        }

    };
</script>

<style lang="stylus" scoped>
    input[type=file] {
        position absolute
        left -99999px
    }


</style>
