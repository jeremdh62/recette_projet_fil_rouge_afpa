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
import { IUserInfo } from 'app/shared/model/user-info.model';
import { getEntities as getUserInfos } from 'app/entities/user-info/user-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './note.reducer';
import { INote } from 'app/shared/model/note.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INoteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NoteUpdate = (props: INoteUpdateProps) => {
  const [recipeId, setRecipeId] = useState('0');
  const [userinfoId, setUserinfoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { noteEntity, recipes, userInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/note');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRecipes();
    props.getUserInfos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...noteEntity,
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
          <h2 id="afparecetteApp.note.home.createOrEditLabel">
            <Translate contentKey="afparecetteApp.note.home.createOrEditLabel">Create or edit a Note</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : noteEntity} onSubmit={saveEntity}>
              <AvGroup>
                <Label id="noteLabel" for="note-note">
                  <Translate contentKey="afparecetteApp.note.note">Note</Translate>
                </Label>
                <AvField id="note-note" type="string" className="form-control" name="note" />
              </AvGroup>
              <AvGroup>
                <Label for="note-recipe">
                  <Translate contentKey="afparecetteApp.note.recipe">Recipe</Translate>
                </Label>
                <AvInput id="note-recipe" type="select" className="form-control" name="recipe.id">
                  <option value="" key="0" />
                  {recipes
                    ? recipes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="note-userinfo">
                  <Translate contentKey="afparecetteApp.note.userinfo">Userinfo</Translate>
                </Label>
                <AvInput id="note-userinfo" type="select" className="form-control" name="userinfo.id">
                  <option value="" key="0" />
                  {userInfos
                    ? userInfos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.user.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/note" replace color="info">
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
  userInfos: storeState.userInfo.entities,
  noteEntity: storeState.note.entity,
  loading: storeState.note.loading,
  updating: storeState.note.updating,
  updateSuccess: storeState.note.updateSuccess,
});

const mapDispatchToProps = {
  getRecipes,
  getUserInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NoteUpdate);
