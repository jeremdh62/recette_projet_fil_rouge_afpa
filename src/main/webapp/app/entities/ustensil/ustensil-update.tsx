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
import { getEntity, updateEntity, createEntity, reset } from './ustensil.reducer';
import { IUstensil } from 'app/shared/model/ustensil.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUstensilUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UstensilUpdate = (props: IUstensilUpdateProps) => {
  const [recipeId, setRecipeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ustensilEntity, recipes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ustensil');
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
        ...ustensilEntity,
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
          <h2 id="afparecetteApp.ustensil.home.createOrEditLabel">
            <Translate contentKey="afparecetteApp.ustensil.home.createOrEditLabel">Create or edit a Ustensil</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ustensilEntity} onSubmit={saveEntity}>
              
              <AvGroup>
                <Label id="ustensilLabel" for="ustensil-ustensil">
                  <Translate contentKey="afparecetteApp.ustensil.ustensil">Ustensil</Translate>
                </Label>
                <AvField id="ustensil-ustensil" type="text" name="ustensil" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/ustensil" replace color="info">
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
  ustensilEntity: storeState.ustensil.entity,
  loading: storeState.ustensil.loading,
  updating: storeState.ustensil.updating,
  updateSuccess: storeState.ustensil.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(UstensilUpdate);
