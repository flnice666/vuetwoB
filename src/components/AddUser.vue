<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div>
            <el-form :disabled="this.disabledValue" ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请填写用户姓名"></el-input>
                </el-form-item>
                <el-form-item label="用户年龄" prop="age">
                    <el-input v-model="form.age" placeholder="请填写用户年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthDay">
                    <el-date-picker placeholder="请选择出生日期" v-model="form.birthDay" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeModal">取 消</el-button>
            <el-button type="primary" @click="addFormValue">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name: "addUser",
    data() {
        return {
            rules: {
                name: [
                    { required: true, message: '请输入用户姓名', trigger: 'blur' },
                ],
                age: [
                    { required: true, message: '请输入用户年龄', trigger: 'blur' },
                ],
                birthDay: [
                    { required: true, message: '请选择用户出生日期', trigger: 'blur' },
                ]
            }
        }
    },
    props: ['dialogVisible', 'title', 'closeModal', 'addUserMethod', 'formValue', 'disabledValue', 'changeDisabledValue'],
    methods: {
        handleClose() {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.closeModal();
                })
                .catch(_ => { });
        },
        addFormValue() {
            if (!this.formValue) {
                this.$refs.form.validate(res => {
                    if (res) {
                        this.addUserMethod(this.form, this.$refs.form);
                    } else {
                        console.log('error submit!');
                        return false
                    }
                })
            } else {
                this.closeModal();
                this.changeDisabledValue();
            }
        }
    },
    computed: {
        form() {
            if (this.formValue) return this.formValue
            return {
                name: '',
                age: '',
                sex: '男',
                birthDay: '',
                address: '',
            }
        }
    }
}
</script>
<style>

</style>