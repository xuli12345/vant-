<template>
  <div>
      <router-view></router-view>
    <!-- 底部tabBar -->
    <van-tabbar v-model="tabBarActive">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>

export default {
  data() {
    return {
      tabBarActive: 0 //底部导航栏激活索引
    };
  },
  methods:{

  },

};
</script>
