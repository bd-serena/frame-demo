<template>
  <span>{{ msg }}</span>
</template>
<script>
export default {
  name: "SubTitle",
  props: {
    msg: String
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/themes/t01/theme.scss';
span{
  color: $main-color;
  font-size: 14px;
  &:before{
    content: '▪';
    color: $main-color;
    display: inline-block;
    margin-right: 3px;
    font-size: 19px;
    vertical-align: middle;
    height: 19px;
    line-height: 15px;
  }
}
</style>


