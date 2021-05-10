/* eslint-disable @typescript-eslint/no-unused-vars */
import { observable, action, computed, makeObservable, toJS } from "mobx"

export interface IUser {
  id?: number
  nickname?: string
  registration_date?: number
  access_token: string
}

export class AuthStore {
  user: IUser | undefined
  isAuth: boolean

  axios = require('axios').default;

  constructor() {

    this.user = undefined
    this.isAuth = false

    makeObservable(this, {
      user: observable,
      isAuth: observable,
      getUser: computed,
      setUser: action,
    })
  }

  get getUser(): any {
    return toJS(this.user)
  }

  setAuth = (status: boolean) => {
    this.isAuth = status
  }

  setUser = (data: any) => {
    this.user = data
  }
}

export const authStore = new AuthStore()
