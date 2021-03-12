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
                <div class="save-btn">
                    <el-button type="primary" plain @click="addEmployee">Save</el-button>
                    <el-button type="danger" plain @click="modalClose">Cancel</el-button>
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
            success_msg: "Employee Created Successfully",
            warning_msg: "Failed to Create Employee",
        }
    },
    computed: {
        new_employee() {
            return {
                name: this.username,
                job: this.job
            }
        }
    },
    methods: {
        async addEmployee() {
            this.$validator.validateAll().then(async result => {
                if (result === true) {
                    let response = await this.addEmpData(this.new_employee);
                    console.log(response);
                }
            })
        },
        modalClose() {
            this.username = '';
            this.job = '';
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
            }
        } 
        this.$validator.localize("en", dict);       
    },
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