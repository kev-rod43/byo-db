import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

export default function VerticalTabs() {
  const { loading, data } = useQuery(QUERY_ME);
  const [value, setValue] = useState(0);
  const [state, dispatch] = useUserContext();
  useEffect( () => {
    if (!loading){
       dispatch({
        type: SET_INITIAL_STATE,
        payload : data.me
      })}

    },[loading])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (!state.username){
    return <h2>LOADING...</h2>
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="ADD A COLLECTION" {...a11yProps(0)} />
        {state?.collections.map((collection,index) => (
            <Tab label={collection.collection_name} {...a11yProps(index+1)} />
            
        ))}
      </Tabs>
      <TabPanel value={value} index={0}>
            <CollectionForm mode="add"/>
          </TabPanel>
      {state?.collections.map((collection,index) => (
            <TabPanel value={value} index={index+1}>
            <CollectionDataGrid collection={collection}/>
          </TabPanel>
        ))}
    </Box>
  );
}
