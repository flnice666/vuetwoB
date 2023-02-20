import http from '../utils/request'

//请求首页的数据
export const getData = () => {
    return http.get('/home/getData')
}

//请求管理用户页面数据
export const getUserData = () => {
    return http.get('/user/getUserData')
}

//管理用户页面新增用户接口
export const addUserData = (params) => {
    return http.post('/user/addUserData', {...params})
}

//管理用户页面搜索用户
export const searchData = (params) => {
    return http.post('/user/searchData', {...params})
}