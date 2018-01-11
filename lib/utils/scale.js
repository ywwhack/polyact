/**
 * 将一个 domain 区间的值等宽度映射为 range 区间的值
 * @example
 * const colorRamp = scale()
 *   .domain([0, 500000])
 *   .range(['#fff', '#E2F1FF', '#C7E3FF', '#A8D3FF', '#80B0E0'])
 *
 * colorRamp(0) ~ colorRamp(100000) => '#FFF'
 * colorRamp(100000) ~ colorRamp(200000) => '#E2F1FF'
 * colorRamp(200000) ~ colorRamp(300000) => '#C7E3FF'
 * colorRamp(300000) ~ colorRamp(400000) => ‘#A8D3FF’
 * colorRamp(400000) ~ colorRamp(500000) => '#80B0E0'
 *
 * 关于 .domain 和 .range 的写法参考自 d3 https://github.com/d3/d3-scale
 */
export default function scale () {
  let domain = []
  let range = []

  const f = function (value) {
    const [domainMin, domainMax] = domain
    const extent = domainMax - domainMin
    const percent = (value - domainMin) / extent
    let rangeIndex = Math.floor(percent * range.length)
    if (rangeIndex === range.length) rangeIndex -= 1
    return range[rangeIndex]
  }

  f.domain = function (arr) {
    domain = arr
    return this
  }

  f.range = function (arr) {
    range = arr
    return this
  }

  return f
}