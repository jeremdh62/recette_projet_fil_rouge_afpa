import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './comments.reducer';
import { IComments } from 'app/shared/model/comments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Comments = (props: ICommentsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { commentsList, match, loading } = props;
  return (
    <div>
      <h2 id="comments-heading">
        <Translate contentKey="afparecetteApp.comments.home.title">Comments</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="afparecetteApp.comments.home.createLabel">Create new Comments</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {commentsList && commentsList.length > 0 ? (
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th />
                <th>
                  <Translate contentKey="afparecetteApp.comments.comments">Comments</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.comments.userinfo">Userinfo</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.comments.recipe">Recipe</Translate>
                </th>
              </tr>
            </thead>
            <tbody>
              {commentsList.map((comments, i) => (
                <tr key={`entity-${i}`}>
                  <td className="text-center">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${comments.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comments.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comments.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                  <td>{comments.comments}</td>
                  <td>{comments.userinfo ? <Link to={`user-info/${comments.userinfo.id}`}>{comments.userinfo.user.login}</Link> : ''}</td>
                  <td>{comments.recipe ? <Link to={`recipe/${comments.recipe.id}`}>{comments.recipe.name}</Link> : ''}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="afparecetteApp.comments.home.notFound">No Comments found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ comments }: IRootState) => ({
  commentsList: comments.entities,
  loading: comments.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
