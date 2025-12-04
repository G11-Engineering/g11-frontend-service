import { asgardeo } from '@/config/appConfig';

export const asgardeoConfig = {
    signInRedirectURL: asgardeo.redirectUrl,
    signOutRedirectURL: asgardeo.redirectUrl,
    clientID: asgardeo.clientId,
    baseUrl: asgardeo.baseUrl,
    scope: asgardeo.scope
};