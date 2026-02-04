import React, { createContext, useReducer, useEffect } from 'react'

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
}

export const authContext = createContext(initialState)

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { user: null, token: null, role: null }

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      }

    case 'LOGOUT':
      return { user: null, token: null, role: null }

    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user))
      localStorage.setItem('token', state.token)
      localStorage.setItem('role', state.role)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }, [state.user, state.token, state.role])

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
