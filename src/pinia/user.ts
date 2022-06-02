import { defineStore } from 'pinia'

interface userState {
  token: string
}

export const useStore = defineStore('user', {
  // other options...
  state: () => {
    return {
      token: ''
    }
  },
  getters: {
    // getMyName: function
  },
  actions: {
    setToken(payload: string) {
      this.token = payload
    },
    resetToken() {
      this.token = ''
    }
  }
})
