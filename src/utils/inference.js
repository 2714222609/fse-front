import { ruler2Map } from './ruler'
export function inferencingDatalog(datalog) {
  let curLog = datalog
  let rels = ruler2Map.keys()
  for (let rel of rels) {
    if (curLog.includes(rel)) {
      const removeWord = ruler2Map.get(rel)
      for (const word of removeWord) {
        curLog = curLog.replaceAll(word, '')
      }
    }
  }
  console.log(curLog)
  return curLog
}
