const mutations = {
  userInfo(state, newSet) {
    Object.assign(state, {
      userInfo: newSet
    })
  }
}

export default mutations
