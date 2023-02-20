<template>
    <div class="loginDiv">
        <div class="loginTip">用户登录</div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" style="margin-left: 140px;" @click="getLogin">登录</el-button>
    </div>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
export default {
    name: 'Login',
    data() {
        return {
            name: 'Login',
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请填写用户名' }
                ],
                password: [
                    { required: true, message: '请填写用户密码' }
                ]
            }
        }
    },
    methods: {
        getLogin() {
            console.log(this.form.username, this.form.password, '666')
            if (this.form.username === 'fenglei' && this.form.password === 'flnice666@163') {
                const token = Mock.Random.guid();
                //将用户信息token存入cookie用于组件间通信
                Cookie.set('token', token);
                this.$router.push('/home');
            }else{
                alert('用户名密码错误!请重新数据')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.loginDiv {
    width: 350px;
    margin: 180px auto;
    border: 1px solid #ccc;
    padding: 20px 20px;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;

    .loginTip {
        display: flex;
        justify-content: center;
        padding: 12px 12px;
        font-size: 20px;
        font-weight: 500;
    }
}
</style>