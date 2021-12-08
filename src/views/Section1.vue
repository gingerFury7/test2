<template>
    <div id="app">
        <div id="input-area">
            <h2>Добавление и изменение человека</h2>
            <input v-model="idNameInput" type="number" width="10px" placeholder="ID">
            <input v-model.trim="firstNameInput" type="text" placeholder="First Name">
            <input v-model.trim="secondNameInput" type="text" placeholder="Second Name">
        </div>

        <div id="buttons"> 
            <md-button class="md-primary" v-on:click="addItem">Добавить</md-button>
        </div>

        <div id="table">
            <md-table v-model="persons" md-sort="firstName" md-sort-order="asc">
                <md-table-toolbar>
                   <h1>Имена и фамилии</h1>
                </md-table-toolbar>

                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" :class="getClass(item)">
                    <md-table-cell md-label="ID" md-sort-by="idName" md-numeric width="10%">{{  item.idName  }}</md-table-cell>
                    <md-table-cell md-label="Имя" md-sort-by="firstName">{{  item.firstName  }}</md-table-cell>
                    <md-table-cell md-label="Фамилия" md-sort-by="secondName">{{  item.secondName  }}</md-table-cell>
                    <md-table-cell>
                       <div>
                            <data-new 
                                v-bind:person="item">
                            </data-new>
                        </div>
                        <span>
                            <md-button class="md-accent" v-on:click="removeItem(item.idName)">Удалить</md-button>
                        </span>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <div>
            <md-snackbar :md-duration="1000" :md-active.sync="showGoodSnackbar" md-persistent>
                <p>Изменения сохранены</p>
            </md-snackbar>
        </div>
        <div>
            <md-snackbar :md-duration="1000" :md-active.sync="badSnackbar" md-persistent>
                <p>Строка с ID {{  idName  }} удалена</p>
            </md-snackbar>
        </div>
        <div>
            <md-snackbar :md-duration="1000" :md-active.sync="addSnackbar" md-persistent>
                <p>Добвалена строка с ID {{  idNameInput - 1  }}</p>
            </md-snackbar>
        </div>
    </div>
</template>

<script>
import dataNew from '../components/dataNew.vue';
export default {
    name: 'Section1',
    components: {
        dataNew,
    },
    data: () => ({
        editting: false,
        showGoodSnackbar: false,
        badSnackbar: false,
        addSnackbar: false,
        firstNameInput: '',
        secondNameInput: '',
        idNameInput: 3,
        idNameMax: 2,
        idName: Number,
        persons: [
            { idName: 1, firstName: 'a', secondName: 'a' },
            { idName: 2, firstName: 'b', secondName: 'b' },
        ],
    }),
    methods:{
        addItem: function (){
            let my_object = {
                idName: this.idNameInput,
                firstName: this.firstNameInput,
                secondName: this.secondNameInput,
            };
            if ((this.firstNameInput != '') && (this.secondNameInput != ''))
            {
                this.persons.push(my_object);
                this.addSnackbar = true;
                this.idNameInput = ++this.idNameInput;
            }
            this.firstNameInput = '';
            this.secondNameInput = '';
            this.idNameMax = this.idNameMax++;
        },
        removeItem: function(idName) {
            this.persons.splice(idName - 1, 1);
            this.idName = idName;
            this.badSnackbar = true;
        },
        getClass: ({ idName }) => ({
        'md-primary': idName,
        }),
    }
}
</script>

<style scoped="">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.md-table{
    height: 750px;
    max-height: 1000px;
}
#input-area{
    text-align: left;
}
#buttons{
    text-align: left;
}
.md-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 100%;
    height: 400px;
    max-height: 100%;
}
.md-snackbar{
     text-align: center;
 }
</style>