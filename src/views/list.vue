<template>
  <div>
    <van-nav-bar
      fixed
      class="header"
      title="搜索列表"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 上拉刷新组件 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- list列表组件 -->
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group v-for="(item, index) in list" :key="index">
          <van-cell  @click="linkAricleDetail(item)">
            <template slot="title">
              <div >
                <div>{{item.aut_name}}</div>
                <div>{{item.title}}</div>
              </div>
            </template>
            <template slot="right-icon">
              <div>
                <van-image
                  width="100"
                  height="100"
                  :src="item.cover.images[0]"
                />
              </div>
            </template>
          </van-cell>
          <van-grid :column-num="3">
            <van-grid-item icon="chat-o" text="评论" @click="comment" />
            <van-grid-item icon="smile-o thumb-circle-o" text="点赞" />
            <van-grid-item icon="bag-o" text="收藏" />
          </van-grid>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { searchList } from "@/api/search.js";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      isLoading: false,
      page: 0, //页码
      pageSize: 10, //页容量
      keyWords: this.$route.params.key
    };
  },
  methods: {
    onClickLeft() {
      console.log(1117777);
    },
    async onLoad() {
      //进入方法让页码加1
      this.page++;
      let res = await searchList({
        page: this.page,
        pageSize: this.pageSize,
        keyWords: this.keyWords
      });
      //数组合并
      this.list = [...this.list, ...res.data.results];

      // 数据全部加载完成
      if (this.list.length === res.data.total_count) {
        this.finished = true;
      }
      // 加载状态结束
      this.loading = false;
    },
    onRefresh() {
      this.page = 0;
      this.loading = false;
      this.finished = false;
      this.isLoading = false;
      this.onLoad; //重新加载数据
    },
    comment() {
     //调用自定义全局登录的插件
      this.$login();
    
     },
     linkAricleDetail(item){
       this.$router.push({path:`/articleDetail/${item.art_id}`})
     }
  },
  created() {
    // console.log(this.$route.params);
  }
};
</script>
<style lang="scss" scoped>
.van-nav-bar {
  z-index: 99 !important;
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left:before {
    color: #fff;
  }
}
.van-cell-group {
  border-bottom: 10px solid #f5f5f5;
}
.list {
  margin-top: 46px;
}
</style>
