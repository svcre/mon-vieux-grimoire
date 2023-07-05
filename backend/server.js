// server.js créé le serveur, ecoute les requêtes entrantes et gère les erreurs

// import de la librairie permettant de créer un serveur http
const http = require('http');
// import le script app.js
const app = require('./app');

// Creation de la fonction permettant de récupérer un port
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false; 
};
// process env PORT indique quel port écouter (ici, le PORT environnement ou 3001 s'il n'y a rien)
const port = normalizePort(process.env.PORT || '3001');
// permet d'assigner le port à express dans app.js
app.set('port', port);


// function permettant de gérer les erreurs lors du démarrage du serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// création du serveur http
const server = http.createServer(app);

// function de gestion d'erreur 
server.on('error', errorHandler);

// affichage d'un message lorsque le serveur est démarré
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// démarre le serveur
server.listen(port);
