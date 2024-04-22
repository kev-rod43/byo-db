import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AlertDialog from '../forms/DeleteConfirm';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';

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

  const handleEditClick = () => () => {
    //TO DO:display form dialogue to update product useMutation update_product, then update state using reducer

    console.log("clicked edit")
  };

  const [productToDelete, setProductToDelete] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleDeleteClick = (id) => () => {
    //TO DO:replace confirm with confirm dialogue useMutation delete_product, then update state using reducer
    setProductToDelete(flattenedData[id]._id);
    setOpen(true);

    
  }
  function EditToolbar() {

    const handleClick = () => {
      //TO DO:display form dialogue to make product useMutation create_product, then update state using reducer
      setOpen(true);
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
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
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    { field: "_id", headerName: "_id", type: "string" },
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
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        slots={{
          toolbar: EditToolbar,
        }}
      />
    </Box>,
  <AlertDialog productToDelete={productToDelete} collectionName= {collection.collection_name} modalState={[open, setOpen]}/>]);
}