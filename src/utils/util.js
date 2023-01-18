import option from '../Data/option.json'
export function drawEchars(data) {
  const svg = option[2]['svg']
  data.pop()
  const RED = 'rgb(255,0,0)',
    GREEN = 'rgb(0,255,0)',
    BLUE = 'rgb(0,0,255)'
  let table = {
    Disorder: [],
    Alteration_microbiota: [],
    Microbiota: [],
    Alteration_gene: [],
    Gene: []
  }
  let kegg = []
  const nodes = [],
    links = []
  for (let item of data) {
    table.Disorder.push(item.Disorder)
    table.Alteration_microbiota.push(item.Alteration_microbiota)
    table.Microbiota.push(item.Microbiota)
    table.Alteration_gene.push(item.Alteration_gene)
    table.Gene.push(item.Gene)
    kegg.push(item.kegg)
  }
  for (let key of Object.keys(table)) {
    let item = table[key]
    item = [...new Set(item)]
    table[key] = item
  }
  let i = 0
  for (let key of Object.keys(table)) {
    i++
    let j = 0
    for (let item of table[key]) {
      if (item == 'increase' || item == 'decrease') continue
      j++
      createNode(item, i * 64, j * 48)
    }
  }
  // console.log(nodes);
  for (let item of data) {
    let node_di = getNode(item.Disorder)
    let node_mi = getNode(item.Microbiota)
    let node_ge = getNode(item.Gene)
    //创建Disorder与Microbiota的关系
    if (item.Alteration_microbiota === 'increase') {
      createLink(node_di, node_mi, GREEN)
    } else {
      createLink(node_di, node_mi, RED)
    }
    //创建Microbiota与Gene的关系
    if (item.Alteration_gene === 'increase') {
      createLink(node_mi, node_ge, GREEN)
    } else {
      createLink(node_mi, node_ge, RED)
    }
  }
  function createNode(name, x, y) {
    if (name === 'increase' || name === 'decrease') return
    let pic = null
    switch (x) {
      case 64:
        pic = svg[0]['disorder']
        break
      case 192:
        pic = svg[0]['Microbiota']
        break
      case 320:
        pic = svg[0]['Gene']
        break
    }
    let node = {
      name,
      x,
      y,
      symbol: pic
    }
    nodes.push(node)
  }
  function getNode(name) {
    let node = nodes.filter(item => item.name === name)
    return node[0]
  }
  function createLink(node1, node2, rel) {
    let link = {
      source: node1.name,
      target: node2.name,
      lineStyle: {
        color: rel
      }
    }
    links.push(link)
  }

  return { nodes, links }
}
