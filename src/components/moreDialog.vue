<template>
  <div class="dialog">
    <van-dialog
      :value="value"
      closeOnClickOverlay
      :show-cancel-button="false"
      :showConfirmButton="false"
      @input="$emit('input', false)"
    >
      <van-cell-group v-show="!isItem">
        <van-cell title="隐藏此信息" icon="location-o" @click="hiddenMsg" />
        <van-cell title="举报" icon="location-o" is-link @click="hiddenItem" />
        <van-cell title="单拉黑" icon="location-o" @click="blacklists" />
      </van-cell-group>
      <van-cell-group v-show="isItem" @click="showItem">
        <van-cell icon="arrow-left" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in itemList"
          :key="index"
          icon="location-o"
          @click="reports(index)"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script>
import { hiddenArticel, reports,blacklists } from "@/api/channel.js";
export default {
  props: ["value", "activeArtid"],
  data() {
    return {
      isItem: false,
      itemList: [
        { value: 0, name: "其他问题" },
        { value: 1, name: "标题夸张" },
        { value: 2, name: "低俗色情" },
        { value: 3, name: "错别字多" },
        { value: 4, name: "旧闻重复" },
        { value: 5, name: "广告软文" },
        { value: 6, name: "内容不实" },
        { value: 7, name: "涉嫌违法犯罪" },
        { value: 8, name: "侵权" }
      ]
    };
  },
  methods: {
    hiddenItem() {
      this.isItem = true;
    },
    showItem() {
      this.isItem = false;
    },
    async hiddenMsg() {
      try {
        //将要删除的文章id传回给父组件
        this.$emit("deleItem", this.activeArtid);
        let res = await hiddenArticel({
          artid: this.activeArtid
        });
        this.$toast.success("隐藏文章成功");
      } catch (error) {
        this.$toast.fail("隐藏文章失败");
      } finally {
        //隐藏面板
        this.$emit("input", false);
      }
    },
    //举报
    async reports(index) {
      try {
        let res = await reports({
          artid: this.activeArtid,
          type: index,
          remark: "就是想举报此文章"
        });
        this.$toast.success("举报文章成功");
      } catch (error) {
        this.$toast.fail("举报文章失败");
      } finally {
        //隐藏面板
        this.$emit("input", false);
      }
    },
    //拉黑
    async blacklists() {
      try {
        let res = await blacklists({
          artid: this.activeArtid
        });
        this.$toast.success("拉黑文章成功");
      } catch (error) {
        this.$toast.success("拉黑文章失败");
      } finally {
        //隐藏面板
        this.$emit("input", false);
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
