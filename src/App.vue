<template>
  <div id="app">
    <MainFrame />
  </div>
</template>

<script>
import MainFrame from "./views/MainFrame"
export default {
  name: 'App',
  components: {
    MainFrame
  }
}
</script>

<style lang="scss">
@import "@/assets/css/themes/t01/theme.scss";
#app{
  height: 100%;
  .el-container {
    height: 100%;
  }
  /deep/ .v-context {
    background-color: $bg-clr04;
    border: 1px solid $bg-clr03;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    padding: 10px 0;
    margin: 5px 0;
    outline: none;
    width: auto;
    color: $font-clr02;

    ul {
      font-weight: normal;
      font-size: 14px;

      li {
        padding: 0 20px;
        line-height: 36px;

        &:hover {
          background-color: rgba($main-color, 0.2);
          color: $main-color;
        }
      }
    }

    /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      background-color: transparent;
    }
  }
}
  //滚动条的宽度只在webkit有效
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
//滚动条的滑块
::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.3);
  border-radius: 3px;
}
</style>
