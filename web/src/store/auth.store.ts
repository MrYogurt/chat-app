/* eslint-disable @typescript-eslint/no-unused-vars */
import { observable, action, computed, makeObservable, toJS } from "mobx"

export interface IUser {
  id?: number
  nickname?: string
  registration_date?: string
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
    console.log("user228:", this.user)
    return toJS(this.user)
  }

  setAuth = (status: boolean) => {
    this.isAuth = status
  }

  // checkAuth = async (token: string) => {
  //   console.log("token:", token)
  //   await this.axios({
  //     method: "POST",
  //         url: "http://localhost:5000/graphql",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         data: {
  //           query: `query checkAuth($token: String!) {
  //             checkAuth (token: $token){
  //                 sub
  //                 iat
  //                 exp
  //             }
  //           }`,
  //       },
  //       variables: {
  //         token: token
  //       }
  //    }).then((result: any) => {
  //       this.isAuth = true
  //       console.log("result:", result)
  //     }).catch((err: any) => {
  //       this.isAuth = false
  //       console.log("error:", err)
  //     })
  // }

  setUser = (data: IUser) => {
    this.user = data
  }
}

export const authStore = new AuthStore()
