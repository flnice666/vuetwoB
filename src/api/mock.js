import Mock from 'mockjs'
import HomeApi from './mockServeData/home'
import UserApi from './mockServeData/user'

    Mock.mock('/api/home/getData', 'get', HomeApi.getStatisticalData)
    Mock.mock('/api/user/getUserData', 'get', UserApi.getStatisticalData)
    Mock.mock('/api/user/addUserData', 'post', UserApi.addUserData)
    Mock.mock('/api/user/searchData', 'post', UserApi.getStatisticalData)