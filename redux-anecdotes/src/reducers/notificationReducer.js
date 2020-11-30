const notificationReducer = (state = {notification: '', timeoutId: ''}, action) => {
    let newState = {...state}
    switch (action.type) {
      case 'SHOW_NOTIFICATION':
        newState.notification = action.notification
        return newState
      case 'HIDE_NOTIFICATION':
        newState.notification = ''
        return newState
      case 'SET_ID':
        newState.timeoutId = action.timeoutId
        return newState
      
      default:
        return state
    }
}
  
  export const showNotification = (notification) => {
    return {
      type: 'SHOW_NOTIFICATION',
      notification,
    }
  }
  
  export const hideNotification = () => {
    return {
      type: 'HIDE_NOTIFICATION',
      notification: '',
    }
  }

  export const setTimeoutId = (timeoutId) => {
    return {
      type: 'SET_ID',
      timeoutId
    }
  }

  export const setNotification = (notification, duration) => {
    return (dispatch, getState) => {
    const timeoutId = getState().notification.timeoutId
    if(timeoutId !== '') {
      clearTimeout(timeoutId)
    }
    dispatch(showNotification(notification))

    const newTimeoutId = setTimeout(() => {
      dispatch(hideNotification())
      dispatch(setTimeoutId(''))
    }, duration * 1000)
    dispatch(setTimeoutId(newTimeoutId))

    }
  }

  export default notificationReducer