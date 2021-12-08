<template>
    <div>
        <md-button class="md-icon-button md-raised" @click="initClass">
            <md-icon>edit</md-icon>
        </md-button>

        <div>
            <md-dialog :md-active.sync="editting" md-close-on-esc>
                <md-dialog-title>Изменение класса {{  idClass  }}</md-dialog-title>

                <md-dialog-content>
                    <md-field>
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
        <div>
            <md-snackbar :md-duration="1000" :md-active.sync="showGoodSnackbar" md-persistent>
                Изменения сохранены
            </md-snackbar>
        </div>
    </div>
</template>

<script>
export default {
    name: "classEdit",
    props: {
        classes: Object,
    },
    data() {
        return {
            editting: false,
            idClass: Number,
            className: '',
            showGoodSnackbar: false,
        }
    },
    methods: {
        initClass: function() {
            this.editting = true;
            this.idClass = this.classes.idClass;
            this.className = this.classes.className;
        }, 

        editClass: function() {
            if(this.className != ''){
                this.classes.className = this.className;
                this.editting = false;
                this.showGoodSnackbar = true;
            } 
        }
    }
}
</script>