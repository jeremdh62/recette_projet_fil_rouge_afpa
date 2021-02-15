import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './recipe.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecipeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecipeDetail = (props: IRecipeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recipeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="afparecetteApp.recipe.detail.title">Recipe</Translate> [<b>{recipeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="afparecetteApp.recipe.name">Name</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="afparecetteApp.recipe.description">Description</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.description}</dd>
          <dt>
            <span id="picture">
              <Translate contentKey="afparecetteApp.recipe.picture">Picture</Translate>
            </span>
          </dt>
          <dd>
            {recipeEntity.picture ? (
              <div>
                {recipeEntity.pictureContentType ? (
                  <a onClick={openFile(recipeEntity.pictureContentType, recipeEntity.picture)}>
                    <img src={`data:${recipeEntity.pictureContentType};base64,${recipeEntity.picture}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {recipeEntity.pictureContentType}, {byteSize(recipeEntity.picture)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="video">
              <Translate contentKey="afparecetteApp.recipe.video">Video</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.video}</dd>
          <dt>
            <span id="difficulty">
              <Translate contentKey="afparecetteApp.recipe.difficulty">Difficulty</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.difficulty}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="afparecetteApp.recipe.price">Price</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.price}</dd>
          <dt>
            <span id="unrollRecipe">
              <Translate contentKey="afparecetteApp.recipe.unrollRecipe">Unroll Recipe</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.unrollRecipe}</dd>
          <dt>
            <span id="nbPerson">
              <Translate contentKey="afparecetteApp.recipe.nbPerson">Nb Person</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.nbPerson}</dd>
          <dt>
            <span id="time">
              <Translate contentKey="afparecetteApp.recipe.time">Time</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.time}</dd>
          <dt>
            <span id="season">
              <Translate contentKey="afparecetteApp.recipe.season">Season</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.season}</dd>
          <dt>
            <span id="origin">
              <Translate contentKey="afparecetteApp.recipe.origin">Origin</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.origin}</dd>
          <dt>
            <span id="online">
              <Translate contentKey="afparecetteApp.recipe.online">Online</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.online ? 'true' : 'false'}</dd>
          <dt>
            <span id="cooking">
              <Translate contentKey="afparecetteApp.recipe.cooking">Cooking</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.cooking}</dd>
          <dt>
            <span id="favorite">
              <Translate contentKey="afparecetteApp.recipe.favorite">Favorite</Translate>
            </span>
          </dt>
          <dd>{recipeEntity.favorite ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="afparecetteApp.recipe.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {recipeEntity.createdAt ? <TextFormat value={recipeEntity.createdAt} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="afparecetteApp.recipe.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>
            {recipeEntity.updatedAt ? <TextFormat value={recipeEntity.updatedAt} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="afparecetteApp.recipe.ingredient">Ingredient</Translate>
          </dt>
          <dd>
            {recipeEntity.ingredients
              ? recipeEntity.ingredients.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.ingredient}</a>
                    {recipeEntity.ingredients && i === recipeEntity.ingredients.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="afparecetteApp.recipe.ustensil">Ustensil</Translate>
          </dt>
          <dd>
            {recipeEntity.ustensils
              ? recipeEntity.ustensils.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.ustensil}</a>
                    {recipeEntity.ustensils && i === recipeEntity.ustensils.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="afparecetteApp.recipe.category">Category</Translate>
          </dt>
          <dd>
            {recipeEntity.categories
              ? recipeEntity.categories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.category}</a>
                    {recipeEntity.categories && i === recipeEntity.categories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="afparecetteApp.recipe.event">Event</Translate>
          </dt>
          <dd>
            {recipeEntity.events
              ? recipeEntity.events.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.event}</a>
                    {recipeEntity.events && i === recipeEntity.events.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="afparecetteApp.recipe.userinfo">Userinfo</Translate>
          </dt>
          <dd>{recipeEntity.userinfo ? recipeEntity.userinfo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/recipe" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/recipe/${recipeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recipe }: IRootState) => ({
  recipeEntity: recipe.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
