import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import recipe, {
  RecipeState
} from 'app/entities/recipe/recipe.reducer';
// prettier-ignore
import note, {
  NoteState
} from 'app/entities/note/note.reducer';
// prettier-ignore
import userInfo, {
  UserInfoState
} from 'app/entities/user-info/user-info.reducer';
// prettier-ignore
import comments, {
  CommentsState
} from 'app/entities/comments/comments.reducer';
// prettier-ignore

// prettier-ignore
import reward, {
  RewardState
} from 'app/entities/reward/reward.reducer';
// prettier-ignore
import ingredient, {
  IngredientState
} from 'app/entities/ingredient/ingredient.reducer';
// prettier-ignore
import ustensil, {
  UstensilState
} from 'app/entities/ustensil/ustensil.reducer';
// prettier-ignore
import category, {
  CategoryState
} from 'app/entities/category/category.reducer';
// prettier-ignore
import event, {
  EventState
} from 'app/entities/event/event.reducer';
// prettier-ignore
import quantity, {
  QuantityState
} from 'app/entities/quantity/quantity.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly recipe: RecipeState;
  readonly note: NoteState;
  readonly userInfo: UserInfoState;
  readonly comments: CommentsState;
  readonly reward: RewardState;
  readonly ingredient: IngredientState;
  readonly ustensil: UstensilState;
  readonly category: CategoryState;
  readonly event: EventState;
  readonly quantity: QuantityState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  recipe,
  note,
  userInfo,
  comments,
  reward,
  ingredient,
  ustensil,
  category,
  event,
  quantity,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
