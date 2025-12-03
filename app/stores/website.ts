export const useWebsiteStore = defineStore('websiteStore', {
    state: () => ({
        theme: 'dark'
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark'
        }
    }
})