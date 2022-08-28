const tab = {
  namespaced: true,
  state: {
    tabDatas: {},
    activeTabId: '',
    openTabs: [],
    currentInputTag: -1,
    tabType: '', // 3的时候为打开新增或编辑指标页面，显示右侧操作栏
    isCover: false, // 3的时候显示蒙版
    kpiType: 1 //  指标类型 0 基础指标 1 计算指标
  },
  getters: {
  },
  mutations: {
    // 添加tabs
    addTabs(state, data) {
      state.openTabs.unshift(data)
      // 同时，添加一组tab数据，每新增一个tab都有一组对应数据
      state.tabDatas[data.name + ""] = {
        dimList: [],
        targetList: [],
        tagList: [],
        currentEditData: null,
        activedBox: 'dim'
      }
      state.tabDatas = { ...state.tabDatas, newProp: data.name }
      state.tabType = data.nodeType
    },
    deleteTab(state, name) {
      let index = 0
      index = state.openTabs.findIndex(option => option.name === name)
      state.openTabs.splice(index, 1);
      if (state.openTabs.length === 0) {
        state.tabType = "";
      }
    },
    setTabs(state, openTabs) {
      state.openTabs = openTabs
    },
    // 设置当前激活的tab
    setActiveTab (state, activeTab) {
      state.activeTabId = activeTab.id
      state.tabType = activeTab.nodeType
    },
    setIsCover(state, data) {
      state.isCover = data
    },
    setKpiType(state, val) {
      state.kpiType = val
    },
    addWdTag(state, data) {
      state.tabDatas[state.activeTabId].tagList.push({ ...data });
    },
    setDimList(state, data) {
      state.tabDatas[state.activeTabId].dimList = [...data];
    },
    setTargetList(state, data) {
      state.tabDatas[state.activeTabId].targetList = [...data];
    },
    setActivedBox(state, data) {
      state.tabDatas[state.activeTabId].activedBox = data
    },
    resetCurrentEditData(state, data) {
      state.tabDatas[state.activeTabId].currentEditData = data;
    },
    setCurrentEditData(state, val) {
      let ce = state.tabDatas[state.activeTabId].currentEditData
      if (!ce) {
        return
      }
      if (ce.molecularEdit) {
        ce.molecular.splice(state.currentInputTag + 1, 0, val);
      } else if (ce.denominatorEdit) {
        ce.denominator.splice(
          state.currentInputTag + 1,
          0,
          val
        );
      }
    },
    setCurrentInputTag(state, val) {
      state.currentInputTag = val
    }
  },
  actions: {
    /* removeTabs({ commit, state }, data) {
      let type = data.type
      let name = data.name
      let tabs = state.openTabs;
      let newTabs = [];
      switch (type) {
      case 1:// 关闭当前tab
        commit('deleteTab', name)
          this.$router.push()
        break;
      case 2:// 关闭其他
        tabs.forEach((tab) => {
          if (tab.name === name) {
            newTabs.push(tab);
            commit('setTabs', newTabs)
            commit('setActiveTab', name)
            // state.editableTabs = newTabs;
            // state.editableTabsValue = targetName;
          }
        })
        break;
      case 3:// 关闭右侧
        tabs.forEach((tab, index) => {
          if (tab.name === name) {
            // state.editableTabs = tabs.slice(0, index + 1);
            commit('setTabs', tabs.slice(0, index + 1))
          }
        })/!*
          let tab = tabs.filter(tab => tab.name === activeName);
          if (tab.length === 0) {
            // state.editableTabsValue = tabs[tabs.length - 1].name;
            commit('setEditableTabsValue', tabs[tabs.length - 1].name)
          } *!/
        break;
      case 4:// 关闭全部
        commit('setTabs', newTabs)
        break;
      default:break;
      }
    } */
    /* ,
    removeTab({ commit, state }, data) {
      let targetName = data.tabId
      let tabs = state.editableTabs;
      let activeName = state.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      // state.editableTabsValue = activeName;
      commit('setEditableTabsValue', activeName)
      // state.editableTabs = tabs.filter(tab => tab.name !== targetName);
      commit('setEditableTabs', tabs.filter(tab => tab.name !== targetName))
    },
    addTab({ commit, state }, data) {
      let tabId = data.id
      let label = data.label
      let type = data.type
      let extType = data.extType
      // let tabId = id + Math.random() + '';
      let tabs = state.editableTabs;
      let hasOpen = false;
      tabs.forEach((tab) => {
        if (tab.name === tabId) {
          // state.editableTabsValue = tabId;
          commit('setEditableTabsValue', tabId)
          hasOpen = true;
        }
      });
      if (!hasOpen) {
        let path
        switch (type) {
        case 3:
          path = 'BusinessEditor'
          break;
        case 4:
          switch (extType) {
          case 1:
            path = 'DataSync'
            break;
          case 2:
            path = 'DataPreHandle'
            break;
          default:
            path = '404'
            break
          }
          break;
        default:
          path = '404'
          break;
        }
        state.editableTabs.push({
          title: label,
          name: tabId,
          content: path
        })
        this.$router.push(path)
        // state.editableTabsValue = tabId;
        commit('setEditableTabsValue', tabId)
      }
    },
    tabClick({ commit, state }, data) {
      commit('setEditableTabsValue', data.seletedTabId)
    } */
  }
}
export default tab
