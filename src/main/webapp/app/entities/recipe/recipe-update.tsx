import './recipe.scss';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIngredient } from 'app/shared/model/ingredient.model';
import { getEntities as getIngredients } from 'app/entities/ingredient/ingredient.reducer';
import { IUstensil } from 'app/shared/model/ustensil.model';
import { getEntities as getUstensils } from 'app/entities/ustensil/ustensil.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { getEntities as getEvents } from 'app/entities/event/event.reducer';
import { IUserInfo } from 'app/shared/model/user-info.model';
import { getEntities as getUserInfos } from 'app/entities/user-info/user-info.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './recipe.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import plat from './images/plat.jpg';
import entree from './images/entree.jpg';
import dessert from './images/dessert.jpg';
export interface IRecipeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const RecipeUpdate = (props: IRecipeUpdateProps) => {
	const [showIngredients, setShowIngredients] = useState(false);
	const [isEntree, setIsEntree] = useState(false);
	const [isPlat, setIsPlat] = useState(false);
	const [isDessert, setIsDessert] = useState(false);
	const [showUstensils, setShowUstensils] = useState(false);
	const [showEvents, setShowEvents] = useState(false);
	const [idsingredient, setIdsingredient] = useState([]);
	const [idsustensil, setIdsustensil] = useState([]);
	const [idscategory, setIdscategory] = useState([]);
	const [idsunroll, setIdsunroll] = useState(false);
	const [idsevent, setIdsevent] = useState([]);
	const [userinfoId, setUserinfoId] = useState('0');
	const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
	const { recipeEntity, ingredients, ustensils, categories, events, userInfos, loading, updating } = props;
	
	const { picture, pictureContentType, unrollRecipe } = recipeEntity;

	const handleClose = () => {
		props.history.push('/recipe');
	};
	useEffect(() => {
		if (isNew) {
			props.reset();
		} else {
			props.getEntity(props.match.params.id);
		}

		props.getIngredients();
		props.getUstensils();
		props.getCategories();
		props.getEvents();
		props.getUserInfos();
	}, []);
	
	const onBlobChange = (isAnImage, name) => event => {
		setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
	};
	const clearBlob = name => () => {
		props.setBlob(name, undefined, undefined);
	};

	useEffect(() => {
		if (props.updateSuccess) {
			handleClose();
		}
	}, [props.updateSuccess]);

	const saveEntity = (event, errors, values) => {
		if (errors.length === 0) {
			const entity = {
				...recipeEntity,
				...values,
				ingredients: mapIdList(idsingredient),
				ustensils: mapIdList(idsustensil),
				categories: mapIdList(idscategory),
				events: mapIdList(idsevent),
			};

			if (isNew) {
				props.createEntity(entity);
			} else {
				props.updateEntity(entity);
			}
		}
	};
	const removeTableIngredient = (e) =>{
    	const filteredArray = idsingredient.filter(item => item !== e)
    	setIdsingredient(filteredArray);
	};
	const removeTableUstensil = (e) =>{
    	const filteredArray = idsustensil.filter(item => item !== e)
    	setIdsustensil(filteredArray);
	};
	const removeTableEvent = (e) =>{
    	const filteredArray = idsevent.filter(item => item !== e)
    	setIdsevent(filteredArray);
	};
	return (
		<div>
			<Row className="justify-content-center mt-5">
				<Col md="8">{loading ? (<p>Loading...</p>) : (
							<AvForm className="container col-11" model={isNew ? {} : recipeEntity} onSubmit={saveEntity}>
								<AvGroup>
									<Label id="nameLabel" for="recipe-name" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.name">Recipe Title</Translate>
									</Label>
									<AvField id="recipe-name" type="text" name="name" />
								</AvGroup>
								<AvGroup>
									<Label for="recipe-category" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.category">Category</Translate>
									</Label>
									<div className="d-flex justify-content-start">
									</div>
									<div className="d-flex justify-content-between">
										<div>
											<span className="text-mandarin font-weight-bold">entrée</span>
											<div className="entree" style={{ border: isEntree ? '3px solid #e55039' : ''}} onClick={() => {setIsEntree(!isEntree); setIsPlat(false); setIsDessert(false)}} >
												<img onClick={() => setIdscategory([1])} className="img-entree" src={entree}/>
											</div>
										</div>
										<div>
											<span className="text-mandarin font-weight-bold">Plat</span>
											<div className="plat" style={{ border: isPlat ? '3px solid #e55039' : ''}} onClick={() => {setIsPlat(!isPlat); setIsEntree(false);setIsDessert(false)}}>
												<img onClick={() => setIdscategory([2])} className="img-plat" src={plat}/>
											</div>
										</div>
										<div>
											<span className="text-mandarin font-weight-bold">Dessert</span>
											<div className="dessert" style={{ border: isDessert ? '3px solid #e55039' : ''}} onClick={() => {setIsDessert(!isDessert); setIsEntree(false); setIsPlat(false)}}>
												<img onClick={() => setIdscategory([3])} className="img-dessert" src={dessert}/>
											</div>
										</div>
									</div>
								</AvGroup>
								<AvGroup>
									<Label id="descriptionLabel" for="recipe-description" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.description">Description</Translate>
									</Label>
									<AvField id="recipe-description" type="text" name="description" />
								</AvGroup>
								<AvGroup>
									<AvGroup>
										<Label id="pictureLabel" for="picture" className="text-mandarin font-weight-bold">
											<Translate contentKey="afparecetteApp.recipe.picture">Picture</Translate>
										</Label>
										<br />
										{picture ? (
											<div>
												{pictureContentType ? (
													<a onClick={openFile(pictureContentType, picture)}>
														<img src={`data:${pictureContentType};base64,${picture}`} style={{ maxHeight: '100px' }} />
													</a>
												) : null}
												<br />
												<Row>
													<Col md="11">
														<span>
															{pictureContentType}, {byteSize(picture)}
														</span>
													</Col>
													<Col md="1">
														<Button color="danger" onClick={clearBlob('picture')}>
															<FontAwesomeIcon icon="times-circle" />
														</Button>
													</Col>
												</Row>
											</div>
										) : null}
										<a href="#" id="browse" className="font-weight-bold">+</a>
									    <div id="wrapper">
									        <input id="input" type="file" onChange={onBlobChange(true, 'picture')} accept="image/*"/>
									    </div>
										<AvInput type="hidden" name="picture" value={picture} />
									</AvGroup>
								</AvGroup>
								
								<AvGroup>
									<Label id="videoLabel" for="recipe-video" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.video">Video</Translate>
									</Label>
									<AvField id="recipe-video" type="text" name="video" />
								</AvGroup>
								
								<AvGroup>
									<Label for="recipe-ingredient" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.ingredient">Ingredient</Translate>
										
									</Label>
									<div className="font-weight-bold add-plus" onClick={() => setShowIngredients(!showIngredients)}>+</div>
									{ 
										showIngredients ? 
										<AvInput
											id="recipe-ingredient"
											type="select"
											multiple
											className="form-control mt-3"
											name="ingredients"
											value={recipeEntity.ingredients && recipeEntity.ingredients.map(e => e.id)}
										>
											<option value="" key="0"/>
											{
												ingredients ? 
												ingredients.map(
													otherEntity => (
														<option key={otherEntity.id} onClick={() => setIdsingredient((oldArray) => [...oldArray, otherEntity.id])}>
															{otherEntity.ingredient}
														</option>
												))
												: null
												
											}
										</AvInput> : null
									}
										<div className="mt-3 d-flex flex-column">
										 {idsingredient ? idsingredient.map(
												otherEntity => (
													<div className="text-white p-3 bg-mandarin rounded mb-2 font-weight-bold d-flex justify-content-between" id={otherEntity} key={otherEntity}>
													{idsingredient ?
														<div>
														{
															ingredients ?
															ingredients.map(
																otherIngredient => (
															<span key={otherIngredient.id}>
																{otherEntity === otherIngredient.id && otherIngredient.ingredient}
																{otherEntity === otherIngredient.id && <button onClick={() => removeTableIngredient(otherEntity)}>{otherEntity}<i className="fas fa-times-circle"></i></button>}
															</span>
															
															))
															:null
														}
													
													</div>: null
													}
														
													
													</div>
												)):null
										  }
										</div>
								</AvGroup>
								<AvGroup>
									<Label for="recipe-ustensil" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.ustensil">Ustensil</Translate>
									</Label>
									<div className="font-weight-bold add-plus" onClick={() => setShowUstensils(!showUstensils)}>+</div>
									{ 
											showUstensils ? <AvInput
										
											id="recipe-ustensil"
											type="select"
											multiple
											className="form-control"
											name="ustensils"
											value={recipeEntity.ustensils && recipeEntity.ustensils.map(e => e.id)}
										>
											<option value="" key="0" />
											{ustensils
												? ustensils.map(otherEntity => (
													<option key={otherEntity.id} onClick={() => setIdsustensil((oldArray) => [...oldArray, otherEntity.id])}>
														{otherEntity.ustensil}
													</option>
												))
												: null}
										</AvInput> : null
									}
									<div className="mt-3 d-flex flex-column">
										 {idsustensil ? idsustensil.map(
												otherEntity => (
													<div className="text-white p-3 bg-mandarin rounded mb-2 font-weight-bold d-flex justify-content-between" id={otherEntity} key={otherEntity}>
													{idsustensil ?
														<div>
														{
															ustensils ?
															ustensils.map(
																otherUstensil => (
															<span key={otherUstensil.id}>
																{otherEntity === otherUstensil.id && otherUstensil.ustensil}
																{otherEntity === otherUstensil.id && <button onClick={() => removeTableUstensil(otherEntity)}>{otherEntity}<i className="fas fa-times-circle"></i></button>}
															</span>
															
															))
															:null
														}
													
													</div>: null
													}
														
													
													</div>
												)):null
										  }
										</div>
									
								</AvGroup>
								<AvGroup>
									<Label id="unrollRecipeLabel" for="recipe-unrollRecipe" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.unrollRecipe">Unroll Recipe</Translate>
									</Label>
									<div className="font-weight-bold add-plus" onClick={() => setIdsunroll(!idsunroll)}>+</div>
									{idsunroll ? <AvInput id="recipe-unrollRecipe" type="textarea" name="unrollRecipe" /> : null}
								</AvGroup>
								<AvGroup>
									<Label for="recipe-event" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.event">Event</Translate>
									</Label>
									<div className="font-weight-bold add-plus" onClick={() => setShowEvents(!showEvents)}>+</div>
									{showEvents ? <AvInput
										id="recipe-event"
										type="select"
										multiple
										className="form-control"
										name="events"
										value={recipeEntity.events && recipeEntity.events.map(e => e.id)}
									>
										<option value="" key="0" />
										{events
											? events.map(otherEntity => (
												<option key={otherEntity.id} onClick={() => setIdsevent((oldArray) => [...oldArray, otherEntity.id])}>
													{otherEntity.event}
												</option>
											))
											: null
										}
									</AvInput> : null
									}
									
									<div className="mt-3 d-flex flex-column">
										 {
											idsevent ? idsevent.map(
												otherEntity => (
													<div className="text-white p-3 bg-mandarin rounded mb-2 font-weight-bold d-flex justify-content-between" id={otherEntity} key={otherEntity}>
													{idsevent ?
														<div>
														{
															events ?
															events.map(
																otherEvent => (
															<span key={otherEvent.id}>
																{otherEntity === otherEvent.id && otherEvent.event}
																{otherEntity === otherEvent.id && <button onClick={() => removeTableEvent(otherEntity)}>{otherEntity}<i className="fas fa-times-circle"></i></button>}
															</span>
															
															))
															:null
														}
													
													</div>: null
													}
														
													
													</div>
												)):null
										  }
										</div>
								</AvGroup>
								<AvGroup>
									<Label id="difficultyLabel" for="recipe-difficulty" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.difficulty">Difficulty</Translate>
									</Label>
									<AvField id="recipe-difficulty" type="string" className="form-control" name="difficulty" />
								</AvGroup>
								<AvGroup>
									<Label id="priceLabel" for="recipe-price" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.price">Price</Translate>
									</Label>
									<AvField id="recipe-price" type="string" className="form-control" name="price" />
								</AvGroup>
								<AvGroup>
									<Label id="unrollRecipeLabel" for="recipe-unrollRecipe" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.unrollRecipe">Unroll Recipe</Translate>
									</Label>
									<AvInput id="recipe-unrollRecipe" type="textarea" name="unrollRecipe" />
								</AvGroup>
								<AvGroup>
									<Label id="nbPersonLabel" for="recipe-nbPerson" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.nbPerson">Nb Person</Translate>
									</Label>
									<AvField id="recipe-nbPerson" type="string" className="form-control" name="nbPerson" />
								</AvGroup>
								<AvGroup>
									<Label id="timeLabel" for="recipe-time" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.time">Time</Translate>
									</Label>
									<AvField id="recipe-time" type="time" name="time" />
								</AvGroup>
								<AvGroup>
									<Label id="seasonLabel" for="recipe-season" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.season">Season</Translate>
									</Label>
									<AvField id="recipe-season" type="text" name="season" />
								</AvGroup>
								<AvGroup>
									<Label id="originLabel" for="recipe-origin" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.origin">Origin</Translate>
									</Label>
									<AvField id="recipe-origin" type="text" name="origin" />
								</AvGroup>
								<AvGroup check>
									<Label id="onlineLabel" className="text-mandarin font-weight-bold">
										<AvInput id="recipe-online" type="checkbox" className="form-check-input" name="online" />
										<Translate contentKey="afparecetteApp.recipe.online">Online</Translate>
									</Label>
								</AvGroup>
								<AvGroup>
									<Label id="cookingLabel" for="recipe-cooking" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.cooking">Cooking</Translate>
									</Label>
									<AvField id="recipe-cooking" type="text" name="cooking" />
								</AvGroup>
								<AvGroup check>
									<Label id="favoriteLabel" className="text-mandarin font-weight-bold">
										<AvInput id="recipe-favorite" type="checkbox" className="form-check-input" name="favorite" />
										<Translate contentKey="afparecetteApp.recipe.favorite">Favorite</Translate>
									</Label>
								</AvGroup>
								<AvGroup>
									<Label for="recipe-userinfo" className="text-mandarin font-weight-bold">
										<Translate contentKey="afparecetteApp.recipe.userinfo">Userinfo</Translate>
									</Label>
									<AvInput id="recipe-userinfo" type="select" className="form-control" name="userinfo.id">
										<option value="" key="0" />
										{userInfos
											? userInfos.map(otherEntity => (
												<option value={otherEntity.id} key={otherEntity.id}>
													{otherEntity.id}
												</option>
											))
											: null}
									</AvInput>
								</AvGroup>
								<div className="d-flex justify-content-center">
									<div>
										<Button tag={Link} id="cancel-save" to="/recipe" replace color="info">
											<FontAwesomeIcon icon="arrow-left" />
		                					&nbsp;
		                					<span className="d-none d-md-inline">
												<Translate contentKey="entity.action.back">Back</Translate>
											</span>
										</Button>
	              					&nbsp;
									</div>
									<div>
										<Button color="success" id="save-entity" type="submit" disabled={updating}>
											<FontAwesomeIcon icon="save" />
		                				&nbsp;
		                					<Translate contentKey="entity.action.save">Save</Translate>
										</Button>
									</div>
								</div>
							</AvForm>
						)}
				</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = (storeState: IRootState) => ({
	ingredients: storeState.ingredient.entities,
	ustensils: storeState.ustensil.entities,
	categories: storeState.category.entities,
	events: storeState.event.entities,
	userInfos: storeState.userInfo.entities,
	recipeEntity: storeState.recipe.entity,
	loading: storeState.recipe.loading,
	updating: storeState.recipe.updating,
	updateSuccess: storeState.recipe.updateSuccess,
});

const mapDispatchToProps = {
	getIngredients,
	getUstensils,
	getCategories,
	getEvents,
	getUserInfos,
	getEntity,
	updateEntity,
	setBlob,
	createEntity,
	reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeUpdate);

