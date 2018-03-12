import {API_ROOT} from './config.js'

const apiMusic = {
  playList:'/api/j/v2/playlist'
}

export const PlayListResource = API_ROOT.concat(apiMusic.playList)
