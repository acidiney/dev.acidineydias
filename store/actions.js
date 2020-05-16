export default {
  async loadFiles ({ commit, state }) {
    // console.log('me')
    if (!state.posts.length) {
      const req = require.context('~/content', true, /\.md$/)
      const posts = []
      await req.keys().forEach((filename) => {
        posts.push(filename.slice(2, filename.length))
      })
      commit('setPosts', posts)
    }
  }
}
