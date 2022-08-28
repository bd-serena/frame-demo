<template>
  <div>
    hello指标开发工具
    <el-button
      type="primary"
      @click="toAddIndi"
    >
      新增指标
    </el-button>
  </div>
</template>

<script>
import Store from "@/plugins/transData.js"
import { mapMutations } from 'vuex'
export default {
  name: "HelloMain",
  methods: {
    ...mapMutations({
      setIsCover: "tab/setIsCover"
    }),
    toAddIndi() {
      this.setIsCover(true);
      const data = {
        id: 'newIndi' + Math.random(),
        nodeType: '3',
        label: '新增指标'
      }
      Store.$emit('tabAdd', data)
    }
  }
}
</script>

