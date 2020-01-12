<template>
  <div>
    <van-cell>
      <div class="start">
        <van-button type="danger" class="like" @click="star" v-if="isShow">
          <van-icon name="star" />
          点赞</van-button
        >
        <van-button type="default" class="like" @click="cancleStar" v-else>
          <van-icon name="star-o" />
          取消点赞</van-button
        >
        <van-button type="default" @click="dislikes" v-if="isDislikes">
          <van-icon name="like-o" />
          不喜欢</van-button
        >
        <van-button type="danger" v-else @click="cancleDislikes">
          <van-icon name="like" />
          取消不喜欢</van-button
        >
      </div>
    </van-cell>
  </div>
</template>
<script>
import { star, cancleStar, dislikes, cancleDislikes } from "@/api/article";
export default {
  props: ["obj"],
  data() {
    return {
      isShow: true,
      isDislikes: true
    };
  },
  methods: {
    async star() {
      try {
        let res = await star({
          article_id: this.obj.art_id
        });
        this.isShow = false;
      } catch (error) {
        this.$toast.fail(error.message);
      }
    },
    async cancleStar() {
      try {
        let res = await cancleStar({
          article_id: this.obj.art_id
        });
        this.isShow = true;
      } catch (error) {
        this.$toast.fail(error.message);
      }
    },
    async dislikes() {
      try {
        let res = await dislikes({
          article_id: this.obj.art_id
        });

        this.isDislikes = false;
      } catch (error) {
        this.$toast.fail(error.message);
      }
    },
    async cancleDislikes() {
      try {
        let res = await cancleStar({
          article_id: this.obj.art_id
        });

        this.isDislikes = true;
      } catch (error) {
        this.$toast.fail(error.message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.van-button--normal {
  border-radius: 4px;
}
.start {
  display: flex;
  align-items: center;
  justify-content: center;
  .like {
    margin-right: 40px;
  }
}
</style>
