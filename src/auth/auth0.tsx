import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import type { AppState, User } from '@auth0/auth0-react'
import { useRouter } from '@tanstack/react-router'
import { createContext, useContext } from 'react'
import { publicEnv } from '../env'

export interface Auth0ContextType {
  isAuthenticated: boolean
  user: User | undefined
  login: () => Promise<void>
  logout: () => void
  getAccessToken: () => Promise<string>
  isLoading: boolean
}

const Auth0Context = createContext<Auth0ContextType | undefined>(undefined)

function getSafeReturnTo(appState?: AppState): string {
  const returnTo = appState?.returnTo

  if (
    typeof returnTo === 'string' &&
    returnTo.startsWith('/') &&
    !returnTo.startsWith('//')
  ) {
    return returnTo
  }

  return '/'
}

export function Auth0Wrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <Auth0Provider
      domain={publicEnv.auth0Domain}
      clientId={publicEnv.auth0ClientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/login`,
        audience: publicEnv.auth0Audience,
      }}
      onRedirectCallback={(appState) => {
        router.history.replace(getSafeReturnTo(appState))
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
