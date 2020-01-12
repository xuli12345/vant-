<template>
  <div class="bottom">
    <van-cell>
      <div class="mess">
        <div class="ipt">
          <!-- <van-icon name="edit" /> -->
          <van-field v-model="value" left-icon="edit" placeholder="写评论" />
        </div>
        <van-button type="danger" @click="sendMsg">发送</van-button>
        <div class="star"><van-icon name="star-o" /></div>
      </div>
    </van-cell>
  </div>
</template>
<script>
import { addComments } from "@/api/article.js";
export default {
  props: ["articleId"],
  data() {
    return {
      value: ""
    };
  },
  methods: {
    async sendMsg() {
      
      //判断用户是否有登录
      this.$login();
      try {
        let res = await addComments({
          article_id: this.articleId,
          content: this.value
        });
        this.value = "";
        //将请求成功后的数据传给父组件
        this.$emit("sendcomment",res.data)
      } catch (error) {
        this.$toast.fail(error.message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.mess {
  display: flex;
  align-items: center;
  .ipt {
    flex: 1;
    .van-cell {
      background-color: #ddd;
      border-radius: 20px;
    }
  }
  .star {
    .van-icon {
      font-size: 20px;
    }
  }
  .van-button {
    margin: 0 20px;
  }
}
</style>
