<template>
  <div>
    <m-card :title="title" :icon="icon">
      <template>
        <div class="nav jc-between">
          <div
            class="nav-item"
            :class="{ active: active === i }"
            v-for="(category, i) in categories"
            :key="i"
            @click="$refs.list.$swiper.slideTo(i)"
          >
            <div class="nav-link">{{ category.name }}</div>
          </div>
        </div>
        <div class="pt-2">
          <swiper ref="list" @slide-change="() => active = $refs.list.$swiper.realIndex">
            <swiper-slide v-for="(category, i) in categories" :key="i">
              <slot name="items" :category="category"></slot>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </template>
    </m-card>
  </div>
</template>
<script>
export default {
  name: 'ListCard',
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>
