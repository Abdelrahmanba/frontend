import './sign.scss'
import { Button, DatePicker, Input, message } from 'antd'
import { useState } from 'react'
import { post } from '../../apiCalls'
import { useNavigate } from 'react-router-dom'
const Sign = () => {
  const navigate = useNavigate()
  const [signUp, setSignUp] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailSign, setemailSign] = useState('')
  const [passwordSign, setpasswordSign] = useState('')
  const [loading, setloading] = useState(false)

  const signUpSubmit = async () => {
    setloading(true)
    const res = await post('/users', undefined, {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
    })
    if (res.ok) {
      message.info('You have registered correctly')

    } else {
      message.error('Something went wrong')
    }
    setloading(false)
  }

  const signInSubmit = async () => {
    setloading(true)
    const res = await post('/users/login', undefined, {
      email: emailSign,
      password: passwordSign,
    })

    if (res.ok) {
      const resJson = await res.json()
      localStorage.setItem('user', JSON.stringify(resJson))
      navigate('home')

    } else {
      message.error('Something went wrong')
    }
    setloading(false)
  }

  return (
    <div className='home-page'>
      <section>
        <h1>2018 Airplane Flights</h1>
        <h2>Predicting prices of airline flights!</h2>
        <div className='btn-grp'>
          <Button
            type={signUp ? 'primary' : 'default'}
            shape='round'
            size={'large'}
            onClick={() => setSignUp(1)}
          >
            Sign Up
          </Button>
          <Button
            type={signUp === 0 ? 'primary' : 'default'}
            shape='round'
            size={'large'}
            onClick={() => setSignUp(0)}
            loading={loading}
          >
            Sign In
          </Button>
        </div>
        <form className={`sign ${signUp === 1 ? 'sign-up' : ''}`}>
          <div className='name'>
            <Input
              placeholder='First Name'
              className='input'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder='Last Name'
              className='input'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <Input
            placeholder='Email'
            className='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            placeholder='Password'
            className='input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DatePicker placeholder='Date of Birth' onChange={(dump, dateString) => setDateOfBirth(dateString)} />
          <Button
            onClick={signUpSubmit}
            type='primary'
            shape='round'
            size='large'
            loading={loading}
          >
            Explore!
          </Button>
        </form>
        <div className={`sign ${signUp ? '' : 'sign-in'}`}>
          <Input
            placeholder='Email'
            className='input'
            value={emailSign}
            onChange={(e) => setemailSign(e.target.value)}
          />
          <Input.Password
            placeholder='Password'
            className='input'
            value={passwordSign}
            onChange={(e) => setpasswordSign(e.target.value)}
          />
          <Button onClick={signInSubmit} type='primary' shape='round' size='large'>
            Sign In
          </Button>
        </div>
      </section>
      <div className='home-vector' />
    </div>
  )
}
export default Sign
