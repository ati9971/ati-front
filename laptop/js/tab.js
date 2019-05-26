const input22 = [
  {
    id: 'step1',
    text: 'shipping',
    menuId: 'content1'
  },
  {
    id: 'step2',
    text: 'billing',
    menuId: 'content2'
  }
];

class ilyaTab {
  constructor(name, root, data) {
    this.name = name;
    this.data = data;
    this.setRoots(root);
    this.init();
  }

  init = () => {
    // console.log(this.data.length);
    this.createSteps();
  };

  setRoots = root => {
    this.rootTag = document.querySelector(root);
    this.stepsTag = document.querySelector(`${root} .ilya-tab-steps`);
    this.contentTag = document.querySelector(`${root} .ilya-tab-content`);

    console.log;
  };

  createSteps = count => {
    const data = [...this.data];
    let ul = this.creatorElem('ul');

    data.map((item, index) => {
      let li = this.creatorElem('li', null, item.id);
      let sDiv = this.creatorElem('div', 'ilya-tab__step', null);
      let tDiv = this.creatorElem('div', 'ilya-tab__text', null);

      sDiv.textContent = index + 1;
      tDiv.textContent = item.text;

      li.appendChild(sDiv);
      li.appendChild(tDiv);

      li.addEventListener('mouseup', () => {
        this.changeContent(item.menuId);
      });

      ul.appendChild(li);
    });

    this.stepsTag.appendChild(ul);
  };

  creatorElem(element, className = null, id = null) {
    let elem = document.createElement(element);
    if (id != null) elem.id = id;
    if (className != null) elem.className = className;
    return elem;
  }

  changeContent = id => {
    let allContents = Object.values(
      document.querySelector('.ilya-tab-content').children
    );
    allContents.map(item => {
      if (item.classList.contains('bvisible'))
        item.classList.remove('bvisible');
    });
    let target = document.querySelector(`#${id}`);
    target.classList.add('bvisible');
  };
}

const tab1 = new ilyaTab('tabstep', '#ilya-tab-place', input22);

// document.addEventListener('mousedown', () => {
//   let items = Object.values(
//     document.querySelectorAll('[ilya-expanded="true"]')
//   );

//   items.map(item => {
//     if (item.classList.contains('bvisible')) item.classList.remove('bvisible');
//     if (item.classList.contains('gvisible')) item.classList.remove('gvisible');
//     item.setAttribute('ilya-expanded', false);
//   });
// });
