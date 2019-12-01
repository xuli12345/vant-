/**
 *  对token进行localStorage封装
 */

 //数据的保存
 function setAuthor(res){
     return window.localStorage.setItem("token",JSON.stringify(res))
 }

 //数据的获取
 function getAuthor(){
     return JSON.parse(window.localStorage.getItem("token")) ||{}
 }

 //数据的删除
 function removeAuthor(){
     return window.localStorage.removeItem("token");
 }
 export{
    setAuthor,
    getAuthor,
    removeAuthor
 }