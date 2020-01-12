import http from "@/http/http";
/**
 * 根据关键字获取联想框的数据
 */
function suggestion({ keyWords}) {
    return http({
        url: "v1_0/suggestion",
        method: "get",
        params: {
            q: keyWords
        }

    })
}

/**
 * 获取搜索列表数据
 */

function searchList({page, pageSize,keyWords}) {

    return http({
  
        url: "v1_0/search",
        method: "get",
        params: {
            page: page,
            per_page: pageSize,
            q: keyWords
        }
    })
}


export {
    suggestion,
    searchList
}