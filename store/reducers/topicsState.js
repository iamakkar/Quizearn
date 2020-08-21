const initialState = {
  topic: '',
  subtopic: '',
  bid: null,
  reduximurl: '',
  socketid: '', //this one's of the oponent
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
  return state;
};

export default topicState;
