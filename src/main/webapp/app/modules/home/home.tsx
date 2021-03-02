import './home.scss';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button} from 'reactstrap';
import { IRecipe } from 'app/shared/model/recipe.model';
import { getEntities } from '../../entities/recipe/recipe.reducer';
import { IRootState } from 'app/shared/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export interface IRecipeProps extends StateProps, DispatchProps{}

export const Recipe = (props: IRecipeProps) => {
	useEffect(() => {
    props.getEntities();
  }, []);
const { recipeList } = props;
  return (
    <div className="d-flex">
    <div className="d-flex flex-wrap mt-5 justify-content-center">
	{recipeList.map((recipe, i) => (
      <Card key={`entity-${i}`} className="m-2 col-3 mt-5 cart">
        <CardImg className="img" src={`data:${recipe.pictureContentType};base64,${recipe.picture}`} style={{ maxHeight: '"30"px' }} />
        <CardBody>
          <CardTitle tag="h4">{recipe.name}</CardTitle>
          <FontAwesomeIcon style={{color:"fff200"}}  icon={faStar } />
          <FontAwesomeIcon style={{color:"fff200"}}  icon={faStar} />
          <FontAwesomeIcon style={{color:"fff200"}} icon={faStar} />
          <FontAwesomeIcon style={{color:"fff200"}} icon={faStar} />
          <FontAwesomeIcon   icon={faStar} />
          <span className="etoile">4/5</span>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{recipe.origin}</CardSubtitle>
          <CardText>{recipe.description}</CardText>
        </CardBody>
      </Card>
	))}
    </div>
     <div>
       <div className="aside"></div>
       <div className="aside2"></div>
       </div>
       </div>    

    
  );
};

const mapStateToProps = ({ recipe }: IRootState) => ({
  recipeList: recipe.entities,
  loading: recipe.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
