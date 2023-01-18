// import { ruler4, ruler2Map } from './ruler'
const { ruler4, ruler2Map } = require('../ruler')
const originDatalogs =
  '?(All,Alteration_microbiota,Microbiota,Gene):-class:all(All_Name),class:all_gut_microbiota_change_results(All_Microbiota_Index),class:gut_microbiota(Gut_Microbiota_Name),class:gut_microbiota_gene_change_results(Microbiota_Gene_Index),relationship:has_abundance_change_results_by_allQIdx(<Bacteroidetes>,All_microbiota_index,All),relationship:has_abundance_change_results_by_allQIdx(Microbiota,All_microbiota_index,All),attribute:all_microbiota_alterationQIdx(All_microbiota_index,<decrease>),attribute:all_microbiota_alterationQIdx(All_microbiota_index,Alteration_microbiota),relationship:changes_the_expression_by_microbiotaQIdx(Microbiota,Gene,<changes_the_expression_of_by_microbiota>).'

/**
 * @param {string} datalog
 * */
function inferencingDatalog(datalog) {
  const result = []
  if (datalog.includes('All')) {
    const { All, Qindex, all } = ruler4
    const len = ruler4.All.length
    for (let i = 0; i < len; i++) {
      let infered = datalog
        .replaceAll('All', All[i])
        .replaceAll('QIdx', Qindex[i])
        .replaceAll('all', all[i])
      result.push(infered)
    }
  } else result.push(datalog)
  for (let i = 0; i < result.length; i++) {
    let curLog = result[i]
    let rels = ruler2Map.keys()
    for (let rel of rels) {
      curLog = curLog.includes(rel) ? curLog.replaceAll(ruler2Map.get(rel), '') : curLog
    }
  }
  return result
}
const sourceLog = inferencingDatalog(originDatalogs)
console.log(sourceLog)
