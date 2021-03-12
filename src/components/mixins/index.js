/* eslint-disable no-async-promise-executor */
export default {
    methods: {
        async getEmpData(params) {
            return new Promise( async (resolve, reject) => {
                let response = await this.$http.get(`https://reqres.in/api/users?page=${params}`);
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(response);
                }
            });
        },
        async addEmpData(params) {
            return new Promise( async (resolve, reject) => {
                try{
                    let response = await this.$http.post("https://reqres.in/api/users", params);
                    if (response.status === 201) {
                        resolve(response.data)
                        this.openSuccessModal("Employee deleted successfully");
                        setTimeout(() => {
                            this.$modal.hide(this.modal_name);
                        }, 2000);
                    } else {
                        reject(response)
                        this.openWarningModal("Something went wrong, please try again");
                    }
                }
                catch(error) {
                    console.log(error);
                    this.$refs.warning_modal.open();
                    setTimeout(() => {
                        this.$refs.warning_modal.close();
                    }, 3000);
                }
            });
        },
        async deleteFieldById(params){
            return new Promise(async (resolve, reject) => {
                try{
                    let response = await this.$http.post(`https://reqres.in/api/users/${params}`);
                    if (response.status === 201) {
                        resolve(response.data)
                        this.openSuccessModal("Employee added successfully");
                    } else {
                        reject(response)
                        this.openWarningModal("Something went wrong, please try again");
                    }
                }
                catch(error){
                    console.log(error);
                }
            })
        },
        async editEmpDataById(id, params) {
            return new Promise(async (resolve, reject) => {
                let response = await this.$http.patch(`https://reqres.in/api/users/${id}`, params);
                if (response.status === 200) {
                    resolve(response.data)
                    this.openSuccessModal("Employee updated successfully");
                } else {
                    reject(response)
                    this.openWarningModal("Something went wrong, please try again");
                }
            });
        },
        openSuccessModal(message) {
            this.success_msg = message;
            this.$refs.success_modal.open();
            setTimeout(() => {
                this.$refs.success_modal.close();
            }, 2000);
        },
        openWarningModal(message) {
            this.warning_msg = message;
            this.$refs.warning_modal.open();
            setTimeout(() => {
                this.$refs.warning_modal.close();
            }, 2000);
        },
    }
}