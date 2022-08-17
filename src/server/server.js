import express from 'express';
import ReactDOM from 'react-dom/server';
import { indexHtmlTemplate } from './indexHtmlTemplate';
import { App } from '../App';
import compression from 'compression';
import helmet from 'helmet';

const IS_DEV = process.env.NODE_ENV === 'development';
const REDIRECT_URL = IS_DEV ? 'http://localhost' : 'https://kvv-reddit-react-app.herokuapp.com';
const PORT = typeof process.env.PORT !== 'undefined' && process.env.PORT ? process.env.PORT : 3000;
const COLON = PORT ? ':' : '';

const app = express();
app.use(compression());
if (!IS_DEV) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );
}

app.use('/static', express.static('./dist/client'));

app.get('*', (req, res) => {
  res.send(indexHtmlTemplate(ReactDOM.renderToString(App())));
});

app.listen(PORT, () => {
  console.log(`server started on ${REDIRECT_URL}${COLON}${PORT}`);
});
