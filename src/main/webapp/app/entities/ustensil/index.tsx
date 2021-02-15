import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Ustensil from './ustensil';
import UstensilDetail from './ustensil-detail';
import UstensilUpdate from './ustensil-update';
import UstensilDeleteDialog from './ustensil-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UstensilUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UstensilUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UstensilDetail} />
      <ErrorBoundaryRoute path={match.url} component={Ustensil} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UstensilDeleteDialog} />
  </>
);

export default Routes;
