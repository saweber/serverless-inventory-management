import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    Float: number,
    Int: number,
    String: string,
    Boolean: boolean,
}

export interface Product {
    id: Scalars['ID']
    inventoryCost: Scalars['Float']
    inventoryCount: Scalars['Int']
    inventoryValue: Scalars['Float']
    itemCost: Scalars['Float']
    itemPrice: Scalars['Float']
    manufacturer: Scalars['String']
    name: Scalars['String']
    __typename: 'Product'
}

export interface Query {
    inventory: WarehouseProduct
    inventoryForProduct: WarehouseProduct[]
    inventoryInWarehouse: WarehouseProduct[]
    product: Product
    products: Product[]
    warehouse: Warehouse
    warehouses: Warehouse[]
    __typename: 'Query'
}

export interface Warehouse {
    address: Scalars['String']
    city: Scalars['String']
    id: Scalars['String']
    name: Scalars['String']
    phoneNumber: Scalars['String']
    stateAbbreviation: Scalars['String']
    zipCode: Scalars['String']
    __typename: 'Warehouse'
}

export interface WarehouseProduct {
    inventoryCost: Scalars['Float']
    inventoryCount: Scalars['Int']
    inventoryValue: Scalars['Float']
    itemCost: Scalars['Float']
    itemPrice: Scalars['Float']
    productId: Scalars['String']
    warehouseId: Scalars['String']
    __typename: 'WarehouseProduct'
}

export interface ProductRequest{
    id?: boolean | number
    inventoryCost?: boolean | number
    inventoryCount?: boolean | number
    inventoryValue?: boolean | number
    itemCost?: boolean | number
    itemPrice?: boolean | number
    manufacturer?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    inventory?: [{productId: Scalars['String'],warehouseId: Scalars['String']},WarehouseProductRequest]
    inventoryForProduct?: [{productId: Scalars['String']},WarehouseProductRequest]
    inventoryInWarehouse?: [{warehouseId: Scalars['String']},WarehouseProductRequest]
    product?: [{id: Scalars['String']},ProductRequest]
    products?: ProductRequest
    warehouse?: [{id: Scalars['String']},WarehouseRequest]
    warehouses?: WarehouseRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WarehouseRequest{
    address?: boolean | number
    city?: boolean | number
    id?: boolean | number
    name?: boolean | number
    phoneNumber?: boolean | number
    stateAbbreviation?: boolean | number
    zipCode?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface WarehouseProductRequest{
    inventoryCost?: boolean | number
    inventoryCount?: boolean | number
    inventoryValue?: boolean | number
    itemCost?: boolean | number
    itemPrice?: boolean | number
    productId?: boolean | number
    warehouseId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Product_possibleTypes: string[] = ['Product']
export const isProduct = (obj?: { __typename?: any } | null): obj is Product => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isProduct"')
  return Product_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Warehouse_possibleTypes: string[] = ['Warehouse']
export const isWarehouse = (obj?: { __typename?: any } | null): obj is Warehouse => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isWarehouse"')
  return Warehouse_possibleTypes.includes(obj.__typename)
}



const WarehouseProduct_possibleTypes: string[] = ['WarehouseProduct']
export const isWarehouseProduct = (obj?: { __typename?: any } | null): obj is WarehouseProduct => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isWarehouseProduct"')
  return WarehouseProduct_possibleTypes.includes(obj.__typename)
}


export interface ProductPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    inventoryCost: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    inventoryCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    inventoryValue: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    itemCost: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    itemPrice: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    manufacturer: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface ProductObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    inventoryCost: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    inventoryCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    inventoryValue: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    itemCost: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    itemPrice: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    manufacturer: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface QueryPromiseChain{
    inventory: ((args: {productId: Scalars['String'],warehouseId: Scalars['String']}) => WarehouseProductPromiseChain & {get: <R extends WarehouseProductRequest>(request: R, defaultValue?: FieldsSelection<WarehouseProduct, R>) => Promise<FieldsSelection<WarehouseProduct, R>>}),
    inventoryForProduct: ((args: {productId: Scalars['String']}) => {get: <R extends WarehouseProductRequest>(request: R, defaultValue?: FieldsSelection<WarehouseProduct, R>[]) => Promise<FieldsSelection<WarehouseProduct, R>[]>}),
    inventoryInWarehouse: ((args: {warehouseId: Scalars['String']}) => {get: <R extends WarehouseProductRequest>(request: R, defaultValue?: FieldsSelection<WarehouseProduct, R>[]) => Promise<FieldsSelection<WarehouseProduct, R>[]>}),
    product: ((args: {id: Scalars['String']}) => ProductPromiseChain & {get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>) => Promise<FieldsSelection<Product, R>>}),
    products: ({get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>[]) => Promise<FieldsSelection<Product, R>[]>}),
    warehouse: ((args: {id: Scalars['String']}) => WarehousePromiseChain & {get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>) => Promise<FieldsSelection<Warehouse, R>>}),
    warehouses: ({get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>[]) => Promise<FieldsSelection<Warehouse, R>[]>})
}

export interface QueryObservableChain{
    inventory: ((args: {productId: Scalars['String'],warehouseId: Scalars['String']}) => WarehouseProductObservableChain & {get: <R extends WarehouseProductRequest>(request: R, defaultValue?: FieldsSelection<WarehouseProduct, R>) => Observable<FieldsSelection<WarehouseProduct, R>>}),
    inventoryForProduct: ((args: {productId: Scalars['String']}) => {get: <R extends WarehouseProductRequest>(request: R, defaultValue?: FieldsSelection<WarehouseProduct, R>[]) => Observable<FieldsSelection<WarehouseProduct, R>[]>}),
    inventoryInWarehouse: ((args: {warehouseId: Scalars['String']}) => {get: <R extends WarehouseProductRequest>(request: R, defaultValue?: FieldsSelection<WarehouseProduct, R>[]) => Observable<FieldsSelection<WarehouseProduct, R>[]>}),
    product: ((args: {id: Scalars['String']}) => ProductObservableChain & {get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>) => Observable<FieldsSelection<Product, R>>}),
    products: ({get: <R extends ProductRequest>(request: R, defaultValue?: FieldsSelection<Product, R>[]) => Observable<FieldsSelection<Product, R>[]>}),
    warehouse: ((args: {id: Scalars['String']}) => WarehouseObservableChain & {get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>) => Observable<FieldsSelection<Warehouse, R>>}),
    warehouses: ({get: <R extends WarehouseRequest>(request: R, defaultValue?: FieldsSelection<Warehouse, R>[]) => Observable<FieldsSelection<Warehouse, R>[]>})
}

export interface WarehousePromiseChain{
    address: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    city: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    phoneNumber: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    stateAbbreviation: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    zipCode: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface WarehouseObservableChain{
    address: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    city: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    phoneNumber: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    stateAbbreviation: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    zipCode: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface WarehouseProductPromiseChain{
    inventoryCost: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    inventoryCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    inventoryValue: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    itemCost: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    itemPrice: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    productId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    warehouseId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface WarehouseProductObservableChain{
    inventoryCost: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    inventoryCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    inventoryValue: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    itemCost: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    itemPrice: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    productId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    warehouseId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}