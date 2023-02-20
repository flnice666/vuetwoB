<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px;">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/image/user.jpg" />
                    <div class="user-info">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间:<span>2017-09-01</span></p>
                    <p>上次登录地点:<span>哈尔滨</span></p>
                </div>
            </el-card>
            <el-card style="height:460px;margin-top:20px;">
                <el-table :data="tableData">
                    <el-table-column prop="name" label="课程">
                    </el-table-column>
                    <el-table-column prop="todayBuy" label="今日购买">
                    </el-table-column>
                    <el-table-column prop="monthBuy" label="本月购买">
                    </el-table-column>
                    <el-table-column prop="totalBuy" label="总购买">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px;">
            <div class="num">
                <el-card v-for="item in iconsData" :body-style="{ display: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`"></i>
                    <div class="detail">
                        <p class="prise">{{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height:280px">
                <!-- 准备echarts画布 -->
                <div ref="echarts1" style="height:280px"></div>
            </el-card>
            <div class="graph">
                <el-card style="height:260px">
                    <div ref="echarts2" style="height:260px"></div>
                </el-card>
                <el-card style="height:260px">
                    <div ref="echarts3" style="height:240px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>

</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
    name: "Home",
    data() {
        return {
            name: "h1",
            tableData: [],
            iconsData: [
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: 's-goods',
                    color: '5ab1ef'
                },
                {
                    name: "今日支付订单",
                    value: 121,
                    icon: 's-goods',
                    color: '5ab1ef'
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: 's-goods',
                    color: '5ab1ef'
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: 's-goods',
                    color: '5ab1ef'
                },
                {
                    name: "本月搜藏订单",
                    value: 121,
                    icon: 's-goods',
                    color: '5ab1ef'
                },
                {
                    name: "今日收藏订单",
                    value: 1234,
                    icon: 's-goods',
                    color: '5ab1ef'
                }
            ]
        }
    },
    mounted() {
        console.log('4564546');
        getData().then(({ data }) => {
            const { tableData, orderData, userData, videoData } = data.data;
            this.tableData = tableData;
            const echarts1 = echarts.init(this.$refs.echarts1);
            const echarts2 = echarts.init(this.$refs.echarts2);
            const echarts3 = echarts.init(this.$refs.echarts3);
            const xAxis = Object.keys(orderData.data[0]);
            const echarts1Params = {
                grid:{
                    left:'20%'
                },
                //提示框
                tooltip:{
                    trigger:'axis'
                },
                xAxis:{
                    type:'category',
                    data:xAxis,
                    axisLine:{
                        lineStyle:{
                            color:'#17b3a3'
                        }
                    },
                    axisLabel:{
                        interval:0,
                        color:'#333'
                    }
                },
                yAxis:{},
                legend:{
                    textStyle:{
                        color:'#333'
                    },
                    data: xAxis
                },
                series:xAxis.map(item => {
                    return{
                        name: item,
                        data: orderData.data.map(value => value[item]),
                        type: 'line'
                    }
                })
            }
            const echarts2xAxis = userData.map(item => item.date);
            const echarts2Params = {
                xAxis:{
                    data:echarts2xAxis
                },
                yAxis:[
                    {
                        type:'value',
                        axisLine:{
                            lineStyle:{
                                color:'#17b3a3'
                            }
                        }
                    }
                ],
                legend:{
                    data: echarts2xAxis
                },
                color:['#2ec7c9', '#b6a2de'],
                series:[
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type:'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type:'bar'
                    }
                ]
            }
            const echarts3Params = {
                tooltip:{
                    trigger: 'item'
                },
                color:[
                    "#0f78f4#",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#39c362",
                    "#3ed1cf",
                ],
                series:[
                    {
                        data:videoData,
                        type: 'pie'
                    }
                ]
            }
            echarts1.setOption(echarts1Params);
            echarts2.setOption(echarts2Params);
            echarts3.setOption(echarts3Params);
        })
    }
}
</script>

<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 50px;
    }

    .user-info {
        .name {
            font-size: 32px;
            margin-bottom: 20px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 6px;
        }
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        line-height: 80px;
        color: #fff;
        background: #22b8cc;
        text-align: center;
    }

    .detail {
        display: flex;
        flex-direction: column; //更改主轴方向为竖直方向
        justify-content: center;
        margin-left: 15px;

        .prise {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .desc {
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    .el-card {
        width: 48%;
    }
}
</style>