import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './recipe.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecipeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Recipe = (props: IRecipeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { recipeList, match, loading } = props;
  return (
    <div>
      <h2 id="recipe-heading">
        <Translate contentKey="afparecetteApp.recipe.home.title">Recipes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="afparecetteApp.recipe.home.createLabel">Create new Recipe</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {recipeList && recipeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.picture">Picture</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.video">Video</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.difficulty">Difficulty</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.unrollRecipe">Unroll Recipe</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.nbPerson">Nb Person</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.time">Time</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.season">Season</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.origin">Origin</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.online">Online</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.cooking">Cooking</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.favorite">Favorite</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.updatedAt">Updated At</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.ingredient">Ingredient</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.ustensil">Ustensil</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.event">Event</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.recipe.userinfo">Userinfo</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recipeList.map((recipe, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${recipe.id}`} color="link" size="sm">
                      {recipe.id}
                    </Button>
                  </td>
                  <td>{recipe.name}</td>
                  <td>{recipe.description}</td>
                  <td>
                    {recipe.picture ? (
                      <div>
                        {recipe.pictureContentType ? (
                          <a onClick={openFile(recipe.pictureContentType, recipe.picture)}>
                            <img src={`data:${recipe.pictureContentType};base64,${recipe.picture}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {recipe.pictureContentType}, {byteSize(recipe.picture)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{recipe.video}</td>
                  <td>{recipe.difficulty}</td>
                  <td>{recipe.price}</td>
                  <td>{recipe.unrollRecipe}</td>
                  <td>{recipe.nbPerson}</td>
                  <td>{recipe.time}</td>
                  <td>{recipe.season}</td>
                  <td>{recipe.origin}</td>
                  <td>{recipe.online ? 'true' : 'false'}</td>
                  <td>{recipe.cooking}</td>
                  <td>{recipe.favorite ? 'true' : 'false'}</td>
                  <td>{recipe.createdAt ? <TextFormat type="date" value={recipe.createdAt} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{recipe.updatedAt ? <TextFormat type="date" value={recipe.updatedAt} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    {recipe.ingredients
                      ? recipe.ingredients.map((val, j) => (
                          <span key={j}>
                            <Link to={`ingredient/${val.id}`}>{val.ingredient}</Link>
                            {j === recipe.ingredients.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {recipe.ustensils
                      ? recipe.ustensils.map((val, j) => (
                          <span key={j}>
                            <Link to={`ustensil/${val.id}`}>{val.ustensil}</Link>
                            {j === recipe.ustensils.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {recipe.categories
                      ? recipe.categories.map((val, j) => (
                          <span key={j}>
                            <Link to={`category/${val.id}`}>{val.category}</Link>
                            {j === recipe.categories.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {recipe.events
                      ? recipe.events.map((val, j) => (
                          <span key={j}>
                            <Link to={`event/${val.id}`}>{val.event}</Link>
                            {j === recipe.events.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>{recipe.userinfo ? <Link to={`user-info/${recipe.userinfo.id}`}>{recipe.userinfo.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${recipe.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${recipe.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${recipe.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="afparecetteApp.recipe.home.notFound">No Recipes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ recipe }: IRootState) => ({
  recipeList: recipe.entities,
  loading: recipe.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
