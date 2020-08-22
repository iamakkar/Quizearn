const initialState = {
  topic: '',
  subtopic: '',
  bid: null,
  reduximurl: '',
  socketid: '', //this one's of the oponent
  flag: false,
};

const topicState = (state = initialState, action) => {
  if (action.type == 'SET_STATE') {
    return {
      ...state,
      topic: action.topic,
      subtopic: action.subtopic,
    };
  }
  if (action.type == 'SET_BID') {
    return {
      ...state,
      bid: action.bid,
    };
  }
  if (action.type == 'SET_IMURL') {
    return {
      ...state,
      reduximurl: action.reduximurl,
    };
  }
  if (action.type == 'SET_OSOCKETID') {
    return {
      ...state,
      socketid: action.socketid,
    };
  }
  if (action.type == 'SET_FLAG') {
    return {
      ...state,
      flag: action.flag,
    };
  }
  if (action.type == 'SET_FLAG_AGAIN') {
    return {
      ...state,
      flag: action.flag,
    };
  }
  return state;
};

export default topicState;
