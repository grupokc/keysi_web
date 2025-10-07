export const mapResponseApi = (data) => {
  if (!data) return []
  let newObject = []
  Object.entries(data).map(ele=>{
    newObject.push({
      key:ele[0],
      label: ele[0].replace(/_/g, " "),
      value:ele[1]
    })
  })
  return newObject

}
