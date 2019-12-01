<template>
  <div class="home">
    <!-- 头部 -->
    <van-nav-bar class="header" title="首页" />
    <!-- tab标签滚动栏 -->
    <van-tabs class="tabs" v-model="activeName">
      <div slot="nav-right" class="myIcon" @click="popUp">
        <van-icon name="wap-nav" />
      </div>
      <van-tab
        v-for="(item, index) in channelList"
        :title="item.name"
        :key="index"
      >
        <!-- 上拉刷新组件 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- 主体内容 list列表 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="(subItem, index) in item.article"
              :key="index"
              :title="subItem.title"
            >
              <template slot="label">
                <van-grid
                  :border="false"
                  :column-num="3"
                  v-if="subItem.cover.type > 0"
                >
                  <van-grid-item
                    v-for="(itemImg, imgIndex) in subItem.cover.images"
                    :key="imgIndex"
                  >
                    <van-image lazy-load :src="itemImg" />
                  </van-grid-item>
                </van-grid>
                <div class="comments">
                  <div class="left">
                    <span>{{ subItem.aut_name }}</span>
                    <span>{{ subItem.comm_count }}</span>
                    <span>{{ subItem.pubdate | formatTime }}</span>
                  </div>
                  <div class="right">
                    <van-icon
                      name="close"
                      @click="showDialog(subItem.art_id)"
                    />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <!--弹出框 -->
    <channel
      v-model="show"
      :channelArr="channelList"
      :currentActive.sync="activeName"
    ></channel>
    <!-- 弹窗 更多操作 -->
    <more-dialog
      v-model="moreshow"
      :activeArtid="artid"
      @deleItem="deleItem"
    ></more-dialog>
  </div>
</template>
<script>
import { getChannel, getNews } from "@/api/channel.js";
import channel from "@/components/channel";
import moreDialog from "@/components/moreDialog";
export default {
  data() {
    return {
      activeName: 0, //当前tabs的索引
      show: false, //弹出框状态,
      channelList: [], //频道标签数据
      moreshow: false,
      artid: "" //点击点击文章的id
    };
  },
  components: {
    channel,
    moreDialog
  },
  async mounted() {
    //获取用户的登录信息
    let token = this.$store.state.token.token;
    // console.log(token);
    if (token) {
      let res = await getChannel();
      this.channelList = res.data.channels;
    } else {
      //没有登录去本地localStorage取本地数据
      let channelCache = JSON.parse(window.localStorage.getItem("channel"));
      if (channelCache) {
        this.channelList = channelCache;
      } else {
        let res = await getChannel();
        this.channelList = res.data.channels;
      }
    }
    //调用动态加载属性的方法
    this.addPropChannelList();
  },
  methods: {
    //将所有的属性统一保存到频道tabs的数据中
    addPropChannelList() {
      this.channelList.forEach(item => {
        //vue中动态添加的属性不是响应式的
        this.$set(item, "article", []); //文章的属性
        this.$set(item, "isLoading", false); //上拉加载
        this.$set(item, "loading", false); //下拉加载
        this.$set(item, "finished", false); //加载完成
        this.$set(item, "pre_timestamp", 0); //添加服务器响应回来的时间戳属性
      });
    },
    //上拉刷新
    onRefresh() {
      //通过tabs的当前activeName
      let activeChannel = this.channelList[this.activeName];

      //重置属性
      this.$set(activeChannel, "article", []); //文章的属性
      this.$set(activeChannel, "isLoading", false); //上拉加载
      this.$set(activeChannel, "loading", false); //下拉加载
      this.$set(activeChannel, "finished", false); //加载完成
      this.$set(activeChannel, "pre_timestamp", 0); //添加服务器响应回来
      this.onLoad(); //重新加载数据
    },
    // onLoad页面一加载获取list组件加载获取数据
    async onLoad() {
      //通过tabs的当前activeName获取当前频道对象
      let activeChannel = this.channelList[this.activeName];
      // 判断时间戳是否为 null ，如果为 null 说明已经加载完成,并且没有为空数据
      if (activeChannel.pre_timestamp === null) {
        // 将状态设置为结束
        activeChannel.finished = true;
        // 已经加载完成
        activeChannel.loading = false;
        return;
      }
      //判断是否是第一次进入方法
      if (activeChannel.pre_timestamp === 0) {
        //第一次查询
        let res = await getNews({
          channel_id: activeChannel.id,
          timestamp: Date.now(),
          with_top: 1
        });
        activeChannel.article = res.data.results;
        activeChannel.pre_timestamp = res.data.pre_timestamp;
        // //将加载的状态loading改为false
        activeChannel.loading = false;
      } else {
        let res = await getNews({
          channel_id: activeChannel.id,
          timestamp: activeChannel.pre_timestamp, //取上一次的时间戳
          with_top: 1
        });

        activeChannel.article = [...activeChannel.article, ...res.data.results];
        activeChannel.pre_timestamp = res.data.pre_timestamp;
      }
      activeChannel.loading = false;
    },
    //弹出框
    popUp() {
      this.show = true;
    },
    input() {
      this.show = false;
    },
    //点击叉叉弹出对话框
    showDialog(artid) {
      this.artid = artid;
      this.moreshow = true;
    },
    // 用来删除用户不喜欢的信息，监听子组件事件
    deleItem(activeArtid) {
      let articleList = this.channelList[this.activeName].article;
      articleList.forEach((item, index) => {
        if (item.art_id == activeArtid) {
          articleList.splice(index, 1);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  margin-top: 90px;
  margin-bottom: 50px;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #3296fa;

  .van-nav-bar__title {
    color: #fff;
  }
}
.home /deep/.van-tabs__wrap {
  width: 93%;
  position: fixed;
  top: 46px;
  left: 0px;
  z-index: 999; //注意层级
}
.myIcon {
  position: fixed;
  top: 60px;
  right: 6px;
}
.comments {
  display: flex;
  justify-content: space-between;
  .left {
    span {
      padding-right: 10px;
    }
  }
}
</style>
