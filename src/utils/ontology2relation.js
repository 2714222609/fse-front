const table = new Map()
table.set('swine', { feed: 'eats', metabolome: 'generates', microbiota: 'is_host_of' })
table.set('metabolome', { swine: 'generates', metabolome_hmdb_info: 'has_hmdb_info' })
table.set('metabolome_hmdb_info', { metabolome: 'has_hmdb_info' })
table.set('microbiota', { swine: 'is_host_of', gene: 'changes_the_expression_by_microbiota' })
table.set('gene', {
  microbiota: 'changes_the_expression_by_microbiota',
  gene_kegg_info: 'has_gene_kegg_info'
})
table.set('gene_kegg_info', { gene: 'has_gene_kegg_info' })
table.set('feed', {
  swine: 'eats',
  ingredient: 'has_ingredient_composition',
  nutrition: 'has_nutritional_composition'
})
table.set('ingredient', { feed: 'has_ingredient_composition' })
table.set('nutrition', { feed: 'has_nutritional_composition' })
// export default table
module.exports = { table }
