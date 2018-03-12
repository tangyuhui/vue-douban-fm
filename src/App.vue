<template>
  <div id="app">
    <router-view/>
    <!-- 隐藏的audio标签 -->
    <audio v-bind:src="(curMusic&&curMusic.url)?curMusic.url:''" @canplay="canPlaySong"   @playing="ready"  @error="loadError" v-bind:autoplay="isPlaying" ref="audio" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import jquery from 'jquery'
window.jQuery = window.$ = jquery
export default {
  name: 'App',
  created () {
    this.readCacheMusic()
    this.getMusic()
  },
  mounted () {
    this.audio = this.$refs.audio
    this.SET_AUDIO_DOM(this.audio)
    this.audio.addEventListener('loadedmetadata', () => {
      this.SET_MUSIC_CURTIME(parseInt(this.audio.currentTime))
      this.SET_MUSIC_DURATION(parseInt(this.audio.duration))
    })
    this.audio.addEventListener('ended', () => {
      /* 播放下一首歌 */
      this.getMusic()
    })
  },
  methods: {
    ...mapActions(['getMusic']),
    ...mapMutations(['SET_AUDIO_DOM', 'SET_MUSIC_CURTIME', 'SET_MUSIC_DURATION', 'PLAY_MUSIC', 'SET_CUR_MUSIC']),
    readCacheMusic () {
      let music = JSON.parse(sessionStorage.getItem('curMusic'))
      if (music) {
        this.SET_CUR_MUSIC(music)
      }
    },
    updateTime () {
      this.SET_MUSIC_CURTIME(this.audio.currentTime)
    },
    canPlaySong () {
      console.log('canPlay')
      this.PLAY_MUSIC(true)
      this.audio.play()
    },
    ready () {
      console.log('playing')
    },
    loadError () {
      this.PLAY_MUSIC(false)
    }
  },
  computed: {
    ...mapState(['isPlaying', 'curTime', 'duration', 'curMusic'])
  }
}
</script>

<style lang="scss">
  @import "~wingcss";
  @import './style/common';
  @import "./style/app";
</style>
