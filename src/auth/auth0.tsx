import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import type { User } from '@auth0/auth0-react'
import { createContext, useContext } from 'react'

export interface Auth0ContextType {
  isAuthenticated: boolean
  user: User | undefined
  login: () => Promise<void>
  logout: () => void
  getAccessToken: () => Promise<string>
  isLoading: boolean
}

const Auth0Context = createContext<Auth0ContextType | undefined>(undefined)

export function Auth0Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
    >
      <Auth0ContextProvider>{children}</Auth0ContextProvider>
    </Auth0Provider>
  )
}

function Auth0ContextProvider({ children }: { children: React.ReactNode }) {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0()

  const contextValue: Auth0ContextType = {
    isAuthenticated,
    user,
    login: loginWithRedirect,
    logout: () =>
      logout({ logoutParams: { returnTo: window.location.origin } }),
    getAccessToken: getAccessTokenSilently,
    isLoading,
  }

  return (
    <Auth0Context.Provider value={contextValue}>
      {children}
    </Auth0Context.Provider>
  )
}

export function useAuth0Context() {
  const context = useContext(Auth0Context)
  if (context === undefined) {
    throw new Error('useAuth0Context must be used within Auth0Wrapper')
  }
  return context
}
