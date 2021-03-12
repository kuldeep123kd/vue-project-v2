<template>
    <div>
        <modal :name="modal_name" height="auto" >
            <div class="addemployee">
                <h1>Add Employee</h1>
                <div class="input-field">
                    <label>Username</label>
                    <input type="text" v-model="username" v-validate.persist="'required'" name="username" placeholder="Enter username" />
                    <div>
                        <span v-show="errors.has('username')">{{ errors.first('username')}}</span>
                    </div>
                </div>
                <div class="input-field">
                    <label>Job</label>
                    <input type="text" v-model="job" v-validate.persist="'required'" name="job" placeholder="Enter job" />
                    <div>
                        <span v-show="errors.has('job')">{{ errors.first('job')}}</span>
                    </div>
                </div>
                <!-- <div class="input-field">
                    <label>Phone</label>
                    <input type="tel" v-model="phone" v-validate.persist="'required|numeric'" name="phone" placeholder="Enter phone" />
                    <div>
                        <span v-show="errors.has('phone')">{{ errors.first('phone')}}</span>
                    </div>
                </div>
                <div class="input-field">
                    <label>Age</label>
                    <input type="text" v-model="age" v-validate.persist="'required|numeric'" name="age" placeholder="Enter age" />
                    <div>
                        <span v-show="errors.has('age')">{{ errors.first('age')}}</span>
                    </div>
                </div>
                <div class="input-field">
                    <label>Salary</label>
                    <input type="text" v-model="salary" v-validate.persist="'required|numeric'" name="salary" placeholder="Enter salary" />
                    <div>
                        <span v-show="errors.has('salary')">{{ errors.first('salary')}}</span>
                    </div>
                </div> -->
                <div class="save-btn">
                    <el-button type="primary" plain @click="addData">Save</el-button>
                    <el-button type="danger" plain @click="modelClose">Cancel</el-button>
                </div>
            </div>
        </modal>
        <sweet-modal ref="success_modal" icon="success">{{success_msg}}</sweet-modal>
        <sweet-modal ref="warning_modal" icon="warning">{{warning_msg}}</sweet-modal>
    </div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import index from './mixins/index';
export default {
    props: ['modal_name'],
    mixins:[index],
    components:{
        SweetModal
    },
    data() {
        return {
            username: '',
            job: '',
            // salary: '',
            // phone: '',
            // age: '',
            success_msg: "Employee Created Successfully",
            warning_msg: "Failed to Create Employee",
        }
    },
    computed: {
        // new_employee() {
        //     return {
        //         name: this.username,
        //         job: this.job
        //     }
        // }
    },
    methods: {
        async addData() {
            this.$validator.validateAll().then(async result => {
                if (result == true) {
                    try{
                        const params = {
                            name: this.username,
                            job: this.job
                        }
                        let response = await this.addEmpData(params);
                        console.log(response);
                    }
                    catch(error){
                        throw new Error(error);
                    }
                    // let response = await this.addEmpData(this.new_employee);
                    // this.addEmpData(this.new_employee).then(() => {
                    //     this.$refs.success_modal.open();
                    //     setTimeout(() => {
                    //         this.$refs.success_modal.close();
                    //     }, 2000);
                    //     setTimeout(() => {
                    //         this.modelClose();
                    //     }, 3000);
                    // })
                }
            })
        },
        modelClose() {
            this.username = '';
            this.job = '';
            // this.salary = '';
            // this.phone = '';
            // this.age = '';
            this.$modal.hide(this.modal_name);
        }
    },
    created() {
        const dict = {
            custom: {
                username: {
                    required: () => "Username is Required",
                },
                job: {
                    required: () => "Job is Required",
                },
                // salary: {
                //     required: () => "Salary is Required",
                //     numeric: () => "Salary should be Numeric"
                // },
                // phone: {
                //     required: () => "Phone Number is Required",
                //     numeric: () => "Phone Number must contain more than 9 Numbers",
                // },
                // age:{
                //     required: () => "Age is Required",
                //     // regex: () => "Website must contain valid Domain Name"
                // }
            }
        } 
        this.$validator.localize("en", dict);       
    },
    // beforeDestroy() { this.$validator.pause() },
}
</script>

<style scoped>
.addemployee {
    padding: 15px;
}
.addemployee h1 {
    font-size: 1.125rem;
    text-align: center;
}
.input-field {
    max-width: 380px;
    margin: 0 auto;
    padding-top: 10px;
}

.input-field input {
    height: 30px;
    border: 1px solid #ececec;
    background-color: transparent;
    width: 100%;
    outline: 0 none;
    border-radius: 5px;
    padding: 5px 10px;
}
.input-field input:focus {
    outline: 0 none;
}
.input-field label {
    padding: 5px 0;
    display: block;
}
.save-btn {
    padding: 20px 0 10px 0;
    text-align: center;
}
.input-field span {
    color: #f56c6c;
    font-size: 0.75rem;
}
</style>