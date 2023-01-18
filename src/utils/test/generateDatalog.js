// import table from '../ontology2relation'
const { table } = require('../ontology2relation')
class Ontology {
  constructor() {}
  getClassRelationship(ontologyClassName) {
    const relationshipsObject = table.get('swine')
    if (Object.keys(relationshipsObject).includes(ontologyClassName)) {
      console.log(relationshipsObject[`${ontologyClassName}`])
      return relationshipsObject[`${ontologyClassName}`]
    }
    return
  }
  mergeDatalog(ontologyClassName) {}
}
class Swine extends Ontology {
  constructor(swine_id) {
    super()
    this.name = 'swine'
    this.specialAttr = 'Swine_index'
    this.id = swine_id
  }
  mergeDatalog(ontologyClassName) {
    return `relationship:${this.getClassRelationship(
      ontologyClassName
    )}Q1(Swine_index,Microbe_id,<100>),`
  }
}
let swine = new Swine('xxxx')
// swine.getClassRelationship('microbiota')
swine.mergeDatalog('microbiota')
