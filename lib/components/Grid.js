import geohash from 'geohash'

const { decodeGeoHash } = geohash.GeoHash

function geoHashToPath (geoHash) {
  const latLngs = decodeGeoHash(geoHash)
  return [
    [latLngs.longitude[0], latLngs.latitude[0]],
    [latLngs.longitude[1], latLngs.latitude[0]],
    [latLngs.longitude[1], latLngs.latitude[1]],
    [latLngs.longitude[0], latLngs.latitude[1]]
  ]
}

export default class Grid {
  getPaths (item) {
    return [geoHashToPath(item.sign)]
  }
}
