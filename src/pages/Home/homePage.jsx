import './homePage.scss'
import { Layout, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import Map from '../../components/map/map'
import TopNav from '../../components/topnav/topnav'
import SideNav from '../../components/sideNav/sideNav'
import { get } from '../../apiCalls'
import { LoadingOutlined } from '@ant-design/icons'
const { Content, Footer } = Layout

const HomePage = () => {
  const [selectedKeyMenu, setselectedKeyMenu] = useState('1')
  const [selectedSideMenu, setselectedSideMenu] = useState('p1')
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  useEffect(() => {
    setloading(true)
    let dataURL = '/state/' + selectedSideMenu[1]
    if (selectedSideMenu[0] === 'p') {
      dataURL += '/profit-per-state'
    }
    if (selectedSideMenu[0] === 'o') {
      dataURL += '/origin/flights-per-state'
    }
    if (selectedSideMenu[0] === 'd') {
      dataURL += '/dest/flights-per-state'
    }
    const getData = async () => {
      const res = await get(dataURL)
      if (res.ok) {
        const resJson = await res.json()
        setdata(resJson)
      }
      setloading(false)
    }
    getData()
  }, [selectedSideMenu])

  return (
    <Layout className='layout'>
      <TopNav logo={'Airplane Flights '} setselectedKeyMenu={setselectedKeyMenu} />
      <Layout className='inner-layout'>
        <div className='img' />
        <SideNav selectedKeyMenu={selectedKeyMenu} setselectedSideMenu={setselectedSideMenu} />
        <Content style={{ margin: 30 }}>
          <Spin indicator={antIcon} spinning={loading}>
            <div className='site-layout-content'>
              {selectedKeyMenu === '2' && (
                <h1>
                  {num[selectedSideMenu[0]] + ' in the ' + num[selectedSideMenu[1]] + ' Quarter'}
                </h1>
              )}
              {selectedKeyMenu === '2' && (
                <div className='map'>
                  <Map
                    data={data}
                    type={selectedSideMenu[0] === 'p' ? 'profitsSum' : 'flightsFrequency'}
                  />
                </div>
              )}
            </div>
          </Spin>
          <Footer className='footer' style={{ textAlign: 'center' }}>
            Advanced SE ©2021
          </Footer>
        </Content>
      </Layout>
    </Layout>
  )
}

const num = {
  1: 'First',
  2: 'Second',
  3: 'Third',
  4: 'Forth',
  p: 'Profit Per State',
  o: 'Flights Per Origin State',
  d: 'Flights Per Destination State',
}
export default HomePage
