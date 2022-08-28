<template>
  <el-container>
    <vue-context ref="menu">
      <ul slot-scope="child">
        <li @click="removeTabs(1,child.data)">
          关闭
        </li>
        <li @click="removeTabs(2,child.data)">
          关闭其他
        </li>
        <li @click="removeTabs(3,child.data)">
          关闭右侧
        </li>
        <li @click="removeTabs(4,child.data)">
          关闭全部
        </li>
      </ul>
    </vue-context>
    <el-main
      style="padding:0; position: relative;"
      class="buss-tabs"
    >
      <!-- 指标页面展示操作图标 -->
      <div
        class="design-opts"
        v-if="tabType === '3'"
      >
        <i class="icon-A10579_Preservation" />
        <el-tooltip
          class="item"
          effect="dark"
          content="完成"
          placement="bottom"
        >
          <i class="icon-A10301-records" />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="下一步"
          placement="bottom"
        >
          <i class="icon-A10700_nextStep" />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="预跑数"
          placement="bottom"
        >
          <i class="icon-A10683_run" />
        </el-tooltip>
      </div>
      <!-- tab标签和对应展示内容 -->
      <el-tabs
        ref="tabs"
        :value="activeTabId"
        type="border-card"
        closable
        v-show="openTabs.length"
        @tab-click="tabClick"
        @tab-remove="tabRemove"
      >
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) of openTabs"
          :label="item.title.length>5 ? item.title.substr(0,4)+'...':item.title"
          :name="item.name"
        >
          <span
            slot="label"
            :title="item.title"
            @contextmenu.prevent="$refs.menu.open($event,{ name: item.name})"
          >{{ item.title }}</span>
          <div
            :class="['content-wrap']"
            v-if="item.path === 'KpiMgt'"
          >
            <!-- 界面1 -->
            <kpi-mgt :tab-id="index" />
          </div>
          <div
            :class="['content-wrap']"
            v-if="item.path === 'HelloMain'"
          >
            <!-- 界面2 -->
            <hello-main />
          </div>
          <div
            :class="['content-wrap']"
            v-if="item.path === 'HomePage'"
          >
            <!-- 界面2 -->
            <HomePage />
          </div>
          <div
            :class="['content-wrap']"
            v-if="item.path === 'TimeAnalysis'"
          >
            <!-- 开发中心-实时分析 -->
            <TimeAnalysis />
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--<div :class="['content-wrap', openTabs.length && !noTabs ? '' : 'no-tabs']">
        &lt;!&ndash;        <keep-alive>&ndash;&gt;
        &lt;!&ndash;<router-view />&ndash;&gt;
        &lt;!&ndash;        </keep-alive>&ndash;&gt;
      </div>-->
    </el-main>
  </el-container>
</template>

<script>
import Store from "@/plugins/transData.js";
import { mapState, mapMutations } from "vuex";
import { VueContext } from "vue-context";
import HelloMain from "@/components/HelloMain";
import KpiMgt from "@/components/kpi/KpiMgt";
import HomePage from "@/components/home/HomePage";
import TimeAnalysis from "@/components/didpDevelop/TimeAnalysis";
export default {
  name: "TabEditor",
  components: {
    "vue-context": VueContext,
    helloMain: HelloMain,
    KpiMgt: KpiMgt,
    HomePage: HomePage,
    TimeAnalysis: TimeAnalysis
  },
  data() {
    return {
      noTabs: false
    }
  },
  computed: {
    ...mapState({
      activeTabId: state => state.tab.activeTabId,
      openTabs: state => state.tab.openTabs,
      tabType: state => state.tab.tabType
    })
  },
  created() {
    Store.$on('leftMenu_initLeftTreeDat', data => {
      this.tabClick(data)
    })
    Store.$on('tabAdd', data => {
      this.tabAdd(data)
    })
    Store.$on('tabHead_showHideTabHead', (data) => {
      this.showHideTabHead(data)
    })
    Store.$on('tabRemove', data => {
      this.tabRemove(data)
    })
  },
  mounted() {
    // if (this.$store.state.tab.activeTabId === '') {
    //   this.$router.push({ name: 'Home' });
    // }
  },
  methods: {
    ...mapMutations({
      setIsCover: "tab/setIsCover"
    }),
    tabAdd(node) {
      let tabIndex = this.openTabs.findIndex(tab => tab.name === node.id)
      if (tabIndex === -1) {
        let path
        switch (parseInt(node.nodeType)) { // 根据菜单中不同类型跳转至不同组件tab
        case 3:
          path = 'KpiMgt'
          break;
        case 2:
          path = 'HomePage'
          break;
        case 5:
          path = 'TimeAnalysis'
          break;
        case 4:
          switch (parseInt(node.extType)) {
          case 1:
            path = 'HelloMain'
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
        this.$store.commit('tab/addTabs', { name: node.id, title: node.label, path: path, nodeType: node.nodeType })
        this.$store.commit('tab/setActiveTab', { id: node.id, nodeType: node.nodeType })
        // this.$router.push({ path: path })
        // this.$router.push({ name: path, query: { id: node.id } })
      } else {
        this.$store.commit('tab/setActiveTab', { id: node.id, nodeType: node.nodeType })
      }
    },
    // tab标签点击时，切换相应的路由
    tabClick(node, isDelete) {
      let index = this.openTabs.findIndex(tab => tab.name === node.name)
      if (index > -1) {
        // this.$router.push({ name: this.openTabs[index].path, query: { id: node.name } })
        if (isDelete === true) {
          this.$store.commit('tab/setActiveTab', { id: node.name, nodeType: node.nodeType });
        } else {
          this.$store.commit('tab/setActiveTab', { id: this.openTabs[node.index].name, nodeType: this.openTabs[node.index].nodeType });
        }
      }
      // 触发左侧树的定位
      Store.$emit('tabEditor_tabFixPosition', node.name)
      // this.tabFixPosition(node.$vnode.key)
      // this.tabClickStore({ seletedTabId: node.$vnode.key })
      // this.$router.push({ path: this.activeTabId });
    },
    /**
     * 隐藏标题栏方法
     * @param data
     * */
    showHideTabHead(data) {
      let _this = this
      if (data) {
        // 判断是全屏则隐藏标题栏
        _this.noTabs = true
        _this.$refs.tabs.$children[0].$el.style.display = 'none';
      } else {
        // 判断是非全屏则显示标题栏
        _this.noTabs = false
        _this.$refs.tabs.$children[0].$el.style.display = 'block';
      }
    },
    // 移除tab标签
    tabRemove(targetName) {
      // this.setIsCover(true);
      this.$store.commit('tab/deleteTab', targetName);
      if (this.activeTabId === targetName) {
        // 设置当前激活的路由
        if (this.openTabs && this.openTabs.length >= 1) {
          let tab = this.openTabs[this.openTabs.length - 1]
          this.tabClick(tab, true)
          // this.$store.commit('tab/setActiveTab', tab.name);
          // this.$router.push({ name: tab.path, query: { id: tab.name } })
        }/* else {
          // this.$router.push({ name: 'Home' });

        } */
      }
    },
    removeTabs(type, node) {
      let tabs = this.$store.state.tab.openTabs;
      let name = node.name
      let newTabs = [];
      switch (type) {
      case 1:// 关闭当前tab
        this.tabRemove(name);
        break;
      case 2:// 关闭其他
        let nowTab = tabs.find(tab => tab.name === node.name);
        newTabs.push(nowTab);
        this.$store.commit('tab/setTabs', newTabs);
        this.tabClick(node);
        break;
      case 3:// 关闭右侧
        let index = tabs.findIndex(tab => tab.name === node.name);
        newTabs = tabs.slice(0, index + 1);
        this.$store.commit('tab/setTabs', newTabs);
        let nowIndex = newTabs.findIndex(tab => tab.name === this.$store.state.tab.activeTabId);
        if (nowIndex < 0) {
          this.tabClick(node);
        }
        break;
      case 4:// 关闭全部
        this.$store.commit('tab/setTabs', newTabs);
        // this.$router.push({ name: 'Home' })
        break;
      default:break;
      }
    }/*,
    ...mapActions({
      removeTabsStore: "tab/removeTabs",
      removeTabStore: "tab/removeTab",
      addTabStore: "tab/addTab",
      tabClickStore: "tab/tabClick"
    }) */
  },
  watch: {
    tabType(val) {
      // 控制操作图标出现时tab位置
      if (val === '3') {
        this.$refs.tabs.$el.children[0].style.paddingRight = "155px"
      } else {
        this.$refs.tabs.$el.children[0].style.paddingRight = "0px"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-main.buss-tabs {
  .el-tabs {
    height: 100%;
  }
  .el-tabs__content {
    height: calc(100% - 40px);
    padding: 0;
    >.el-tab-pane {
      height: 100%;
    }
  }
  background-color: $bg-clr04;
  .el-tabs--card > .el-tabs__header{
    margin: 0;
    background-color: $bg-clr03;
    border-bottom: 1px solid $border-clr01;
    .el-tabs__item {
      font-size: 12px;
      color: $font-clr04;
      background-color: $bg-clr07;
      border: 1px solid $border-clr01;
      border-left: 1px solid transparent;
      &:first-child {
        border-left: 1px solid $border-clr01;
      }
      &.is-active{
        background-color: $bg-clr04;
        border-bottom: 1px solid transparent;
      }
      >span:first-child {
        float: left;
        display: inline-block;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .el-tabs__nav{
      border: 0;
    }
  }
}
.content-wrap {
  height: 100%;
  background-color: $bg-clr04;
  border-top: 0;
  padding: 10px;
  &.no-tabs {
    height: 100%;
  }
}
.design-opts {
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 9;
  color: $main-color;
  font-size: 16px;
  i {
    margin-left: 30px;
    cursor: pointer;
    &:hover {
      color: rgba($main-color, 0.7);
    }
  }
}
</style>
