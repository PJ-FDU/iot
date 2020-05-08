import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, makeStyles, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import ErrorIcon from '@material-ui/icons/Error';
import CloudIcon from '@material-ui/icons/Cloud';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

function App() {

  const classes = useStyles();

  const [rows, setRows] = useState<Array<{
    deviceId: number;
    phoneNumber: string;
    status: number;
    lastLogTime: string;
    info: string;
  }>>([]);

  useEffect(() => {
    fetch('/api/all-status')
      .then(res => res.json())
      .then(data => setRows(data))
      .catch(_ => null)
  }, []);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            智慧物联监测系统
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>设备ID</TableCell>
              <TableCell>设备号码</TableCell>
              <TableCell>设备状态</TableCell>
              <TableCell>最后在线时间</TableCell>
              <TableCell>设备信息</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.deviceId}>
                <TableCell component="th" scope="row">
                  {row.deviceId}
                </TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{
                  new Date().valueOf() - new Date(row.lastLogTime).valueOf() > 6000000 ?
                    <Chip icon={<CloudOffIcon />} label="离线" color="default" size="small" /> :
                    row.status === 0 ?
                      <Chip icon={<CloudIcon />} label="正常" color="primary" size="small" /> :
                      <Chip icon={<ErrorIcon />} label="故障" color="secondary" size="small" />
                }</TableCell>
                <TableCell>{new Date(row.lastLogTime).toLocaleString()}</TableCell>
                <TableCell>{row.info}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
