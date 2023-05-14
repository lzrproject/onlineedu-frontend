import request from '@/utils/request'

const api_prefix = '/api/app/article'

//获取论坛帖子列表
export function listArticle(query){
  return request({
      url: `${api_prefix}/list`,
      method: 'get',
      params: query
  })
}

//获取文章日期
export function listDate(date){
  return request({
      url: `${api_prefix}/date`,
      method: 'get',
      date
  })
}

//获取帖子详情
export function getArticle(id){
  return request({
      url: `${api_prefix}/${id}`,
      method: 'get'
  })
}

//根据博客id获取评论
export function getCommentByBid(articleId){
  return request({
      url: `${api_prefix}/comment/${articleId}`,
      method: 'get'
  })
}

//新增评论
export function addComment(data){
  return request({
      url: `${api_prefix}/add`,
      method: 'post',
      data: data
  })
}