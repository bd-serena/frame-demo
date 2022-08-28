<template>
  <el-aside
    class="home-frame-menu"
    :width="isCollapse ? '45px' : '200px'"
  >
    <div
      class="collapse-btn"
    >
      <i
        class="el-icon-d-arrow-left menu-slide"
        v-show="!isCollapse"
        @click="isCollapse = true"
      />
      <i
        class="el-icon-d-arrow-right menu-slide"
        v-show="isCollapse"
        @click="isCollapse = false"
      />
    </div>
    <el-scrollbar
      style="height:calc(100% - 30px);"
      :native="false"
      :noresize="false"
      tag="section"
    >
      <!-- <div
        class="menu-spec-bg"
      /> -->
      <div :class="{'aside-menu-tree': true}">
        <el-tree
          :data="menudata"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :current-node-key="menuId"
          @node-click="handleNodeClick"
          ref="menuTree"
        >
          <span
            class="frameMenu-tree-node"
            slot-scope="{ node, data }"
            :title="node.label"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="node.label"
              placement="right"
              v-if="isCollapse"
            >
              <i :class="node.level === 1 && node.childNodes.length > 0 ? 'el-icon-caret-right' : data.nodeIcon" />
            </el-tooltip>
            <i
              v-else
              :class="node.level === 1 && node.childNodes.length > 0 ? 'el-icon-caret-right' : data.nodeIcon"
            />
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import Store from "@/plugins/transData.js"
export default {
  name: "AsideMenu",
  data() {
    return {
      isCollapse: true,
      expendKey: '',
      menuId: '',
      menudata: [ // 此处的nodType与tabeditor中对应跳转到组件相关联
        {
          id: "1",
          label: "首页",
          nodeType: "2",
          nodeIcon: "icon-A10393_home"
        },
        {
          id: "2",
          label: "基础指标管理",
          nodeType: "3",
          nodeIcon: "icon-A10157_indicatorAnalyze"
        },
        {
          id: "3",
          label: "应用指标管理",
          children: [
            {
              id: "3-1",
              label: "应用纵表",
              nodeType: "3",
              nodeIcon: "icon-A10685_vertical"
            },
            {
              id: "3-2",
              label: "应用横表",
              nodeType: "3",
              nodeIcon: "icon-A10684_horizontal"
            }
          ]
        },
        {
          id: "4",
          label: "标签管理",
          children: [
            {
              id: "4-1",
              label: "标签查询",
              nodeType: "3",
              nodeIcon: "icon-A10193_addTag"
            }
          ]
        },
        {
          id: "5",
          label: "实时分析",
          nodeType: "5",
          nodeIcon: "icon-A10514_InternetOfThings"
        },
        {
          id: "6",
          label: "调度管理",
          children: [
            {
              id: "6-1",
              label: "任务监控",
              nodeType: "3",
              nodeIcon: "icon-A10686_Task-monitoring"
            },
            {
              id: "6-2",
              label: "流程监控",
              nodeType: "3",
              nodeIcon: "icon-A10693_channelOperation"
            },
            {
              id: "6-3",
              label: "日志查询",
              nodeType: "3",
              nodeIcon: "icon-A10695_logQuery"
            }
          ]
        },
        {
          id: "7",
          label: "分类管理",
          children: [
            {
              id: "7-1",
              label: "指标分类",
              nodeType: "3",
              nodeIcon: "icon-A10540_quotaAnalysisTool"
            },
            {
              id: "7-2",
              label: "应用分类",
              nodeType: "3",
              nodeIcon: "icon-A10169_resource"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      if (data.children) {
        // 还不是子节点，返回
        return;
      }
      Store.$emit('tabAdd', data)
    }
  },
  mounted() {
    let that = this
    Store.$on('tabEditor_tabFixPosition', (param) => {
      that.$refs.menuTree.setCurrentKey(param)
    })
    // this.expendKey = this.$refs.menuTree ? this.$refs.menuTree.currentNode.$parent.$vnode.data.key : ''
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.aside-menu-tree {
  padding: 10px 0px 7px 7px;
  /deep/.el-tree-node:focus > .el-tree-node__content {
    background-color: transparent;
  }
  /deep/.el-tree-node > .el-tree-node__children {
    padding-left: 8px;
  }
  /deep/.el-tree-node__content {
    height: 40px;
    padding-left: 0px!important;
  }
  /deep/.el-tree-node__content:hover {
    background-color: transparent;
  }
  /deep/.el-tree-node__expand-icon {
    display: none;
  }
  /deep/.el-tree-node__expand-icon.is-leaf {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: $bg-clr04;
    padding: 3px;
    margin: 2px 6px 0 6px;
    display: none;
  }
  /deep/.el-tree-node.is-current {
    > .el-tree-node__content {
      > .el-tree-node__expand-icon.is-leaf {
        background-color: $font-clr03;
        & + span {
          color: $font-clr03;
          >i {
            background-color: $bg-clr06;
            border-radius: 3px;
          }
        }
      }
    }
  }
  .frameMenu-tree-node{
    i {
      padding: 5px;
      margin-right: 12px;
      font-size: 16px;
      outline: none;
    }
    span {
      display: inline-block;
      vertical-align: 2px;
    }
  }
  .el-tree-node__expand-icon.expanded{
    &+ span {
      i {
        transform: rotate(90deg);
        display: inline-block;
      }
    }
  }
  .menu-slide{
    position: absolute;
    bottom: 0px;
    right: 0px;
    display: none;
    font-size: 20px;
    color: $font-clr01;
    cursor: pointer;
    z-index: 9;
  }
}
.home-frame-menu {
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.collapse-btn {
  height: 30px;
  border-bottom: 1px solid $bg-clr01;
  width: 100%;
}
.menu-slide{
  position: absolute;
  top: 5px;
  right: 50%;
  margin-right: -10px;
  font-size: 20px;
  color: $font-clr01;
  cursor: pointer;
  z-index: 9;
}
.menu-spec-bg {
  position: absolute;
  top: 0;
  left: 44px;
  z-index:9;
  width:calc(100% - 44px);
  height:100%;
  background-color:rgba($bg-clr04, 0.2);
}
</style>
