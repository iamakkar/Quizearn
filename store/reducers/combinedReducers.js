import {combineReducers} from 'redux';

import userDetailsReducer from './userDetails';
import topicState from './topicsState';
import quizReducer from './quizReducer';

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  topicState: topicState,
  quizReducer: quizReducer,
});

export default rootReducer;
