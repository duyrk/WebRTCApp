'use client'

import { isBrowser } from '@utils'

export enum EStorageKey {
  UserData = 'userData',
}

export const StorageService = {
  set(key: string, value: string) {
    if (isBrowser()) {
      window.localStorage.setItem(key, value)
    }
  },

  get<DataType = string>(key: string) {
    if (isBrowser()) {
      return window.localStorage.getItem(key) as DataType
    }
  },

  delete(key: string) {
    if (isBrowser()) {
      window.localStorage.removeItem(key)
    }
  },

  multipleSet<ParamType extends Record<string, unknown>>(values: ParamType) {
    if (isBrowser()) {
      Object.keys(values).forEach((key) =>
        window.localStorage.setItem(key, JSON.stringify(values[key])),
      )
    }
  },

  multipleGet(keys: Array<string>) {
    if (isBrowser()) {
      return keys.map((key) => window.localStorage.getItem(key))
    }
  },

  multipleDelete(keys: Array<string>) {
    if (isBrowser()) {
      keys.forEach((key) => window.localStorage.removeItem(key))
    }
  },
} as const
