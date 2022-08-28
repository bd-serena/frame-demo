<template>
  <el-container
    class="indic-page"
    :id="'mgt-' + tabId"
  >
    <el-header
      style="height:50px;"
      :class="['indic-header', {'actived': tabDatas[activeTabId].activedBox === 'dim','baseKPI':this.kpiType === 0 }]"
      @click.native="setActivedBox('dim')"
      ref="dimWrap"
    >
      <main-title title="维度" />
      <div :class="['dim-list',{'bk-dim-list':this.kpiType === 0}]">
        <div
          class="bk-tag"
          style=""
          v-for="(item,index) in tagList"
          :key="item.index"
          @mouseenter="inDimTag(item)"
          @mouseleave="outDimTag(item)"
        >
          <div class="dim-tag">
            <span class="tag-cont">{{ item.name }}</span>
          </div>
          <div
            class="delTag"
            v-show="item.isdel==true"
            @click="deleteDimTag(index)"
          >
            <span class="icon-A10068_close" />
          </div>
          <div
            style="width:86px;margin-top: -30px;height: 28px;"
            v-show="kpiType === 0"
          >
            <el-select
              v-model="item.value"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="ditem in dimOption"
                :key="ditem.value"
                :label="ditem.label"
                :value="ditem.value"
              />
            </el-select>
          </div>
        </div>
      </div>
    </el-header>
    <el-main
      :class="['indic-body', {'actived': tabDatas[activeTabId].activedBox === 'kpi'}]"
      @click.native="setActivedBox('kpi')"
    >
      <el-container>
        <el-header style="height: 50px; padding: 0;">
          <main-title title="生成指标" />
          <div class="kpi-list">
            <el-button
              type="primary"
              plain
              size="mini"
              @click="addSymbol('(')"
            >
              (
            </el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              @click="addSymbol('+')"
            >
              +
            </el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              @click="addSymbol('-')"
            >
              -
            </el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              @click="addSymbol('*')"
            >
              *
            </el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              @click="addSymbol('/')"
            >
              /
            </el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              @click="addSymbol(')')"
            >
              )
            </el-button>
            <el-popover
              placement="right"
              width="156"
              trigger="click"
            >
              <el-input
                v-model="num"
                @blur="handleNumChange"
                label="任意数值"
                size="mini"
              />
              <el-button
                type="primary"
                plain
                size="mini"
                slot="reference"
                style="margin-left: 30px;"
              >
                任意数值
              </el-button>
            </el-popover>
          </div>
        </el-header>
        <el-main style="height: 100%; padding-top: 0;">
          <div class="kpi-up">
            <el-table
              :data="tableData"
              style="width: 100%"
              height="100%"
              size="mini"
              @cell-click="editKpi"
            >
              <el-table-column
                fixed
                prop="address"
                label="指标名称"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.address"
                    size="mini"
                    @focus="disableEdit(scope)"
                    v-if="scope.row.kpiNameEdit"
                  />
                  <span v-if="!scope.row.kpiNameEdit">{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="kpiType"
                label="类型"
                width="120"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.kpiType"
                    size="mini"
                    @focus="disableEdit(scope)"
                  >
                    <el-option
                      label="比值"
                      value="1"
                    />
                    <el-option
                      label="非比值"
                      value="2"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="molecular"
                label="分子"
                width="250"
              >
                <template slot-scope="scope">
                  <el-input v-if="scope.row.molecularEdit">
                    <template>
                      <el-tag
                        :key="tag.index"
                        v-for="tag in scope.row.molecular"
                        closable
                        :disable-transitions="false"
                      >
                        {{ tag }}
                      </el-tag>
                    </template>
                  </el-input>
                  <!-- <el-select
                    v-if="false"
                    v-model="scope.row.molecular"
                    multiple
                    filterable
                    clearable
                    allow-create
                    default-first-option
                    placeholder="请选择指标"
                    size="mini"
                    remote
                    style="width: 235px;"
                    @focus="resetIndex"
                    v-if="scope.row.molecularEdit"
                  /> -->
                  <span v-if="!scope.row.molecularEdit">{{ scope.row.molecular.join('') }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="denominator"
                label="分母"
                width="250"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.denominator"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择指标"
                    size="mini"
                    remote
                    style="width: 235px;"
                    v-if="scope.row.denominatorEdit"
                    @focus="resetIndex"
                  />
                  <span v-if="!scope.row.denominatorEdit">{{ scope.row.denominator.join('') }}</span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="140"
              >
                <template slot-scope="scope">
                  <div class="opt-column">
                    <i
                      class="icon-A10689_dataProcessing"
                      @click="viewPre(scope)"
                    />
                    <i
                      class="icon-A10687_SQL"
                      @click="deleteRow(scope, tableData)"
                      title="sql查看"
                    />
                    <i
                      class="icon-A10065_delete"
                      @click="deleteRow(scope, tableData)"
                      title="删除"
                      v-if="tableData.length > 1"
                    />
                    <i
                      class="icon-A10073_add"
                      @click="addRow(scope, tableData)"
                      title="添加"
                      v-if="(tableData.length - 1) === scope.$index"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div
            class="kpi-down"
            v-if="kpiSelected"
          >
            <el-row :gutter="30">
              <el-col :span="15">
                <div class="kpi-edit-box">
                  <div class="down-header">
                    <sub-title :msg="currentText" />
                    <div style="float: right;">
                      <OptBtn
                        icon-class="icon-A10670_InsertFunction"
                        label="统计函数"
                      />
                      <OptBtn
                        icon-class="icon-A10688_senior"
                        label="高级模式"
                      />
                    </div>
                  </div>
                  <div class="kpi-edit-left">
                    <el-container>
                      <el-aside width="103px">
                        <el-card shadow="never">
                          <el-scrollbar
                            class="my-scrollbar"
                            :style="{height: '100%', width: '93px'}"
                          >
                            <el-button
                              v-for="item in targetList"
                              :key="item.index"
                              :type="item.isUsed ? 'primary' : ''"
                              size="mini"
                              round
                              @click="handleUsed(item)"
                            >
                              {{ item.target_name }}
                            </el-button>
                          </el-scrollbar>
                        </el-card>
                      </el-aside>
                      <el-main>
                        <el-container>
                          <el-header style="height: 50px; padding-right: 0;">
                            <div class="func-detail">
                              <span>统计函数：</span>
                              <el-popover
                                placement="bottom-start"
                                width="356"
                                trigger="click"
                              >
                                <label slot="reference">{{ funcSum }}</label>
                                <el-input
                                  v-model="funcSum"
                                  size="mini"
                                  type="textarea"
                                  readonly
                                  :rows="3"
                                />
                              </el-popover>
                            </div>
                            <div class="func-detail">
                              <span>口&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;径：</span>
                              <el-popover
                                placement="bottom-start"
                                width="356"
                                trigger="click"
                              >
                                <label slot="reference">{{ caliber }}</label>
                                <el-input
                                  v-model="caliber"
                                  size="mini"
                                  type="textarea"
                                  readonly
                                  :rows="3"
                                />
                              </el-popover>
                            </div>
                          </el-header>
                          <el-main style="padding: 0 0 0 20px;">
                            <div class="special-table">
                              <el-table
                                :data="targetList.filter((data) => { return data.isUsed })"
                                style="width: 100%"
                                height="100%"
                                size="mini"
                              >
                                <el-table-column
                                  fixed
                                  prop="target_name"
                                  label="指标名称"
                                  show-overflow-tooltip
                                />
                                <el-table-column
                                  prop="calcRule"
                                  label="运算规则"
                                  width="100"
                                >
                                  <template slot-scope="scope">
                                    <el-select
                                      v-model="scope.row.calcRule"
                                      size="mini"
                                    >
                                      <el-option
                                        :label="option.label"
                                        :value="option.value"
                                        v-for="option in calcRuleOptions"
                                        :key="option.index"
                                      />
                                    </el-select>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  prop="condiValue1"
                                  label="条件值1"
                                  width="115"
                                >
                                  <template slot-scope="scope">
                                    <el-select
                                      v-model="scope.row.condiValue1"
                                      size="mini"
                                    >
                                      <el-option
                                        label="比值"
                                        value="1"
                                      />
                                      <el-option
                                        label="非比值"
                                        value="2"
                                      />
                                    </el-select>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  prop="condiValue2"
                                  label="条件值2"
                                  width="115"
                                >
                                  <template slot-scope="scope">
                                    <el-select
                                      v-model="scope.row.condiValue1"
                                      size="mini"
                                    >
                                      <el-option
                                        label="比值"
                                        value="1"
                                      />
                                      <el-option
                                        label="非比值"
                                        value="2"
                                      />
                                    </el-select>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  fixed="right"
                                  label="操作"
                                  width="60"
                                >
                                  <template slot-scope="scope">
                                    <div class="opt-column">
                                      <i
                                        class="icon-A10065_delete"
                                        @click="deleteSelectedKpi(scope)"
                                        title="删除"
                                      />
                                    </div>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </div>
                          </el-main>
                        </el-container>
                      </el-main>
                    </el-container>
                  </div>
                </div>
              </el-col>
              <el-col :span="9">
                <div class="sql-box">
                  <div class="down-header">
                    <sub-title msg="SQL预览" />
                  </div>
                  <el-card shadow="never">
                    <el-scrollbar
                      class="my-scrollbar"
                      :style="{height: '100%'}"
                    >
                      select * from table ()select * from table ()select * from table ()
                      select * from table ()select * from table ()select * from table ()select *
                      from table ()select * from table ()select * from table ()select * from table ()
                      select * from table ()select * from table ()select * from table ()select * from
                      table ()select * from table ()select * from table ()select * from table ()select *
                      from table ()select * from table ()select * from table ()select * from table ()sel
                      ect * from table ()select * from table ()select * from table ()select * from table
                      ()select * from table ()select * from table ()select * from table ()select * from
                      table ()select * from table ()select * from table ()
                    </el-scrollbar>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Store from "@/plugins/transData.js";
import MainTitle from "@/components/tools/MainTitle";
import { mapState, mapMutations } from "vuex";
import SubTitle from "@/components/tools/SubTitle";
import OptBtn from "@/components/tools/OptBtn";
export default {
  name: "KpiMgt",
  components: {
    MainTitle,
    SubTitle,
    OptBtn
  },
  props: {
    'tabId': {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      wkpiType: '',
      num: 1,
      currentText: "",
      kpiSelected: false,
      currentTagIndex: -1,
      calcRuleOptions: [
        {
          // 计算规则
          value: "1",
          label: "="
        },
        {
          value: "2",
          label: ">"
        },
        {
          value: "3",
          label: "<"
        }
      ],
      showCaliberDetail: false,
      caliber:
        "（时间：统计日）并且（（是否4G：否）或者（是否高价值：否）或者（是否高价值：否）或者（是否高价值：否））", // 口径
      funcSum:
        "复数正复数正数复数正数复数正数复数正数复数正数复数正数复数正数复数正数复数正数复数正数数", // 统计函数
      tableData1: [
        {
          kpiName: "1",
          calcRule: "1",
          condiValue1: "1",
          condiValue2: "1"
        },
        {
          kpiName: "1",
          calcRule: "1",
          condiValue1: "1",
          condiValue2: "1"
        },
        {
          kpiName: "1",
          calcRule: "1",
          condiValue1: "1",
          condiValue2: "1"
        },
        {
          kpiName: "1",
          calcRule: "1",
          condiValue1: "1",
          condiValue2: "1"
        },
        {
          kpiName: "1",
          calcRule: "1",
          condiValue1: "1",
          condiValue2: "1"
        }
      ],
      tableData: [
        {
          // 数据中请默认构造molecularEdit，denominatorEdit为false,kpiNameEdit为false
          kpiType: "1",
          molecular: ["上海"],
          denominator: ["普陀区"],
          address: "上海市普陀区金沙江路 1518 弄",
          molecularEdit: false,
          denominatorEdit: false,
          kpiNameEdit: false
        }
      ],
      dimOption: [
        {
          value: '选项1',
          label: '统计日'
        }, {
          value: '选项2',
          label: '月统计'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '月末'
        }, {
          value: '选项5',
          label: '前一天'
        }, {
          value: '选项6',
          label: '前两个星期'
        }
      ],
      value: ''
    };
  },
  computed: {
    ...mapState({
      dimList: state => state.tabRightMenu.dimList,
      kpiType: state => state.tab.kpiType,
      tabDatas: state => state.tab.tabDatas,
      activeTabId: state => state.tab.activeTabId
    }),
    tagList() {
      return this.tabDatas[this.activeTabId].tagList
    },
    targetList() {
      return this.tabDatas[this.activeTabId].targetList
    },
    currentEditData() {
      return this.tabDatas[this.activeTabId].currentEditData
    }
  },
  methods: {
    deleteRow(scope, rows) {
      rows.splice(scope.$index, 1);
    },
    addRow(scope, rows) {
      const item = {
        // 数据中请默认构造molecularEdit，denominatorEdit为false,kpiNameEdit为false
        kpiType: "1",
        molecular: [],
        denominator: [],
        address: "输入添加的指标名称",
        molecularEdit: false,
        denominatorEdit: false,
        kpiNameEdit: false
      };
      rows.push(item);
    },
    editKpi(row, column, cell, event) {
      // this.currentEditData = row;
      this.resetCurrentEditData(row)
      this.tableData.forEach((item, index) => {
        item.molecularEdit = false;
        item.denominatorEdit = false;
        item.kpiNameEdit = false;
      });
      if (column.label === "分子") {
        row.molecularEdit = true;
      } else if (column.label === "分母") {
        if (row.kpiType !== "2") {
          // 非比值 分母不可编辑
          row.denominatorEdit = true;
        }
      } else if (column.label === "指标名称") {
        row.kpiNameEdit = true;
      } else {
        row.molecularEdit = false;
        row.denominatorEdit = false;
      }
    },
    disableEdit(scope) {
      this.tableData.forEach((item, index) => {
        item.molecularEdit = false;
        item.denominatorEdit = false;
      });
    },
    handleNumChange(ev) {
      // 计数器改变
      if (this.currentEditData.molecularEdit) {
        this.currentEditData.molecular.splice(
          this.currentTagIndex + 1,
          0,
          ev.currentTarget.value
        );
      } else if (this.currentEditData.denominatorEdit) {
        this.currentEditData.denominator.splice(
          this.currentTagIndex + 1,
          0,
          ev.currentTarget.value
        );
      }
    },
    addSymbol(val) {
      this.setCurrentEditData(val)
    },
    someFunction(val) {
      // console.log(val)
    },
    inDimTag(item) {
      item.isdel = true;
    },
    outDimTag(item) {
      item.isdel = false;
    },
    deleteDimTag(index) {
      let data = this.tagList;
      data.splice(index, 1);
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].id === item.id) {
      //     data.splice(i, 1);
      //   }
      // }
    },
    handleUsed(item) {
      // 选中指标操作
      if (!item.isUsed) {
        item.isUsed = false;
      }
      item.isUsed = !item.isUsed;
    },
    deleteSelectedKpi(scope) {
      scope.row.isUsed = false;
    },
    resetIndex() {
      if (this.currentEditData.molecularEdit) {
        this.currentTagIndex = this.currentEditData.molecular.length - 1;
      } else if (this.currentEditData.denominatorEdit) {
        this.currentTagIndex = this.currentEditData.denominator.length - 1;
      }
    },
    handerClick(ev) {
      const self = this
      if (ev.target.className === "el-select__tags-text") {
        let _nodes = ev.target.parentNode.parentNode.children;
        for (let i = 0; i < _nodes.length; i++) {
          _nodes[i].tagIndex = i;
        }
        let ta = document.getElementsByClassName("tagactived")[0]
          ? document.getElementsByClassName("tagactived")[0].className
          : "";
        if (ta.indexOf("tagactived") > -1) {
          document.getElementsByClassName(
            "tagactived"
          )[0].className = ta.substring(0, ta.length - 11);
        }
        let pclass = ev.target.parentNode.className;
        ev.target.parentNode.className = pclass + " tagactived";
        self.kpiSelected = true;
        self.currentText = ev.target.innerText;
        self.currentTagIndex = ev.target.parentNode.tagIndex;
        self.someFunction(ev.target.innerText);
      }
    },
    ...mapMutations({
      setActivedBox: "tab/setActivedBox",
      setCurrentEditData: "tab/setCurrentEditData",
      resetCurrentEditData: "tab/resetCurrentEditData",
      setCurrentInputTag: "tab/setCurrentInputTag"
    })
  },
  mounted() {
    const self = this;
    Store.$on("addSymbol", param => {
      // 注册一个添加分子的方法给其他组件使用
      this.addSymbol(param);
    });
    // document.querySelector("#mgt" + this.tabId).removeEventListener("click", ev => { self.handerClick(ev) })
    document.querySelector("#mgt-" + this.tabId).addEventListener(
      "click",
      ev => {
        self.handerClick(ev)
      },
      true
    );
  },
  watch: {
    currentEditData: {
      handler(val) {
        if (!this.currentEditData) {
          return
        }
        if (this.currentText === "") {
          if (this.currentEditData.molecularEdit) {
            this.currentTagIndex = this.currentEditData.molecular.length - 1;
          } else if (this.currentEditData.denominatorEdit) {
            this.currentTagIndex = this.currentEditData.denominator.length - 1;
          }
        }
      },
      deep: true
    },
    currentTagIndex(val) {
      this.setCurrentInputTag(val)
    },
    kpiType(val) {
      this.wkpiType = val;
    }

  }
};
</script>

<style lang="scss" scoped>
.indic-header {
  border: 1px dashed $border-clr01;
  padding: 0;
  background-color: $bg-clr08;
  &.actived {
    border: 1px dashed $main-color;
  }
}
.baseKPI {
  height: 70px !important;
  padding-top: 7px;
}
/deep/.bk-dim-list .el-input__inner{
    background-color: #f2f6fc!important;
    border: 0px!important;
    padding:0 30px 0 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

}
/deep/.bk-dim-list .el-input .el-input__inner:hover{
    color: $main-color;
}
.indic-body {
  &.actived {
    border: 1px dashed $main-color;
  }
  margin-top: 10px;
  border: 1px dashed $border-clr01;
  padding: 0;
  background-color: $bg-clr08;
  height: 100%;
  /deep/.el-select .el-tag {
    cursor: pointer;
    &:hover,
    &.tagactived {
      background-color: rgba($main-color, 0.2);
    }
  }
  .opt-column {
    i {
      font-size: 16px;
      color: $main-color;
      display: inline-block;
      margin: 5px;
      cursor: pointer;
    }
  }
  .down-header {
    height: 34px;
    line-height: 34px;
    border-bottom: 1px solid $border-clr01;
  }
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.dim-list,
.kpi-list {
  float: right;
  height: 50px;
  line-height: 50px;
  width: calc(100% - 100px);
  /deep/.el-button + .el-button {
    margin-left: 30px;
  }
  /deep/.el-button--primary.is-plain {
    background-color: $bg-clr04;
    &:hover, &:focus {
      color: $main-color;
    }
  }
}
.bk-dim-list {
  height: 63px;
}
.bk-tag{
width:112px;padding: 0 15px;display: inline-block;height: 55px;position:relative;
}
.bk-dim-list .bk-tag{
border-right: 1px solid #dcdfe6;
}
.bk-tag:last-child{
  border-right: 0 !important;
}
.bk-dim-list .dim-tag {
  margin-top: 0px;
}
.indic-page {
  .main-title {
    /deep/.el-aside {
      width: auto !important;
      height: 50px;
      line-height: 50px;
    }
  }
}
.kpi-down {
  height: 60%;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
      > div {
        display: flex;
        flex-direction: column;
        height: 100%;
        &.sql-box .el-card {
          flex: 1;
          margin-top: 10px;
        }
        &.kpi-edit-box {
          .el-card {
            height: 100%;
          }
          .el-button {
            margin: 5px 0;
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  /deep/.el-card__body {
    height: 100%;
    padding: 10px;
  }
  .kpi-edit-left {
    flex: 1;
    margin-top: 10px;
    height: calc(100% - 45px);
    /deep/.el-main {
      padding: 0;
      height: 100%;
    }
  }
}
.kpi-up {
  height: 40%;
  /deep/.el-table th.is-leaf {
    border-bottom: 2px solid $main-color;
  }
  /deep/.el-table {
    border: 1px solid $bg-clr03;
    thead {
      color: $font-clr02;
    }
  }
}
.special-table {
  height: 100%;
  padding: 0 10px;
  background-color: $bg-clr04;
  /deep/.el-table {
    td {
      border: 0;
    }
    thead {
      font-weight: normal;
    }
    th {
      padding: 2px 0;
    }
  }
}
.func-detail {
  height: 22px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: $main-color;
  span {
    &:first-child {
      color: $font-clr04;
      width: 64px;
      text-align: right;
      display: inline-block;
    }
    label {
      color: $main-color;
      cursor: pointer;
    }
  }
}
.dim-tag {
  width: 80px;
  height: 28px;
  max-width: 80px;
  background-color: $main-color;
  color: $font-clr01;
  display: inline-block;
  margin-top: 10px;
  line-height: 28px;
  border-radius: 20px;
  padding: 0 15px;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  font-size: 12px;
  text-align: center;
}
.bk-dim-tag {
  margin-top: 0px;
}
.tag-cont {
  display: inline-block;
  width: auto;
  max-width: 60px;
  height: 28px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
}
.delTag {
  width: 15px;
  height: 15px;
  background-color: $tab-color01;
  border: 1px solid $font-clr01;
  position: absolute;
  top: 5px;
  right: 13px;
  font-size: 12px;
  text-align: center;
  border-radius: 10px;
  line-height: 15px;
  color: $font-clr01;
}
.bk-dim-list .delTag{
  top: -2px;
}
</style>

