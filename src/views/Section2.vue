<template>
  <div>
    <div id="input-area">
      <h2>Добавление и изменение человека</h2>
      <input v-model="idClassInput" type="number" width="10px" placeholder="ID">
      <input v-model.trim="classNameInput" type="text" placeholder="Class Name">
    </div>
    
    <div id="buttons"> 
      <md-button class="md-primary" v-on:click="addItem">Добавить</md-button>
    </div>

    <div id="dialog">
      <md-dialog :md-active.sync="editting" md-close-on-esc>
        <md-dialog-title>Изменение класса {{  idClass  }}</md-dialog-title>

        <md-dialog-content>
          <md-field md-clearable>
            <label>Буква класса</label>
            <md-input v-model.trim="className" type="text"></md-input>
          </md-field> 
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" v-on:click="editClass">Изменить</md-button>
          <md-button class="md-accent" v-on:click="editting = false">Отмена</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    
    <h1 class="label">Школьные классы</h1>
    <b-table :items="classes" :fields="fields" :select-mode="selectMode" selectable @row-clicked="onSelect" @row-dblclicked="editting = true" selected-variant="primary">
      <template #cell(show_details)="row">
        <md-button @click="row.toggleDetails" class="md-mini md-icon-button">
          <md-icon>expand_more</md-icon>
        </md-button>
      </template>
      <template #cell(editing)="row">
        <class-edit
          :classes.sync="row.item">
        </class-edit>
        <span>
          <md-button class="md-accent" v-on:click="removeItem(row.item.idClass)">Удалить</md-button>
        </span>
      </template>

      <template #row-details="data">
        <expand-data 
          v-bind:students="data.item.students">
        </expand-data>
      </template>
    </b-table>
    <div>
      <md-snackbar :md-duration="1000" :md-active.sync="showGoodSnackbar" md-persistent>
        <p>Изменения сохранены</p>
      </md-snackbar>
    </div>
    <div>
      <md-snackbar :md-duration="1000" :md-active.sync="badSnackbar" md-persistent>
        <p>Класс {{  idClass }} удален</p>
      </md-snackbar>
    </div>
    <div>
      <md-snackbar :md-duration="1000" :md-active.sync="addSnackbar" md-persistent>
        <p>Добавлен класс {{  idClassInput - 1  }}</p>
      </md-snackbar>
    </div>
  </div>
</template>

<script>
  import expandData from '../components/expandData.vue';
  import classEdit from '../components/classEdit.vue';
  export default {
    components: { 
      expandData,
      classEdit,
    },
    data() {
      return {
        selectMode: 'single',
        editting: false,
        showGoodSnackbar: false,
        badSnackbar: false,
        addSnackbar: false,
        classNameInput: '',
        idClassInput: 3,
        idClassMax: 2,
        idClass: Number,
        className: '',
        fields: [
          {  key: 'show_details', label: '',  },
          {  key: 'idClass', label: 'Номер', sortable: true,  }, 
          {  key: 'className', label: 'Буква класса', sortable: true,  },
          {  key: 'editing', label: '',  }
        ],
        classes: [
            {   idClass: 1,
                className: 'a', 
                students:[
                    { id: 1, name: 'aa' },
                    { id: 2, name: 'ab' },

                ], 
            },
            {   idClass: 2,
                className: 'b',
                students:[
                    { id: 1, name: 'ba' },
                    { id: 2, name: 'bb' },
                ],
            },
        ],
      }
    },
    methods: {
        addItem: function (){
            let my_object = {
                idClass: this.idNameInput,
                className: this.firstNameInput,
                students: [],
            };
            if (this.classNameInput != '')
            {
                this.classes.push(my_object);
                this.addSnackbar = true;
                this.idClassInput = ++this.idClassInput;
            }
            this.classNameInput = '';
            this.idClassMax = this.idClassMax++;
        },
        removeItem: function(idClass) {
            this.classes.splice(idClass - 1, 1);
            this.idClass = idClass;
            this.badSnackbar = true;
        },
        onSelect(items){
            this.idClass = items.idClass;
            this.className = items.className;
        },
        editClass(items){
            if(this.className != ''){
                items.idClass = this.idClass;
                this.classes[items.idClass - 1].className = this.className;
                this.editting = false;
                this.showGoodSnackbar = true
            }
            else{
                alert ("Поля 'Имя' или 'Фамилия' не заполнены");
            }
        },
        getClass: ({ idClass }) => ({
        'md-primary': idClass,
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
 .label{
     text-align:left;
 }
</style>