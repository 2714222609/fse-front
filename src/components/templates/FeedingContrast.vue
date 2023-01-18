<!-- 日阶段饲养相比三阶段饲养，代谢物组成和功能有什么差异？（在HMDB中查询） -->
<template>
  <div class="benti-ipt">
    <span class="alter">
      What are the differences in gut metabolite and function of gut microbiota between daily-phase
      and three-phase feeding programs at
    </span>
    <span class="alter">
      <el-autocomplete
        class="inline-input"
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder="please input"
        @select="handleSelect"
      ></el-autocomplete>
      d of age in growing-finishing pigs ?
    </span>
    <span class="iconfont icon-arrow-right-filling run" @click.stop="run"></span>
  </div>
</template>

<script>
import { inferencingDatalog } from '@/utils/inference.js'
export default {
  name: 'FeedingContrast',
  data() {
    return {
      restaurants: [],
      state1: '',
      state2: ''
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    loadAll() {
      return [
        { value: '999001808060218' },
        { value: '999000' },
        { value: '999001' },
        { value: '20' },
        { value: '50' },
        { value: '100' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    run() {
      let datalog = this.getDatalog()
      this.$bus.$emit('expandDatalog', datalog)
      this.$message.success('success')
    },
    getDatalog() {
      let template = `?(Metabolome_name,Metabolome_pathway,Metabolome_pathway_url):-relationship:generatesQ4(Swine_index,Metabolome_index,<generates>),attribute:metabolome_difference(Metabolome_index,<1>),attribute:metabolism_name(Metabolome_index,Metabolome_name),attribute:metabolism_time(Metabolome_index,<100>),relationship:has_hmdb_infoQ4(Hmdb_info_index,Metabolome_index,<has_hmdb_info>),attribute:metabolome_pathway_url(Hmdb_info_index,Metabolome_pathway_url),attribute:metabolome_pathway(Hmdb_info_index,Metabolome_pathway).`
      const datalog = inferencingDatalog(template)
      return { datalog }
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  }
}
</script>
<style scoped>
.run {
  color: deepskyblue;
}
.run:hover {
  color: blue;
  cursor: pointer;
}
</style>
