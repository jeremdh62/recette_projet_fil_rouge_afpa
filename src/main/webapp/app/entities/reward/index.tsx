import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Reward from './reward';
import RewardDetail from './reward-detail';
import RewardUpdate from './reward-update';
import RewardDeleteDialog from './reward-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RewardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RewardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RewardDetail} />
      <ErrorBoundaryRoute path={match.url} component={Reward} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RewardDeleteDialog} />
  </>
);

export default Routes;
