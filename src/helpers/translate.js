export default async function translate(str, direction) {
  const key = 'trnsl.1.1.20191211T144223Z.7a1427617ca5d436.b141f0308516674b1674a282f84cba92b8837d84';

  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&lang=${direction}&text=${str}`;
  const response = await fetch(url)
    .then(res => res.json())
    .then(data => data);

  return response.text[0];
}
