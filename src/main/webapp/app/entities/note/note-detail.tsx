import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './note.reducer';
import { INote } from 'app/shared/model/note.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NoteDetail = (props: INoteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { noteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="afparecetteApp.note.detail.title">Note</Translate> [<b>{noteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="note">
              <Translate contentKey="afparecetteApp.note.note">Note</Translate>
            </span>
          </dt>
          <dd>{noteEntity.note}</dd>
          <dt>
            <Translate contentKey="afparecetteApp.note.recipe">Recipe</Translate>
          </dt>
          <dd>{noteEntity.recipe ? noteEntity.recipe.name : ''}</dd>
          <dt>
            <Translate contentKey="afparecetteApp.note.userinfo">Userinfo</Translate>
          </dt>
          <dd>{noteEntity.userinfo ? noteEntity.userinfo.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/note" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/note/${noteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ note }: IRootState) => ({
  noteEntity: note.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
