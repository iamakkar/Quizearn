const initialState = {
  email: '',
  password: '',
  username: '',
  firstName: '',
  lastName: '',
  dob: '',
  mobNumber: '',
  coins: null,
  streak: null,
  friends: [],
  isloggedin: false,
};

const userDetailsReducer = (state = initialState, action) => {
  if (action.type == 'SIGN_UP') {
    console.log('EMAIL---' + action.email);
    return {
      ...state,
      email: action.email,
    };
  }
  if (action.type == 'LOGGED_STATUS') {
    return {
      ...state,
      isloggedin: action.status,
    };
  }
  if (action.type === 'SET_FIRSTNAME') {
    return {
      ...state,
      firstName: action.firstName,
    };
  }
  if (action.type === 'SET_LASTNAME') {
    return {
      ...state,
      lastName: action.lastName,
    };
  }
  if (action.type === 'SET_USERNAME') {
    return {
      ...state,
      username: action.username,
    };
  }
  if (action.type === 'SET_MOBNUMBER') {
    return {
      ...state,
      mobNumber: mobNumber,
    };
  }
  if (action.type === 'SET_DOB') {
    return {
      ...state,
      dob: action.dob,
    };
  }
  return state;
};

export default userDetailsReducer;
