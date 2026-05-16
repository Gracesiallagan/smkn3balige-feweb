// src/config/keycloak.js
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:6766', 
  realm: 'smk3',                
  clientId: 'smk3-web-client'   
};

// Buat instance-nya tapi JANGAN di-init dulu di sini
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;