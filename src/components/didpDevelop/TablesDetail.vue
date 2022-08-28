<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
    class="special-tabs more-tabs"
  >
    <el-tab-pane name="in">
      <span slot="label"><el-button
                           size="mini"
                           round
                         >输入数据</el-button>
        <!-- <transition name="el-zoom-in-left"> -->
        <ul v-if="activeName === 'in'">
          <li
            v-for="item in subTabs"
            :key="item.index"
            :class="[item.actived ? 'actived' : '']"
            @click="setSubData(item)"
          >{{ item.title }}</li>
        </ul>
        <!-- </transition> -->

        <el-divider direction="vertical" /></span>
      {{ activedSubName }}
    </el-tab-pane>
    <el-tab-pane name="out">
      <span slot="label"><el-button
        size="mini"
        round
      >输出数据</el-button><el-divider direction="vertical" /></span>
      输出数据
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'TablesDetail',
  data() {
    return {
      activeName: 'in',
      subTabs: [
        { title: 'aaaaaaa', actived: true },
        { title: 'bbbbbbbb' },
        { title: 'ccccccc' }
      ],
      activedSubName: 'aaaaaaa'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    setSubData(item) {
      this.activedSubName = item.title
      this.subTabs.forEach((ele, index) => {
        ele['actived'] = false
      })
      item['actived'] = true
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/themes/t01/theme.scss";
.more-tabs {
    ul {
        display: inline-flex;
        li {
            float: left;
            margin: 0 15px;
        }
    }
    .el-tabs__item.is-active {
        li {
            color: $font-clr02;
            &.actived {
                color: $main-color;
            }
        }
    }
}
</style>
