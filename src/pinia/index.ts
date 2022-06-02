import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  // other options...
  state: () => {
    return {
      name: 'yuanbo',
      count: 0
    }
  },
  getters: {
    // getMyName: function
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
