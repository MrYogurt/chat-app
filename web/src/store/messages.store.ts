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

export class MessagesStore {
//   task: ITask | undefined
//   currentIndexCategory = 0
//   prevTaskId: undefined | string
//   taskStoreLoading: IStoreLoading
//   taskAPI: TasksAPI

  constructor() {
    // this.taskStoreLoading = new LoadingStore()

    // this.taskAPI = taskAPI

    makeObservable(this, {
    //   task: observable,
    //   currentTask: computed,
    //   getTaskByIdAsync: action,
    })
  }

//   get currentTask(): undefined | ITask {
//     return this.task
//   }
}

export const messagesStore = new MessagesStore()
