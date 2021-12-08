import Vue from 'vue'
import VueRouter from 'vue-router'
import Section1 from '@/views/Section1'
import Section2 from '@/views/Section2.vue'
import Section3 from '@/views/Section3.vue'
import Section4 from '@/views/Section4.vue'

Vue.use(VueRouter)

const routes = [
  {
      name: 'section1',
      path:"/section1",
      component: Section1,
  },
  {
      name: 'section2',
      path:"/section2",
      component: Section2,
  },
  {
      name:'section3',
      path:"/section3",
      component: Section3,
  },
  {
      name:'section4',
      path:"/section4",
      component: Section4,
  },
]

const router = new VueRouter({
  routes
})

export default router
