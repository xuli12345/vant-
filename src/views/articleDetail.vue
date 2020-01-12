<template>
  <div class="detail">
    <van-nav-bar
      fixed
      class="header"
      title="文章详情"
      left-arrow
      @click-left="onClickLeft"
    />
    <!--文章标题 -->
    <van-cell :title="acticleObj.title" />
    <!-- 作者关注组件 -->
    <auther :acticleObj="acticleObj" />
    <!-- 文章详情 -->
    <van-cell>
      <template slot="title">
        <div v-html="acticleObj.content"></div>
      </template>
    </van-cell>
    <!-- 点赞&不喜欢 -->
    <enjoy :obj="acticleObj" />
    <!-- 评论区域 -->
    <comment :commentList="commentList"></comment>
    <!-- 留言区域 -->
    <message :articleId="acticleObj.art_id"  @sendcomment="getcomments" />
  </div>
</template>
<script>
import auther from "@/views/compontents/auther.vue";
import enjoy from "@/views/compontents/enjoy.vue";
import comment from "@/views/compontents/comment.vue";
import message from "@/views/compontents/message.vue";
import { acticleDetail } from "@/api/article";
export default {
  components: {
    auther,
    enjoy,
    comment,
    message
  },
  data() {
    return {
      //文字id
      article_id: "",
      acticleObj: {},
      // 评论的数据源
      commentList: []
    };
  },
  async created() {
    this.article_id = this.$route.params.id;
    let res = await acticleDetail({
      article_id: this.article_id
    });

    this.acticleObj = res.data;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //获取子组件传递过来评论的数据
    getcomments(value) {
      this.commentList.unshift({
      ...value.new_obj
      })
      
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  margin-top: 46px;
}
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
</style>
