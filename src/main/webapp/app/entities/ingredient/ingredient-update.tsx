import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRecipe } from 'app/shared/model/recipe.model';
import { getEntities as getRecipes } from 'app/entities/recipe/recipe.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ingredient.reducer';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIngredientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IngredientUpdate = (props: IIngredientUpdateProps) => {
  const [recipeId, setRecipeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ingredientEntity, recipes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ingredient');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...ingredientEntity,
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
          <h2 id="afparecetteApp.ingredient.home.createOrEditLabel">
            <Translate contentKey="afparecetteApp.ingredient.home.createOrEditLabel">Create or edit a Ingredient</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ingredientEntity} onSubmit={saveEntity}>
              
              <AvGroup>
                <Label id="ingredientLabel" for="ingredient-ingredient">
                  <Translate contentKey="afparecetteApp.ingredient.ingredient">Ingredient</Translate>
                </Label>
                <AvField required id="ingredient-ingredient" type="text" name="ingredient" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/ingredient" replace color="info">
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
  recipes: storeState.recipe.entities,
  ingredientEntity: storeState.ingredient.entity,
  loading: storeState.ingredient.loading,
  updating: storeState.ingredient.updating,
  updateSuccess: storeState.ingredient.updateSuccess,
});

const mapDispatchToProps = {
  getRecipes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IngredientUpdate);
