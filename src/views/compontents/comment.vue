<template>
  <div class="com">
    <van-cell>
      <div class="content" v-for="(item,index) in commentList" :key="index">
        <div class="img-box">
          <img :src="item.aut_photo" alt="" />
        </div>
        <div class="center">
          <van-cell :title="item.aut_name" />
          <div class="comments">
            <div>{{item.content}}</div>
            <div></div>
          </div>
        </div>
        <div class="follow"><van-icon name="good-job-o" />{{item.like_count}}</div>
      </div>
    </van-cell>
  </div>
</template>
<script>
export default {
  props:["commentList"],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.com{
    margin-bottom: 64px;
}
.content {
  align-items: center;
  display: flex;
  .img-box {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    .van-cell:not(:last-child)::after {
      border-bottom: transparent;
    }
    .comments {
      padding-left: 16px;
    }
  }
}
</style>
