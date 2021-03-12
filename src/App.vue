<template>
    <div id="app">
        <h1>Employees Table</h1>
        <list-employee ></list-employee>
    </div>
</template>

<script>
import ListEmployee from './components/ListEmployee.vue';
// import { EventBus } from './components/eventBus/eventbus';

export default {
    name: 'App',
    data() {
        return {
            
        }
    },
    components: {
        ListEmployee,
    },
    methods: {
        
    },
    // mounted(){
    //     EventBus.$on('AddEmployee', ()=>{
    //         this.createVendor = true
    //         setTimeout(() => {
    //             this.$modal.show('Add-employee');
    //         }, 500);
    //     })
    // },
    // destroyed(){
    //     EventBus.$off('AddEmployee')
    // },
    // created(){
    //     setTimeout(() => {
    //         this.$modal.show("Add-employee")
    //     }, 500);
    // }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #212121;
    margin-top: 60px;
}
</style>
