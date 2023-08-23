class EnvManager {
  static getCognitoClientId(): string {
    return process.env.COGNITO_CLIENT_ID || "";
  }

  static getCognitoClientSecret(): string {
    return process.env.COGNITO_CLIENT_SECRET || "";
  }

  static getCognitoRegion(): string {
    return process.env.COGNITO_REGION || "";
  }

  static getCognitoPoolId(): string {
    return process.env.COGNITO_POOL_ID || "";
  }

  static getCognitoApiVersion(): string {
    return process.env.API_VERSION || "";
  }

  static getCognitoCallbackUrl(): string {
    return process.env.COGNITO_CALLBACK_URL || "";
  }

  static getCognitoDomain(): string {
    return process.env.COGNITO_DOMAIN || "";
  }

  static getCognitoLoginUrl = (state: string, scopes: string[] = []) => {
    const defaultScopes = ["openid", "profile"];
    const userScopes = [...defaultScopes, ...scopes];

    const queryParams = {
      response_type: "code",
      client_id: this.getCognitoClientId(),
      redirect_uri: this.getCognitoCallbackUrl(),
      scope: userScopes.join("+"),
      state: state || "123456",
    };

    let loginUrl = `${this.getCognitoDomain()}/authorize`;

    let query = "?";
    for (const [key, value] of Object.entries(queryParams)) {
      query += `${key}=${value}&`;
    }

    loginUrl += query.slice(0, -1);
    return loginUrl;
  };

  static getSalesForceEnv(): string {
    return process.env.SALES_FORCE_ENV || "stage";
  }

  static getSalesForceCredentials(): any {
    const sfEnv = this.getSalesForceEnv();
    return {
      loginUrl: process.env[sfEnv.toUpperCase() + "_SF_LOGIN_URL"],
      clientId: process.env[sfEnv.toUpperCase() + "_SF_CLIENT_ID"],
      clientSecret: process.env[sfEnv.toUpperCase() + "_SF_CLIENT_SECRET"],
      redirectUri: process.env.SALES_FORCE_REDIRECT,
    };
  }
}

export default EnvManager;
