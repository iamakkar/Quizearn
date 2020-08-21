var initState = {
  score: 0,
  opponentScore: 0,
  currentIndex: 0,
  hasAnswered: false,
  timeout: 2000,
  maxIndex: 4,
  roundDuration: 10,
  animationRunning: false,
  optionsEnabled: false,
  userCorrect: false,
  timerValue: 9,
};

const rootReducer = (state = initState, action) => {
  if (action.type == 'SET_ANSWERED') {
    return {
      ...state,
      hasAnswered: action.data,
    };
  }

  if (action.type == 'INCREMENT_CURRENT_INDEX') {
    return {
      ...state,
      currentIndex: ++state.currentIndex,
    };
  }

  if (action.type == 'INCREMENT_SCORE') {
    console.log('User score incremented by: ' + action.data);
    return {
      ...state,
      score: state.score + action.data,
    };
  }

  if (action.type == 'SET_ANIMATION_RUNNING') {
    return {
      ...state,
      animationRunning: action.data,
    };
  }

  if (action.type == 'SET_OPTIONS') {
    return {
      ...state,
      optionsEnabled: action.data,
    };
  }

  if (action.type == 'SET_CORRECT') {
    console.log('User Correct?: ' + action.data);
    return {
      ...state,
      userCorrect: action.data,
    };
  }

  if (action.type == 'SET_TIMER') {
    return {
      ...state,
      timerValue: action.data,
    };
  }

  if (action.type == 'RESET_TIMER') {
    return {
      ...state,
      timerValue: 9,
    };
  }

  if (action.type == 'SET_OPPONENTSCORE') {
    return {
      ...state,
      opponentScore: action.opponentScore,
    };
  }

  if (action.type == 'RESET_ALL') {
    return {
      ...state,
      currentIndex: 0,
      hasAnswered: false,
      timeout: 2000,
      maxIndex: 4,
      roundDuration: 10,
      animationRunning: false,
      optionsEnabled: false,
      userCorrect: false,
      timerValue: 9,
    };
  }
  console.log(state);

  return state;
};

export default rootReducer;
