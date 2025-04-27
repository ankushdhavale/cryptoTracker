import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { color } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material';

export default function Tabs() {
  const [value, setValue] = React.useState('Grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    };
    
    const style = {
        color: "var(--white)",
        width: "50vh",
        fontSize: "1.2rem",
        fontWeight: 600,
        fontFamily: "Inter",
        textTransform:"capitalize"
    }

    const theme = createTheme({
        palette: {
            primary: {
                main:"#3a80e9"
            }
        }
    })

  return (
      <ThemeProvider theme={theme}>
      <TabContext value={value}>
          <TabList onChange={handleChange} variant='fullWidth'>
                  <Tab label="Grid" value="Grid" sx={style} />
            <Tab label="List" value="List" sx={style} />
          </TabList>
              <TabPanel value="Grid">Grid</TabPanel>
              <TabPanel value="List">List</TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
