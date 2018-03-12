import {
  SET_CUR_MUSIC
} from './mutation-types.js'
import api from '../api'

export default {
  async getMusic ({
    commit,
    state
  }) {
    let param = {}
    if (state.curMusic != null) {
      param = {
        sid: state.curMusic.sid,
        pb: state.curMusic.kbps,
        type: 'p'
      }
    } else {
      param = {type: 'n'}
    }
    return api.getPlayList(param).then((result) => {
      let data = result.data.song
      if (data.length > 0) {
        sessionStorage.setItem('curMusic',JSON.stringify(data[0]))
        commit(SET_CUR_MUSIC, data[0])
      }
    })
  }
}
