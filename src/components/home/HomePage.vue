<template>
  <!--  <el-scrollbar-->
  <!--    class="default-sroll"-->
  <!--  >-->

  <div style="height: 100%; overflow: hidden;">
    <el-scrollbar
      class="default-sroll"
      style="height:100%;"
      :native="false"
      :noresize="false"
      tag="section"
    >
      <el-row :gutter="20">
        <div
          class="full-row"
          style="padding:0 10px;"
        >
          <div class="border-row-title">
            <main-title title="指标概览" />
          </div>
          <div class="more">
            更多>>
          </div>
        </div>
        <el-col :span="16">
          <div class="block-wrap">
            <el-row
              :gutter="10"
            >
              <el-col :span="6">
                <div class="card-block big-card">
                  <div class="card-content">
                    <div class="icon-wrap bg-color1">
                      <span class="icon icon-A10122_goal" />
                    </div>
                    <div class="row-num">
                      3000
                    </div>
                    <div class="row-title">
                      指数总数
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col
                :span="6"
                v-for="(item,index) in data1"
                :key="index"
              >
                <div class="card-block">
                  <div class="card-content">
                    <div class="row-title">
                      {{ item.title }}
                    </div>
                    <div class="row-num1">
                      {{ item.num1 }}
                    </div>
                    <div class="row-num2">
                      占比:{{ item.num2 }}%
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="block-wrap">
            <div
              class="full-row"
              style="height: 12px; line-height: 12px;"
            >
              <div class="simple-row-title">
                <div
                  title="指标热度排行榜TOP5"
                  style="font-size: 14px;"
                >
                  指标热度排行榜TOP5
                </div>
              </div>
              <div class="more">
                >>
              </div>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%"
              height="189"
              size="small"
            >
              <el-table-column
                prop="rank"
                label="排名"
                width="50"
              />
              <el-table-column
                prop="name"
                label="指标名称"
              />
              <el-table-column
                prop="visits"
                label="访问量"
              />
            </el-table>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <div class="full-row">
            <div class="normal-row-title">
              <main-title title="指标任务概览" />
            </div>
            <div class="more">
              更多>>
            </div>
          </div>
          <div class="block-wrap">
            <el-row
              :gutter="10"
            >
              <el-col :span="8">
                <div class="card-block big-card">
                  <div class="card-content">
                    <div class="icon-wrap bg-color2">
                      <span class="icon icon-A10097_detail" />
                    </div>
                    <div class="row-num">
                      3000
                    </div>
                    <div class="row-title">
                      任务总数
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col
                :span="8"
                v-for="(item,index) in data2"
                :key="index"
              >
                <div class="card-block">
                  <div class="card-content">
                    <div class="row-title">
                      {{ item.title }}
                    </div>
                    <div class="row-num1">
                      {{ item.num1 }}（个）
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="full-row">
            <div class="normal-row-title">
              <main-title title="标签概览" />
            </div>
            <div class="more">
              更多>>
            </div>
          </div>
          <div class="block-wrap">
            <el-row
              :gutter="10"
            >
              <el-col :span="8">
                <div class="card-block big-card">
                  <div class="card-content">
                    <div class="icon-wrap bg-color3">
                      <span class="icon icon-A10114_tag" />
                    </div>
                    <div class="row-num">
                      3000
                    </div>
                    <div class="row-title">
                      标签总数
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col
                :span="8"
                v-for="(item,index) in data3"
                :key="index"
              >
                <div class="card-block">
                  <div class="card-content">
                    <div class="row-title">
                      {{ item.title }}
                    </div>
                    <div class="row-num1">
                      {{ item.num1 }}（个）
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <div class="full-row">
            <div class="normal-row-title">
              <main-title title="日重点指标趋势波动" />
            </div>
          </div>
          <div class="block-wrap">
            <ve-line
              :data="chartData1"
              :extend="chartExtend1"
              height="218px"
            />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="full-row">
            <div class="normal-row-title">
              <main-title title="月重点指标趋势波动" />
            </div>
          </div>
          <div class="block-wrap">
            <ve-line
              :data="chartData2"
              :extend="chartExtend2"
              height="218px"
            />
          </div>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>
<script>
import MainTitle from "@/components/tools/MainTitle";
export default {
  components: {
    MainTitle
  },
  data() {
    return {
      data1: [
        {
          title: "有效指标数",
          num1: 2900,
          num2: 90
        },
        {
          title: "无效指标数",
          num1: 100,
          num2: 10
        },
        {
          title: "当月新增指标数",
          num1: 200,
          num2: 20
        },
        {
          title: "当月下线指标数",
          num1: 2900,
          num2: 90
        },
        {
          title: "当日上线指标数",
          num1: 100,
          num2: 10
        },
        {
          title: "当日下线指标数",
          num1: 200,
          num2: 20
        }
      ],
      data2: [
        {
          title: "当期运行任务数",
          num1: 200
        },
        {
          title: "当期未运行任务数",
          num1: 100
        },
        {
          title: "当期成功任务数",
          num1: 300
        },
        {
          title: "当期失败任务数",
          num1: 400
        }
      ],
      data3: [
        {
          title: "有效标签数",
          num1: 400
        },
        {
          title: "当日标签上线数",
          num1: 4
        },
        {
          title: "当月标签上线数",
          num1: 10
        },
        {
          title: "当月标签下线数",
          num1: 2
        }
      ],
      tableData: [{
        rank: '1',
        name: '当月新入网合约',
        visits: '3000'
      }, {
        rank: '2',
        name: '移动当月新增用户',
        visits: '2000'
      }, {
        rank: '3',
        name: '当月新入网合约',
        visits: '1000'
      }, {
        rank: '4',
        name: '移动当月期末',
        visits: '500'
      }, {
        rank: '5',
        name: '移动当月期末',
        visits: '500'
      }],
      chartData1: {
        columns: ['日期', '指标1', '指标2', '指标3'],
        rows: [
          { '日期': '20190701', '指标1': 1393, '指标2': 1093, '指标3': 1452 },
          { '日期': '20190702', '指标1': 3530, '指标2': 3230, '指标3': 1000 },
          { '日期': '20190703', '指标1': 2923, '指标2': 2623, '指标3': 1587 },
          { '日期': '20190704', '指标1': 1723, '指标2': 1423, '指标3': 1600 },
          { '日期': '20190705', '指标1': 3792, '指标2': 3492, '指标3': 2000 },
          { '日期': '20190706', '指标1': 4593, '指标2': 4293, '指标3': 2500 }
        ]
      },
      chartData2: {
        columns: ['日期', '指标1', '指标2', '指标3'],
        rows: [
          { '日期': '20190701', '指标1': 1393, '指标2': 1093, '指标3': 1452 },
          { '日期': '20190702', '指标1': 3530, '指标2': 3230, '指标3': 1000 },
          { '日期': '20190703', '指标1': 2923, '指标2': 2623, '指标3': 1587 },
          { '日期': '20190704', '指标1': 1723, '指标2': 1423, '指标3': 1600 },
          { '日期': '20190705', '指标1': 3792, '指标2': 3492, '指标3': 2000 },
          { '日期': '20190706', '指标1': 4593, '指标2': 4293, '指标3': 2500 }
        ]
      },
      chartExtend1: {
        legend: {
          bottom: 0
        },
        grid: {
          top: 10,
          bottom: 30
        },
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#dcdfe6"
            }
          },
          axisLabel: {
            color: "#333"
          }
        },
        yAxis: {
          splitLine: {
            show: false
          }
        }
      },
      chartExtend2: {
        legend: {
          bottom: 0
        },
        grid: {
          top: 10,
          bottom: 30
        },
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#dcdfe6"
            }
          },
          axisLabel: {
            color: "#333"
          }
        },
        yAxis: {
          splitLine: {
            show: false
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/themes/t01/theme.scss";

.el-row{
  &:not(:first-child) {
    margin-top:15px;
  }
}
.full-row {
  display: flex;
  margin-bottom: 10px;
  .border-row-title {
    flex: 1;
    padding-bottom: 5px;
    border-bottom: 1px solid $border-clr01;
  }
  .normal-row-title {
    flex: 1;
  }
  .simple-row-title {
    flex: 1;
    .main-title {
      font-size: 14px;
    }
    /deep/ .el-aside{
      &>span {
        display: none;
      }
    }
  }
  .more {
    display: flex;
    align-items: flex-end;
    margin-left: 10px;
    font-size: 14px;
    color: $main-color;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
/deep/ .block-wrap {
  border:1px solid $border-clr01;
  padding: 10px;
  border-radius: 5px;
  .card-block {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 104px;
    background-color: $bg-clr08;
    margin-bottom: 10px;
    border-radius: 5px;
    .row-title {
      font-size:14px;
      color: $main-color;
    }
    .row-num1 {
      font-size:18px;
      margin: 5px 0;
    }
    .row-num2 {
      font-size:14px;
    }
    .icon-wrap {
      display: inline-block;
      width: 57px;
      height: 57px;
      border-radius: 50%;
      .icon {
        font-size:30px;
        color:$font-clr01;
        line-height: 57px;
      }
      &.bg-color1 {
        background-color: $main-color;
      }
      &.bg-color2 {
        background-color: $success;
      }
      &.bg-color3 {
        background-color: $warn;
      }
    }
  }
  .big-card {
    height: 218px;
    .row-num {
      font-size:24px;
      margin: 5px 0;
    }
    .row-title {
      font-size:16px;
      color:  $main-color;
    }
  }
  .el-row {
    margin-bottom: -10px;
  }
  .el-table::before {
    background-color:transparent;
  }
  .el-table thead {
    color:$font-clr02;
  }
  .el-table th {
    background-color: $bg-clr07;
  }
  .el-table th.is-leaf {
    border-bottom: 2px solid $main-color;
  }
  .el-table td {
    border-bottom: none;
  }
  .el-table .cell {
    line-height: 14px;
  }
}
.default-sroll {
  width: calc(100% + 12px);
  padding-right: 12px;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  /deep/.el-scrollbar__bar.is-horizontal {
    display: none;
  }
}
</style>
