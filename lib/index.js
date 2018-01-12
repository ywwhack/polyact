import Grid from './components/Grid'
import scale from './utils/scale'
import noop from 'lodash/noop'

class Polyact {
  constructor (map) {
    this.comopnents = {
      'grid': new Grid()
    }
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

    // clear first
    this._clear()

    // redraw
    const {
      polygons,
      map
    } = this
    const component = this.comopnents[type]
    const max = data.reduce((result, item) => Math.max(result, item.count), 0)
    const colorRamp = scale()
      .domain([0, max])
      .range(colors)
    data.forEach(item => {
      const paths = component.getPaths(item)
      paths.forEach(path => {
        polygons.push(new AMap.Polygon({
          map,
          path,
          fillColor: colorRamp(item.count),
          fillOpacity: 0.8,
          strokeColor: '#fff',
          strokeOpacity: 0.8,
          strokeWeight: 1
        }))
      })
    })
    const createdResult = polygons.map((polygon, index) => ({
      polygon,
      data: data[index]
    }))
    created(createdResult)
  }

  component (name, definition) {}
}

export default Polyact
