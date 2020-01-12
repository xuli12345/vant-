<template>
  <div>
    <van-cell>
      <div class="content">
        <div class="img-box">
          <img :src="acticleObj.aut_photo" alt="" />
        </div>
        <div class="center">
          <van-cell
            :title="acticleObj.aut_name"
            :label="acticleObj.pubdate | formatTimes"
          />
        </div>
        <div class="follow">
          <van-button
            @click="followed"
            type="danger"
            size="small"
            v-if="!acticleObj.is_followed"
            >关注</van-button
          >
          <van-button type="default" v-else size="small" @click="cancleFollw"
            >取消关注</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>
<script>
import { follow, cancleFollw } from "@/api/article";
import { async } from "q";
export default {
  props: ["acticleObj"],
  data() {
    return {};
  },
  methods: {
    async followed() {
      try {
        let res = await follow({
          aut_id: this.acticleObj.aut_id
        });
        this.acticleObj.is_followed = true;
        this.$toast.success("关注成功");
      } catch (error) {
        this.$toast.fail(error.message);
      }
    },
    async cancleFollw() {
      try {
        let res = await cancleFollw({
          aut_id: this.acticleObj.aut_id
        });
        this.acticleObj.is_followed = false;
        this.$toast.success("取关成功");
      } catch (error) {
        this.$toast.fail(error.message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
  }
}
</style>
