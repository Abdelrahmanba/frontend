import { useEffect, useState } from 'react'
import { get } from '../../apiCalls'
import USAMap from '../USAmap/USAmap'
import './map.scss'
import codes from '../../stateCodes.json'

const colors = [
  '#a4aebb',
  '#8e9aab',
  '#77859a',
  '#607189',
  '#4a5d78',
  '#334967',
  '#1d3557',
  '#172a45',
  '#14253c',
  '#111f34',
]

const Map = ({ data, type }) => {
  const [customConfig, setcustomConfig] = useState({})

  const parseData = () => {
    let min = Number.MAX_VALUE
    let max = -1
    data.forEach((e) => {
      if (e[type] > max) {
        max = e[type]
      }
      if (e[type] < min) {
        min = e[type]
      }
      return (e['name'] = codes[e.state])
    })
    const range = max - min
    const custm = {}

    data.forEach((e) => {
      const percent = Math.round((e[type] / range) * 9)
      console.log(percent)

      custm[e.name] = { fill: colors[percent], [type]: e[type] }
    })
    setcustomConfig(custm)
    console.log(custm)
  }

  useEffect(() => {
    parseData()
  }, [data])
  return <USAMap customize={customConfig} addedData={data} type={type} />
}

export default Map
