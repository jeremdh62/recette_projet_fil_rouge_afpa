import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comments.reducer';
import { IComments } from 'app/shared/model/comments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommentsDetail = (props: ICommentsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { commentsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="afparecetteApp.comments.detail.title">Comments</Translate> [<b>{commentsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="comments">
              <Translate contentKey="afparecetteApp.comments.comments">Comments</Translate>
            </span>
          </dt>
          <dd>{commentsEntity.comments}</dd>
          <dt>
            <Translate contentKey="afparecetteApp.comments.userinfo">Userinfo</Translate>
          </dt>
          <dd>{commentsEntity.userinfo ? commentsEntity.userinfo.id : ''}</dd>
          <dt>
            <Translate contentKey="afparecetteApp.comments.recipe">Recipe</Translate>
          </dt>
          <dd>{commentsEntity.recipe ? commentsEntity.recipe.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/comments" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comments/${commentsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ comments }: IRootState) => ({
  commentsEntity: comments.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommentsDetail);
