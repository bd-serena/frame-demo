<template>
  <div v-show="false">
    <el-radio-group
      v-model="curTheme"
    >
      <el-radio label="default">
        默认
      </el-radio>
      <el-radio label="lightred">
        铁塔
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { THEME_DATA, eleThemeChange } from './tools/ThemeObject';
export default {
  name: 'ThemeControl',
  props: {
    curTheme: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.changeTheme(this.curTheme);
  },
  watch: {
    curTheme (nv, ov) {
      this.changeTheme(nv, ov);
    }
  },
  methods: {
    ...mapActions({
      setToolColors: 'ToolThemeMgt/setToolColors'
    }),
    changeTheme (nv, ov) {
      // 获取当前主题的色彩配置信息themeData存到vuex中
      let toolColors = THEME_DATA[`theme-${nv}`];
      let oldToolColors = THEME_DATA[`theme-${ov}`] || '';
      this.setToolColors(toolColors);
      document.getElementsByTagName('body')[0].setAttribute('class', `tool-theme-${nv}`);
      // 调用改变elementui主色调方法
      eleThemeChange(toolColors['mainColor'], oldToolColors['mainColor'] || '#409eff');
    }
  }
}
</script>

<style>
</style>
