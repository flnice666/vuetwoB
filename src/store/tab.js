export default {
    state:{
        isCollapse:false,
        tabs:[
            {
                path: '/',
                name: 'home',
                label: '首页呢b',
                icon: 's-home',
                url: 'Home/Home'
            },
        ]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        setTabs(state, value){
            console.log(value, '数据展示');
            if(value.name !== 'home' && state.tabs.every(item => item.name !== value.name)){
                state.tabs = [{...value}]
            }
        }
    }
}