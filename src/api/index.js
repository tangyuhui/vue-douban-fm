import axios from 'axios'
import {
  PlayListResource
} from './resource'

export default {
  defaultOptions: {
    app_name: 'radio_website',
    version: 100,
    client: 's:mainsite|y:3.0',
    kbps: 128,
    pt: '0.0',
    channel: -10
  },
  getPlayList (param) {
    let self = this
    return axios.get(PlayListResource, {
      params: $.extend({},self.defaultOptions,param)
    })
  }
}
