<template>
  <div class="login">
    <van-nav-bar class="nav-bar" title="登录" />
    <van-cell-group>
      <van-field
        v-model="mobile"
        required
        clearable
        label="手机号"
        right-icon="question-o"
        placeholder="请输入手机号"
        v-validate="'required'"
        name="mobile"
        :error-message="errors.first('mobile')"
      />

      <van-row>
        <van-col span="16">
          <van-field
            v-model="code"
            type="text"
            label="验证码"
            placeholder="请输入验证码"
            required
            v-validate="'required'"
            name="code"
            :error-message="errors.first('code')"
        /></van-col>
        <van-col span="8" class="code-box"
          ><van-button @click="getCode" round>获取验证码</van-button>
        </van-col>
      </van-row>
    </van-cell-group>
    <div class="login-box">
      <van-button type="info" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>
<script>
//导入请求的api
import { userLogin, getCode } from "@/api/user";
//导入本地保存token的方法
// import { setAuthor } from "@/utils/author";
export default {
  data() {
    return {
      mobile: "18888888888",
      code: "246810" //验证码必须是246810
    };
  },
  methods: {
    async getCode() {
      try {
        let res = await getCode({
          mobile: this.mobile
        });
        if (res.message == "OK") {
          console.log("获取验证码成功");
        }
      } catch (err) {
        console.log(err);
      }
    },
    login() {
      this.$validator.validate().then(async valid => {
        if (valid) {    //验证通过
          //使用async await使用的同步的请求如果发生异常会影响后面的代码运行所以这里使用try catch进行异常处理
          try {
            let res = await userLogin({
              mobile: this.mobile,
              code: this.code
            });

            if (res.message == "OK") {
              //将获取的token保存到本地
              //setAuthor(res.data);
              //将获取的token用vuex的方法管理起来
              this.$store.commit("setToken",res.data);
              //登录成功跳转的首页 路径不能写死 从哪里来回哪去
              // this.$router.push("/home")
              this.$router.back();
            }
          } catch (err) {
            //使用vant toast 提示框提示
           this.$toast.fail('登录失败');
          }
        }
      });
    },
    loginRules() {
      //自定义验证规则
      const dict = {
        custom: {
          mobile: {
            required: "请输入手机正确的手机号码?"
          },
          code: {
            required: "验证码是是必填的"
          }
        }
      };
      this.$validator.localize("en", dict);
    }
  },
  mounted() {
    this.loginRules();
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #f5f7f9;
  .nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .code-box {
    .van-button--default {
      background-color: #dddddd;
      margin: 10px 10px;
      color: #6666;
    }
    .van-button {
      height: 30px;
      line-height: 30px;
    }
  }
  .login-box {
    margin: 50px 30px 0 30px;
    .van-button {
      border-radius: 10px;
    }
  }
}
</style>
