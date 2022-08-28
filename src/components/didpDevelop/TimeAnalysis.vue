<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
    class="special-tabs"
    id="popover-parent"
  >
    <el-tab-pane name="register">
      <span slot="label"><el-button
        size="mini"
        round
      >表注册</el-button><el-divider direction="vertical" /></span>
      <div :style="{width: reWidth + 'px', position: 'relative'}">
        <OptBtn
          style="position: absolute; right: 20px; top: 20px;"
          slot="reference"
          icon-class="icon-A10301-records"
          label="表注册信息"
          @click="popVisiable = !popVisiable"
        />
        <div
          :style="{position: 'absolute', top: '50px', right: '20px', width: '200px' }"
          v-if="popVisiable"
        >
          <vue-draggable-resizable
            :w="width"
            :h="400"
            :handles="['ml']"
            :draggable="false"
            @resizing="onResize"
            :parent="false"
          >
            <div
              class="table-infos"
            >
              <el-scrollbar
                class="my-scrollbar"
                :style="{height: '100%', width: '100%'}"
              >
                <ul>
                  <li
                    v-for="item in tableInfos"
                    :key="item.index"
                    @click="expendDetail(item)"
                  >
                    <i
                      class="el-icon-arrow-right"
                      v-if="item.expend === false"
                    />
                    <i
                      class="el-icon-arrow-down expend"
                      v-if="item.expend === true"
                    />
                    <div
                      :class="[item.expend === false ? 'expend' : '']"
                      v-html="item.detail"
                    />
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </vue-draggable-resizable>
          <div class="popper-arrow" />
        </div>
        <el-button @click="test">
          test
        </el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane name="sql">
      <span slot="label"><el-button
        size="mini"
        round
      >SQL编辑</el-button><el-divider direction="vertical" /></span>
      <TablesDetail />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import OptBtn from "@/components/tools/OptBtn";
import TablesDetail from "./TablesDetail"
import VueDraggableResizable from 'vue-draggable-resizable'
// import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
export default {
  name: 'RealTimeAnalysis',
  components: {
    OptBtn,
    TablesDetail,
    VueDraggableResizable
  },
  data() {
    return {
      activeName: 'sql',
      tableInfos: [],
      popoverParent: 'body',
      reWidth: null,
      popVisiable: false,
      width: 200,
      height: 400,
      x: 0,
      y: 0
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    initTableInfos() {
      for (let i = 0; i < 30; i++) {
        this.tableInfos.push({ detail: 'CR\n\n\n\n\n\n\n\nEA<br/>TE TAB<br/>LE publicKafka1000009<br/>613310000096143\n(\ncol11 varchar)WITH(type=,groupId=', expend: false })
      }
    },
    expendDetail(item) {
      item.expend = !item.expend
    },
    test() {
      let _this = this
      this.reWidth = 300
      this.popVisiable = false
      this.$nextTick(() => {
        _this.popVisiable = true
      })
    },
    onResize(x, y, width, height) {
      this.width = width
      this.height = height
      this.x = x
      this.y = y
    }
  },
  mounted() {
    // this.popoverParent = document.querySelector('#popover-parent')
    this.initTableInfos()
  }
};
</script>
<style lang="scss">
@import "@/assets/css/themes/t01/theme.scss";
// 覆盖tabs样式
.special-tabs {
  /deep/.el-tabs__item {
    padding: 0 10px!important;
    &.is-active {
      .el-button.is-round {
        border: 1px solid rgba($main-color, 0.2);
        background-color: rgba($main-color, 0.1);
        color: $main-color;
      }
    }
    &:not(.is-active) {
      .el-button.is-round {
        border-color: transparent;
        background-color: transparent;
        &:hover {
          border-color: rgba($main-color, 0.2);
          background-color: rgba($main-color, 0.1);
          color: $main-color;
        }
      }
    }
  }
  /deep/.el-divider--vertical {
    margin: 0 0 0 20px;
  }
  /deep/.el-tabs__active-bar {
    height: 0px;
  }
  /deep/.el-tabs__nav-wrap::after {
    height: 1px;
  }
}
// 表注册信息浮窗
.table-infos {
  background: #fff;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  word-break: break-all;
  height: 100%;
  ul {
    padding: 0;
    li {
      padding: 10px 12px 10px 20px;
      position: relative;
      div {
        &.expend {
          height: 38px;
          overflow: hidden;
          display: box;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        cursor: pointer;
      }
      i {
        position: absolute;
        left: 5px;
        top: 15px;
        font-weight: bold;
        cursor: pointer;
        color: $main-color;
        &:hover{
          color: rgba($main-color, 0.5);
        }
      }
      &:hover {
        background-color: $bg-clr07;
      }
    }
  }
}
.handle-ml {
  position: absolute;
  left: 1px;
  width: 5px;
  height: 400px;
  cursor: e-resize;
  display: block!important;
}
.popper-arrow {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  top: -12px;
  right: 20px;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
  &:after {
    content: " ";
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #fff;
    border-width: 6px;
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
}
</style>
