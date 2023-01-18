let ruler2Map = new Map()
ruler2Map.set('is_host_of', [
  'class:Swine(Swine_index),',
  'class:Microbiota(Swine_index),',
  'class:Microbiota(Microbe_id),'
])
ruler2Map.set('changes_the_expression_by_microbiota', [
  'class:Microbiota(Microbe_id)',
  'class:Gene(Ncbi_gene_id),'
])
ruler2Map.set('has_gene_kegg_info', [
  'class:Gene(Ncbi_gene_id)',
  'class:Gene_KEGG_Info(Gene_kegg_id),'
])
ruler2Map.set('relationship:generates', [
  'class:Swine(Swine_index),',
  'class:Metabolome(Metabolome_index),'
])
ruler2Map.set('has_hmdb_info', [
  'class:Metabolome(Metabolome_index),',
  'class:Metabolome_HMDB_info(Hmdb_info_index),'
])
module.exports = {
  ruler2Map
}
