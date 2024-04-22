import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ProductDeleteConfirm from "../forms/product-forms/DeleteConfirm"
import CreateProductForm from '../forms/product-forms/CreateProductForm';
import UpdateProductForm from '../forms/product-forms/UpdateProductForm';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import DeleteCollectionForm from '../forms/DeleteCollection';
import CollectionForm from '../forms/CollectionForm';

export default function CollectionDataGrid({ collection }) {

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    id: false,
    description: false,
    condition: false,
    weight: false,
    height: false,
    width: false,
    depth: false,
    _id: false,
  });
  const [productToUpdate, setProductToUpdate] = React.useState({});
  const [openUpdateProduct, setOpenUpdateProduct] = React.useState(false);
  const handleEditClick = (id) => () => {
    setProductToUpdate(collection.products[id])
    setOpenUpdateProduct(true)
  };

  const [productToDelete, setProductToDelete] = React.useState("");
  const [openDeleteProduct, setOpenDeleteProduct] = React.useState(false);
  const handleDeleteClick = (id) => () => {
    setProductToDelete(flattenedData[id]._id);
    setOpenDeleteProduct(true);
    
  }

  const [openDeleteCollection, setOpenDeleteCollection] = React.useState(false);
  const handleDeleteCollection = () => {
    setOpenDeleteCollection(true);
  }

  const [openUpdateCollection, setOpenUpdateCollection] = React.useState(false);
  const handleUpdateCollection = () => {
    setOpenUpdateCollection(true);
  }

  const [openCreateProduct, setOpenCreateProduct] = React.useState(false);
  function EditToolbar() {

    const handleAddProduct =() => {
      setOpenCreateProduct(true);
    };


    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddProduct}>
          Add product
        </Button>
      </GridToolbarContainer>
    );
  }


  const flattenedData = [
    ...collection.products.map((product, index) => ({
      id: index,
      _id: product._id,
      productName: product.product_name,
      stock: product.stock,
      description: product.description,
      acquisitionCost: product.purchased,
      price: product.price,
      condition: product.condition,
      ...product.shipping_properties,
    }))
  ];

  const columnDefs = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: "100",
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key='DeleteProduct'
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key='EditProduct'
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    { field: "_id", headerName: "_id", type: "string"},
    { field: "productName", headerName: "Name", type: "string" },
    { field: "stock", headerName: "Stock", type: "number" },
    { field: "description", headerName: "Description", type: "string" },
    { field: "acquisitionCost", headerName: "Acquisition Cost", type: "number" },
    { field: "price", headerName: "Price", type: "number" },
    { field: "condition", headerName: "Condition", type: "string" },
    { field: "weight", headerName: "Weight", type: "number" },
    { field: "height", headerName: "Height", type: "number" },
    { field: "width", headerName: "Width", type: "number" },
    { field: "depth", headerName: "Depth", type: "number" },
  ]

  return ([
    <Box
      key='CollectionDataGrid'
      sx={{
        height: 500,
        minWidth: '500px',
        width: "auto",
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={flattenedData}
        columns={columnDefs}
        autosizeOnMount
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        slots={{
          toolbar: EditToolbar,
        }}
      />
    </Box>,
    <Button
      onClick={handleUpdateCollection}
      key="UpdateCollectionBtn"
      size="small"
      color="primary"
    >
      Update This Collection
    </Button>,
    <Button
      onClick={handleDeleteCollection}
      key="DeleteCollectionBtn"
      size="small"
      color="error"
      >
      Delete This Collection
    </Button>,
    <ProductDeleteConfirm
      key="ProductDeleteConfirm"
      productToDelete={productToDelete}
      collectionName={collection.collection_name}
      deleteProductModalState={[openDeleteProduct, setOpenDeleteProduct]} />,
    <CreateProductForm 
      key="CreateProductForm"
      collectionName={collection.collection_name}
      createProductModalState={[openCreateProduct, setOpenCreateProduct]}
    />,
    <CollectionForm
      key='UpdateCollectionForm'
      mode='update'
      collectionName={collection.collection_name}
      modalState={[openUpdateCollection, setOpenUpdateCollection]}
    />,
    <DeleteCollectionForm 
      key='DeleteCollectionForm'
      modalState={[openDeleteCollection, setOpenDeleteCollection]}
      collectionName={ collection.collection_name }
    />,
    <UpdateProductForm
      key="UpdateProductForm"
      collectionName={collection.collection_name}
      updateProductModalState={[openUpdateProduct, setOpenUpdateProduct]}
      product={productToUpdate}
    />
  ]);
}
