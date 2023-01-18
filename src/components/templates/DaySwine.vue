<!-- 日阶段的饲喂方式对某生长育肥猪(以编号999001808060218为例)肠道微生物组成和功能的影响？（以100天为例） -->
<template>
  <el-collapse-transition>
    <div class="benti-ipt">
      <span class="alter">
        What are the differences in gut microbes and function of gut microbiota between daily-phase
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
      <!-- <span class="alter">
        Take
        <el-autocomplete
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
        days for example
      </span> -->
      <span class="iconfont icon-arrow-right-filling run" @click.stop="run"></span>
    </div>
  </el-collapse-transition>
</template>

<script>
import { inferencingDatalog } from '@/utils/inference.js'
export default {
  name: 'DaySwine',
  data() {
    return {
      restaurants: [],
      state1: '',
      state2: '',
      isShow: true
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
      return [{ value: '30' }, { value: '80' }, { value: '100' }, { value: '131' }]
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
      let template = `?(Microbe_name,Gene_symbol,Gene_kegg_pathway):-class:Swine(Swine_index),class:Microbiota(Microbe_id),relationship:is_host_ofQ1(Swine_index,Microbe_id,<${this.state1}>),attribute:swine_id(Swine_index,<999001808060218>),attribute:p_value_dpf_tpf_difference(Microbe_id,<1>),attribute:microbe_name(Microbe_id,Microbe_name),attribute:microbe_time(Microbe_id,<${this.state1}>),class:Microbiota(Microbe_id),class:Gene(Ncbi_gene_id),relationship:changes_the_expression_by_microbiotaQ1(Microbe_id,Ncbi_gene_id,<change_the_expression_by_microbiota>),attribute:gene_symbol(Ncbi_gene_id,Gene_symbol),class:Gene(Ncbi_gene_id),class:Gene_KEGG_Info(Gene_kegg_id),relationship:has_gene_kegg_infoQ1(Ncbi_gene_id,Gene_kegg_id,<has_gene_kegg_info>),attribute:gene_kegg_pathway(Gene_kegg_id,Gene_kegg_pathway).`
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
.sm-top {
  height: 100px;
  margin: 10px 25px 0px;
  padding-left: 10px;
  border: 1px #ccc solid;
  background-color: #eeeeee;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
.run {
  color: deepskyblue;
}
.run:hover {
  color: blue;
  cursor: pointer;
}
</style>
