const ENV = {
  dev: {
    apiUrl: 'http://localhost:44331',
    oAuthConfig: {
      issuer: 'http://localhost:44331',
      clientId: 'MyCompanyName_App',
      clientSecret: '1q2w3e*',
      scope: 'offline_access MyCompanyName',
    },
    localization: {
      defaultResourceName: 'MyCompanyName',
    },
  },
  prod: {
    apiUrl: 'http://localhost:44331',
    oAuthConfig: {
      issuer: 'http://localhost:44331',
      clientId: 'MyCompanyName_App',
      clientSecret: '1q2w3e*',
      scope: 'offline_access MyCompanyName',
    },
    localization: {
      defaultResourceName: 'MyCompanyName',
    },
  },
};

export const getEnvVars = () => {
  // eslint-disable-next-line no-undef
  return __DEV__ ? ENV.dev : ENV.prod;
};
