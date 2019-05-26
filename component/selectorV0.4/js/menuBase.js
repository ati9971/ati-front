// input for test
//
//
//

const keysMap = {
  count_child: 'count'
};

//
//
//
// functions for classs
//

class IlyaMenu {
  constructor(name = null, root, data = null, keysMap = null, initId = null) {
    this.root = document.querySelector(root);
    this.name = name;
    this.typeClass = 'ilya-menu';

    // make a clone from data by ...
    if (data != null) this.data = data.map(item => ({ ...item }));

    // specifying Ids to name
    this.appendNameToProp(this.data, 'id', this.name);
    this.appendNameToProp(this.data, 'parent_id', this.name);

    // init with first init Id
    this.Init(keysMap, initId);
  }

  Init = (map, initId) => {
    this.id = this.appendNameToString(initId, this.name);
    //  `${initId}${this.name}`;
    if (map) {
      this.data = this.mapKeys(this.data, map);
    }
    // as a init clearing all Html and adding tow div for header and content
    this.root.innerHTML = '';
    this.root.appendChild(this.creatorElem('div', `${this.typeClass}-select`));
    this.root.appendChild(this.creatorElem('div', `${this.typeClass}-content`));

    this.selectTag = this.root.children[0];
    this.contentTag = this.root.children[1];
    this.SelectText();

    this.render(this.id);
  };

  // header part codes
  SelectText = () => {
    this.selectTag.innerHTML = 'select';
  };

  // default function to set data and Ids

  mapKeys = (data, keysMap) => {
    return data.map(item => {
      return (item = Object.keys(item).reduce(
        (acc, key) => ({
          ...acc,
          ...{ [keysMap[key] || key]: item[key] }
        }),
        {}
      ));
    });
  };

  appendNameToProp = (data, prop, name) => {
    data.map(item => {
      item[prop] = `${item[prop]}${[name]}`;
    });
  };
  appendNameToString = (str, name) => {
    return `${str}${[name]}`;
  };

  getId = () => {
    const id = (' ' + this.id).slice(1);

    if (id[0] == 'n') return null;
    return id.slice(0, -this.name.length);
  };

  // all events set default empty
  //
  //
  onChange = () => {};
  onChangeBack = () => {};
  onChangeHead = () => {};
  onChangeChild = () => {};

  handleChildEvent = item => {
    this.onChange();
  };
  handleBackEvent = item => {
    this.onChange();
  };
  handleHeadEvent = item => {
    this.onChange();
  };
  //

  // menu creator functions

  childrenListMaker = (place, children) => {
    children.map(child => {
      let liChild = '';
      child.count == 0
        ? (liChild = this.contentLiMaker(child, 'end'))
        : (liChild = this.contentLiMaker(child, 'forward'));
      liChild.addEventListener('click', () => {
        this.handleChildEvent(liChild);
      });
      return place.appendChild(liChild);
    });
  };

  contentLiMaker = (item, type = 'forward') => {
    let li = this.creatorElem('li', null, item.id);
    switch (type) {
      case 'back':
        li.className = `${this.typeClass}-content__back`;
        li.innerHTML = '<i class="fal fa-caret-right icon-right"></i>';
        li.innerHTML += item.title;
        li.setAttribute('role', 'back');
        break;
      case 'head':
        li.className = `${this.typeClass}-content__header`;
        li.innerHTML += item.title;
        li.setAttribute('role', 'head');

        break;
      case 'forward':
        li.className = `${this.typeClass}-content__list`;
        li.innerHTML = '<i class="fal fa-caret-left icon-left"></i>';
        li.innerHTML += item.title;
        li.setAttribute('role', 'forward');
        break;
      case 'end':
        li.className = `${this.typeClass}-content__list`;
        li.innerHTML += item.title;
        li.setAttribute('role', 'end');
    }
    return li;
  };

  creatorElem(element, className = null, id = null) {
    let elem = document.createElement(element);
    if (id != null) elem.id = id;
    if (className != null) elem.className = className;
    return elem;
  }

  // render

  renderById = id => {
    const _id = this.appendNameToString(id, this.name);
    this.render(_id);
  };

  render = inputId => {
    this.contentTag.innerHTML = '';
    let ul = this.creatorElem('ul');

    const head = this.data.find(item => item.id == inputId) || this.data[0];
    const { id, parent_id } = head;
    this.id = id;

    const back = this.data.find(item => item.id == parent_id) || null;

    const children = this.data.filter(
      item => item.parent_id == id && item.id != item.parent_id
    );

    if (id != parent_id) {
      let liBack = this.contentLiMaker(back, 'back');
      liBack.addEventListener('click', () => {
        this.handleBackEvent(liBack);
      });
      if (back) ul.appendChild(liBack);
    }
    let liHead = this.contentLiMaker(head, 'head');
    liHead.addEventListener('click', () => {
      this.handleHeadEvent(liHead);
    });

    ul.appendChild(liHead);
    this.childrenListMaker(ul, children);

    this.contentTag.appendChild(ul);
  };
}

class IlyaMultiLevelSeclector extends IlyaMenu {
  constructor(name, root, data = null, keysMap = null, initId = null) {
    super(name, root, data, keysMap, initId);
    this.typeClass = 'ilya-selector';
    this.Init(keysMap, initId);
  }
  setId = id => {
    this.id = id;
  };

  handleBackEvent = item => {
    this.id = item.id;
    this.onChange();
    this.onChangeBack();

    // this.selectTag.innerHTML = 'hello';
    this.render(item.id);
  };
  handleHeadEvent = item => {
    this.onChange();
  };
  handleChildEvent = item => {
    let role = item.getAttribute('role');
    if (role == 'end') return this.handleEndEvent(item);
    this.render(item.id);
    this.onChange();
    this.onChangeChild();
  };

  onChangeEnd = () => {};

  handleEndEvent = item => {
    this.id = item.id;
    this.selectTag.innerHTML = item.textContent;
    this.onChange();
    this.onChangeEnd();
  };
}
//
//
//

//
//
// /
//
//
// /

// const multiMenu2 = new IlyaMenu('simple', '#simple2', input3, keysMap, 4);

const MultiMenu1 = new IlyaMultiLevelSeclector(
  'heading2',
  '#simple3',
  input3,
  keysMap
);

MultiMenu1.onChange = () => {
  // set callback functon for all events.
  // other callback can verify

  // console.log('for all change');

  // get Id you can getId of sent data Id
  let id = MultiMenu1.getId();
  // console.log(id);
};
MultiMenu1.onChangeHead = () => {
  // only children event run this code
  // console.log('just headeer ');
};
MultiMenu1.onChangeBack = () => {
  // only Back item  event run this code
  // console.log('baking menu ');
};

MultiMenu1.onChangeChild = () => {
  // only children event run this code
  // console.log(' children ');
};

MultiMenu1.onChangeEnd = () => {
  // only children with role = end  run this code

  const id = MultiMenu1.getId();
  let placeHolder = document.querySelector('.ilya-menu-show-id');

  placeHolder.innerHTML = `endId : ${id}  you can see by func getId()`;
  // console.log('only end ');
};
