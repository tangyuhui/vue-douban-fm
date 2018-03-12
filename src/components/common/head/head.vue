<template>
  <header>
        <div class="container top-head margin clear" >
           <div class="fl">
             <img src="./images/logo.svg" alt=""  width="100px" height="40px" class="logo">
           </div>
          <div class="feedback" ref="feedback">
            <a href="">下载豆瓣FM APP</a>
            <a href="">我要反馈</a>
          </div>
          <div class="user-block fr">
            <div class="fr"><a href="">登录</a></div>
            <div class="fr"><a href="">注册</a></div>
          </div>
        </div>
    <play   v-bind:feed-dom="feedDom" ></play>
  </header>
</template>

<script>
import play from '@/components/play/play'
export default {
  data () {
    return {
      feedDom: null
    }
  },
  mounted    () {
    this.feedDom = this.$refs.feedback
  },
  components: {
    play
  },
  computed: {
  },

  methods: {
    // 点击图标刷新页面
    reload () {
      window.location.reload()
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
   @import  '~@/style/app' ;

   header{
     height:100px;
     position:relative;
     background:  rgba(250, 250, 250, 0.93);
     .top-head{
       height:100%;
       z-index:10;
     }
     .logo{
       margin-top:30px;
     }
   }
   .feedback{
     position:absolute;
     top:30px;
     left:140px;
   }
   .feedback a{
     font-size:12px;
     color:#8f8e94;
   }
    .user-block{
      margin-top:43px;
        a {
        font-size: 12px;
        margin-left: 10px;
        display: inline-block;
        height: 24px;
        line-height: 24px
      }
    }
</style>
