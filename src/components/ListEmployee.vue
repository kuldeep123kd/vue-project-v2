<template>
    <div>
        <div class="add-btn">
            <el-button @click="showAddEmployee" type="success">Add</el-button>
        </div>
        <div v-if="!errText">
            <table v-if="!isLoading" height="350" style="width: 100%">
                <thead>
                    <tr>
                        <th style="width: 50px;">Id</th>
                        <th style="width: 180px;">Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in empData" :key="data.id">
                        <td  style="width: 50px;">{{ data.id }}</td>
                        <td  style="width: 180px;">{{ data.email }}</td>
                        <td>{{ data.first_name }}</td>
                        <td>{{ data.last_name }}</td>
                        <td>
                            <el-button type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="deleteEmpployee(data.id)" circle></el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h1 v-else>Loading...</h1>
        </div>
        <h2 v-else> {{ errText }} </h2>
        <add-employee :modal_name="modal_name" v-if="createEmployee"></add-employee>
        <sweet-modal ref="success_modal" icon="success">{{success_msg}}</sweet-modal>
        <sweet-modal ref="warning_modal" icon="warning">{{warning_msg}}</sweet-modal>
    </div>
</template>

<script>
import AddEmployee from './AddEmployee.vue';
import { SweetModal } from 'sweet-modal-vue'
import index from './mixins/index';
    export default {
    components: { AddEmployee, SweetModal },
        mixins:[index],
        data() {
            return {
                empData: [],
                isLoading: false,
                errText: null,
                modal_name: 'Add-employee',
                createEmployee: false,
                success_msg: "",
                warning_msg: "",
            }
        },
        methods: {
            // async getEmployeeData() {
            //     this.isLoading = true;
            //     let response = await this.$http.get(this.apiUrl);
            //     if(response.status === 200) {
            //         this.isLoading = false;
            //         this.empData = response.data;
            //     } else if(response.status === 400 || response.status === 401) {
            //         this.isLoading = false;
            //         this.errText = "Somthing not right, Please reload your page"
            //     }
            //     await this.axios.get(this.apiUrl).then((response) => {
            //         console.log(response);
            //     }).catch((err)=> {
            //         console.log(err);
            //         console.log(err.response);
            //     });
            // }
            async getEmployeeData(){
                this.isLoading = true;
                let response = await this.getEmpData();
                this.empData = response.data;
                this.isLoading = false;
            },
            showAddEmployee() {
                this.createEmployee = true;
                setTimeout(() => {
                    this.$modal.show(this.modal_name);
                }, 500);
            },
            async deleteEmpployee(params) {
                console.log(params);
                await this.deleteFieldById(params);
                // console.log(response);
                // this.$refs.success_modal.open();
                // setTimeout(() => {
                //     this.$refs.success_modal.close();
                // }, 3000);
            }
        },
        async mounted(){
            this.getEmployeeData();
        }
    }
</script>

<style scoped>
.add-btn {
    text-align: right;
    padding: 20px;
}
table tr td,
table tr th {
    text-align: left;
}
</style>