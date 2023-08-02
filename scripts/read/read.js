const body = document.getElementsByTagName('body')[0];

const synth = window.speechSynthesis;
const READ_ICON_ID_NAME = 'read-extension-icon';
let data = {
  txt: '', // 选中的文本
  position: null, // icon 出现的位置
}

const createSection = () => {
  const section = document.createElement('section');
  section.className = 'read-icon';
  section.id = READ_ICON_ID_NAME;
  return section;
};

const getSection = () => {
  const section = document.getElementById(READ_ICON_ID_NAME);
  return section;
};

const insertSectionToBody = (dom) => {
  if (dom) {
    document.body.appendChild(dom);
  }
}

const setPosition = (dom, position) => {
  if (dom && position) {
    dom.style.top = `${position.y}px`;
    dom.style.left = `${position.x}px`;
  }
}

const insertSection = () => {
  const sectionDom = getSection();
  if (sectionDom) {
    sectionDom.style.display = 'block';
    setPosition(sectionDom, data.position);
  } else {
    const section = createSection();
    setPosition(section, data.position);
    insertSectionToBody(section);
    section.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (data.txt) {
        synth.cancel();
        const speechInstance = new SpeechSynthesisUtterance(data.txt);
        synth.speak(speechInstance);
        speechInstance.onend = function () {
          section.className = 'read-icon';
        }
        section.className = 'read-icon animation';
      }
    })
  }
}

const handleHiddrenSection = () => {
  const sectionDom = getSection();
  if (sectionDom) {
    sectionDom.style.display = 'none';
  }
}

body.addEventListener('mouseup',  (e) => {
  const selection = window.getSelection();
  let txt = selection.toString() || '';
  if (txt.trim()) {
    data.txt = txt;
    // focusNode 可能是一个 text，这时就没有 getBoundingClientRect 
    const realSelection = typeof selection.focusNode.getBoundingClientRect === 'function' ? selection.focusNode : selection.focusNode.parentElement;
    const clientRect = realSelection.getBoundingClientRect();
    data.position = {
      x: clientRect.left,
      y: clientRect.top,
    }
    insertSection();
  } else {
    if (e.target.id !== READ_ICON_ID_NAME) {
      data = {
        txt: '',
        position: null,
      }
      handleHiddrenSection();
    }
  }
});

