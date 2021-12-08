<template>
    <div id="app">
        <div class="field">
            <md-field>
                <label>АЗС</label>
                <md-select v-model="choosenAzs" :md-selected="Pumps()">
                    <md-option v-for="item in AzsNumbers" :key="item" :value="item">{{  item  }}</md-option>
                </md-select>
            </md-field>
            <md-button class="md-primary md-raised" v-on:click="PumpsState()">Получить</md-button>
        </div>

        <div v-if="print">
            <md-table v-model="State.Data.PumpsData" md-sort="PumpNumber" md-sort-order="asc">
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
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { GetPumps, GetPumpsState } from '../modules/ApiRequest'
import { GetPumpsModel, GetPumpsStateModel } from '../modules/ApiModels'
import resetTrk from '../components/resetTrk.vue'
@Component({
    components:{
        resetTrk
    }
})
class Section3 extends Vue {
    private print = false;
    private choosenAzs = '';
    private AzsNumbers: Array<String> = [ "Azs 1", "Azs 2", "Azs 3" ];
    private PumpsNumbers: Array<Number> = [];
    private State = {} as GetPumpsStateModel;
    
    public Pumps(){
        GetPumps().then(response => this.PumpsNumbers = response);
    }

    public PumpsState(){
        this.print = true
        GetPumpsState(this.PumpsNumbers).then(response => this.State = response);
    }
}

export default Section3
</script>

<style>
.field{
  display: flex;
  width: 200px;
}
.md-field{
  width: 200px;
  display: flex;
}
</style>
