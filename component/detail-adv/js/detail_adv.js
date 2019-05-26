const input22 = [{
		id: 'step1',
		text: 'مرحله اول',
		menuId: 'content1'
	},
	{
		id: 'step2',
		text: 'مرحله دوم',
		menuId: 'content2'
	},
	{
		id: 'step3',
		text: 'مرحله سوم',
		menuId: 'content3'
	},
	{
		id: 'step4',
		text: 'مرحله چهارم',
		menuId: 'content4'
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

			// sDiv.textContent = index + 1;
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


		document.addEventListener('click', function () {
			var color = document.querySelectorAll('.ilya-tab-steps');
			console.log(color);
			// color.classList.add('active');
		})

		// color.css('background-color', 'green');
	};
}

const tab1 = new ilyaTab('tabstep', '#ilya-tab-place', input22);