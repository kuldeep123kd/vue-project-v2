export default {
  methods: {
    async getEmpData() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise( async (resolve, reject) => {
          let response = await this.$http.get("https://jsonplaceholder.typicode.com/users");
          if (response.status === 200) {
              resolve(response.data);
          } else {
              reject(response.reason);
          }
      });
    },
  }
}