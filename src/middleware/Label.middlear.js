const LabelService = require('../service/Label.service');

const getlabenameState = async (name) => {
  const res = await LabelService.getLabelStateForname(name);
  return res;
};
module.exports = getlabenameState;
