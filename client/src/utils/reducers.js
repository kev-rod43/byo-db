import {
    CREATE_COLLECTION,
    DELETE_COLLECTION,
    UPDATE_COLLECTION,
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    APPLY_TAG,
    UNAPPLY_TAG,
    SORT_PRODUCT
} from './actions';

export default function reducer(state, action) {
    switch (action.type){
        case CREATE_COLLECTION: {
            return {
                ...state,
                collections : [...state.collections, {name: action.payload}]
            }
        }
        case DELETE_COLLECTION: {
            return {
                ...state,
                collections: [...state.collections].filter((collection) => collection.collectionName !== action.payload)
            }
        }
        case UPDATE_COLLECTION: {
            return {
                ...state,
                collections: [...state.collections].map((collection) => {
                   if (collection.collectionName === action.payload.currentName) {
                    collection.name = action.payload.newName
                   }
                   return collection;
                    
                })
            }
        }
        case CREATE_PRODUCT: {
            return {
                ...state,
                collections: [...state.collections].map((collection) => {
                    if (collection.collectionName === action.payload.collectionName) {
                     collection.products = [...collection.products, action.payload.productObject]
                    }
                    return collection;
                     
                 })
            }
        }
        case DELETE_PRODUCT: {
            return {
                ...state,
                collections: [...state.collections].map((collection) => {
                    if (collection.collectionName === action.payload.collectionName) {
                     collection.products = [...collection.products].filter((product) => product._id !== action.payload.productId)
                    }
                    return collection;
                     
                 })
            }
        }
        case UPDATE_PRODUCT: {
            return {
                ...state,
                collections: [...state.collections].map((collection) => {
                    if (collection.collectionName === action.payload.collectionName) {
                     collection.products = [...collection.products].map((product) => {
                       if (product._id !== action.payload.productId) {
                        return action.payload.updatedProductObject
                       }
                       return product
                    })
                    }
                    return collection;            
                 })
            }
        }
        case APPLY_TAG: {
            return {
                ...state,
                collections: [...state.collections].map((collection) => {
                    if (collection.collectionName === action.payload.collectionName) {
                     collection.products = [...collection.products].map((product) => {
                       if (product._id !== action.payload.productId) {
                        product.tags = [...product.tags, tagObject]
                       }
                       return product
                    })
                    }
                    return collection;            
                 })
            }
        }
        case UNAPPLY_TAG: {
            return {
                ...state,
                collections: [...state.collections].map((collection) => {
                    if (collection.collectionName === action.payload.collectionName) {
                     collection.products = [...collection.products].map((product) => {
                       if (product._id !== action.payload.productId) {
                        product.tags = [...product.tags].filter((tag) => tag.tagName !== action.payload.tagName)
                       }
                       return product
                    })
                    }
                    return collection;            
                 })
            }
        }
    }
}