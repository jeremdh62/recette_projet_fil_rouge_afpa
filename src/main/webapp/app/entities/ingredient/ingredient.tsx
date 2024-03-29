import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ingredient.reducer';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIngredientProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Ingredient = (props: IIngredientProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { ingredientList, match, loading } = props;
  return (
    <div>
      <h2 id="ingredient-heading">
        <Translate contentKey="afparecetteApp.ingredient.home.title">Ingredients</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="afparecetteApp.ingredient.home.createLabel">Create new Ingredient</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {ingredientList && ingredientList.length > 0 ? (
          <Table responsive striped bordered>
            <thead>
              <tr>
              <th />
                <th>
                  <Translate contentKey="afparecetteApp.ingredient.ingredient">Ingredient</Translate>
                </th>
                
              </tr>
            </thead>
            <tbody>
              {ingredientList.map((ingredient, i) => (
                <tr key={`entity-${i}`}>
                  
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${ingredient.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ingredient.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ingredient.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                  
                  <td>{ingredient.ingredient}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="afparecetteApp.ingredient.home.notFound">No Ingredients found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ ingredient }: IRootState) => ({
  ingredientList: ingredient.entities,
  loading: ingredient.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);
