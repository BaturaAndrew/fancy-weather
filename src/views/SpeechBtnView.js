export default function renderSpeechBtn() {
  if (!('webkitSpeechRecognition' in window)) return;

  const inputEl = document.querySelector('.speech-input');
  let micBtn;
  let micIcon;
  let holderIcon;
  let newWrapper;

  const nextNode = inputEl.nextSibling;
  const parent = inputEl.parentNode;
  const inputRightBorder = parseInt(getComputedStyle(inputEl).borderRightWidth, 10);
  const buttonSize = 0.8 * (inputEl.dataset.buttonsize || inputEl.offsetHeight);

  let wrapper = inputEl.parentNode;
  if (!wrapper.classList.contains('si-wrapper')) {
    wrapper = document.createElement('div');
    wrapper.classList.add('si-wrapper');
    wrapper.appendChild(parent.removeChild(inputEl));
    newWrapper = true;
  }

  // create mic button if not present
  micBtn = wrapper.querySelector('.si-btn');
  if (!micBtn) {
    micBtn = document.createElement('button');
    micBtn.type = 'button';
    micBtn.classList.add('si-btn');
    micBtn.textContent = 'speech input';
    micIcon = document.createElement('span');
    holderIcon = document.createElement('span');
    micIcon.classList.add('si-mic');
    holderIcon.classList.add('si-holder');
    micBtn.appendChild(micIcon);
    micBtn.appendChild(holderIcon);
    wrapper.appendChild(micBtn);

    // size and position mic and input
    micBtn.style.cursor = 'pointer';
    micBtn.style.top = `${0.125 * buttonSize}px`;
    micBtn.style.height = micBtn.style.width;
    micBtn.style.height = `${buttonSize}px`;
    inputEl.style.paddingRight = `${buttonSize - inputRightBorder}px`;
  }
  // append wrapper where input was
  if (newWrapper) parent.insertBefore(wrapper, nextNode);
}
