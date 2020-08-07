import createPersistedState from 'vuex-persistedstate'
import Cookie from 'js-cookie'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'acidiney',
      paths: ['theme'],
      storage: {
        getItem: key => Cookie.get(key),
        setItem: (key, value) =>
          Cookie.set(key, value),
        removeItem: key => Cookie.remove(key)
      }
    })(store)
  })
}
