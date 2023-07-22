
const getlabenameState = require('../middleware/Label.middlear');
const LabelService = require('../service/Label.service');
const verifyLabelExtists = async (ctx, next) => {
  const { momentid } = ctx.params;
  const labels = ctx.request.body;

  // 首先我们为动态添加标签我们需要注意 当标签存在我们就添加当标签不存在我们就创建然后添加
  const NewLabelsArr = [];
  for (const name of labels) {
    const res = await getlabenameState(name);
    const labelObj = { name };
    if (res.length) {
      // 如果当前标签存在我们需要把它放到一个对象中存到数组里面返回
      labelObj.id = res[0].id;
    } else {
      // 如果当前标签没有我们需要先创建在添加到对象中存到数据里面返回
      const res = await LabelService.create(name);
      labelObj.id = res.insertId;
    }
    NewLabelsArr.push(labelObj);
  }
  ctx.labels = NewLabelsArr;
  await next();
};
module.exports = verifyLabelExtists;
