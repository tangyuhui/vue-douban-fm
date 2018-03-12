import {SET_CUR_MUSIC,
  PLAY_MUSIC,
  SET_AUDIO_DOM,
  SET_MUSIC_CURTIME,
  SET_MUSIC_DURATION
} from './mutation-types.js'

export default {
  [PLAY_MUSIC] (state, isPlaying) {
    state.isPlaying = isPlaying
  },
  [SET_CUR_MUSIC] (state, music) {
    state.curMusic = music
  },
  [SET_AUDIO_DOM] (state, dom) {
    state.audioDom = dom
  },
  [SET_MUSIC_CURTIME] (state, curTime) {
    state.curTime = curTime
  },
  [SET_MUSIC_DURATION] (state, duration) {
    state.duration = duration
  }
}
