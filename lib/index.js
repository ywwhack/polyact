import noop from 'lodash/noop'
import Grid from './components/Grid'
import scale from './utils/scale'
import diff from './utils/diff'

class Polyact {
  constructor (map) {
    this.comopnents = {
      'grid': new Grid()
    }
    this.polygonsMap = {}
    this.polygons = []
    this.map = map
  }

  _clear () {
    this.polygons.forEach(polygon => polygon.hide())
    this.polygons .length = 0
  }

  render (options) {
    const {
      type,
      data,
      colors,
      created = noop
    } = options

    const {
      polygonsMap,
      map
    } = this

    const component = this.comopnents[type]
    const max = data.reduce((result, item) => Math.max(result, item.count), 0)
    const colorRamp = scale()
      .domain([0, max])
      .range(colors)

    const { added, updated, removed } = diff(data, polygonsMap)

    // create new polygons
    for (let key in added) {
      const data = added[key].data
      const paths = component.getPaths(data)
      paths.forEach(path => {
        added[key].polygons.push(new AMap.Polygon({
          map,
          path,
          fillColor: colorRamp(data.count),
          fillOpacity: 0.8,
          strokeColor: '#fff',
          strokeOpacity: 0.8,
          strokeWeight: 1
        }))
      }) 
    }

    // update polygons
    Object.values(updated).forEach(({ data, polygons }) => {
      const paths = component.getPaths(data)
      paths.forEach((path, index) => {
        polygons[index].setOptions({
          path,
          fillColor: colorRamp(data.count)
        })
      })
    })

    // remove outdate polygons
    Object.values(removed).forEach(({ polygons }) => {
      polygons.forEach(polygon => polygon.hide())
    })

    // update polygonsMap
    const newPolygonsMap = this.polygonsMap = Object.assign({}, updated, added)

    // fire created hook
    const createdResult = []
    Object.values(newPolygonsMap).forEach(({ data, polygons }) => {
      polygons.forEach(polygon => {
        createdResult.push({ data, polygon })
      })
    })
    created(createdResult)
  }

  component (name, definition) {}
}

export default Polyact
