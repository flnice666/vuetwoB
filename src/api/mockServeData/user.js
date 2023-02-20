// mock数据模拟
import Mock from 'mockjs'

// 图表数据
export default {
  getStatisticalData: () => {
    let List = []
    for (let i = 0; i < 10; i++) {
      List.push(
        Mock.mock({
          "name": '@cname',
          "age|1-50": 100,
          "sex|1": ['男', '女'],
          "birthDay": '@date("yyyy-MM-dd")',
          "address": Mock.Random.county(true),
          "active|1": [true, false]
        })
      )
    }
    return {
      code: 20000,
      data: {
        userList: List
      }
    }
  },
  addUserData: () => {
    return {
      code: 20000,
      success: true,
      error: null,
      errorMessage: undefined
    }
  }
}
