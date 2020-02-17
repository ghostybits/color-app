import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import BaseLayout from '../components/BaseLayout'
import ListView from './ListView'
import DetailView from './DetailView'


export default (props: any) => {
  return (
    <div>
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route path='/color/:id' render={props => <DetailView colorID={props.match.params['id']} />} />
            <Route path='/:page' render={props => <ListView page={parseInt(props.match.params['page'])} />} /> 
            <Route render={() => <Redirect to='/1' />}/> 
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </div>
  )
}
