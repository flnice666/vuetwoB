<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{isCollapse ? '通用' : '通用管理系统'}}</h3>
        <el-menu-item v-for="item in nochildrenlist" :key="item.name" :index="item.name" @click="clickMenu(item)">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildrenList" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="childrenItem in item.children" :key="childrenItem.name"
                    :index="`${item.name}-${childrenItem.name}`" @click="clickMenu(childrenItem)">{{ childrenItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu{
    height: 100vh;
    h3{
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        line-height: 48px;
        text-align: center;
    }
}
</style>

<script>
export default {
    name: 'ContainerAside',
    data() {
        return {
            // isCollapse: false,
            MenuData: [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '用户管理',
                    icon: 'user',
                    url: 'UserManage/UserManage'
                },
            ]
        };
    },
    methods: {
        clickMenu(item){
            if(this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')){
                this.$router.push(item.path);
            }
            this.$store.commit('setTabs', item);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    computed: {
        nochildrenlist() {
            return this.MenuData.filter(item => !item.children)
        },
        hasChildrenList() {
            return this.MenuData.filter(item => item.children)
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }
    }
}
</script>