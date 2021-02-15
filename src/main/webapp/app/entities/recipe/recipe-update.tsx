import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIngredient } from 'app/shared/model/ingredient.model';
import { getEntities as getIngredients } from 'app/entities/ingredient/ingredient.reducer';
import { IUstensil } from 'app/shared/model/ustensil.model';
import { getEntities as getUstensils } from 'app/entities/ustensil/ustensil.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { getEntities as getEvents } from 'app/entities/event/event.reducer';
import { IUserInfo } from 'app/shared/model/user-info.model';
import { getEntities as getUserInfos } from 'app/entities/user-info/user-info.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './recipe.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecipeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecipeUpdate = (props: IRecipeUpdateProps) => {
  const [idsingredient, setIdsingredient] = useState([]);
  const [idsustensil, setIdsustensil] = useState([]);
  const [idscategory, setIdscategory] = useState([]);
  const [idsevent, setIdsevent] = useState([]);
  const [userinfoId, setUserinfoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { recipeEntity, ingredients, ustensils, categories, events, userInfos, loading, updating } = props;

  const { picture, pictureContentType, unrollRecipe } = recipeEntity;

  const handleClose = () => {
    props.history.push('/recipe');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getIngredients();
    props.getUstensils();
    props.getCategories();
    props.getEvents();
    props.getUserInfos();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...recipeEntity,
        ...values,
        ingredients: mapIdList(values.ingredients),
        ustensils: mapIdList(values.ustensils),
        categories: mapIdList(values.categories),
        events: mapIdList(values.events),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="afparecetteApp.recipe.home.createOrEditLabel">
            <Translate contentKey="afparecetteApp.recipe.home.createOrEditLabel">Create or edit a Recipe</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recipeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="recipe-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="recipe-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="recipe-name">
                  <Translate contentKey="afparecetteApp.recipe.name">Name</Translate>
                </Label>
                <AvField id="recipe-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="recipe-description">
                  <Translate contentKey="afparecetteApp.recipe.description">Description</Translate>
                </Label>
                <AvField id="recipe-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="pictureLabel" for="picture">
                    <Translate contentKey="afparecetteApp.recipe.picture">Picture</Translate>
                  </Label>
                  <br />
                  {picture ? (
                    <div>
                      {pictureContentType ? (
                        <a onClick={openFile(pictureContentType, picture)}>
                          <img src={`data:${pictureContentType};base64,${picture}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {pictureContentType}, {byteSize(picture)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('picture')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_picture" type="file" onChange={onBlobChange(true, 'picture')} accept="image/*" />
                  <AvInput type="hidden" name="picture" value={picture} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="videoLabel" for="recipe-video">
                  <Translate contentKey="afparecetteApp.recipe.video">Video</Translate>
                </Label>
                <AvField id="recipe-video" type="text" name="video" />
              </AvGroup>
              <AvGroup>
                <Label id="difficultyLabel" for="recipe-difficulty">
                  <Translate contentKey="afparecetteApp.recipe.difficulty">Difficulty</Translate>
                </Label>
                <AvField id="recipe-difficulty" type="string" className="form-control" name="difficulty" />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="recipe-price">
                  <Translate contentKey="afparecetteApp.recipe.price">Price</Translate>
                </Label>
                <AvField id="recipe-price" type="string" className="form-control" name="price" />
              </AvGroup>
              <AvGroup>
                <Label id="unrollRecipeLabel" for="recipe-unrollRecipe">
                  <Translate contentKey="afparecetteApp.recipe.unrollRecipe">Unroll Recipe</Translate>
                </Label>
                <AvInput id="recipe-unrollRecipe" type="textarea" name="unrollRecipe" />
              </AvGroup>
              <AvGroup>
                <Label id="nbPersonLabel" for="recipe-nbPerson">
                  <Translate contentKey="afparecetteApp.recipe.nbPerson">Nb Person</Translate>
                </Label>
                <AvField id="recipe-nbPerson" type="string" className="form-control" name="nbPerson" />
              </AvGroup>
              <AvGroup>
                <Label id="timeLabel" for="recipe-time">
                  <Translate contentKey="afparecetteApp.recipe.time">Time</Translate>
                </Label>
                <AvField id="recipe-time" type="text" name="time" />
              </AvGroup>
              <AvGroup>
                <Label id="seasonLabel" for="recipe-season">
                  <Translate contentKey="afparecetteApp.recipe.season">Season</Translate>
                </Label>
                <AvField id="recipe-season" type="text" name="season" />
              </AvGroup>
              <AvGroup>
                <Label id="originLabel" for="recipe-origin">
                  <Translate contentKey="afparecetteApp.recipe.origin">Origin</Translate>
                </Label>
                <AvField id="recipe-origin" type="text" name="origin" />
              </AvGroup>
              <AvGroup check>
                <Label id="onlineLabel">
                  <AvInput id="recipe-online" type="checkbox" className="form-check-input" name="online" />
                  <Translate contentKey="afparecetteApp.recipe.online">Online</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="cookingLabel" for="recipe-cooking">
                  <Translate contentKey="afparecetteApp.recipe.cooking">Cooking</Translate>
                </Label>
                <AvField id="recipe-cooking" type="text" name="cooking" />
              </AvGroup>
              <AvGroup check>
                <Label id="favoriteLabel">
                  <AvInput id="recipe-favorite" type="checkbox" className="form-check-input" name="favorite" />
                  <Translate contentKey="afparecetteApp.recipe.favorite">Favorite</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="recipe-createdAt">
                  <Translate contentKey="afparecetteApp.recipe.createdAt">Created At</Translate>
                </Label>
                <AvField id="recipe-createdAt" type="date" className="form-control" name="createdAt" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="recipe-updatedAt">
                  <Translate contentKey="afparecetteApp.recipe.updatedAt">Updated At</Translate>
                </Label>
                <AvField id="recipe-updatedAt" type="date" className="form-control" name="updatedAt" />
              </AvGroup>
              <AvGroup>
                <Label for="recipe-ingredient">
                  <Translate contentKey="afparecetteApp.recipe.ingredient">Ingredient</Translate>
                </Label>
                <AvInput
                  id="recipe-ingredient"
                  type="select"
                  multiple
                  className="form-control"
                  name="ingredients"
                  value={recipeEntity.ingredients && recipeEntity.ingredients.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {ingredients
                    ? ingredients.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.ingredient}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="recipe-ustensil">
                  <Translate contentKey="afparecetteApp.recipe.ustensil">Ustensil</Translate>
                </Label>
                <AvInput
                  id="recipe-ustensil"
                  type="select"
                  multiple
                  className="form-control"
                  name="ustensils"
                  value={recipeEntity.ustensils && recipeEntity.ustensils.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {ustensils
                    ? ustensils.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.ustensil}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="recipe-category">
                  <Translate contentKey="afparecetteApp.recipe.category">Category</Translate>
                </Label>
                <AvInput
                  id="recipe-category"
                  type="select"
                  multiple
                  className="form-control"
                  name="categories"
                  value={recipeEntity.categories && recipeEntity.categories.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.category}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="recipe-event">
                  <Translate contentKey="afparecetteApp.recipe.event">Event</Translate>
                </Label>
                <AvInput
                  id="recipe-event"
                  type="select"
                  multiple
                  className="form-control"
                  name="events"
                  value={recipeEntity.events && recipeEntity.events.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {events
                    ? events.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.event}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="recipe-userinfo">
                  <Translate contentKey="afparecetteApp.recipe.userinfo">Userinfo</Translate>
                </Label>
                <AvInput id="recipe-userinfo" type="select" className="form-control" name="userinfo.id">
                  <option value="" key="0" />
                  {userInfos
                    ? userInfos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/recipe" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  ingredients: storeState.ingredient.entities,
  ustensils: storeState.ustensil.entities,
  categories: storeState.category.entities,
  events: storeState.event.entities,
  userInfos: storeState.userInfo.entities,
  recipeEntity: storeState.recipe.entity,
  loading: storeState.recipe.loading,
  updating: storeState.recipe.updating,
  updateSuccess: storeState.recipe.updateSuccess,
});

const mapDispatchToProps = {
  getIngredients,
  getUstensils,
  getCategories,
  getEvents,
  getUserInfos,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeUpdate);
