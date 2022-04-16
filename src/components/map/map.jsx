import { useEffect, useState } from 'react'
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
        max = e.profitsSum
      }
      if (e[type] < min) {
        min = e[type]
      }
      return (e['name'] = codes[e.OriginWac])
    })
   //console.log(data)
    const range = max - min
    const custm = {}
    data.forEach((e) => {
      const percent = Math.round((e[type] / range) * 10)
      //custm[e.name]['fill'] = colors[percent]
     // custm[e.name][type] = e[type]
    })

    setcustomConfig(custm)
  }

  useEffect(() => {
    parseData()
  }, [data])
  return <USAMap customize={customConfig} addedData={data} type={type} />
}

export default Map
