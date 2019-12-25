import http from "@/http/http"

/**
 * 封装频道栏中的api
 */
function getChannel() {
    return http({
        url: "v1_0/user/channels",
        method: "get",
    })
}

/**
 * 获取新闻内容的方法 
 */
function getNews({ channel_id,timestamp,with_top}) {
    return http({
        url: "/v1_1/articles",
        method: "get",
        params: {
            channel_id: channel_id, //频道ID
            timestamp: timestamp, //时间戳
            with_top: with_top //置顶
        }
    })


}

/**
 * 获取所有频道数据的方法 
 */

function allChannel() {
    return http({
        url: "v1_0/channels",
        method: 'get',

    })
}
/**
 * 添加和删除频道数据的方法 
 */
function saveChannel({channels}) {
    return http({
        url: "v1_0/user/channels",
        method: "put",
        data: {
            channels: channels,
        }
    })
}
/**
 * 添加不喜欢文章数据的方法 
 */
function hiddenArticel({artid}) {
    return http({
        url: "v1_0/article/dislikes",
        method: "post",
        data: {
            target: artid,
        }
    })
}

//导出
export {
    getChannel,
    getNews,
    allChannel,
    saveChannel,
    hiddenArticel

}