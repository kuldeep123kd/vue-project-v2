/* eslint-disable no-async-promise-executor */
export default {
  data() {
    return {
      get_response: false
    }
  },
  methods: {
    async getEmpData() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise( async (resolve, reject) => {
          let response = await this.$http.get('https://reqres.in/api/users');
          if (response.status === 200) {
              resolve(response.data);
          } else {
              reject(response.reason);
          }
      });
    },
    async addEmpData(params) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise( async (resolve, reject) => {
        try{
          this.get_response = true;
          let response = await this.$http.post("https://reqres.in/api/users", params);
          if (response.status === 200) {
              resolve(response.data);
              setTimeout(() => {
                  this.get_response = false;
              }, 1000);
          } else {
              reject(response);
              this.$refs.warning_modal.open();
              setTimeout(() => {
                  this.$refs.warning_modal.close();
                  this.get_response = false;
              }, 3000);
          }
        }
        catch(error) {
          this.get_response = false;
          console.log(error);
          // this.warning_msg = error.response.data.reason;
          this.$refs.warning_modal.open();
          setTimeout(() => {
              this.$refs.warning_modal.close();
          }, 3000);
        }
      });
    },
    async deleteFieldById(params){
      return new Promise(async (resolve, reject) => {
          let response = await this.$http.post(`https://reqres.in/api/users/${params}`)
          if (response.status === 201) {
              resolve(response.data)
              this.openSuccessModal("Employee deleted successfully");
          } else {
              reject(response.data)
              this.openWarningModal("Something went wrong, please try again");
          }
      })
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