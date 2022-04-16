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
        defaultOpenKeys={['q1']}
        defaultSelectedKeys={['p1']}
        style={{ height: '100%' }}
        onSelect={(e) => setselectedSideMenu(e.key)}
      >
        {selectedKeyMenu == '1' ? (
          <>
            {menuItems.map((title, index) => (
              <>
                <Menu.Item key={'d' + (1 + index)} icon={<EnvironmentOutlined />}>
                  Destination
                </Menu.Item>
                <Menu.Item key={'o' + (1 + index)} icon={<EnvironmentOutlined />}>
                  Origin
                </Menu.Item>
                <Menu.Item key={'p' + (1 + index)} icon={<DollarCircleOutlined />}>
                  Profit
                </Menu.Item>
              </>
            ))}
          </>
        ) : (
          <>
            {menuItems.map((title, index) => (
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
            ))}
          </>
        )}
      </Menu>
    </Sider>
  )
}

export default SideNav
