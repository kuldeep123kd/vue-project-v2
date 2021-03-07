<template>
    <div>
        <div v-if="!errText">
            <el-table :data="empData" height="350" style="width: 100%" v-if="!isLoading">
                <el-table-column prop="id" label="Id" >
                </el-table-column>
                <el-table-column prop="name" label="Name" >
                </el-table-column>
                <el-table-column prop="username" label="Username" width="180">
                </el-table-column>
                <el-table-column prop="email" label="Email" width="180">
                </el-table-column>
                <el-table-column prop="phone" label="Phone" width="180">
                </el-table-column>
                <el-table-column prop="website" label="Website">
                </el-table-column>
                <el-table-column prop="address.city" label="Address">
                </el-table-column>
            </el-table>
            <h1 v-else>Loading...</h1>
        </div>
        <h2 v-else> {{ this.errText }} </h2>
    </div>
</template>

<script>
import index from './mixins/index';
    export default {
        mixins:[index],
        data() {
            return {
                empData: [],
                apiUrl: 'https://jsonplaceholder.typicode.com/users',
                isLoading: false,
                errText: null
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
                // console.log(response);
                this.empData = response;
                this.isLoading = false;
            },
        },
        async mounted(){
            this.getEmployeeData();
        }
    }
</script>