const router = require('@koa/router');
const {
  LoginAUTHourizathionVerify,
} = require('../middleware/login.middleeare');
const LabelControl = require('../controller/Label.controller');
const getlabenameState = require('../middleware/Label.middlear');

const LabelRouter = new router({ prefix: '/label' });
LabelRouter.post(
  '/',
  LoginAUTHourizathionVerify,
  LabelControl.getLabelState,
  LabelControl.create,
);
LabelRouter.get('/', LabelControl.getlabellist);

module.exports = LabelRouter;
