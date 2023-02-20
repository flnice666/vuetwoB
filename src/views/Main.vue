<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside/>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header/>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import CommonAside from '../components/CommonAside'
import CommonHeader from '../components/CommonHeader'
export default {
    name: "Main",
    data() {
        return {
            name: "main"
        }
    },
    components:{
        CommonAside,
        CommonHeader
    }
}
</script>

<style lang="less" scoped>
.el-header{
    padding: 0;
}
.el-menu{
    border-right: none;
}
</style>