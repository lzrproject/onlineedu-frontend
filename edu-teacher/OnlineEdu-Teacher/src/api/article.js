import request from '@/utils/request'

 const api_prefix = '/api/teacher/article'

//获取论坛帖子列表
export function listArticle(query){
    return request({
        url: `${api_prefix}/list`,
        method: 'get',
        params: query
    })
}

//根据用户id查看到他所有的帖子
export function listuserArticle(query){
    return request({
        url: `${api_prefix}/listByUid`,
        method: 'get',
        params: query
    })
}

//获取帖子详情
export function getArticle(id){
    return request({
        url: `${api_prefix}/${id}`,
        method: 'get'
    })
}

//删除帖子
export function delArticle(id){
    return request({
        url: `${api_prefix}/${id}`,
        method: 'delete'
    })
}


//新建帖子
export function addArticle(data){
    return request({
        url: `${api_prefix}`,
        method: 'post',
        data
    })
}

//修改帖子
export function updateArticle(data){
    return request({
        url: `${api_prefix}`,
        method: 'put',
        data
    })
}
 
// 禁用帖子
export function disable(statusId) {
    return request({
      url: `${api_prefix}/disable/${statusId}`,
      method: 'get'
    })
  }
  
// 启用帖子
export function enable(statusId) {
return request({
    url: `${api_prefix}/enable/${statusId}`,
    method: 'get'
})
}

