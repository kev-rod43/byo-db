/**
 * CREATE_COLLECTION
 * -takes a collection name as payload
 * -pushes a new collection object to the user context collection array
 */
export const CREATE_COLLECTION = 'CREATE_COLLECTION';

/**
 * DELETE_COLLECTION
 * -takes a collection name as payload
 * -pulls a collection object from the user context collection array
 */
export const DELETE_COLLECTION = 'DELETE_COLLECTION';

/**
 * UPDATE_COLLECTION
 * -takes in: { currentName: <String>, newName: <String> }
 * -finds a collection based on name, and changes the name of a collection objext in the user context collection array
 */
export const UPDATE_COLLECTION = 'UPDATE_COLLECTION';


/**
 * CREATE_PRODUCT
 * -takes in: { productObject, collectionName: <String> }
 * -finds a collection by name in user.collections, pushes the productObject to the user.collections[?].products array.
 */
export const CREATE_PRODUCT = 'SET_STUDENT_MAJOR';

/**
 * DELETE_PRODUCT
 * -takes in: { productId: <String>, collectionName: <String> }
 * -finds a collection by name in user.collections, pulls the productObject matching the productId from the user.collections[?].products array.
 */
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

/**
 * UPDATE_PRODUCT
 * -takes in: { productId: <String>, updatedProductObject,  collectionName: <String> }
 * -finds a collection by name in user.collections, pulls the productObject matching the productId from the user.collections[?].products array,
 * -and pushes the updatedProductObject to the user.collections[?].products array
 */
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';


/**
 * APPLY_TAG
 * -takes in:
 *  { 
 *      tagObject: { _id: <String>, tagName: <String> },
 *      collectionName: <String>,
 *      productId: <String>,
 *  }
 * -finds a collection by name in user.collections, then finds a product matching the productId from the user.collections[?].products array,
 * -and then pushes the tag object to user.collections[?].products[?].tags array
 */
export const APPLY_TAG = 'APPLY_TAG';

/**
 * UNAPPLY_TAG
 * -takes in:
 *  { 
 *      tagName: <Strig>,
 *      collectionName: <String>,
 *      productId: <String>,
 *  }
 * -finds a collection by name in user.collections, then finds a product matching the productId from the user.collections[?].products array,
 * -and then finds and pulls the tagobject matching the tagId from user.collections[?].products[?].tags array
 */
export const UNAPPLY_TAG = 'UNAPPLY_TAG';


/**
 * SORT_PRODUCT
 * -takes in: 
 *  {
 *      sortFunction: <Function>,
 *      collectionId: <String>
 *  }
 * - finds a collection by name in user.collections, performs a sort on user.collections[?].products array utilizing the sortFunction.
 */
export const SORT_PRODUCT = 'SORT_PRODUCT';