/* eslint-disable no-undef */

function getTodayDate(lang, format) {
  const now = moment();
  moment.lang(lang);

  return now.format(format);
}

function getnotTodayDate(lang, format, plusDay) {
  const now = moment();
  moment.lang(lang);

  return now.add(plusDay + 1, 'days').format(format);
}

export {
  getTodayDate,
  getnotTodayDate,
};
