/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { ResponseType } from 'axios'

interface IRequestPayloads<T = { [P in string]: string | number | boolean }> {
  url: string
  method: 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'POST'
  headers?: { [P in string]: string | number | boolean }
  data?: T
  responseType?: ResponseType
}

const getQueryByName = (name: string, url: string) => {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(url)

  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export default async function request<T = unknown, R = unknown>({
  url,
  method = 'GET',
  headers = {},
  responseType = 'json',
  data
}: IRequestPayloads<R>): Promise<T> {
  let extendedItems: unknown = {}

  if (method === 'GET') {
    url += getQueryByName('mode', url) ? '&' : '?'
    for (const i in data) {
      if (Array.isArray(data[i]) && ((data[i] || []) as any).length > 0) {
        for (const x in data[i]) {
          const itemsArr = data[i][x]
          url += `${i}[]=${itemsArr}&`
        }
      } else {
        url += `${i}=${data[i]}&`
      }
    }

    if (url[url.length - 1] === '&') {
      url = url.substring(0, url.length - 1)
    }
  } else {
    extendedItems = {
      data: JSON.stringify({ ...data })
    }
  }

  return new Promise((resolve, reject) => {
    axios
      .request({
        url,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        method,
        responseType
      })
      .then(response => resolve(response.data))
      .catch(error => {
        const msg = error?.response?.data?.meta
        const newMsg = []
        if (
          msg?.message &&
          typeof msg?.message === 'object' &&
          !Array.isArray(msg?.message)
        ) {
          for (const a in msg?.message) {
            newMsg.push(msg?.message?.[a])
          }
          newMsg.flat()
        } else if (typeof msg?.message === 'string') {
          newMsg.push(msg?.message)
        }

        return reject(error?.response?.data)
      })
  })
}
