import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-info.reducer';
import { IUserInfo } from 'app/shared/model/user-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UserInfo = (props: IUserInfoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { userInfoList, match, loading } = props;
  return (
    <div>
      <h2 id="user-info-heading">
        <Translate contentKey="afparecetteApp.userInfo.home.title">User Infos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="afparecetteApp.userInfo.home.createLabel">Create new User Info</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {userInfoList && userInfoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.userInfo.newsletter">Newsletter</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.userInfo.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.userInfo.updatedAt">Updated At</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.userInfo.userName">User Name</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.userInfo.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.userInfo.role">Role</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.userInfo.reward">Reward</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userInfoList.map((userInfo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${userInfo.id}`} color="link" size="sm">
                      {userInfo.id}
                    </Button>
                  </td>
                  <td>{userInfo.newsletter ? 'true' : 'false'}</td>
                  <td>
                    {userInfo.createdAt ? <TextFormat type="date" value={userInfo.createdAt} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {userInfo.updatedAt ? <TextFormat type="date" value={userInfo.updatedAt} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{userInfo.userName}</td>
                  <td>{userInfo.user ? userInfo.user.id : ''}</td>
                  <td>{userInfo.role ? <Link to={`role/${userInfo.role.id}`}>{userInfo.role.id}</Link> : ''}</td>
                  <td>{userInfo.reward ? <Link to={`reward/${userInfo.reward.id}`}>{userInfo.reward.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userInfo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userInfo.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userInfo.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="afparecetteApp.userInfo.home.notFound">No User Infos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ userInfo }: IRootState) => ({
  userInfoList: userInfo.entities,
  loading: userInfo.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
