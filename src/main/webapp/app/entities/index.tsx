import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Recipe from './recipe';
import Note from './note';
import UserInfo from './user-info';
import Comments from './comments';
import Role from './role';
import Reward from './reward';
import Ingredient from './ingredient';
import Ustensil from './ustensil';
import Category from './category';
import Event from './event';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}recipe`} component={Recipe} />
      <ErrorBoundaryRoute path={`${match.url}note`} component={Note} />
      <ErrorBoundaryRoute path={`${match.url}user-info`} component={UserInfo} />
      <ErrorBoundaryRoute path={`${match.url}comments`} component={Comments} />
      <ErrorBoundaryRoute path={`${match.url}role`} component={Role} />
      <ErrorBoundaryRoute path={`${match.url}reward`} component={Reward} />
      <ErrorBoundaryRoute path={`${match.url}ingredient`} component={Ingredient} />
      <ErrorBoundaryRoute path={`${match.url}ustensil`} component={Ustensil} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}event`} component={Event} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
