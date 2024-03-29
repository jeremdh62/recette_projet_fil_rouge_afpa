import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Event = (props: IEventProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { eventList, match, loading } = props;
  return (
    <div>
      <h2 id="event-heading">
        <Translate contentKey="afparecetteApp.event.home.title">Events</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="afparecetteApp.event.home.createLabel">Create new Event</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {eventList && eventList.length > 0 ? (
          <Table responsive striped bordered>
            <thead>
              <tr>
              <th />
                <th>
                  <Translate contentKey="afparecetteApp.event.event">Event</Translate>
                </th>
                
              </tr>
            </thead>
            <tbody>
              {eventList.map((event, i) => (
                <tr key={`entity-${i}`}>

                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${event.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${event.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${event.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                  
                  <td>{event.event}</td>

                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="afparecetteApp.event.home.notFound">No Events found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ event }: IRootState) => ({
  eventList: event.entities,
  loading: event.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Event);
