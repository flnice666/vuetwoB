<template>
    <div class="userPage">
        <div class="activeTop">
            <div><el-button type="primary" @click="openModal"><i class="el-icon-plus"></i>新增</el-button>
            </div>
            <div>
                <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
                    <el-button slot="append" icon="el-icon-search" @click="getSearch"></el-button>
                </el-input>
            </div>
        </div>
        <div class="tableDiv">
            <el-table :data="tabelData" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="age" label="年龄" align="center">
                </el-table-column>
                <el-table-column prop="sex" label="性别" align="center">
                </el-table-column>
                <el-table-column prop="birthDay" label="出生日期" align="center">
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center">
                </el-table-column>
                <el-table-column prop="active" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleClick(scope.row, true)">查看</el-button>
                        <el-button v-if="scope.row.active" type="text" size="small"
                            @click="handleClick(scope.row, false)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background :current-page="currentPage"  @current-change="handleCurrentChange" layout="prev, pager, next" :total="currentTotal">
                </el-pagination>
            </div>
        </div>
        <AddUser v-if="dialogVisible" :dialogVisible="dialogVisible" title="新增用户信息" :closeModal="closeModal"
            :addUserMethod="addUserMethod" :formValue="formValue" :disabledValue="disabledValue"
            :changeDisabledValue="changeDisabledValue" />
    </div>
</template>

<script>
import { getUserData, addUserData, searchData } from '../api'
import AddUser from '@/components/AddUser.vue'
export default {
    name: "User",
    data() {
        return {
            name: 'User',
            tabelData: [],
            dialogVisible: false,
            loading: false,
            formValue: undefined,
            searchValue: undefined,
            disabledValue: false,
            currentPage:1,
            currentTotal:100
        }
    },
    components: {
        AddUser,
    },
    mounted() {
        this.getUserMethod();
    },
    methods: {
        openModal() {
            this.dialogVisible = true;
        },
        closeModal() {
            this.dialogVisible = false;
            this.formValue = undefined;
        },
        getUserMethod() {
            this.loading = true;
            getUserData().then(res => {
                this.loading = false;
                this.tabelData = res.data.data.userList
            })
        },
        addUserMethod(params, fromRef) { //新增用户数据的接口
            addUserData(params).then(res => {
                if (res.data.success) {
                    fromRef.resetFields();//清除填写的信息并且关闭页面
                    this.closeModal();
                    this.getUserMethod();
                } else {
                    alert('报错！');
                }
            })
        },
        handleClick(value, disabledValue) {
            this.disabledValue = disabledValue;
            this.formValue = { ...value };
            this.openModal();
        },
        getSearch() {
            this.loading = true;
            searchData().then(res => {
                this.loading = false;
                this.tabelData = res.data.data.userList
            })
        },
        changeDisabledValue() {
            this.disabledValue = false;
        },
        handleCurrentChange(value){
            this.currentPage = value;
        }
    }
}
</script>

<style  lang="less" scoped>
.userPage{
    padding:  0px 20px;
}
.activeTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}

.tableDiv {
    padding: 0 10px;
}

.pagination{
    display: flex;
    justify-content: right;
    padding: 20px 60px;
}
</style>