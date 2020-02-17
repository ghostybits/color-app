import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Color } from '../types/colorTypes'
import { ConditionalLink } from './ConditionalLink'

const useStyles = makeStyles(theme => ({
  swatchContainer: {
    boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    backgroundColor: '#FDFDFD',
    height: 'auto',
    margin: '1%',
    width: '15%',

    '&::before': {
      content: "''",
      float: 'left',
      paddingTop: '100%'
    },
  },
  large: {
    height: '50vh',
    width: '98%',
  },
  swatchPreview: {
    width: '100%',
    height: 'calc(100% - 30px)',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    border: 'solid #FDFDFD 2px',
  },
  swatchDetail: {
    color: 'black',
    height: '30px',
    padding: '5px 10px'
  },
  link: {
    textDecoration: 'none'
  }
}))

const Swatch = ({
  color,
  luminanceOverride,
  saturationOverride,
  large,
  link
}: {
  color: Color
  luminanceOverride?: number
  saturationOverride?: number
  large?: boolean
  link?: boolean
}) => {
  const classes = useStyles()
  const hue = color.hue
  const saturation = saturationOverride ? saturationOverride : color.saturation
  const luminance = luminanceOverride ? luminanceOverride : color.luminance

  return (
    <div
      className={`${classes.swatchContainer} ${large ? classes.large : ''}`}
    >
      <ConditionalLink to={`/color/${color.id}`} condition={link} className={classes.link}>
        <div className={classes.swatchPreview} style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${luminance}%)` }} />
        <div className={classes.swatchDetail}>
        { color.hex }
        </div>
      </ConditionalLink>
    </div>
  )
}

export default Swatch
