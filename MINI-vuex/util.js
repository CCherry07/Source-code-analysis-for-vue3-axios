export function getKeyValue(obj,callback){
  Object.keys(obj).forEach(item=>{
    callback(item,obj[item])
  })
}