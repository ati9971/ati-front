// class side menu

class SideMenu {
  constructor(
    name,
    root,
    type = 'default',
    APILink = null,
    initId = null,
    data = null
  ) {
    this.setRoot(root);
    this.name = name;
    this.type = type;

    if (data == null) {
      async function getAjax(link) {
        let response = await fetch(link);
        let data = await response.json();
        return data;
      }
      getAjax(APILink)
        .then(data => {
          this.data = data;
        })
        .then(() => this.initMenu(initId));
    } else {
      this.data = data;
      if (initId == null) {
        this.initMenu(this.data[0].id);
      } else {
        this.initMenu(initId);
      }
    }
  }

  baseURL = '';

  setRoot = root => {
    this.root = document.querySelector(root);
  };

  id = '';

  initMenu = initId => {
    let div = document.createElement('div');
    let classb = 'ilya-menu-select';
    this.type == 'default'
      ? (div.className = classb)
      : (div.className = `${classb}unvisible`);

    this.root.appendChild(div);
    this.listMaker(this.renderOutput(initId));
    if (this.type != 'no_header') this.initHeader(initId);
  };

  pushHeaderText = input => {
    this.headerText.push(input);
  };

  popHeaderText = () => {
    this.headerText.pop();
  };

  showHeaderText = () => {
    const l = this.headerText.length;
    const head = this.root.children[0];

    if (l == 1 || l == 2) {
      head.textContent = this.headerText[l - 1];
    } else if (l == 3) {
      head.textContent = this.headerText[1] + ' >> ' + this.headerText[2];
    } else {
      head.textContent =
        this.headerText[1] + ' >> ... >> ' + this.headerText[l - 1];
    }
  };

  initHeader = id => {
    if (id == null) {
      return this.showHeaderText();
    }
    const item = this.data.filter(item => item.id == id)[0];
    this.headerText.unshift(item.title);
    this.initHeader(item.parent_id);
  };

  renderOutput = id => {
    let base = { ...this.data.filter(item => item.id == id)[0] };

    base.id = base.id + this.name;

    const children = this.data
      .filter(item => item.parent_id == id && item.id != null)
      .map(child => ({ ...child }))
      .map(a => ({ ...a }));
    children.map(child => (child.id = child.id + this.name));

    let parent = {};
    let out = {};

    if (base.id != null) {
      if (this.data.filter(item => item.id == base.parent_id)[0] == undefined) {
        out = { base, parent: 'und', children };

        return out;
      }
      parent = { ...this.data.filter(item => item.id == base.parent_id)[0] };
      parent.id = base.parent_id + this.name;

      out = { base, parent, children };
      return out;
    }

    out = { base, parent: null, children };
    return out;
  };

  liAndACreator = (parent, className, text, id, icon, event) => {
    let li = document.createElement('li');
    li.className = className;
    li.id = id;
    if (icon == 'right') {
      li.innerHTML = '<i class="fal fa-caret-right icon-right"></i>';
    }
    if (icon == 'left') {
      li.innerHTML = '<i class="fal fa-caret-left icon-left"></i>';
    }
    li.innerHTML += text;
    li.setAttribute('role', 'option');
    li.addEventListener('click', () => {
      this.handleMenuClick(li, event);
    });
    parent.appendChild(li);
  };

  listMaker = input => {
    if (this.root.children[1]) {
      this.root.children[1].remove();
    }
    const { base, children, parent } = input;

    let ul = document.createElement('ul');
    ul.setAttribute('ilya-show', true);

    let div = document.createElement('div');
    div.className = 'ilya-menu-content';
    div.appendChild(ul);
    this.root.appendChild(div);

    if (parent !== 'und') {
      if (base.id[0] != 'n') {
        this.liAndACreator(
          ul,
          'ilya-menu-content__back',
          parent.title,
          parent.id,
          'right',
          'back'
        );
      }
    }

    this.liAndACreator(
      ul,
      'ilya-menu-content__header',
      base.title,
      base.id,
      null,
      'base'
    );

    children.map(child =>
      this.liAndACreator(
        ul,
        'ilya-menu-content__item',
        child.title,
        child.id,
        'left',
        'child'
      )
    );
  };
  id = '';
  handleMenuClick = (input, event) => {
    this.id = input.id;
    this.onChange();
    let id = this.getId();
    // if (id == 'n') id = null;

    if (this.type == 'default') {
      if (event == 'back') {
        this.popHeaderText();
        this.showHeaderText();
      }
      if (event == 'child') {
        this.pushHeaderText(input.textContent);
        this.showHeaderText();
      }
      if (event == 'base') {
        return;
      }
    }
    this.listMaker(this.renderOutput(id));
  };
  setCallback(call) {
    this.callback = call;
  }
  getId = () => {
    const id = (' ' + this.id).slice(1);

    const nameLen = this.name.length;
    const idLen = id.length;

    if (id[0] == 'n') return null;

    return id.slice(0, idLen - nameLen);
  };

  onChange = () => {
    this.callback();
  };
}

let url = 'https://ilyaidea.ir/api/ad/get/menu/category';

const menu = new SideMenu(
  'saeed',
  '#ilya-sidebar__fixed',
  'no_header',
  url,
  null,
  null
);

menu.setCallback(function() {
  const id = menu.getId();
  // menu.data = input;
  document.querySelector('#ilya-sidebar__fixed--show').textContent = `${id}`;
});

class MenuSingleHeader {
  constructor(name, root, APILink = null, initId = null, data = null) {
    this.setRoot(root);
    this.name = name;
    this.callback = () => {
      console.log('hello');
    };

    if (data == null) {
      async function getAjax(link) {
        let response = await fetch(link);
        let data = await response.json();
        return data;
      }
      getAjax(APILink)
        .then(data => {
          this.data = data;
        })
        .then(() => this.initMenu(initId));
    } else {
      this.data = data;
      if (initId == null) {
        this.initMenu(this.data[0].id);
      } else {
        this.initMenu(initId);
      }
    }
  }

  setRoot = root => {
    this.root = document.querySelector(root);
  };

  initMenu = initId => {
    let div = document.createElement('div');

    div.className = 'ilya-menu-select';

    this.root.appendChild(div);

    this.listMaker(this.renderOutput(initId));
  };

  renderOutput = id => {
    let base = { ...this.data.filter(item => item.id == id)[0] };

    base.id = base.id + this.name;

    const children = this.data
      .filter(item => item.parent_id == id && item.id != null)
      .map(child => ({ ...child }))
      .map(a => ({ ...a }));
    children.map(child => (child.id = child.id + this.name));

    let parent = {};
    let out = {};

    if (base.id != null) {
      if (this.data.filter(item => item.id == base.parent_id)[0] == undefined) {
        out = { base, parent: 'und', children };

        return out;
      }
      parent = { ...this.data.filter(item => item.id == base.parent_id)[0] };
      parent.id = base.parent_id + this.name;

      out = { base, parent, children };
      return out;
    }

    out = { base, parent: null, children };
    return out;
  };

  liAndACreator = (parent, className, text, id, icon, event) => {
    let li = document.createElement('li');
    li.className = className;
    li.id = id;
    if (icon == 'right') {
      li.innerHTML = '<i class="fal fa-caret-right icon-right"></i>';
    }
    if (icon == 'left') {
      li.innerHTML = '<i class="fal fa-caret-left icon-left"></i>';
    }
    li.innerHTML += text;
    li.setAttribute('role', 'option');
    li.addEventListener('click', () => {
      this.handleMenuClick(li, event);
    });
    parent.appendChild(li);
  };

  listMaker = input => {
    if (this.root.children[1]) {
      this.root.children[1].remove();
    }
    const { base, children, parent } = input;

    let ul = document.createElement('ul');
    ul.setAttribute('ilya-show', true);

    let div = document.createElement('div');
    div.className = 'ilya-menu-content';
    div.appendChild(ul);
    this.root.appendChild(div);

    if (parent !== 'und') {
      if (base.id[0] != 'n') {
        this.liAndACreator(
          ul,
          'ilya-menu-content__back',
          parent.title,
          parent.id,
          'right',
          'back'
        );
      }
    }

    this.liAndACreator(
      ul,
      'ilya-menu-content__header',
      base.title,
      base.id,
      null,
      'base'
    );

    children.map(child =>
      this.liAndACreator(
        ul,
        'ilya-menu-content__item',
        child.title,
        child.id,
        'left',
        'child'
      )
    );
  };

  handleMenuClick = (input, event) => {
    console.log(input.textContent);
    this.id = input.id;
    let id = this.getId();
    // console.log('hello');

    this.listMaker(this.renderOutput(id));
  };

  setCallback(call) {
    this.callback = call;
  }

  getId = () => {
    const id = (' ' + this.id).slice(1);

    const nameLen = this.name.length;
    const idLen = id.length;

    if (id[0] == 'n') return null;

    return id.slice(0, idLen - nameLen);
  };

  onChange = () => {
    this.callback();
  };
}

const test = new MenuSingleHeader('bheader', '#saeedroot', url, null, null);

// console.log(text1.slice(0, -text2.length));

// console.log(simpleMenu1.getId());
