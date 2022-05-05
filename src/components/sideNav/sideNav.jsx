import { Layout, Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'

import {
  EnvironmentOutlined,
  DollarCircleOutlined,
  PieChartOutlined,
  CompassOutlined,
} from '@ant-design/icons'

const { Sider } = Layout

/*TODO: ADD Menu Items as Needed*/

const menuItems = ['First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter']
const SideNav = ({ selectedKeyMenu, setselectedSideMenu }) => {
  return (
    <Sider className='sider' width={210}>
      <Menu
        mode='inline'
        defaultSelectedKeys={['cp']}
        style={{ height: '100%' }}
        onSelect={(e) => setselectedSideMenu(e.key)}
      >
        {selectedKeyMenu == '1' ? (
          <>
            <Menu.Item key={"cp"} icon={<EnvironmentOutlined />}>
              Company Profit
            </Menu.Item>
            {menuItems.map((title, index) => (
              <SubMenu key={'q' + (1 + index) + 'c'} icon={<PieChartOutlined />} title={title}>
                <Menu.Item key={'d' + (1 + index) + 'c'} icon={<EnvironmentOutlined />}>
                  Miles Frequency
                </Menu.Item>
                <Menu.Item key={'o' + (1 + index) + 'c'} icon={<EnvironmentOutlined />}>
                  Frequency of flights
                </Menu.Item>
                <Menu.Item key={'p' + (1 + index) + 'c'} icon={<DollarCircleOutlined />}>
                  Profit
                </Menu.Item>
                <Menu.Item key={'u' + (1 + index) + 'c'} icon={<DollarCircleOutlined />}>
                  Miles travelled
                </Menu.Item>
              </SubMenu>
            ))}
          </>
        ) : (
          <> {selectedKeyMenu == '3' ? (
              menuItems.map((title, index) => (
                  <SubMenu key={'q' + (1 + index)} icon={<PieChartOutlined />}title={title}>

                      </SubMenu>

                  ))
          ) : (menuItems.map((title, index) => (
                  <SubMenu key={'q' + (1 + index)} icon={<PieChartOutlined />} title={title}>
                      <SubMenu
                          key={'f' + (1 + index)}
                          icon={<CompassOutlined />}
                          title='Flights Per State'
                      >
                          <Menu.Item key={'d' + (1 + index)} icon={<EnvironmentOutlined />}>
                              Destination
                          </Menu.Item>
                          <Menu.Item key={'o' + (1 + index)} icon={<EnvironmentOutlined />}>
                              Origin
                          </Menu.Item>
                      </SubMenu>

                      <Menu.Item key={'p' + (1 + index)} icon={<DollarCircleOutlined />}>
                          Profit
                      </Menu.Item>
                  </SubMenu>
              )))}

          </>
         )}
      </Menu>
    </Sider>
  )
}

export default SideNav
