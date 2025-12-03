export const useWebsiteStore = defineStore('websiteStore', {
    state: () => ({
        theme: 'system',
    }),
    actions: {
        initTheme() {
            if (import.meta.client) {
                this.theme = localStorage.getItem('nuxt_theme') || 'dark'
            }
        },

        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark'
            if (import.meta.client) {
                localStorage.setItem('nuxt_theme', this.theme)
            }
        }
    }
})