import request from '@/utils/request'

 const api_prefix = '/api/admin/article'

//获取论坛帖子列表
export function listAll(data){
    return request({
        url: `${api_prefix}/list`,
        method: 'post',
        data
    })
}

//获取帖子详情
export function getInfo(id){
    return request({
        url: `${api_prefix}/getinfo/${id}`,
        method: 'get'
    })
}

//删除帖子
export function deleteArticle(id){
    return request({
        url: `${api_prefix}/delete/${id}`,
        method: 'post'
    })
}


//新建帖子
export function createArticle(data){
    return request({
        url: `${api_prefix}/create`,
        method: 'post',
        data
    })
}
 
// 禁用帖子
export function disable(id) {
    return request({
      url: `${api_prefix}/disable/${id}`,
      method: 'post'
    })
  }
  
  // 启用帖子
  export function enable(id) {
    return request({
      url: `${api_prefix}/enable/${id}`,
      method: 'post'
    })
  }

//根据用户id查看到他所有的帖子
export function listuserArticle(id){
    return request({
        url: `${api_prefix}/userArticle/${id}`,
        method: 'get'
    })
}