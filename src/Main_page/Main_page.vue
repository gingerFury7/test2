<template>
    <div id="app">
        <div class="page-container" md-sync-route>
            <md-app>
                <md-app-toolbar class="md-primary">
                    <span class="md-title">{{  mainTitle  }}</span>
                </md-app-toolbar>

                <md-app-drawer md-permanent="full">
                    <md-toolbar class="md-transparent" md-elevation="5">
                        Разделы
                    </md-toolbar>

                    <md-list>
                        <md-list-item md-label="Раздел 1" to="/section1" v-on:click="section1()">
                            <span class="md-list-item-text">Раздел 1</span>
                        </md-list-item>

                        <md-divider class="md-insert"></md-divider>

                        <md-list-item md-label="Раздел 2" to="/section2" v-on:click="section2()">
                            <span class="md-list-item-text">Раздел 2</span>
                        </md-list-item>

                        <md-divider class="md-insert"></md-divider>

                        <md-list-item md-label="Раздел 3" to="/section3" v-on:click="section3()">
                            <span class="md-list-item-text">Раздел 3</span>
                        </md-list-item>

                        <md-divider class="md-insert"></md-divider>

                        <md-list-item md-label="Раздел 4" to="/section4" v-on:click="section4()">
                            <span class="md-list-item-text">Сброс ТРК</span>
                        </md-list-item>
                        <md-divider class="md-insert"></md-divider>
                    </md-list>
                </md-app-drawer>

                <md-app-content>
                    <router-view></router-view>
                </md-app-content>
            </md-app>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Main_page',
    data() {
        return {
            mainTitle: '',
        }
    },
    methods: {
        section1() {
            this.mainTitle = 'Изменение в таблице 1'
        }, 

        section2(){
            this.mainTitle = 'Изменение в табилце 2'
        },

        section3() {
            this.mainTitle = 'Раздел 3'
        },

        section4() {
            this.mainTitle = 'Сброс ТРК'
        }
    }
}
</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.md-toolbar {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
  .md-app {
    height: 900px;
    max-height: 1000px;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 200px;
    max-width: calc(100vw - 125px);
  }
</style>