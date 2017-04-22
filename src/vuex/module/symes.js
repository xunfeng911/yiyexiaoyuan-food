// 组件间通信
const state = {
  MES_hdr_id: null,
  MES_choose_shop: null,
  MES_choose_baichi: null,
  MES_choose_youhui: null
}

const actions = {

}

const getters = {

}

const mutations = {
  PASS_MES_HDR_ID (state, mes) {
    state.MES_hdr_id = mes
  },
  PASS_MES_CHOOSE_SHOP (state, mes) {
    state.MES_choose_shop = mes
  },
  PASS_MES_CHOOSE_BAICHI (state, mes) {
    state.MES_choose_baichi = mes
  },
  PASS_MES_CHOOSE_YOUHUI (state, mes) {
    state.MES_choose_youhui = mes
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
