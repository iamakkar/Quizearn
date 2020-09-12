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
  questionSet: [],
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

  if (action.type == 'SET_INDEX_TO_ZERO') {
    return {
      ...state,
      currentIndex: action.index,
    };
  }

  if (action.type == 'SET_QUESTIONS') {
    return {
      ...state,
      questionSet: action.questionSet,
    };
  }

  if (action.type == 'RESET_SCORES') {
    return {
      ...state,
      score: 0,
      opponentScore: 0,
    };
  }

  if (action.type == 'RESET_ALL') {
    return {
      ...state,
      hasAnswered: false,
      timeout: 2000,
      maxIndex: 4,
      roundDuration: 10,
      animationRunning: false,
      optionsEnabled: false,
      userCorrect: false,
      timerValue: 9,
      questionSet: [],
    };
  }

  return state;
};

export default rootReducer;
