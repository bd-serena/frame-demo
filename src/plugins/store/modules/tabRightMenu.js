const tabRightMenu = {
  namespaced: true,
  state: {
    isRightShow: 'none',
    dimList: [
      {
        'dim_name': '地域',
        'dim_id': 10
      },
      {
        'dim_name': '是否4G',
        'dim_id': 2
      }, {
        'dim_name': '是否彩铃',
        'dim_id': 3
      },
      {
        'dim_name': '地域',
        'dim_id': 4
      },
      {
        'dim_name': '是否4G',
        'dim_id': 5
      }, {
        'dim_name': '是否彩铃',
        'dim_id': 6
      },
      {
        'dim_name': '是否4G',
        'dim_id': 7
      }, {
        'dim_name': '是否彩铃',
        'dim_id': 8
      }
    ], // 维度数据存放
    targetList: [
      {
        'target_name': '地域',
        'target_id': 1,
        'isUsed': true,
        'calcRule': '1',
        'condiValue1': '1'
      },
      {
        'target_name': '是否4G',
        'target_id': 2,
        'isUsed': false,
        'calcRule': '1',
        'condiValue1': '1'
      }, {
        'target_name': '是否彩铃是否彩铃是否彩铃是否彩铃',
        'target_id': 3,
        'isUsed': false,
        'calcRule': '1',
        'condiValue1': '1'
      },
      {
        'target_name': '地域',
        'target_id': 4,
        'isUsed': false,
        'calcRule': '1',
        'condiValue1': '1'
      },
      {
        'target_name': '是否4G',
        'target_id': 5,
        'isUsed': false,
        'calcRule': '1',
        'condiValue1': '1'
      }, {
        'target_name': '是否彩铃',
        'target_id': 6,
        'isUsed': false,
        'calcRule': '1',
        'condiValue1': '1'
      }
    ], // 指标数据存放
    tagList: [


    ] // 维度Tab数据存放
  },
  getters: {

  },
  mutations: {
    setRightShow(state, data) {
      state.isRightShow = data.isRightShow
    },
    addWdTag(state, data) {
      state.tagList.push(data);
    }
  }
}
export default tabRightMenu
