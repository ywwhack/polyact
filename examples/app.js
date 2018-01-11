import Polyact from '../lib'
import data from './data.json'

const map = new AMap.Map('app', {
  zoom: 14,
  center: new AMap.LngLat(121.485360083494, 31.2798373003168)
})
const polyact = new Polyact(map)

polyact.render({
  type: 'grid',
  data,
  colors: ['#b1e4fe', '#7ed3fc', '#47c2Fa', '#17b5f9', '#00a8f7', '#009ae8']
})
