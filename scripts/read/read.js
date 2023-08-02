const body = document.getElementsByTagName('body')[0];

const synth = window.speechSynthesis;
let hasMousedown = false;
const READ_ICON_ID_NAME = 'read-extension-icon';
let txtValue = '';

const readTxt = (txt) => {
  const speechInstance = new SpeechSynthesisUtterance(txt);
  synth.speak(speechInstance);
}

const createSection = () => {
  const section = document.createElement('section');
  section.innerHTML = `READ`;
  section.className = 'read-icon';
  section.id = READ_ICON_ID_NAME;
  return section;
}

const getSection = () => {
  const section = document.getElementById(READ_ICON_ID_NAME);
  return section;
}

const insertSectionToBody = (dom) => {
  if (dom) {
    document.body.appendChild(dom);
  }
}

const setPosition = (dom, position) => {
  if (dom) {
    dom.style.top = `${position.y}px`;
    dom.style.left = `${position.x}px`;
  }
}

const insertSection = (position) => {
  const sectionDom = getSection();
  if (sectionDom) {
    sectionDom.style.display = 'block';
    setPosition(sectionDom, position);
  } else {
    const section = createSection();
    setPosition(section, position);
    insertSectionToBody(section);
    section.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (txtValue) {
        readTxt(txtValue);
        section.innerText = txtValue;
      }
    })
  }
}

body.addEventListener('mousedown', () => {
  if (hasMousedown) {
    const sectionDom = getSection();
    if (sectionDom) {
      sectionDom.style.display = 'none';
    }
  }
  hasMousedown = true;
});

body.addEventListener('mouseup',  (e) => {
  let txt = window.getSelection().toString() || '';
  if (txt.trim()) {
    txtValue = txt;
    const position = {
      x: e.pageX,
      y: e.pageY,
    }
    insertSection(position);
  }
  hasMousedown = false;
});

