import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIngredient } from 'app/shared/model/ingredient.model';
import { getEntities as getIngredients } from 'app/entities/ingredient/ingredient.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { getEntities as getRecipes } from 'app/entities/recipe/recipe.reducer';
import { getEntity, updateEntity, createEntity, reset } from './quantity.reducer';
import { IQuantity } from 'app/shared/model/quantity.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuantityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuantityUpdate = (props: IQuantityUpdateProps) => {
  const [ingredientId, setIngredientId] = useState('0');
  const [recipeId, setRecipeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { quantityEntity, ingredients, recipes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/quantity' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getIngredients();
    props.getRecipes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...quantityEntity,
        ...values,
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
          <h2 id="afparecetteApp.quantity.home.createOrEditLabel">
            <Translate contentKey="afparecetteApp.quantity.home.createOrEditLabel">Create or edit a Quantity</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : quantityEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="quantity-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="quantity-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="qtyLabel" for="quantity-qty">
                  <Translate contentKey="afparecetteApp.quantity.qty">Qty</Translate>
                </Label>
                <AvField
                  id="quantity-qty"
                  type="string"
                  className="form-control"
                  name="qty"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="unitLabel" for="quantity-unit">
                  <Translate contentKey="afparecetteApp.quantity.unit">Unit</Translate>
                </Label>
                <AvField
                  id="quantity-unit"
                  type="text"
                  name="unit"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="quantity-ingredient">
                  <Translate contentKey="afparecetteApp.quantity.ingredient">Ingredient</Translate>
                </Label>
                <AvInput required id="quantity-ingredient" type="select" className="form-control" name="ingredient.id">
                  <option value="" key="0" />
                  {ingredients
                    ? ingredients.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="quantity-recipe">
                  <Translate contentKey="afparecetteApp.quantity.recipe">Recipe</Translate>
                </Label>
                <AvInput required id="quantity-recipe" type="select" className="form-control" name="recipe.id">
                  <option value="" key="0" />
                  {recipes
                    ? recipes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/quantity" replace color="info">
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
  recipes: storeState.recipe.entities,
  quantityEntity: storeState.quantity.entity,
  loading: storeState.quantity.loading,
  updating: storeState.quantity.updating,
  updateSuccess: storeState.quantity.updateSuccess,
});

const mapDispatchToProps = {
  getIngredients,
  getRecipes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuantityUpdate);
