<!-- xx日龄的猪相比于yy日龄的猪，肠道微生物组成和功能有什么差异？ -->
<template>
  <div class="benti-ipt">
    <span class="alter">
      What are the differences in the gut microbes and function of the gut microbiota between
    </span>
    <span class="alter">
      <el-autocomplete
        class="inline-input"
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder="please input"
        @select="handleSelect"
      ></el-autocomplete>
      d and
    </span>
    <span class="alter">
      <el-autocomplete
        class="inline-input"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="please input"
        @select="handleSelect"
      ></el-autocomplete>
      d of age in growing-finishing pigs?
    </span>
    <span class="iconfont icon-arrow-right-filling run" @click.stop="run"></span>
  </div>
</template>

<script>
import { inferencingDatalog } from '@/utils/inference.js'
export default {
  name: 'TimeContrast',
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
        { value: '80' },
        { value: '100' },
        { value: '131' },
        { value: '150' },
        { value: '180' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    run() {
      // 输入为空不执行
      if (this.state1.length < 1) {
        return
      }
      let datalog = this.getDatalog()
      this.$bus.$emit('expandDatalog', datalog)
      this.$message.success('success')
    },
    getDatalog() {
      let template = `?(Microbe_name,Gene_symbol,Gene_kegg_pathway):-class:Swine(Swine_index),class:Microbiota(Swine_index),relationship:is_host_of{#}(Swine_index,Microbe_id,<${this.state2}>),attribute:group(Microbe_id,<A1>),attribute:p_age_difference(Microbe_id,<1>),attribute:microbe_name(Microbe_id,Microbe_name),attribute:microbe_time(Microbe_id,<${this.state2}>),class:Microbiota(Microbe_id),class:Gene(Ncbi_gene_id),relationship:changes_the_expression_by_microbiota{#}(Microbe_id,Ncbi_gene_id,<change_the_expression_by_microbiota>),attribute:gene_symbol(Ncbi_gene_id,Gene_symbol),class:Gene(Ncbi_gene_id),class:Gene_KEGG_Info(Gene_kegg_id),relationship:has_gene_kegg_info{#}(Ncbi_gene_id,Gene_kegg_id,<has_gene_kegg_info>),attribute:gene_kegg_pathway(Gene_kegg_id,Gene_kegg_pathway).`
      const fill = this.state2 === '80' ? 'Q2' : 'Q3'
      let datalog = template.replaceAll('{#}', fill)
      datalog = inferencingDatalog(datalog)
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
