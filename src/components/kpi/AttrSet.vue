<template>
  <div class="attrSet">
    <div class="chose_wrap">
      <el-row class="el-row-hg">
        <el-col :span="8">
          <div
            class="grid-content k_type"
          >
            指标类型
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content k_select">
            <el-select
              v-model="tar_value"
              placeholder="请选择"
              size="mini"
              @change="kpiTyChange()"
            >
              <el-option
                v-for="item in tar_option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="el-row-hg">
        <el-col :span="8">
          <div class="grid-content k_type">
            数据周期
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content k_select">
            <el-select
              v-model="period"
              placeholder="请选择"
              size="mini"
              :disabled="tar_value===''"
            >
              <el-option
                v-for="item in per_option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="el-row-hg">
        <el-col :span="8">
          <div class="grid-content k_type">
            元素选择
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content k_select">
            <el-button
              size="mini"
              class="chose-element"
              @click="choseElement"
            >
              请选择
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dim_wrap">
      <el-row class="el-row-12">
        <el-col
          :span="24"
          style="height:100%; padding: 10px 0 5px 0;"
          :class="{'disabled': activedBox === 'kpi'}"
        >
          <div
            class="mask-panel"
            v-if="activedBox === 'kpi'"
          />
          <div class="col-title">
            <span class="icon-A10602_OpenGovernance" />
            <label>维度</label>
          </div>
          <div
            class="cols-item"
            style="height:calc(100% - 20px);padding: 10px 0;"
          >
            <el-scrollbar
              style="height:100%;"
              :native="false"
              :noresize="false"
              tag="section"
            >
              <el-tag
                v-for="item in dimList"
                class="dimTag"
                :key="item.dim_id"
                @click="addDimTag(item)"
              >
                <span class="col-span">
                  <span>{{ item.dim_name }}</span>
                </span>

                <span
                  style="float:right; position: absolute; right: 10px;"
                  @click.stop="deleteDimItem(item)"
                >
                  <el-tooltip
                    effect="dark"
                    content="删除"
                    placement="top-start"
                  >
                    <i
                      class="opt-btn el-icon-delete"
                    />
                  </el-tooltip>
                </span>
                <span style="position: absolute;right: -22px;">
                  <el-tooltip
                    effect="dark"
                    content="隐藏"
                    placement="top-start"
                  >
                    <i
                      class="opt-btn icon-A10608_attention"
                      @click="deleteItem(item)"
                    />
                  </el-tooltip>
                </span>
              </el-tag>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>

      <el-row
        class="el-row-12"
      >
        <el-col
          :span="24"
          style="height:100%; padding: 15px 0 0 0;"
          :class="{'disabled': activedBox === 'dim'}"
        >
          <div
            class="mask-panel"
            v-if="activedBox === 'dim'"
          />
          <div class="col-title2">
            <span class="icon-A10481_ContentBlock" />
            <label>指标列表</label>
          </div>
          <div
            class="cols-item"
            style="height:calc(100% - 20px);padding: 10px 0;"
          >
            <el-scrollbar
              style="height:100%;"
              :native="false"
              :noresize="false"
              tag="section"
            >
              <el-tag
                v-for="item in targetList"
                class="k_List"
                :key="item.target_id"
                @click="addSymbol(item.target_name)"
              >
                <span class="col-span">
                  <span>{{ item.target_name }}</span>
                </span>

                <span style="float:right; position: absolute; right: 10px;">

                  <el-tooltip
                    effect="dark"
                    content="删除"
                    placement="top-start"
                  >
                    <i
                      class="opt-btn el-icon-delete"
                      @click.stop.prevent="deleteTarItem(item)"
                    />
                  </el-tooltip>
                </span>
                <span style="position: absolute;right: -22px;">
                  <el-tooltip
                    effect="dark"
                    content="隐藏"
                    placement="top-start"
                  >
                    <i
                      class="opt-btn icon-A10608_attention"
                      @click="deleteItem(item)"
                    />
                  </el-tooltip>
                </span>
              </el-tag>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "AttrSet",
  data() {
    return {
      tar_option: [{
        value: 1,
        label: '计算指标'
      }, {
        value: 0,
        label: '基础指标'
      }],
      per_option: [{
        value: '选项1',
        label: '日周期'
      }, {
        value: '选项2',
        label: '月周期'
      }],
      elements_opt: [{
        value: '选项1',
        label: '计算指标'
      }, {
        value: '选项2',
        label: '基础指标'
      }],
      tar_value: '',
      period: '',
      element: ''
    }
  },
  computed: {
    ...mapState({
      kpiType: state => state.tab.kpiType,
      tabDatas: state => state.tab.tabDatas,
      activeTabId: state => state.tab.activeTabId
    }),
    dimList() {
      return this.tabDatas[this.activeTabId].dimList
    },
    tagList() {
      return this.tabDatas[this.activeTabId].tagList
    },
    targetList() {
      return this.tabDatas[this.activeTabId].targetList
    },
    currentEditData() {
      return this.tabDatas[this.activeTabId].currentEditData
    },
    activedBox() {
      return this.tabDatas[this.activeTabId].activedBox
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations({
      addWdTag: "tab/addWdTag",
      setActivedBox: "tabRightMenu/setActivedBox",
      setKpiType: "tab/setKpiType",
      setDimList: "tab/setDimList",
      setTargetList: "tab/setTargetList",
      setCurrentEditData: "tab/setCurrentEditData"
    }),
    deleteDimItem(node) {
      let data = this.dimList;
      let dimData = this.tagList;
      for (let j = 0; j < dimData.length; j++) {
        if (dimData[j].id === node.dim_id) {
          this.$message({
            message: "维度在使用，不能删除",
            type: "warning"
          });
          return;
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].dim_id === node.dim_id) {
          data.splice(i, 1);
        }
      }
    },
    deleteTarItem(node) {
      if (node.isUsed) {
        this.$message({
          message: "指标在使用，不能删除",
          type: "warning"
        });
        return
      }
      let data = this.targetList;
      for (let i = 0; i < data.length; i++) {
        if (data[i].target_id === node.target_id) {
          data.splice(i, 1);
        }
      }
    },
    addSymbol(val) {
      // Store.$emit('addSymbol', val)
      this.setCurrentEditData(val)
    },
    addDimTag(item) {
      let data = this.tagList;
      let tarData = {
        id: "",
        name: "",
        isdel: false
      };
      if (data.length === 8) {
        this.$message({
          message: "维度不能超过8个",
          type: "warning"
        });
        return;
      }
      if (data.length === 0) {
        tarData.id = item.dim_id;
        tarData.name = item.dim_name;
        tarData.isdel = false;
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === item.dim_id) {
            // 维度是否可以重复选择？？
            // this.$message({
            //   message: "维度已存在",
            //   type: "warning"
            // });
            // return;
          } else {
            tarData.id = item.dim_id;
            tarData.name = item.dim_name;
            tarData.isdel = false;
          }
        }
      }

      if (tarData.id !== "") {
        this.addWdTag(tarData);
      }
    },
    kpiTyChange(val) {
      this.setKpiType(this.tar_value);
    },
    choseElement() {
      let dimList = [
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
      ]
      let targetList = [
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
      ]
      this.setDimList(dimList)
      this.setTargetList(targetList)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/themes/t01/theme.scss";
 .attrSet{
   height: 100%;
   padding: 10px;
 }
 /deep/.grid-content .el-input__inner{
        color: $bg-clr04;
        background-color: $bg-clr05;
        border: 1px solid $bg-clr01;
     }
 /deep/.el-select:hover .el-input__inner{
       border-color: $main-color;
     }
 /deep/.grid-content .input-search.el-input .el-input__inner:focus{
        border-color: $main-color;
     }
 /deep/.el-input.is-disabled .el-input__inner{
        background-color: $bg-clr05;
        border: 1px solid $bg-clr01;
     }
 /deep/.el-select .el-input.is-disabled .el-input__inner:hover{
        border-color: $main-color;
     }
   /deep/.k_select .el-input.el-input--mini.el-input--suffix  input{
         height: 28px!important;
     }
 .chose_wrap{
   height: 120px;
   width: 100%;
 }
 .dim_wrap{
   height: calc(100% - 120px);
   width: 100%;
 }
 .el-row-hg{
   height: 40;
   width: 100%;
   line-height: 40px;
 }
  .el-row-hg .k_type{
    font-size: 14px;
    color: $font-clr01;
    text-align: center;
    line-height: 40px;
 }
 .el-row-hg .k_select{
    padding-left: 10px;
    /deep/.el-button {
      &.chose-element {
        background-color: $bg-clr05;
        width: 110px;
        color: $font-clr01;
        border: 1px solid $bg-clr01;
        &:hover {
          border: 1px solid $main-color;
        }
      }
    }
 }
 .el-row-12{
    height: 50%;
 }
  .col-title{
    font-size: 14px;
    color: $font-clr03;
 }
  .col-title label, .col-title2 label{
    padding-left:5px;
  }
 .col-title2{
    font-size: 14px;
    color: $title-clr01;
 }
 .dimTag.el-tag, .k_List.el-tag {
   >span:first-child {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
   }
 }
 .dimTag.el-tag{
    width: 150px;
    margin-bottom: 10px;
    position:relative;
    color: #afc0d0;
    border:1px solid $font-clr03;
    background-color: transparent;
 }
 .k_List.el-tag{
   width: 150px;
   margin-bottom: 10px;
   position:relative;
   color: #afc0d0;
   border:1px solid $title-clr01;
   background-color: transparent;
 }
 .disabled {
   .col-title, .col-title2 {
     color: $disable-clr01;
   }
   .el-tag {
     border: 1px solid $disable-clr01;
     color: $disable-clr01;
   }
 }
 .mask-panel {
   height: 100%;
   width: 100%;
   position: absolute;
   z-index: 9;
 }
   /* 滚动条 */
  /deep/.dim_wrap .el-tabs__nav-scroll {
    padding-left: 225px;
  }
  /deep/.dim_wrap .tabOption .el-tabs__nav-scroll .el-tabs__nav {
    height: 0;
  }
  /deep/.dim_wrap .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  /deep/.dim_wrap .table-wrap .el-scrollbar__view {
    padding-right: 10px;
  }
 /deep/.dim_wrap .table-wrap .el-scrollbar__view > div {
    margin-bottom: 10px;
  }
</style>


