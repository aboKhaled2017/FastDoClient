/* eslint-disable @typescript-eslint/camelcase */
import { createUserManager } from 'redux-oidc';
import { UserManagerSettings } from 'oidc-client';

const userManagerConfig: UserManagerSettings = {
  client_id: 'spaclient',
  redirect_uri: 'https://localhost:3000/callback',
  response_type: 'token id_token',
  scope:"openid profile fastdo.reactsite.api",
  authority: 'https://localhost:10',
  silent_redirect_uri: 'https://localhost:3000/silentRenew.html',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;