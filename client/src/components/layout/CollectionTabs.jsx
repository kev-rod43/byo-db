import * as React from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useUserContext} from '../../utils/UserContext'
import CollectionDataGrid from './CollectionDataGrid'
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { SET_INITIAL_STATE } from '../../utils/actions';
import { useEffect } from 'react';
import CollectionForm from '../forms/CollectionForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const ButtonInTabs = ({ className, onClick, children }) => {
  return <Button className={className} onClick={onClick} children={children} />;
};

export default function VerticalTabs() {
  const { loading, data } = useQuery(QUERY_ME);
  const [value, setValue] = useState(0);
  const [state, dispatch] = useUserContext();
  useEffect( () => {
    console.log(state);
    if (!loading){
       dispatch({
        type: SET_INITIAL_STATE,
        payload : data.me
      })}

    },[loading])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const handleAddCollection = () => setOpen(true);
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (!state.username){
    return <h2>LOADING...</h2>
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "auto" }}
    >
      <Tabs
        key=""
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {state?.collections.map((collection,index) => (
            <Tab key={index + "collection"}label={collection.collection_name} {...a11yProps(index)} />
            
        ))}
        <ButtonInTabs
          onClick={handleAddCollection}
        >
          Add a Collection
        </ButtonInTabs>
      </Tabs>
      {state?.collections.map((collection,index) => (
            <TabPanel key={index + "TabPanel"}value={value} index={index}>
            <CollectionDataGrid key={index + "CollectionDataGrid"} collection={collection}/>
          </TabPanel>
        ))}
      <CollectionForm mode='add' collectionName='' modalState={[open, setOpen]}/>
    </Box>
  );
}
