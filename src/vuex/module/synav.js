// navbar状态
const state = {
  eatUser: true,
  eatCamera: true,
  eatLeft: true,
  eatHome: false,
  eatTitle: true
}

const actions = {

}

const getters = {

}

const mutations = {

  UPDATE_EATUSER (state, eat) {
    // console.log(eat)
    state.eatUser = eat
  },
  UPDATE_EATCAMERA (state, eat) {
    // console.log(eat)
    state.eatCamera = eat
  },
  UPDATE_EATLEFT (state, eat) {
    // console.log(eat)
    state.eatLeft = eat
  },
  UPDATE_EATHOME (state, eat) {
    // console.log(eat)
    state.eatHome = eat
  },
  UPDATE_EATTITLE (state, eat) {
    // console.log(eat)
    state.eatTitle = eat
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
