<template>
    <div>
        <form @submit.prevent="submit" class="vld-parent" ref="formContainer">
            <div v-if="(PumpData.PumpState === 'Down') || (PumpData.PumpState === 'Error')">
                <md-button class="md-accent" v-on:click="InitDialog">Сброс</md-button>
            </div>
            <div v-else>
                <md-button  disabled>Сброс</md-button>
                <md-tooltip>Недоступно по причине "Статус: {{  PumpData.PumpState  }}"</md-tooltip>
            </div>
            <div>
                <md-dialog :md-active.sync="showDialog">
                    <md-dialog-content>
                        <h4>Вы уверены, что хотите сбросить колонку {{  id  }}</h4>
                    </md-dialog-content>
                    <md-dialog-actions>
                        <md-button class="md-primary" v-on:click="ResetTrk" type="submit">Сбросить</md-button>
                        <md-button class="md-accent" v-on:click="CloseDialog">Отменить</md-button>
                    </md-dialog-actions>
                </md-dialog>
            </div>
            <div>
                <md-snackbar :md-duration="1000" :md-active.sync="showGoodSnackbar" md-persistent>
                    <p>Колонка {{  id  }} сброшена</p>
                </md-snackbar>
            </div>
            <div>
                <md-snackbar :md-duration="1000" :md-active.sync="showBadSnackbar" md-persistent>
                    <p>Сброс отменён</p>
                </md-snackbar>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    Vue.use(Loading);    
    
    const UrlResetTrk = 'https://dev.ekagroup.local:7472/ResetTrk';
    export default { 
        name: 'resetTrk',
        props: {
            PumpData: Object,
        },
        data(){
            return {
                showDialog: false,
                id: Number,
                showGoodSnackbar: false,
                showBadSnackbar: false,
                errors: [],
                fullPage: true,
            }
        },
        methods:{
            InitDialog(){
                this.showDialog = true;
                this.id  = this.PumpData.PumpNumber;
            },
            CloseDialog(){
                this.showBadSnackbar = true;
                this.showDialog = false;
                this.id = 0;
            },
            ResetTrk(){
                axios
                    .post(UrlResetTrk,
                    {
                        UniqueRequestId: "string",
                        Method: "Unknown",
                        Data: {
                            "PumpNumber": this.id
                        }
                    })
                    .then()
                    .catch(e => {
                        this.errors.push(e);
                        alert("Произошла ошибка! Код: ", this.errors.data.Result.ResultCode);
                    })
                if (this.errors.length == 0){
                    let loader = this.$loading.show({
                        container: this.fullPage ? null : this.$refs.formContainer,
                        canCancel: false,
                        color: 'blue',
                    });
                    setTimeout(() => {
                        loader.hide();
                        this.showDialog = false;
                        this.showGoodSnackbar = true;
                        this.$root.$refs.Section4.GetPumpState();
                    }, 5000) 
                }
            }
        }
    }
</script>
