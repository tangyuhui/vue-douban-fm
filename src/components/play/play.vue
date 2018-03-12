<template>
  <section class="play-wrapper" :style="{paddingTop: containerTop,height:playContainerHeight,zIndex:contorlMini?999:0}" style="z-index:0" ref="playWrapper">
    <div class="container row left">
      <div class="app-download-icons ">
        <img  src="https://img3.doubanio.com/f/fm/1e89298732fbf090aea0812f7fb2af30ad82ab61/pics/fm/landingpage/qr_2@2x.png"
          alt="" width="90px" height="90px">
        <div class="eYjegs">
          下载豆瓣音乐
        </div>
        <div class="eYjegs">
          让好音乐继续
        </div>
      </div>
      <div class="play-area">
        <div class="category-title" ref="categoryTitle">豆瓣精选</div>
        <div class="play-control" ref="playControl">
          <p class="music-name" ref="musicName"><span>{{curMusic && curMusic.title}}</span>
             <span class="f-14" v-if="showMini">-</span>
            <span class="f-14" v-if="showMini">{{curMusic && curMusic.artist}}</span>
          </p>
          <p class="music-author"  ref="musicAuthor" :style="{opacity:!showMini?1:0}">{{curMusic && curMusic.artist}}</p>
          <div class="play-toolbar" >
            <div class="ribbon-area clearfix">
              <div class="pull-left left" ref="ribbonLeft">
                <div class="duration-icon">{{remainTime?remainTime:"-00:00"}}</div>
                <div class="volumn-icon">
                </div>
              </div>
              <div class="pull-right expand-icon-group left" v-show="!showMini">
                <div class="download-icon"></div>
                <div class="share-icon ml-10"></div>
              </div>
            </div>
            <div class="progress-area" ref="progress">
              <div class="curPro" :style="getCurPro">

              </div>
            </div>
            <div class="contorl-area" :class="[contorlMini? 'left': 'row']" ref="contorlArea">
              <div class="left">
                <div class="like-icon">
                  <svg viewBox="0,0,30,30" :height="[showMini?16:26]" :width="[showMini?16:26]" class="icon icon-heart" style="vertical-align: middle;">
                    <desc></desc>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path
                        d="M22,0 C18.9359565,0 16.5821582,1.72596986 15,3.5 C13.4530656,1.72596986 11.0993172,0 8,0 C3.7559698,0 0,3.9236383 0,9 C0,12.0105248 0.844640658,15.0729547 2.5,18 C6.88109125,25.6681877 15.0243286,28.9632358 15,29 C15.0243286,28.9631844 22.9314319,25.7540044 27.5,18 C29.1765036,15.1251042 30.0352238,12.2324468 30,9 C30.0352238,3.9236383 26.2791541,0 22,0 Z"
                        id="b" fill="#2c2c2c"></path>
                    </g>
                  </svg>
                </div>
                <div class="delete-icon" :style="{marginLeft:deleteIconLeft+'px'}">
                  <svg title="Title" viewBox="0,0,30,30" :height="[showMini?16:26]" :width="[showMini?16:26]" class="icon"
                       style="vertical-align: middle;">
                    <desc>Icon</desc>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path
                        d="M19.0000002,2.99518936 L25.5501576,2.99518936 C27.2676993,2.99518936 27.9974555,4.25794694 27.9974555,5.16641446 L27.9974556,7.00000017 L2,7.00000017 L2,5.07556186 C2,4.18983672 2.59870784,2.99518936 4.31630844,2.99518936 L11,2.99518936 L11,1.5 C11,0.5 11.5,0 12.5,0 L17.5,0 C18.5,0 18.9999997,0.5 19,1.5 L19.0000002,2.99518936 Z M4.23383579,27.9351249 C4.2446828,28.8186284 4.84627924,29.9939828 6.54778618,30 L23.4857474,30 C25.1313687,29.9939828 25.8684938,28.8317828 25.9256175,27.9351249 L27.4668952,8 L2.53056032,8 L4.23383579,27.9351249 Z M11,25 C10,25 10,24.5 10,24 L10,13 C10,12.5 10,12 11,12 C12,12 12,12.5 12,13 L12,24 C12,24.5 12,25 11,25 Z M19,25 C18,25 18,24.5 18,24 L18,13 C18,12.5 18,12 19,12 C20,12 20,12.5 20,13 L20,24 C20,24.5 20,25 19,25 Z"
                        fill="#4A4A4A"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="left" :style="{marginLeft:showMini?'20px':0}">
                <div class="play-icon" @click="playClickEvent">
                  <svg title="Title" viewBox="61 0 22 22" :height="[showMini?16:22]" :width="[showMini?16:22]" class="icon icon-pause"
                       style="vertical-align: middle;" v-if="isPlaying">
                    <desc>Icon</desc>
                    <path
                      d="M61,1.00246167 C61,0.448817378 61.4509752,0 61.990778,0 L66.009222,0 C66.5564136,0 67,0.43945834 67,1.00246167 L67,20.9975383 C67,21.5511826 66.5490248,22 66.009222,22 L61.990778,22 C61.4435864,22 61,21.5605417 61,20.9975383 L61,1.00246167 Z M77,1.00246167 C77,0.448817378 77.4509752,0 77.990778,0 L82.009222,0 C82.5564136,0 83,0.43945834 83,1.00246167 L83,20.9975383 C83,21.5511826 82.5490248,22 82.009222,22 L77.990778,22 C77.4435864,22 77,21.5605417 77,20.9975383 L77,1.00246167 Z"
                      stroke="none" fill="#4a4a4a" fill-rule="evenodd"></path>
                  </svg>
                  <svg title="Title" viewBox="15 8 10 13" height="22" width="22" class="icon"
                       style="vertical-align: middle;" v-else :height="[showMini?16:22]" :width="[showMini?16:22]">
                    <desc>Icon</desc>
                    <path
                      d="M16.2404248,8.16131117 L24.4883398,13.8012748 C25.1705534,14.1855546 25.1705534,14.8143854 24.4883398,15.1986903 L16.2404248,20.8387042 C15.5581861,21.222984 15,20.8967404 15,20.1136905 L15,8.88632486 C15,8.1032498 15.5581861,7.7770062 16.2404248,8.16131117 Z"
                      stroke="none" fill="#4a4a4a" fill-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="next-icon" :style="{marginLeft:nextIconLeft+'px'}"  @click="nextClickEvent">
                  <svg title="Title" viewBox="0,0,30,30" :height="[showMini?16:22]" :width="[showMini?16:22]" class="icon"
                       style="vertical-align: middle;">
                    <desc>Icon</desc>
                    <g id="Page-1" fill="none" fill-rule="evenodd">
                      <g id="Fill-1-Copy-8-+-Path-Copy-6-+-Oval-3-Copy-2" fill="#4A4A4A">
                        <path
                          d="M4.722 1.347l18.973 12.148c1.497.828 1.497 2.182 0 3.01L4.722 28.653C3.225 29.48 2 28.778 2 27.09V2.91C2 1.22 3.225.52 4.722 1.346zM25 28.5c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z"
                          id="Fill-1-Copy-8"></path>
                        <path id="Path-Copy-6" d="M23 4h4v22.5h-4z"></path>
                        <path d="M25 6c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" id="Oval-3-Copy-2"></path>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vertical-align">
        <img :src="(curMusic&&curMusic.picture)?curMusic.picture:''" alt="" width="240px" height="240px">
      </div>
      <div class="login-tips" v-show="!showMini">
        <a class="link">登录</a>/<a href="" class="link">注册</a> <span class="ml-5 f-13">后豆瓣FM将永久保留你的收听历史与喜好</span>
      </div>
    </div>
  </section>
</template>

<script>
import 'velocity-animate'
import 'velocity-animate/velocity.ui.js'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
import {addEvent} from '@/utils/domutils'

export default {
  data () {
    return {
      containerTop: 0,
      wheelDelta: 0,
      scrollRecord: 0,
      containerIndex: 0,
      isScrolling: false,
      playContainerHeight: 0,
      f14: false,
      showMini: false,
      deleteIconLeft: 30,
      nextIconLeft: 60,
      contorlMini: false
    }
  },
  props: ['feedDom'],
  mounted () {
    let bodyHeight = document.body.clientHeight
    this.containerTop = this.calContianerPaddingValue()
    this.playContainerHeight = bodyHeight * 0.7 + 'px'
    // 监听window滚动事件
    addEvent(window, 'mousewheel', this.scrollEvent.bind(this))
  },
  components: {},

  computed: {
    ...mapState(['isPlaying', 'curMusic', 'curTime', 'duration', 'audioDom']),
    ...mapGetters(['getArtist']),
    getCurPro () {
      var width = '0%'
      if (this.duration) {
        width = (this.curTime / this.duration) * 100 + '%'
      }
      return {
        width: width
      }
    },
    remainTime () {
      if (this.duration != null && this.curTime != null) {
        return this.transformTime(this.duration - this.curTime)
      } else {
        return '-00:00'
      }
    }
  },

  methods: {
    ...mapActions(['getMusic']),
    ...mapMutations(['PLAY_MUSIC', 'SET_MUSIC_CURTIME', 'SET_MUSIC_DURATION']),
    // 点击图标刷新页面
    playClickEvent: function (event) {
      if (this.audioDom.paused) {
        this.audioDom.play()
        this.PLAY_MUSIC(true)
      } else {
        this.audioDom.pause()
        this.PLAY_MUSIC(false)
      }
    },
    nextClickEvent: function () {
      /* 播放下一首歌 */
      this.toggleState()
      this.getMusic()
    },
    toggleState: function () {
      if (this.isPlaying) {
        this.audioDom.pause()
        this.PLAY_MUSIC(false)
      } else {
        this.audioDom.play()
        this.PLAY_MUSIC(true)
      }
    },
    dragProgress (event) {
      var proBlock = this.$refs.musicProgress && this.$refs.musicProgress.getBoundingClientRect()
      var start = proBlock.left
      var end = event.clientX
      var width = proBlock.width
      var length = parseFloat(end) - parseFloat(start)
      var percent = parseFloat(length / width)
      this.audioDom.currentTime = this.audioDom.duration * percent
      this.SET_MUSIC_CURTIME(this.audioDom.currentTime)
    },
    transformTime (seconds) {
      let m, s
      m = Math.floor(seconds / 60)
      m = m.toString().length === 1 ? ('0' + m) : m
      s = Math.floor(seconds - 60 * m)
      s = s.toString().length === 1 ? ('0' + s) : s
      return '-' + m + ':' + s
    },
    adjustVolume (event) {
      //      console.log('adjustVolume')
      //      var volumeControl = this.$refs.volumeControl && this.$refs.volumeControl.getBoundingClientRect()
      //      var start = volumeControl.left
      //      var end = event.clientX
      //      var width = volumeControl.width
      //      var length = parseFloat(end) - parseFloat(start)
      //      var percent = parseFloat(length / width)
      //      this.audioDom.volume = percent
      //      this.volumnWidth = (percent * 100) + '%'
    },
    // 点击图标刷新页面
    reload () {
      window.location.reload()
    },
    calContianerPaddingValue () {
      let clientHeight = document.body.clientHeight
      return clientHeight * 0.1 + 'px'
    },
    scrollEvent (e) {
      var self = this
      e = e || window.event
      this.wheelDelta = e.wheelDelta
      if (!this.isScrolling) {
        this.isScrolling = true
        if (this.wheelDelta > 0) {
          this.restoreScroll()
        } else {
          // 向下滚动
          this.scrollToTop()
        }
      }
    },
    restoreScroll () {
      if (!this.showMini) {
        this.isScrolling = false
        return false
      }
      var self = this
      var mySequence = [
        { e: $(this.$refs.playWrapper),
          p: {top: 100},
          o: { duration: 400,
            easing: 'linear',
            begin: function () {
              self.contorlMini = false
            },
            complete: function () {
              self.isScrolling = false
              self.f14 = false
            }} },
        { e: $(this.$refs.playControl),
          p: {translateY: 0},
          o: { duration: 0,
            sequenceQueue: false
          } },
        {e: $(this.$refs.musicName), p: {fontSize: 25}, o: { duration: 0, sequenceQueue: false }},
        {e: $(this.$refs.categoryTitle), p: {fontSize: 15}, o: { duration: 0, sequenceQueue: false }},
        { e: $(this.$refs.musicName),
          p: { translateX: 0, translateY: 0},
          o: { duration: 0,
            sequenceQueue: false,
            begin: function () {
              self.showMini = false
              self.deleteIconLeft = 20
              self.nextIconLeft = 40
            }}},
        {e: $(this.$refs.contorlArea), p: { translateX: 0, translateY: 0 }, o: { duration: 0, sequenceQueue: false}},
        { e: $(this.$refs.progress), p: { translateX: 0, translateY: 0, width: '80%'}, o: { duration: 0, sequenceQueue: false}},
        { e: $(this.$refs.categoryTitle), p: { translateX: 0, translateY: 0}, o: { duration: 0, sequenceQueue: false}},
        { e: $(this.$refs.ribbonLeft), p: { translateX: 0, translateY: 0}, o: { duration: 0, sequenceQueue: false}},
        {e: $(this.feedDom), p: {translateY: 0}, o: { duration: 200, easing: 'linear' }}
      ]
      $.Velocity.RunSequence(mySequence)
    },
    scrollToTop () {
      if (this.showMini) {
        this.isScrolling = false
        return false
      }
      var self = this
      let top = parseInt(this.containerTop) - 100
      let playContainerHeight = parseInt(this.playContainerHeight)
      var mySequence = [
        { e: $(this.$refs.playWrapper),
          p: { top: -180 },
          o: { duration: 300} },
        {e: $(this.feedDom), p: {translateY: -50}, o: { duration: 200, easing: 'linear', sequenceQueue: false }},
        /* The call below will run at the same time as the first call. */
        { e: $(this.$refs.playWrapper),
          p: {top: -playContainerHeight},
          o: { duration: 50,
            easing: 'linear',
            delay: 200,
            begin: function () {
              self.contorlMini = true
            },
            complete: function () {
              self.isScrolling = false
              self.f14 = true
            }} },
        { e: $(this.$refs.playControl),
          p: {translateY: playContainerHeight},
          o: { duration: 50,
            sequenceQueue: false
          } },
        {e: $(this.$refs.musicName), p: {fontSize: 14}, o: { duration: 0, sequenceQueue: false }},
        {e: $(this.$refs.categoryTitle), p: {fontSize: 13}, o: { duration: 0, sequenceQueue: false }},
        { e: $(this.$refs.musicName),
          p: { translateX: -60, translateY: -145 },
          o: { duration: 50,
            sequenceQueue: false,
            begin: function () {
              self.showMini = true
              self.deleteIconLeft = 20
              self.nextIconLeft = 20
            }}},
        {e: $(this.$refs.contorlArea), p: { translateX: 360, translateY: -267 }, o: { duration: 50, sequenceQueue: false}},
        { e: $(this.$refs.progress), p: { translateX: -62, translateY: -202, width: '80%'}, o: { duration: 50, sequenceQueue: false}},
        { e: $(this.$refs.categoryTitle), p: { translateX: -34, translateY: 627}, o: { duration: 50, sequenceQueue: false}},
        { e: $(this.$refs.ribbonLeft), p: { translateX: 266, translateY: -172}, o: { duration: 50, sequenceQueue: false}}
      ]
      $.Velocity.RunSequence(mySequence)
    }
  }
}

</script>

<style lang="scss" scoped>

  .play-wrapper {
    position:fixed;
    left:0;
    right:0;
    top:100px;
    background:rgba(250, 250, 250, 0.93);
  }

  .app-download-icons {
    width: 200px;
    align-self:flex-start;
    margin-top:66px;
    text-align: center;
  }

  .category-title {
    position: relative;
    margin-bottom: 50px;
    left: -28px;
  }

  .play-area {
    width: 488px;
    height: 424px;
  }

  .category-title {
    font-size: 16px;
    font-weight: 400;
    color: rgb(47, 152, 66)
  }

  .music-name {
    font-size: 25px;
    color: rgb(3, 3, 3)
  }

  .music-author {
    font-size: 15px;
    color: rgb(74, 74, 74);
  }

  .duration-icon {
    color: rgb(155, 155, 155);
    font-weight: 400;
    margin-right: 10px;
    display: inline-block;
    width: 40px;
  }

  .play-toolbar {
    margin-top: 20px;
    height: 24px;
  }

  .volumn-icon {
    background: url("volumn.svg");
    width: 15px;
    height: 11px;
  }

  .download-icon {
    background: url("download.svg");
    width: 20px;
    height: 20px;
  }

  .share-icon {
    background: url("share.svg");
    width: 20px;
    height: 20px;
  }

  .expand-icon-group {
    height: 100%;
  }

  .progress-area {
    position:relative;
    background: #dadada;
    height: 1px;
    width: 100%;
    margin-top: 3px;
  }

  .contorl-area {
    margin-top:50px;
    transition:all 0.3s;
  }
  .eYjegs {
    color: rgb(155, 155, 155);
    font-size: 12px;
    font-weight: 300;
    text-align: center;
  }
  .login-tips{
    padding: 0 10px;
    position:absolute;
    bottom:20px;
    left:248px;
    background-color:rgb(231, 231, 231);
    text-align: center;
    height:36px;
    line-height:36px;
  }
  .curPro{
    position:absolute;
    top:0;
    left:0;
    height:100%;
    background:  rgb(107, 189, 122);
  }
</style>
