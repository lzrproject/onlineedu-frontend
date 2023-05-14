import request from '@/utils/request'

 const api_prefix = '/api/teacher/activity'

 //获取活动列表
 export function listAll(data){
    return request({
        url: `${api_prefix}/list`,
        method: 'post',
        data
    })
 }

 //获取某个人发布的活动列表
 export function listAllById(userid){
    return request({
        url: `${api_prefix}/listAll/${userid}`,
        method: 'post',
        data
    })
 }

 //获取活动详情
 export function detail(id){
    return request({
        url: `${api_prefix}/getInfo/${id}`,
        method: 'get'
 })
}

//修改活动
export function updateInfo(data){
    return request({
        url: `${api_prefix}/update`,
        method: 'post',
        data
    })
}

//删除活动
export function deleteActivity(id){
    return request({
        url: `${api_prefix}/delete/${id}`,
        method: 'post'
    })
}


//新建活动
export function createActivity(data){
    return request({
        url: `${api_prefix}/create`,
        method: 'post',
        data
    })
}

// 禁用活动
export function disable(id) {
    return request({
      url: `${api_prefix}/disable/${id}`,
      method: 'post'
    })
  }
  
  // 启用活动
  export function enable(id) {
    return request({
      url: `${api_prefix}/enable/${id}`,
      method: 'post'
    })
  }

// 驳回
export function reject(data) {
    return request({
      url: `${api_prefix}/reject`,
      method: 'post',
      data
    })
  }
  
  // 通过审核
  export function pass(id) {
    return request({
      url: `${api_prefix}/pass/${id}`,
      method: 'post'
    })
  }