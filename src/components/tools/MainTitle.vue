<template>
  <div class="main-title">
    <el-container>
      <el-aside :width="width">
        <span /><label>{{ title }}</label>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "MainTitle",
  props: {
    width: String,
    title: String
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/themes/t01/theme.scss';
.main-title {
  display: inline-block;
  font-size: 16px;
  // .el-main{
  //     border-bottom: 1px solid $title-line-clr;
  //     padding: 0;
  // }
  span {
    width: 3px;
    height: 15px;
    background-color: $main-color;
    display: inline-block;
    vertical-align: middle;
  }
  label {
    margin-left: 5px;
  }
}
</style>


