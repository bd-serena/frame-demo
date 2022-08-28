<template>
  <div
    class="tool-btn"
    @click="optClick"
  >
    <span :class="[iconClass, 'tool-btn-icon']" />
    <span class="tool-btn-text">{{ label }}</span>
  </div>
</template>
<script>
export default {
  name: "OptBtn",
  props: {
    iconClass: String,
    label: String
  },
  methods: {
    optClick() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/themes/t01/theme.scss";
.tool-btn {
  cursor: pointer;
  margin-left: 20px;
  display: inline-block;
  .tool-btn-icon {
    color: $main-color;
    margin-right: 5px;
  }
  .tool-btn-text {
    position: relative;
    top: -1px;
    color: $font-clr04;
  }
  &:hover {
    .tool-btn-text {
      color: $main-color;
    }
  }
}
</style>


