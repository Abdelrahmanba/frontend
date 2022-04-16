import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { get } from '../../apiCalls'
import './topnav.scss'
const { Header } = Layout
const TopNav = ({ logo, setselectedKeyMenu }) => {
  const navigate = useNavigate()
  const signOut = async () => {
    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    localStorage.removeItem('user')
    await get('/users/logout', user.token)
    navigate('/')
  }
  return (
    <Header className='header'>
      <h1 className='logo'>{logo}</h1>
      <Menu
        className='menu'
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
        onSelect={(e) => setselectedKeyMenu(e.key)}
      >
        <Menu.Item key={1}>Companies</Menu.Item>
        <Menu.Item key={2}>States</Menu.Item>
        <Menu.Item key={3} onClick={() => signOut()}>
          Sign Out
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default TopNav
