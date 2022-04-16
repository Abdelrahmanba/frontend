import { message } from 'antd'

export const get = async (url, token = undefined) => {
  try {
    const res = await fetch(process.env.REACT_APP_API + url, {
      headers: new Headers({
        ...(token && { Authorization: 'Bearer ' + token }),
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
        ...(token && { Authorization: 'Bearer ' + token }),
      }),
      body: JSON.stringify(body),
    })
    return res
  } catch (e) {
    message.error('Something Wrong')
    return e
  }
}
