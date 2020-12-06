import jsonServer from 'json-server';
import cors from 'cors';
import salesController from './modules/sales';
import generalAccountsController from './modules/generalAccounts';
import headerController from './modules/header';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middleware = jsonServer.defaults({noCors: false});
const db = router.db.__wrapped__;
server.use(cors());

//Custom route test
server.get('/echo', (req, res) => {
    res.jsonp(req.query);
})

generalAccountsController(server, db);
salesController(server, db);
headerController(server, db);

server.use(middleware);
server.use(router);
server.listen(5000, () => {
    console.log('Server running at http://localhost:5000')
});

module.exports = server;