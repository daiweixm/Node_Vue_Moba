<template>
    <div class="card p-3 mt-3 bg-white">
      <div class="card-header d-flex align-items-center pb-3">
        <i class="iconfont icon-menu fs-xl text-primary"></i>
        <div class="fs-xl flex-1 px-2 ai-left">
          {{title}}
        </div>
        <i class="iconfont" :class="`icon-${icon}`"></i>
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }
  }
}
</script>

<style lang="scss">

</style>