/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent } from "react"
import { observable, action, computed, makeObservable } from "mobx"

// import { LoadingStore, IStoreLoading } from "./helpers/loading.store"

// interface ICategoriesTask {
//   subtype: TTSubtype
//   items: TSubtypes[]
//   itemsToRecognize?: IItemsToRecognize[]
//   images?: (IImages | undefined)[] | undefined
// }

export class AuthStore {
  user: boolean

  constructor() {

    this.user = false

    makeObservable(this, {
      user: observable,
      authStatus: computed,
      changeUserStatus: action,
    })
  }

  get authStatus(): boolean | undefined {
    if (this.user === undefined) {
      return false
    } else if (this.user === false) {
      return false
    } else {
      return true
    }
  }

  changeUserStatus = (status: boolean) => {
    if (!status) {
      console.log("set user false")
      this.user = false
    }

    if (status) {
      console.log("set user true")

      this.user = true
    }
  }
}

export const authStore = new AuthStore()
