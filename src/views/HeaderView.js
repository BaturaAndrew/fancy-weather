export default function renderHeader() {
  const header = document.createElement('header');
  header.className = 'header flex-row';

  const leftControls = document.createElement('div');
  leftControls.className = 'left-controls';

  const updateImg = document.createElement('a');
  updateImg.className = 'button update-img';

  const langs = document.createElement('select');
  langs.className = 'button select-lang';
  const lang1 = document.createElement('option');
  const lang2 = document.createElement('option');
  const lang3 = document.createElement('option');
  lang2.innerHTML = 'ru';
  lang1.innerHTML = 'en';
  lang3.innerHTML = 'be';
  langs.appendChild(lang1);
  langs.appendChild(lang2);
  langs.appendChild(lang3);

  const btnTempC = document.createElement('a');
  btnTempC.className = 'button button-cel non-right-radius active';
  btnTempC.innerHTML = '&#8451;';

  const btnTempF = document.createElement('a');
  btnTempF.className = 'button button-fareg non-left-radius';
  btnTempF.innerHTML = '&#8457;';

  leftControls.appendChild(updateImg);
  leftControls.appendChild(langs);
  leftControls.appendChild(btnTempC);
  leftControls.appendChild(btnTempF);

  const rightControls = document.createElement('div');
  rightControls.className = 'right-controls';

  const inputSearch = document.createElement('input');
  inputSearch.className = 'search-input speech-input';
  inputSearch.type = 'text';
  inputSearch.name = 'eng-input';
  inputSearch.lang = 'en';
  inputSearch.placeholder = 'Search city';

  const btnSearch = document.createElement('a');
  btnSearch.className = 'button search non-left-radius';
  btnSearch.innerHTML = 'Search';


  rightControls.appendChild(inputSearch);
  rightControls.appendChild(btnSearch);

  header.appendChild(leftControls);
  header.appendChild(rightControls);

  return header;
}
