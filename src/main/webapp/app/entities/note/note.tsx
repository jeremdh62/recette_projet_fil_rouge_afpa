import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './note.reducer';
import { INote } from 'app/shared/model/note.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Note = (props: INoteProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { noteList, match, loading } = props;
  return (
    <div>
      <h2 id="note-heading">
        <Translate contentKey="afparecetteApp.note.home.title">Notes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="afparecetteApp.note.home.createLabel">Create new Note</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {noteList && noteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.note.note">Note</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.note.recipe">Recipe</Translate>
                </th>
                <th>
                  <Translate contentKey="afparecetteApp.note.userinfo">Userinfo</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {noteList.map((note, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${note.id}`} color="link" size="sm">
                      {note.id}
                    </Button>
                  </td>
                  <td>{note.note}</td>
                  <td>{note.recipe ? <Link to={`recipe/${note.recipe.id}`}>{note.recipe.id}</Link> : ''}</td>
                  <td>{note.userinfo ? <Link to={`user-info/${note.userinfo.id}`}>{note.userinfo.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${note.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${note.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${note.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="afparecetteApp.note.home.notFound">No Notes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ note }: IRootState) => ({
  noteList: note.entities,
  loading: note.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Note);
