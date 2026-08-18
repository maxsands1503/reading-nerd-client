function requirePublicEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required public environment variable: ${name}`)
  }

  return value
}

export const publicEnv = {
  auth0Domain: requirePublicEnv(
    'VITE_AUTH0_DOMAIN',
    import.meta.env.VITE_AUTH0_DOMAIN,
  ),
  auth0ClientId: requirePublicEnv(
    'VITE_AUTH0_CLIENT_ID',
    import.meta.env.VITE_AUTH0_CLIENT_ID,
  ),
  auth0Audience: requirePublicEnv(
    'VITE_AUTH0_AUDIENCE',
    import.meta.env.VITE_AUTH0_AUDIENCE,
  ),
}
