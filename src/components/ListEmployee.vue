<template>
    <div>
        <div class="add-btn">
            <el-button @click="showAddEmployee" type="success">Add</el-button>
        </div>
        <button @click="showSample">Sample</button>
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
                            <el-button type="primary" icon="el-icon-edit" @click="editEmployee(data.id)" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="deleteEmployee(data.id)" circle></el-button>
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
                modal_name: 'add-employee',
                createEmployee: false,
                success_msg: "",
                warning_msg: "",
            }
        },
        methods: {
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
            async deleteEmployee(params) {
                console.log(params);
                let response = await this.deleteFieldById(params);
                console.log(response);
            },
            async editEmployee(id) {
                try{
                    let params = {
                        name: "Stark",
                        job: "SWE!"
                    };
                    let response = await this.editEmpDataById(id, params);
                    console.log(response);
                }
                catch (error) {
                    console.log(error);
                }
            },
            showSample() {
                this.$router.push({
                    name: 'Sample',
                    params: {
                        id: 'asadasasasasas'
                    },
                })
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