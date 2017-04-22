const state = {
  ISLOGINED: true,
  ISSHOP: true,
  ISDIANZAN: false,
  usr_id: 5,
  usr_name: '梁总',
  usr_tel: 634682394068,
  usr_qq: 123553554,
  usr_hp: [
    'http://ww4.sinaimg.cn/bmiddle/005WfFgKgw1fbsiduaum0j30hs0qogmr.jpg'
  ],
  usr_infoNum: 1
}

const actions = {

}

const getters = {

}
const mutations = {
  UPDATE_USRNAME (state, usr) {
    // console.log(usr)
    state.usr_name = usr
  },
  UPDATE_USRQQ (state, usr) {
    // console.log(usr)
    state.usr_qq = usr
  },
  UPDATE_USRTEL (state, usr) {
    // console.log(usr)
    state.usr_tel = usr
  },
  UPDATE_USRHP (state, usr) {
    // console.log(usr)
    state.usr_hp = usr
  },
  UPDATE_ISLSHOP (state, usr) {
    state.ISSHOP = usr
  },
  UPDATE_ISLOGINED (state, usr) {
    // console.log(usr)
    state.ISLOGINED = usr
  },
  UPDATE_INFONUM (state, usr) {
    // console.log(usr)
    state.usr_infoNum = usr
  },
  UPDATE_LOGIN (state, data) {
    state.ISLOGINED = true
    state.ISSHOP = data.ISSHOP
    state.usr_id = data.usr_id
    state.usr_name = data.usr_name
    state.usr_tel = data.usr_tel
    state.usr_hp = data.user_hp
    state.usr_infoNum = data.usr_infoNum
    state.ISDIANZAN = data.ISDIANZAN
  },
  UPDATE_OUTLOGIN (state) {
    state.ISLOGINED = false
    state.ISSHOP = false
    state.usr_id = null
    state.usr_name = null
    state.usr_tel = null
    state.usr_hp = []
    state.usr_infoNum = null
    state.ISDIANZAN = false
  },
  UPDATE_ISDIANZAN (state) {
    state.ISDIANZAN = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
