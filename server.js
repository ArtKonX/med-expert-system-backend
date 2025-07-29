const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const http = require('http');
const dotenv = require('dotenv');

const QueryGetAllSymptoms = require('./requests/symptoms/QueryGetAllSymptoms');
const QueryGetSymptomsBySearch = require('./requests/symptoms/QueryGetSymptomsBySearch');

const QueryGetDiagnose = require('./requests/diagnoses/QueryGetDiagnose');

const QueryGetAllResults = require('./requests/results/QueryGetAllResults');
const QuerySaveResult = require('./requests/results/QuerySaveResult');
const QueryGetFullResultById = require('./requests/results/QueryGetFullResultById');
const QueryRemoveResult = require('./requests/results/QueryRemoveResult')

dotenv.config();

const port = process.env.PORT || 7070;

const app = new Koa();
app.use(bodyParser());

const publicPath = path.join(__dirname, '/public');
app.use(koaStatic(publicPath));

app.use(async (ctx, next) => {
  const origin = ctx.request.headers.origin || process.env.FRONTEND_URL;

  ctx.set('Access-Control-Allow-Origin', origin);
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Vary', 'Origin');

  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
    return;
  }

  await next();
});

const router = new Router();

router.post('/diagnose', QueryGetDiagnose);

router.post('/save-result', QuerySaveResult);
router.get('/results', QueryGetAllResults);
router.get('/result', QueryGetFullResultById)
router.delete('/remove-result', QueryRemoveResult);

router.get('/all-symptoms', QueryGetAllSymptoms);
router.get('/symptoms', QueryGetSymptomsBySearch);

const options = {
  requestCert: false,
  rejectUnauthorized: false
};

const server = http.createServer(options, app.callback());

app.use(router.routes()).use(router.allowedMethods());

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('HTTPS сервер запущен на порту ' + port);
});