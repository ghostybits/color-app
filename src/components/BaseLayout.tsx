import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from './Button'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#363C3C'
  },
  appLogo: {
    height: '30px',
    width: '30px'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: theme.spacing(3),
    backgroundColor: '#D6D8D8'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  btnContainer: {
    margin: '0 30px'
  },
  listItem: {
    padding: '5px 30px'
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    height: '38px',
    border: '1px solid #363C3C',
    borderRadius: '10px',
    width: '15%',
    padding: '0 15px',
    fontSize: '14px'
  }
}));

export default function BaseLayout({
  children
}: {
  children: any
}) {
  const classes = useStyles();

  const randomColorURL = () => (`/color/${Math.floor((Math.random() * 99) + 1)}`)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.navBar}>
          <Link to='/'>
            <img className={classes.appLogo} src='/public/img/logo-symbol.svg' />
          </Link>
          <input type="text" placeholder="Search" className={classes.searchInput}/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <div className={classes.btnContainer}>
          <Link to={() => randomColorURL()}>
            <Button>Random Color</Button>
          </Link>
        </div>
        <List>
          {['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Grey'].map((text, index) => (
            <ListItem button className={ classes.listItem } key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { children }
      </main>
    </div>
  );
}