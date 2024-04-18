import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataGrid({collection}) {
  const flattenedData = [
    ...collection.products.map((product, index) => ({
        id: index,
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
    {field: "productName", headerName: "Name",type: "string"},
    {field: "stock", headerName: "Stock",type: "number"},
    {field: "description", headerName: "Description",type: "string"},
    {field: "acquisitionCost" , headerName: "Acquisition Cost",type: "number"},
    {field: "price", headerName: "Price", type: "number"},
    {field: "condition", headerName: "Condition", type: "string"},
    {field: "weight", headerName: "Weight", type: "number"},
    {field: "height", headerName: "Height", type: "number"},
    {field: "width", headerName: "Width", type: "number"},
    {field: "depth", headerName: "Depth", type: "number"},
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
         rows={flattenedData} columns={columnDefs}/>
    </div>
  );
}