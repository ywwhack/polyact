const PREFIX = 'POLYACT'
let key = 0

export default function generateKey () {
  return `${PREFIX}-${key++}`
}
