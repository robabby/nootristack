import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import stacksReducer from './stacksReducer';
import stackReducer from './stackReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  stacks: stacksReducer,
  stack: stackReducer
})
