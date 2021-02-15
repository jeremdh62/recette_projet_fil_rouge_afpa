import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/recipe">
      <Translate contentKey="global.menu.entities.recipe" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/note">
      <Translate contentKey="global.menu.entities.note" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-info">
      <Translate contentKey="global.menu.entities.userInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/comments">
      <Translate contentKey="global.menu.entities.comments" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/role">
      <Translate contentKey="global.menu.entities.role" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/reward">
      <Translate contentKey="global.menu.entities.reward" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ingredient">
      <Translate contentKey="global.menu.entities.ingredient" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ustensil">
      <Translate contentKey="global.menu.entities.ustensil" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      <Translate contentKey="global.menu.entities.category" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/event">
      <Translate contentKey="global.menu.entities.event" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
