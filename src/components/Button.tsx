import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #363C3C',
    width: '100%',
    height: '38px',
    borderRadius: '10px',
    fontSize: '14px'
  },
}));


export default ({
  children,
  onClick
}: {
  children: any
  onClick?: any
}) => {
  const classes = useStyles()
  return (onClick ? 
   <button className={classes.button} onClick={onClick}>{ children }</button> :
    <button className={classes.button}>{children}</button>)
}