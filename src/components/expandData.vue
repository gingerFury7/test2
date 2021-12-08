<template>
  <div>
    <div id="dialogStudent">
      <md-dialog :md-active.sync="edittingStudents" md-close-on-esc>
        <md-dialog-title>Изменение student c ID {{  studentId  }}</md-dialog-title>

        <md-dialog-content>
          <md-field md-clearable>
            <label>Имя</label>
            <md-input v-model.trim="studentName" type="text"></md-input>
          </md-field> 
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" v-on:click="editStudent">Изменить</md-button>
          <md-button class="md-accent" v-on:click="edittingStudents = false">Отмена</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>

    <b-card>
      <template>
        <div id="Student-input-area">
          <input v-model="studentIdInput" type="number" width="10px" placeholder="ID">
          <input v-model.trim="studentNameInput" type="text" placeholder="Name">
        </div>
    
        <div id="studentButtons"> 
          <md-button class="md-primary" v-on:click="addStudents">Добавить</md-button>
        </div>
      </template>
      <h3>Ученики класса</h3>
      <b-table :items="students" :fields="fields_student" :select-mode="selectMode" selectable @row-clicked="onSelectStudent" @row-dblclicked="edittingStudents = true" selected-variant="primary">
        <template #cell(edit)="row">
          <div>
            <expand-edit 
              v-bind:expandData="row.item">
            </expand-edit>
            <md-button class="md-accent" @click="removeStudents(row.item.id)">Удалить</md-button>
          </div>
        </template>
      </b-table>
    </b-card>
    <div>
      <md-snackbar :md-duration="1000" :md-active.sync="showGoodSnackbar" md-persistent>
        <p>Изменения сохранены</p>
      </md-snackbar>
    </div>
    <div>
      <md-snackbar :md-duration="1000" :md-active.sync="badSnackbar" md-persistent>
        <p>Строка с ID {{  studentId  }} удалена</p>
      </md-snackbar>
    </div>
    <div>
      <md-snackbar :md-duration="1000" :md-active.sync="addSnackbar" md-persistent>
        <p>Добавлена строка с ID {{  studentIdInput - 1  }}</p>
      </md-snackbar>
    </div>
  </div>
</template>


<script>
  import expandEdit from './expandEdit.vue'
  export default {
    name: 'expandData',
    components:{
      expandEdit,
    },
    props:{
      students: Array,
      index: Number,
    },
    data(){
      return{
        selectMode: 'single',
        edittingStudents: false,
        studentNameInput: '',
        studentIdInput: 1,
        studentName: '',
        studentId: Number,
        badSnackbar: false,
        showGoodSnackbar: false,
        addSnackbar: false,
        fields_student: [
          {  key:'id', label: 'ID',  sortable: true  },
          {  key: 'name', label: 'Имя', sortable: true  },
          {  key: 'edit', label: ''  }
        ],
      }
      },
    methods:{
      addStudents(){
        let new_student = {
          id: this.studentIdInput,
          name: this.studentNameInput,
        };
        if (this.studentNameInput != ''){
          this.students.push(new_student);
          this.studentIdInput = ++this.studentIdInput;
          this.addSnackbar = true;
        }
        this.studentNameInput = '';
      },
      removeStudents: function(id){
        this.students.splice(id - 1, 1);
        this.studentId = id;
        this.badSnackbar = true;
      },
      onSelectStudent(data){
        this.studentId = data.id;
        this.studentName = data.name
      },
      editStudent(item){
        if (this.studentName != ''){
          item.id = this.studentId;
          this.students[item.id - 1].name = this.studentName;
          this.edittingStudents = false;
          this.showGoodSnackbar = true;
        }
        else{
          alert("Поле имя не заполнено")
        }
      }
    },
    computed:{
      studentsLocal:{
        get(){
          return this.students;
        },
        set(value){
          this.$emit('addStudents', value)
        }
      }
    }
  }
</script>

<style scoped="">
h3 {
  text-align: left;
}
</style>