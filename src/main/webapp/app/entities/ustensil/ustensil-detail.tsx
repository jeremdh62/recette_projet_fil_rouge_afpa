import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ustensil.reducer';
import { IUstensil } from 'app/shared/model/ustensil.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUstensilDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UstensilDetail = (props: IUstensilDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ustensilEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="afparecetteApp.ustensil.detail.title">Ustensil</Translate> [<b>{ustensilEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="ustensil">
              <Translate contentKey="afparecetteApp.ustensil.ustensil">Ustensil</Translate>
            </span>
          </dt>
          <dd>{ustensilEntity.ustensil}</dd>
        </dl>
        <Button tag={Link} to="/ustensil" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ustensil/${ustensilEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ ustensil }: IRootState) => ({
  ustensilEntity: ustensil.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UstensilDetail);
