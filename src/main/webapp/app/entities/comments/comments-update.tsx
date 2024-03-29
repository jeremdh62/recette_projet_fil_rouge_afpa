import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserInfo } from 'app/shared/model/user-info.model';
import { getEntities as getUserInfos } from 'app/entities/user-info/user-info.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { getEntities as getRecipes } from 'app/entities/recipe/recipe.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './comments.reducer';
import { IComments } from 'app/shared/model/comments.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICommentsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommentsUpdate = (props: ICommentsUpdateProps) => {
  const [userinfoId, setUserinfoId] = useState('0');
  const [recipeId, setRecipeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { commentsEntity, userInfos, recipes, loading, updating } = props;

  const { comments } = commentsEntity;

  const handleClose = () => {
    props.history.push('/comments');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUserInfos();
    props.getRecipes();
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
        ...commentsEntity,
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
          <h2 id="afparecetteApp.comments.home.createOrEditLabel">
            <Translate contentKey="afparecetteApp.comments.home.createOrEditLabel">Create or edit a Comments</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : commentsEntity} onSubmit={saveEntity}>

              <AvGroup>
                <Label id="commentsLabel" for="comments-comments">
                  <Translate contentKey="afparecetteApp.comments.comments">Comments</Translate>
                </Label>
                <AvInput id="comments-comments" type="textarea" name="comments" />
              </AvGroup>
              <AvGroup>
                <Label for="comments-userinfo">
                  <Translate contentKey="afparecetteApp.comments.userinfo">Userinfo</Translate>
                </Label>
                <AvInput id="comments-userinfo" type="select" className="form-control" name="userinfo.id">
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
              <AvGroup>
                <Label for="comments-recipe">
                  <Translate contentKey="afparecetteApp.comments.recipe">Recipe</Translate>
                </Label>
                <AvInput id="comments-recipe" type="select" className="form-control" name="recipe.id">
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
              <Button tag={Link} id="cancel-save" to="/comments" replace color="info">
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
  userInfos: storeState.userInfo.entities,
  recipes: storeState.recipe.entities,
  commentsEntity: storeState.comments.entity,
  loading: storeState.comments.loading,
  updating: storeState.comments.updating,
  updateSuccess: storeState.comments.updateSuccess,
});

const mapDispatchToProps = {
  getUserInfos,
  getRecipes,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommentsUpdate);
