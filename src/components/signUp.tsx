import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'primereact/button';
        

export const SignUp = () => {
    const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return "Loading...";

  return isAuthenticated ? (
    <>
      <p>Logged in as {user?.email}</p>

      <h1>User Profile</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Button onClick={logout} label="Logout"/>
    </>
  ) : (
    <>
      {error && <p>Error: {error.message}</p>}

      <Button onClick={signup} label="Signup"/>

      <Button onClick={() => void login()} label="Login" />
    </>
);

}
