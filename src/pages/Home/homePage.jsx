import './homePage.scss'
import { Layout, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import Map from '../../components/map/map'
import TopNav from '../../components/topnav/topnav'
import SideNav from '../../components/sideNav/sideNav'
import {get, post} from '../../apiCalls'
import { LoadingOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import MilesFreq from '../../components/milesFreq/milesFreq'
import FlightFreq from '../../components/FlightFreq/FlightFreq'
import ProfitPerCompany  from '../../components/profit-per-company/Profit-per-company'
import MilesTravelled from "../../components/milestravelled/Milestravelled";
import Predict from "../../components/Predict/Predict";

import CompanyProf from '../../components/companyProf/companyProf'

const { Content, Footer } = Layout

const { Option } = Select

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
    if (selectedSideMenu[0] === 'y') {
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
              {
                selectedKeyMenu === '3' && (
                    <Predict setloading={setloading}  />
                )
              }
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
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'cp' && <CompanyProf selectedSideMenu={selectedSideMenu} data={data} setloading={setloading} setdata={setdata} />
              )}
              {selectedKeyMenu === '1' && (
                selectedSideMenu === 'd1c' && <MilesFreq selectedSideMenu={selectedSideMenu} data={data} setloading={setloading} setdata={setdata} />
              )}
              {selectedKeyMenu === '1' && (
                selectedSideMenu === 'o1c' && <FlightFreq selectedSideMenu={selectedSideMenu} data={data} setloading={setloading} setdata={setdata} />
              )}
              {selectedKeyMenu === '1' && (
                 selectedSideMenu === 'p1c' && <ProfitPerCompany selectedSideMenu={selectedSideMenu} setloading={setloading}  />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'y1c' && <MilesTravelled selectedSideMenu={selectedSideMenu} setloading={setloading}  />
              )}

              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'd2c' && <MilesFreq selectedSideMenu={selectedSideMenu} data={data} setloading={setloading} setdata={setdata} />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'o2c' && <FlightFreq selectedSideMenu={selectedSideMenu} data={data} setloading={setloading} setdata={setdata} />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'p2c' && <ProfitPerCompany selectedSideMenu={selectedSideMenu} setloading={setloading}  />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'y2c' && <MilesTravelled selectedSideMenu={selectedSideMenu} setloading={setloading}  />
              )}

              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'd3c' && <MilesFreq selectedSideMenu={selectedSideMenu} data={data} setloading={setloading} setdata={setdata} />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'o3c' && <FlightFreq selectedSideMenu={selectedSideMenu} data={data} setloading={setloading} setdata={setdata} />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'p3c' && <ProfitPerCompany selectedSideMenu={selectedSideMenu} setloading={setloading}  />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'y3c' && <MilesTravelled selectedSideMenu={selectedSideMenu} setloading={setloading}  />
              )}

              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'd4c' && <MilesFreq selectedSideMenu={selectedSideMenu} data={data} setloading={setloading} setdata={setdata} />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'o4c' && <FlightFreq selectedSideMenu={selectedSideMenu} data={data} setloading={setloading} setdata={setdata} />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'p4c' && <ProfitPerCompany selectedSideMenu={selectedSideMenu} setloading={setloading}  />
              )}
              {selectedKeyMenu === '1' && (
                  selectedSideMenu === 'y4c' && <MilesTravelled selectedSideMenu={selectedSideMenu} setloading={setloading}  />
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
