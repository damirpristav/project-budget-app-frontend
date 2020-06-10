import * as types from './types';

export default (state, action) => {
  switch(action.type) {
    case types.SAVE_PROJECT_INFO:
      return {
        ...state,
        projectInfo: action.payload
      }
    case types.SAVE_TASKS:
      return {
        ...state,
        tasks: action.payload,
        extraInfo: (action.payload.length > 0 ? {
          tasks: action.payload.length,
          totalPrice: action.totalPrice,
          deliveryDate: action.deliveryDate
        } : {})
      }
    case types.CREATING_PDF:
      return {
        ...state,
        creatingPdf: action.payload
      }
    default:
      return state;
  }
}