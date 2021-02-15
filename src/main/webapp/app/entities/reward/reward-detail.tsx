import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reward.reducer';
import { IReward } from 'app/shared/model/reward.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRewardDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RewardDetail = (props: IRewardDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { rewardEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="afparecetteApp.reward.detail.title">Reward</Translate> [<b>{rewardEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reward">
              <Translate contentKey="afparecetteApp.reward.reward">Reward</Translate>
            </span>
          </dt>
          <dd>{rewardEntity.reward}</dd>
        </dl>
        <Button tag={Link} to="/reward" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reward/${rewardEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ reward }: IRootState) => ({
  rewardEntity: reward.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RewardDetail);
