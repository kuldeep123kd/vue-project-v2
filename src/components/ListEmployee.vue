<template>
    <div>
        <el-table :data="empData" height="250" style="width: 100%" v-if="!isLoading">
            <el-table-column prop="id" label="Id" width="180">
            </el-table-column>
            <el-table-column prop="name" label="Name" width="180">
            </el-table-column>
            <el-table-column prop="address.city" label="Address">
            </el-table-column>
        </el-table>
        <h1 v-else>Loading...</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                empData: [],
                apiUrl: 'https://jsonplaceholder.typicode.com/users',
                isLoading: false
            }
        },
        methods: {
            async getEmployeeData() {
                this.isLoading = true;
                let response = await this.$http.get(this.apiUrl);
                if(response.status === 200) {
                    this.isLoading = false;
                    this.empData = response.data;
                }
                // await this.axios.get(this.apiUrl).then((response) => {
                //     console.log(response);
                // }).catch((err)=> {
                //     console.log(err);
                //     console.log(err.response);
                // });
            }
        },
        async mounted(){
            this.getEmployeeData();
        }
    }
</script>