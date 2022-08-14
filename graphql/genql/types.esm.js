export default {
    "scalars": [
        1,
        2,
        3,
        4,
        8
    ],
    "types": {
        "Product": {
            "id": [
                1
            ],
            "inventoryCost": [
                2
            ],
            "inventoryCount": [
                3
            ],
            "inventoryValue": [
                2
            ],
            "itemCost": [
                2
            ],
            "itemPrice": [
                2
            ],
            "manufacturer": [
                4
            ],
            "name": [
                4
            ],
            "__typename": [
                4
            ]
        },
        "ID": {},
        "Float": {},
        "Int": {},
        "String": {},
        "Query": {
            "product": [
                0,
                {
                    "id": [
                        4,
                        "String!"
                    ]
                }
            ],
            "products": [
                0
            ],
            "productsInWarehouse": [
                7,
                {
                    "warehouseId": [
                        4,
                        "String!"
                    ]
                }
            ],
            "warehouse": [
                6,
                {
                    "id": [
                        4,
                        "String!"
                    ]
                }
            ],
            "warehouseProduct": [
                7,
                {
                    "productId": [
                        4,
                        "String!"
                    ],
                    "warehouseId": [
                        4,
                        "String!"
                    ]
                }
            ],
            "warehouses": [
                6
            ],
            "warehousesForProduct": [
                7,
                {
                    "productId": [
                        4,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                4
            ]
        },
        "Warehouse": {
            "address": [
                4
            ],
            "city": [
                4
            ],
            "id": [
                4
            ],
            "phoneNumber": [
                4
            ],
            "stateAbbreviation": [
                4
            ],
            "zipCode": [
                4
            ],
            "__typename": [
                4
            ]
        },
        "WarehouseProduct": {
            "inventoryCost": [
                2
            ],
            "inventoryCount": [
                3
            ],
            "inventoryValue": [
                2
            ],
            "productId": [
                4
            ],
            "warehouseId": [
                4
            ],
            "__typename": [
                4
            ]
        },
        "Boolean": {}
    }
}