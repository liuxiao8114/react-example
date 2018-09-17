function getUnexpectedStateShapeWarningMessage(
  inputState,
  reducers,
  action,
  unexpectedKeyCache
) {
  const reducerKeys = Object.keys(reducers)
  const unexpectedKeys = Object.keys(inputState).filter(key =>
    !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key])
  for(let key of reducerKeys) {

  }
}

export default function combineReducers(reducers) {
  const finalReducers = {}
  const reducerKeys = Object.keys(reducers)

  for(let key of reducerKeys) {
    if(typeof reducers[key] === 'undefined')
      throw new Error(`got undefined reducer function named ${key}`)
    if(typeof reducers[key] === 'function')
      finalReducers[key] = reducers[key]
  }

  const finalReducerKeys = Object.keys(finalReducers)

  return (state = {}, action) => {
    const nextState = {}

    for(let key of finalReducerKeys) {
      const reducer = reducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}
