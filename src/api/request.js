import request from '../network/request'
import axios from 'axios'
/**
 * 发送datalog,进行查询
 * @param {string[]} query 参数
 * @return {Promise} 响应结果
 * */
export async function emitDatalog(query) {
  let data = {
    datalog: query
  }
  let config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    let res = await axios.post('/query', data, config)
    return res
  } catch (error) {
    console.log(error)
  }
}
