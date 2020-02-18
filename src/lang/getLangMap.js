import enMap from './lang-en.json';
import ruMap from './lang-ru.json';
import byMap from './lang-by.json';

export default async function getLangMap(lang) {
  let path;
  switch (lang) {
    case 'en':
      path = enMap;
      break;
    case 'ru':
      path = ruMap;
      break;
    case 'be':
      path = byMap;
      break;

    default:
      break;
  }

  const response = await fetch(path).then(res => res.json());

  return response;
}
