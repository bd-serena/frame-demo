<template>
  <div class="home-frame">
    <el-container>
      <el-header class="home-frame-head">
        <div class="head-title">
          指标开发工具
        </div>
        <ThemeControl :cur-theme="'lightred'" />
        <div class="head-right">
          <p>
            你好吗！
            <span v-popover:popover1>{{ userName }}</span>
          </p>
          <span
            class="icon-A10108_quit logout-icon"
            @click="toLogout"
          />
        </div>
        <div class="head-plat-menu">
          <ul>
            <li>系统管理</li>
            <li>个人中心</li>
            <li>统一门户</li>
          </ul>
        </div>
      </el-header>
      <el-container class="frame-main">
        <aside-menu />
        <el-main class="main-content">
          <!-- <el-scrollbar style="height:100%;" :native="false" :noresize="false" tag="section"> -->
          <Main />
          <!-- </el-scrollbar> -->
        </el-main>
        <!-- 新增，编辑指标时展现右侧指标，维度列表 -->
        <el-aside
          v-if="tabType === '3'"
          width="200px"
          class="tab-right"
        >
          <attr-set />
        </el-aside>
        <div
          v-show="isCover === true"
          ref="coverWrap"
          id="cover"
          class="plsql-cover"
        >
          <img
            src="../assets/images/aaa.jpg"
            class="cover-arrow-icon"
          >
          <div
            class="plsql-cover-btn"
            @click="closeCover"
          >
            指标类型
          </div>
          <div class="plsql-cover-cont">
            请先选择
            <span>指标类型</span>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ThemeControl from '@/utils/themeControl/ThemeControl';
import { mapState, mapMutations } from 'vuex';
import AsideMenu from "@/components/mainFrame/AsideMenu.vue";
import Main from "./Main.vue";
import AttrSet from "@/components/kpi/AttrSet.vue";
export default {
  name: "MainFrame",
  components: {
    AsideMenu,
    Main,
    AttrSet,
    ThemeControl
  },
  data() {
    return {
      userName: "张三"
    };
  },
  methods: {
    ...mapMutations({
      setIsCover: "tab/setIsCover"
    }),
    toLogout() {
      this.$message("注销登陆");
    },
    closeCover() {
      this.setIsCover(false);
    },
    mounted() {
      // console.log(this.isCover);
    }
  },


  computed: {
    ...mapState({
      tabType: state => state.tab.tabType,
      isCover: state => state.tab.isCover
    })
  }
};
</script>

<style lang="scss" scoped>
.home-frame {
  height: 100%;
  .el-container {
    height: 100%;
    .frame-main {
      height: calc(100% - 60px);
    }
  }
  /deep/.home-frame-head {
    // background-color: $bg-clr01;
    @include style-color('background-color', 'main');
    color: $font-clr01;
    .head-title {
      float: left;
      font-size: 20px;
      line-height: 60px;
    }
    .head-right {
      float: right;
      line-height: 60px;
      p {
        display: inline-block;
        margin-right: 35px;
      }
      .logout-icon {
        cursor: pointer;
      }
    }
    .head-plat-menu {
      float: right;
      padding-top: 21px;
      ul{
        float: left;
        padding-right: 40px;
        li {
          float: left;
          padding: 0 20px;
          border-right: 1px solid $bg-clr02;
          &:last-child {
            border-right: 0;
          }
        }
      }
    }
  }
  /deep/.home-frame-menu {
    background-color: $bg-clr05;
    border-right: 1px solid $border-clr02;
    padding: 0px;
    overflow-x: hidden;
    position: relative;
    .el-tree {
      background-color: $bg-clr05;
      color: $font-clr05;
    }
  }
  .main-content {
    background-color: $bg-clr03;
    height: 100%;
    padding: 10px;
    font-size: 12px;
  }
  .tab-right {
    background-color: $bg-clr02;
    overflow: hidden;
  }

}
 .plsql-cover {
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  top: 60px;
  opacity: 0.75;
  background-color: #333;
  filter: alpha(opacity=75);
  z-index: 9;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  box-sizing: content-box;
  }
   .cover-arrow-icon {
    transform:rotateY(180deg);
    position: absolute;
    color: #fff;
    right: 210px;
    top: 60px;
    width: auto;
    height: auto;
  }
  .plsql-cover .plsql-cover-cont{
    position: relative;
    color: #fff;
    top: 130px;
    width: 160px;
    float: right;
}
  .plsql-cover-btn{
    color: #fff;
    border-color: #95c2ff;
    background: #409eff;
    width: 77px;
    padding: 0 10px;
    height: 30px;
    float: right;
    z-index: 10;
    margin-right: 121px;
    line-height: 30px;
    margin-top: 15px;
    cursor: pointer;
    opacity: 1
  }
  .plsql-cover-cont span{
    font-size: 18px;
    color: #fff000;
  }
</style>

