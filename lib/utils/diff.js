import generateKey from './generateKey'

export default function diff (data, oldPolygonsMap) {
  const added = {}
  const updated = {}
  const removed = Object.assign(oldPolygonsMap)

  data.forEach(item => {
    const key = item.key ? item.key : generateKey()
    if (oldPolygonsMap[key]) {
      updated[key] = oldPolygonsMap[key]
      delete removed[key]
    } else {
      added[key] = {
        data: item,
        polygons: [] // fill polygon in polyact render
      }
    }
  })

  return {
    added,
    updated,
    removed
  }
}
