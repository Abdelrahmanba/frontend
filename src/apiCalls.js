import { message } from 'antd'

export const get = async (url, token = undefined) => {
  try {
    const res = await fetch(process.env.REACT_APP_API + url, {
      headers: new Headers({
        Authorization:
        'Bearer ' + ((localStorage.getItem('user') != null)
          ? JSON.parse(localStorage.getItem('user')).token
          : ''),
        Accept: 'application/json',
      }),
    })
    return res
  } catch (e) {
    message.error('Something Wrong')
    return e
  }
}

export const post = async (url, token = undefined, body) => {
  try {
    const res = await fetch(process.env.REACT_APP_API + url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' + ((localStorage.getItem('user') != null)
            ? JSON.parse(localStorage.getItem('user')).token
            : ''),
      }),
      body: JSON.stringify(body),
    })
    return res
  } catch (e) {
    console.log(e)
    message.error('Something Wrong')

    return e
  }
}
