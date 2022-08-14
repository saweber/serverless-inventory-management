
var Product_possibleTypes = ['Product']
export var isProduct = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isProduct"')
  return Product_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var Warehouse_possibleTypes = ['Warehouse']
export var isWarehouse = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isWarehouse"')
  return Warehouse_possibleTypes.includes(obj.__typename)
}



var WarehouseProduct_possibleTypes = ['WarehouseProduct']
export var isWarehouseProduct = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isWarehouseProduct"')
  return WarehouseProduct_possibleTypes.includes(obj.__typename)
}
