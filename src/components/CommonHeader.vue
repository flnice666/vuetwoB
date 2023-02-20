<template>
    <div class="header-container">
        <div class="l-container">
            <el-button @click="handelClick" icon="el-icon-menu" size="mini"></el-button>

            <span class="text">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
                </el-breadcrumb>
            </span>
        </div>
        <div class="r-container">
            <el-dropdown  @command="deleteToken">
                <span class="el-dropdown-link">
                    <img class="user-image" src="../assets/image/user.jpg" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from 'js-cookie'
export default {
    name: 'CommonHeader',
    data() {
        return {

        }
    },
    methods: {
        handelClick() {
            this.$store.commit('collapseMenu')
        },
        deleteToken(event){
            if(event === 'b'){
                Cookie.remove('token');
                this.$router.push('/login');
            }else if(event === 'a'){
                this.$router.push('/home');
            }
        }
    },
    computed:{
        ...mapState({
            tags: state =>  state.tab.tabs
        })
    },

}

</script>

<style lang="less" scoped>
.header-container {
    height: 60px;
    background-color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .l-container{
            display: flex;
            align-items: center;
        }
    .text {
        margin-left: 10px;
        color: #fff;
        font-size: 14px;
        /deep/.el-breadcrumb__item{
            .el-breadcrumb__inner {
                &.is-link{
                    color: #666;
                }
            }
            &:last-child{
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }

    .r-container {
        .user-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>