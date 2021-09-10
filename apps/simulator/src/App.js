import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar'
import { Button } from '@material-ui/core';
import ControlPanel from './ControlPanel.js'
import React, { useState } from 'react';
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: 'space-between'
  },
  appbar: {
    padding: "10px 40px 10px 40px",
    marginBottom: "40px"
  },
  btn: {
    marginLeft: 'auto',
    margin: '0 10px 0 10px'
  }
})

function App() {
  const classes = useStyles()
  const [value, setValue] = useState(0);
  const clear = () => {
    return axios.post('/api/clear')
  }
  return (
    <Container fixed>
      <AppBar className={classes.appbar} position="static">
        <div className={classes.root}>
          <Typography variant="h6">AutoTest Simulator</Typography>
          <div>
            <Button className={classes.btn} onClick={() => setValue(value => value + 1)} variant="contained" >Randomize</Button>
            <Button className={classes.btn} onClick={clear} variant="contained" >Clear Server Mem</Button>
          </div>
        </div>
      </AppBar>
      <ControlPanel key={value} cols={3} rows={3}></ControlPanel>
    </Container>
  );
}

export default App;


