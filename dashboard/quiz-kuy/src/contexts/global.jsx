import React from 'react';

const GlobalStateContext = React.createContext();
const GlobalDispatchContext = React.createContext();

function globalReducer(state, action) {
  return {...state, ...action};
}
function GlobalProvider({children}) {
  const [state, dispatch] = React.useReducer(globalReducer, {verified: true});
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}
function useGlobalState() {
  const context = React.useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
}
function useGlobalDispatch() {
  const context = React.useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error('useGlobalDispatch must be used within a GlobalProvider');
  }
  return context;
}
export {GlobalProvider, useGlobalState, useGlobalDispatch};
