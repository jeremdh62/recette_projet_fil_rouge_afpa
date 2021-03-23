import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-info.reducer';
import { IUserInfo } from 'app/shared/model/user-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserInfoDetail = (props: IUserInfoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userInfoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="afparecetteApp.userInfo.detail.title">UserInfo</Translate> [<b>{userInfoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="newsletter">
              <Translate contentKey="afparecetteApp.userInfo.newsletter">Newsletter</Translate>
            </span>
          </dt>
          <dd>{userInfoEntity.newsletter ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="afparecetteApp.userInfo.user">User</Translate>
          </dt>
          <dd>{userInfoEntity.user ? userInfoEntity.user.login : ''}</dd>
          <dt>
            <Translate contentKey="afparecetteApp.userInfo.reward">Reward</Translate>
          </dt>
          <dd>{userInfoEntity.reward ? userInfoEntity.reward.reward : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-info" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-info/${userInfoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userInfo }: IRootState) => ({
  userInfoEntity: userInfo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoDetail);
