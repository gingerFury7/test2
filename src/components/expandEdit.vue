<template>
    <div>
        <div>
            <md-button class="md-raised md-icon-button" v-on:click="initData">
                <md-icon>edit</md-icon>
            </md-button>
        </div>
        <md-dialog :md-active.sync="editting">
            <md-dialog-title>Изменение student с ID {{  id  }}</md-dialog-title>

            <md-dialog-content>
                <md-field>
                    <label>Имя</label>
                    <md-input v-model.trim="expandData.name" type="text"></md-input>
                </md-field>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" v-on:click="editData">Сохранить</md-button>
                <md-button class="md-accent" v-on:click="editCancel">Отмена</md-button>
            </md-dialog-actions>
        </md-dialog>
        <div>
            <md-snackbar :md-duration="1000" :md-active.sync="showGoodSnackbar" md-persistent>
                <p>Изменения сохранены</p>
            </md-snackbar>
        </div>
    </div>
</template>

<script>
export default {
    name:'expandEdit',
    props:{
        expandData: Object,
    },
    data(){
        return{
            id: Number,
            name: '',
            editting: false,
            showGoodSnackbar: false,
        }
    },
    methods:{
        initData(){
            this.id = this.expandData.id;
            this.name = this.expandData.name;
            this.editting = true;
        },
        editData(){
            if (this.name != ''){
                this.editting = false;
                this.showGoodSnackbar = true;
            }
            else{
                alert('Поле имя не заполнено')
            }
        },
        editCancel(){
            this.editting = false;
        },
    },
    computed:{
        expandDataLocal: function(){
            return this.expandData;
        }
    }
}
</script>