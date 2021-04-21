/* eslint-disable @typescript-eslint/no-unused-vars */
import { observable, action, computed, makeObservable } from "mobx"

interface IUser {
  id?: number
  nickname?: string
  registration_date?: string
}

export class AuthStore {
  user: IUser | undefined

  constructor() {

    this.user = undefined

    makeObservable(this, {
      user: observable,
      authStatus: computed,
      getUser: computed,
      setUser: action,
    })
  }

  get authStatus(): boolean | undefined {
    if (this.user === undefined) {
      return false
    } else if (!this.user) {
      return false
    } else {
      return true
    }
  }

  get getUser(): any {
    return this.user
  }

  setUser = (data: any) => {
    const filteredData = data.data

    // console.log("filteredData:", filteredData)
    this.user = filteredData
  }
}

export const authStore = new AuthStore()
