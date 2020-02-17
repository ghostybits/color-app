import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import Button from '../components/Button'
import Swatch from '../components/Swatch'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100vh - 100px)',
    justifyContent: 'space-between',
    overflowY: 'hidden'
  },
  largeSwatch: {
    height: '52vh'
  },
  shadeView: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'center',
    height: '40px'
  },
  btnContainer: {
    width: '20%'
  }
}))

const DetailView = ({
  history,
  colorID
}: RouteComponentProps &{
  colorID: any
}) => {
  const classes = useStyles()
  const [color, setColor] = useState({
    hue: 0,
    saturation: 0,
    luminance: 0,
    hex: '#00000',
    id: 0,
    shades: []
  })

  async function fetchColorDetail(colorID: string) {
    let res = await fetch(`/api/color/${colorID}`)
    let color = await res.json()
    setColor(color)
  }
  

  useEffect(() => {
    fetchColorDetail(colorID)
  }, [colorID])


  return (
    <div className={classes.root}>
      <div className={classes.largeSwatch}>
        <Swatch color={color} large/>
      </div>
      <div className={classes.shadeView}>
        {color.shades.map(s => <Swatch color={s} />) }
      </div>
      <div className={classes.bottomBar}>
        <div className={classes.btnContainer}>
          <Button onClick={() => { history.goBack() }}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(DetailView)
