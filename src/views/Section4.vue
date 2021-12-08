<template>
    <div id="app">
        <div class="field">
            <md-field>
                <label>АЗС</label>
                <md-select v-model="choosenAzs" :md-selected="GetPumps()">
                    <md-option v-for="item in AzsNumbers" :key="item" :value="item">{{  item  }}</md-option>
                </md-select>
            </md-field>
            <md-button class="md-primary md-raised" v-on:click="GetPumpState()">Получить</md-button>
        </div>
        <div>
            <md-table v-model="PumpData" md-sort="PumpNumber" md-sort-order="asc">
                <md-table-toolbar>
                    <h2>Колонки</h2>
                </md-table-toolbar>

                <md-table-row slot="md-table-row" slot-scope="{  item  }">
                    <md-table-cell md-label="Номер" md-sort-by="PumpNumber">{{  item.PumpNumber  }}</md-table-cell>
                    <md-table-cell md-label="Статус">{{  item.PumpState  }}</md-table-cell>
                    <md-table-cell md-label="TransactionId">{{  item.Attached.TransactionId  }}</md-table-cell>
                    <md-table-cell md-label="Литры">{{  item.Attached.FillingVolume  }}</md-table-cell>
                    <md-table-cell md-label="Цена за л.">{{  item.Attached.FillingPrice  }}</md-table-cell>
                    <md-table-cell md-label="Сумма">{{  item.Attached.FillingSum  }}</md-table-cell>
                    <md-table-cell>
                        <reset-trk v-bind:PumpData="item"></reset-trk>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import resetTrk from '../components/resetTrk.vue';
    const bodyFormData = {
        UniqueRequestId: "string",
        Method: "Unknown",
        Data: {},
    };
    const urlPumps = 'https://dev.ekagroup.local:7472/GetPumps';
    const urlPumpState = 'https://dev.ekagroup.local:7472/GetPumpsState';
    export default {
        components: {
            resetTrk,
        },
        data(){
            return{
                AzsNumbers: [  "АЗС 1", "АЗС 2", "АЗС 3", "АЗС 4"  ],
                choosenAzs: '',
                PumpNumber: [],
                PumpData: [],
                state: false,
                errors: [],
                text: '',
                text2: '',
            }
        },
        methods:{
            GetPumps(){
                axios
                    .post(urlPumps, bodyFormData)
                    .then(response =>{
                        this.PumpNumber = response.data.Data.PumpsData.PumpNumbers;
                        this.ActivePumpNumber = response.data.Data.ActivePumpNumber;
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            GetPumpState(){
                if (this.choosenAzs != ''){
                    axios
                        .post(urlPumpState,
                        {
                            UniqueRequestId: "string",
                            Method: "Unknown",
                            Data: {
                                "PumpNumbers": this.PumpNumber,
                            },
                        })
                        .then(response => {
                            this.PumpData = response.data.Data.PumpsData;
                        })
                        .catch(e =>{
                            this.errors.push(e)
                        });
                    this.state = true
                }
            }
        },
    }
</script>

<style scoped>
    #Azs{
        text-align: left;
    }
    #choosed{
        text-align: right;
    }
    .md-list {
        width: 200px;
        display: block;
        border: 1px solid rgba(#000, .12);
    }
    .field{
        display: flex;
        width: 200px;
    }
    .md-button{
        margin-left: 20px;
    }
</style>