import http from "@/http/http";

/**
 * 添加加载文章的数据方法 
 */
function acticleDetail({
    article_id
}) {
    return http({
        url: "v1_0/articles/" + article_id,
        method: "get",

    })
}

/**
 * 添加关注功能的方法 
 */
function follow({
    aut_id
}) {
    return http({
        url: "v1_0/user/followings",
        method: "post",
        data: {
            target: aut_id
        }
    })
}
/**
 * 添加关注功能的方法 
 */
function cancleFollw({
    aut_id
}) {
    return http({
        url: "v1_0/user/followings/" + aut_id,
        method: "DELETE",

    })
}

/**
 * 添加对文章点赞的方法 
 */
function star({ article_id}) {
    return http({
        url: "v1_0/article/likings",
        method: "POST",
        data: {
            target: article_id
        }
    })
}

/**
 * 添加取消对文章点赞的方法 
 */

function cancleStar({article_id}) {
    return http({
        url: "v1_0/article/likings/" + article_id,
        method: "DELETE",

    })
}
/**
 * 添加对对文章不喜欢的方法 
 */
function dislikes({ article_id}) {
    return http({
        url: "v1_0/article/dislikes",
        method: "POST",
        data: {
            target: article_id
        }
    })
}

/**
 * 添加取消对文章点赞的方法 
 */

function cancleDislikes({article_id}) {
    return http({
        url: "/v1_0/article/dislikes/" + article_id,
        method: "DELETE",

    })
}

/**
 * 添加评论或评论回复 
 */
function addComments({article_id,content,art_id}){
    return http({
        url:"v1_0/comments",
        method:"post",
        data:{
            target:article_id,
            content:content,
            art_id:art_id ||null
        }
    })
}

export {
    acticleDetail,
    follow,
    cancleFollw,
    star,
    cancleStar,
    dislikes,
    cancleDislikes,
    addComments
}