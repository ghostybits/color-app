import React, { useState, useEffect } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";


import Swatch from '../components/Swatch'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: 'calc(100vh - 100px)'
  },
  swatches: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 'calc(100vh - 150px)',
    overflowY: 'scroll',
    justifyContent: 'space-between'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '30px'
  }
}))

const ListView = ({
  history,
  page
} : RouteComponentProps & {
  page: number
}) => {
  const classes = useStyles()
  const [currentPageData, setCurrentPageData] = useState([])
  const [pagination, setPaginationState] = useState({
    currentPage: page,
    totalPages: page
  })

  useEffect(() => {
    document.title = `Color List Page ${pagination.currentPage}`
    fetchListViewData(pagination.currentPage)
  }, [pagination.currentPage])


  function setPagination(updatedPagination) {
    if (updatedPagination.currentPage !== pagination.currentPage) {
      history.push({
        pathname: `/${updatedPagination.currentPage}`,
      })
    }

    setPaginationState(updatedPagination)
  }

  async function fetchListViewData(page: number) {
    const res = await fetch(`/api/list/${page}`)
    const { currentPageData, totalPages } = await res.json()    
    setCurrentPageData(currentPageData)

    let currentPage = pagination.currentPage
    if (currentPage > totalPages) {
      currentPage = totalPages
    }
    setPagination({ currentPage, totalPages })
  }

  function changePage(event, currentPage) {
    setPagination({...pagination, currentPage })
  }

  return (
    <div className={classes.root}>
      <div className={classes.swatches}>
        { currentPageData.map(c => <Swatch color={c} link key={`color-${c.id}`}/>) }
      </div>
      <div className={classes.paginationContainer}>
        <Pagination count={pagination.totalPages} onChange={changePage} page={pagination.currentPage} size='small'/>
      </div>
    </div>
  )
}

export default withRouter(ListView)
