import Polyact from '../lib'
import data from './data.json'

const map = new AMap.Map('app', {
  zoom: 14,
  center: new AMap.LngLat(121.485360083494, 31.2798373003168)
})
const infoWindow = new AMap.InfoWindow()
const polyact = new Polyact(map)

polyact.render({
  type: 'grid',
  data,
  colors: ['#b1e4fe', '#7ed3fc', '#47c2Fa', '#17b5f9', '#00a8f7', '#009ae8'],
  created (result) {
    result.forEach(({
      polygon,
      data
    }) => {
      polygon.on('click', () => {
        infoWindow.open(map, polygon.getBounds().getCenter())
        infoWindow.setContent(`
          <div style="padding: 40px 80px;">区域数量：${data.count}</div>
        `)
      })
    })
  }
})
