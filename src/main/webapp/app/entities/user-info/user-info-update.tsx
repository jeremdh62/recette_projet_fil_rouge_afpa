import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IRole } from 'app/shared/model/role.model';
import { getEntities as getRoles } from 'app/entities/role/role.reducer';
import { IReward } from 'app/shared/model/reward.model';
import { getEntities as getRewards } from 'app/entities/reward/reward.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-info.reducer';
import { IUserInfo } from 'app/shared/model/user-info.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserInfoUpdate = (props: IUserInfoUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [roleId, setRoleId] = useState('0');
  const [rewardId, setRewardId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { userInfoEntity, users, roles, rewards, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-info');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getRoles();
    props.getRewards();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...userInfoEntity,
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
          <h2 id="afparecetteApp.userInfo.home.createOrEditLabel">
            <Translate contentKey="afparecetteApp.userInfo.home.createOrEditLabel">Create or edit a UserInfo</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userInfoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-info-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-info-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup check>
                <Label id="newsletterLabel">
                  <AvInput id="user-info-newsletter" type="checkbox" className="form-check-input" name="newsletter" />
                  <Translate contentKey="afparecetteApp.userInfo.newsletter">Newsletter</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="user-info-createdAt">
                  <Translate contentKey="afparecetteApp.userInfo.createdAt">Created At</Translate>
                </Label>
                <AvField id="user-info-createdAt" type="date" className="form-control" name="createdAt" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="user-info-updatedAt">
                  <Translate contentKey="afparecetteApp.userInfo.updatedAt">Updated At</Translate>
                </Label>
                <AvField id="user-info-updatedAt" type="date" className="form-control" name="updatedAt" />
              </AvGroup>
              <AvGroup>
                <Label id="userNameLabel" for="user-info-userName">
                  <Translate contentKey="afparecetteApp.userInfo.userName">User Name</Translate>
                </Label>
                <AvField id="user-info-userName" type="text" name="userName" />
              </AvGroup>
              <AvGroup>
                <Label for="user-info-user">
                  <Translate contentKey="afparecetteApp.userInfo.user">User</Translate>
                </Label>
                <AvInput id="user-info-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="user-info-role">
                  <Translate contentKey="afparecetteApp.userInfo.role">Role</Translate>
                </Label>
                <AvInput id="user-info-role" type="select" className="form-control" name="role.id">
                  <option value="" key="0" />
                  {roles
                    ? roles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="user-info-reward">
                  <Translate contentKey="afparecetteApp.userInfo.reward">Reward</Translate>
                </Label>
                <AvInput id="user-info-reward" type="select" className="form-control" name="reward.id">
                  <option value="" key="0" />
                  {rewards
                    ? rewards.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-info" replace color="info">
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
  users: storeState.userManagement.users,
  roles: storeState.role.entities,
  rewards: storeState.reward.entities,
  userInfoEntity: storeState.userInfo.entity,
  loading: storeState.userInfo.loading,
  updating: storeState.userInfo.updating,
  updateSuccess: storeState.userInfo.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getRoles,
  getRewards,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoUpdate);
