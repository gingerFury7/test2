<template>
    <div id="app">
        <md-button class="md-icon-button md-raised" @click="initPerson">
            <md-icon>edit</md-icon>
        </md-button>
        <md-dialog :md-active.sync="editting">
            <md-dialog-title>Изменение человека с ID {{  idName  }}</md-dialog-title>

            <md-dialog-content>
                <md-field>
                    <label>Имя</label>
                    <md-input v-model.trim="person.firstName" type="text" placeholder="First Name"></md-input>
                </md-field>
                <md-field>
                    <label>Фамилия</label>
                    <md-input v-model.trim="person.secondName" type="text" placeholder="Second Name"></md-input>
                </md-field>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" v-on:click="editPerson">Изменить</md-button>
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
    name:"dataNew",
    props:{
        person: Object,
    },
    data(){
        return{
            idName: Number,
            firstName: '',
            secondName: '',
            editting: false,
            showGoodSnackbar: false,
        }
    },
    methods:{
        initPerson(){
            this.editting = true;
            this.idName = this.person.idName
            this.firstName = this.person.firstName;
            this.secondName = this.person.secondName;
        },
        editPerson() {
            if ((this.firstName != '') && (this.secondName != '')){
                this.editting = false;
                this.showGoodSnackbar = true;
            }
            else{
                alert ("Поля 'Имя' или 'Фамилия' не заполнены");
            }
        },
        editCancel(){
            this.editting = false;
        }
    },
}
</script>