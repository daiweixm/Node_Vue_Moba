<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/logo.png" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/logo.png" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/logo.png" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/logo.png" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div
      class="nav-icons bg-white mt-3 d-flex flex-wrap text-center pt-3 text-grey-1"
    >
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm w-100">
        <i class="sprite sprite-up-arrow"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card title="新闻" icon="menu-1" :categories="newsCate">
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date | date}}</span>
        </div>
      </template>
    </m-list-card>
   
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Home',
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
        // Some Swiper option/callback...
      },
      newsCate: [],
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
  },
  mounted() {
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('/news/list')
      this.newsCate = res.data
    }
  },
  created() {
    this.fetchNewsCats()
  },
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  }
}
</script>