import { Route, Routes } from 'react-router-dom'
import './App.less'
import HomePage from './pages/Home/homePage'
import Sign from './pages/sign/sign'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Sign />} />
      <Route path='/home' element={<HomePage />} />

      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  )
}
export default App
