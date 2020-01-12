<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      class="searchBox"
      v-model="keyWords"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 联想框 -->
    <van-cell-group v-show="list.length !== 0">
      <van-cell
        icon="search"
        v-for="(item, index) in list"
        :key="index"
        @click="onSearch(item.item)"
      >
        <template slot="title">
          <div v-html="item.colorItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-show="list.length === 0">
      <van-cell title="搜索历史">
        <template slot="right-icon">
          <div>
            <span style="padding-right:10px" v-show="!isShow" @click="delAll"
              >全部删除</span
            >
            <span v-show="!isShow" @click="finished">完成</span>
          </div>
          <van-icon name="delete" v-show="isShow" @click="handDele" />
        </template>
      </van-cell>

      <van-cell
       @click="onSearch(item)"
        icon="search"
        :value="item"
        v-for="(item, index) in historyList"
        :key="index"
      >
        <template slot="right-icon">
          <van-icon name="close" v-show="!isShow" @click="delOne(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { suggestion } from "@/api/search.js";
export default {
  data() {
    return {
      keyWords: "",
      //联想框的数据列表
      list: [],
      tiemId: null,
      isShow: true,
      //历史记录记录数据
      historyList: JSON.parse(window.localStorage.getItem("history")) || []
    };
  },
  watch: {
    keyWords: function(val, oldVal) {
      this.keyWords = val;

      if (this.tiemId) {
        //用js的防抖来实现性能优化(这里要用一次性定时器)
        clearTimeout(this.tiemId);
      }
      this.tiemId = setTimeout(() => {
        //判断搜索的关键字是否为空,为空则不向服务器发送请求(也会报错)
        if (!val.trim().length) {
          this.list = [];
          return;
        }
        this.getList();
      }, 500);
    }
  },
  methods: {
    onSearch(value) {
      this.historyList.unshift(value);
      this.historyList=[...new Set(this.historyList)];
      window.localStorage.setItem("history", JSON.stringify(this.historyList));
      this.$router.push({ path: `/list/${value}` });
    },
    onCancel() {},
    async getList() {
      let res = await suggestion({
        keyWords: this.keyWords
      });
      this.list = res.data.options;
      this.list = this.list.map(item => {
        return {
          colorItem: item
            .split(this.keyWords)
            .join(`<span style="color:red">${this.keyWords}</span>`),
          item: item
        };
      });
    },
    finished() {
      this.isShow = true;
    },
    handDele() {
      this.isShow = false;
    },
    delOne(index) {
      this.historyList.splice(index, 1);
      window.localStorage.setItem("history", JSON.stringify(this.historyList));
    },
    delAll() {
      this.historyList = [];
      window.localStorage.removeItem("history");
    }
  }
};
</script>
<style lang="scss" scoped>
.searchBox {
  background-color: #1989fa !important;
}
.van-search__action{
  color: #fff;
}
</style>
