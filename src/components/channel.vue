<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '90%' }"
  >
    <div class="channe-box">
      <div class="channel">
        <div class="myChannel">
          <h3>我的频道</h3>
          <span>点击进入频道</span>
        </div>
        <div class="edit" v-if="!isshow" @click="edit">编辑</div>
        <div class="edit" v-else @click="finishd">完成</div>
      </div>
    </div>
    <!-- 九宫格 -->
    <van-grid>
      <van-grid :gutter="10">
        <van-grid-item v-for="(item, index) in channelArr" :key="index">
          <div slot="text" class="text">
            <div
              @click="toggleChannel(index)"
              :class="{ active: currentActive == index }"
            >
              {{ item.name }}
            </div>
            <van-icon
              @click="deleteOne(item, index)"
              v-show="isshow"
              class="close"
              name="clear"
            />
          </div>
        </van-grid-item>
      </van-grid>
    </van-grid>
    <div class="channe-box recommend">
      <div class="channel">
        <div class="myChannel">
          <h3>频道推荐</h3>
          <span>点击进入频道</span>
        </div>
      </div>
    </div>
    <!-- 频道推荐 -->
    <van-grid>
      <van-grid :gutter="10">
        <van-grid-item
          @click="addChannel(item)"
          v-for="(item, index) in otherChannel"
          :key="index"
        >
          <div slot="text" class="text">
            <div>{{ item.name }}</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-grid>
  </van-popup>
</template>
<script>
import { allChannel } from "@/api/channel.js";
import { saveChannel } from "@/api/channel";
export default {
  props: ["value", "channelArr", "currentActive"],
  data() {
    return {
      isshow: false, //叉叉是否显示
      //   cloneActive:"", 单向数据流概验
      allChannelList: [] //所有频道数据
    };
  },

  async created() {
    let res = await allChannel();
    this.allChannelList = res.data.channels;
  },
  computed: {
    otherChannel() {
      //过滤出推荐频道的数据
      let ids = this.channelArr.map(item => {
        return item.id;
      });
      let otherChannel = this.allChannelList.filter(item => {
        return !ids.includes(item.id);
      });
      return otherChannel;
    }
  },
  methods: {
    edit() {
      this.isshow = true;
    },
    finishd() {
      this.isshow = false;
    },
    toggleChannel(index) {
      // 将参数重新交给 home
      this.$emit("update:currentActive", index);
    },
    async deleteOne(item, index) {
      this.channelArr.splice(index, 1);
      let user = this.$store.state.token; //获取用户token判断是否登录
      if (user && user.token) {
        //由于推荐是固定的，在生成 channle 数据时，需要将推荐的信息去掉
        let channels = this.channelArr.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          };
        });
        //登录发请求保存到服务器(参数是对象)
     let res =await saveChannel({
          channels: channels
        });
      } else {
        //未登录保存本地
        window.localStorage.setItem("channel", JSON.stringify(this.channelArr));
      }
    },
    async addChannel(item) {
      //动态添加属性由于服务器返回只有两个字段后面加入的频道数据没有自定义属性解决页面bug
      this.$set(item, "article", []); //文章的属性
      this.$set(item, "isLoading", false); //上拉加载
      this.$set(item, "loading", false); //下拉加载
      this.$set(item, "finished", false); //加载完成
      this.$set(item, "pre_timestamp", 0); //添加服务器响应回来的时间戳属性
      let user = this.$store.state.token;
      this.channelArr.push(item);
      if (user && user.token) {
        //登录发请求保存到服务器(参数是对象)
        // let channels = this.channelArr.slice(1).map((item, index) => {
        //   return {
        //     id: item.id,
        //     seq: index + 2
        //   };
        // });
        // let res = await saveChannel({
        //   channels: channels
        // });
      } else {
        window.localStorage.setItem("channel", JSON.stringify(this.channelArr));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.recommend {
  margin-top: 20px;
}
.channe-box {
  padding: 10px;
}
.channel {
  display: flex;
  justify-content: space-between;
  .myChannel {
    display: flex;
    align-items: center;

    h3 {
      font-size: 16px;
      color: #333;
    }
    span {
      font-size: 14px;
      color: #aaaaaa;
      padding-left: 5px;
    }
  }
  .edit {
    font-size: 12px;
    color: #c80000;
    padding: 0px 10px;
    border: 1px solid #c80000;
    border-radius: 12px;
  }
}
.text {
  font-size: 12px;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
  color: #ddd;
}
/deep/ .van-grid {
  width: 100%;
}
/deep/.van-grid-item__content {
  padding: 10px 8px;
}
.active {
  color: #c80000;
}
</style>
