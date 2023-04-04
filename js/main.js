const order = {
  percent: 1.68,
  mainBrickColor: 'brown',
  archType: 'semicircle',
  archColor: 'brown',
  sector1: null,
  sector2: null,
  sector4: null,
  sector5: null,
};

const orderButtons = {
  tariffBtns: [document.querySelectorAll('.tariff'), 'percent'],
  mainBrickColorBtns: [
    document.querySelectorAll('#mainBrickColor > .sub-option'),
    'mainBrickColor',
  ],
  archTypeBtns: [document.querySelectorAll('#archType > .sub-option'), 'archType'],
  archColorBtns: [document.querySelectorAll('#archColor > .sub-option'), 'archColor'],
  sector1Btns: [document.querySelectorAll('#sector1 > .sub-option'), 'sector1'],
  sector2Btns: [document.querySelectorAll('#sector2 > .sub-option'), 'sector2'],
  sector3Btns: [document.querySelectorAll('#sector4 > .sub-option'), 'sector4'],
  sector4Btns: [document.querySelectorAll('#sector5 > .sub-option'), 'sector5'],
};

const fireplaceImg = document.getElementById('fireplace');

const archTypeBrown = document.getElementById('archTypeBrown');
const archTypeOrange = document.getElementById('archTypeOrange');
const archTypeYellow = document.getElementById('archTypeYellow');

const handleActiveButton = (buttons, dataAttr) => {
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      buttons.forEach((btn) => {
        btn.classList.remove('active');
      });
      btn.classList.add('active');

      const dataAttrName = Object.entries(btn.dataset)[0][0];
      const dataAttrValue = Object.entries(btn.dataset)[0][1];

      order[dataAttr] =
        e.currentTarget.dataset[dataAttr.toLowerCase()] === 'null'
          ? null
          : e.currentTarget.dataset[dataAttr.toLowerCase()];

      handlePreviewChange(
        btn.dataset.imagesrc,
        btn.dataset.image,
        dataAttrValue,
        +dataAttrName[dataAttrName.length - 1],
      );
    });
  });
};

const handlePreviewChange = (imgSrc, image, dataAttrValue, sectorIndex) => {
  if (image === 'archType') {
    const [brownImg, orangeImg, yellowImg] = JSON.parse(imgSrc.replace(/'/g, '"'));

    archTypeBrown.setAttribute('src', brownImg);
    archTypeOrange.setAttribute('src', orangeImg);
    archTypeYellow.setAttribute('src', yellowImg);
  }

  // мне похуй я заебался
  if (order.sector1 !== null) {
    const sectorImg = document.getElementById('sector1');
    sectorImg.setAttribute(
      'src',
      `/img/fireplace/${order.mainBrickColor}/${order.mainBrickColor}_${order.sector1}_1.png`,
    );
  }
  if (order.sector2 !== null) {
    const sectorImg = document.getElementById('sector2');
    sectorImg.setAttribute(
      'src',
      `/img/fireplace/${order.mainBrickColor}/${order.mainBrickColor}_${order.sector2}_2.png`,
    );
  }
  if (order.sector4 !== null) {
    const sectorImg = document.getElementById('sector4');
    sectorImg.setAttribute(
      'src',
      `/img/fireplace/${order.mainBrickColor}/${order.mainBrickColor}_${order.sector4}_4.png`,
    );
  }
  if (order.sector5 !== null) {
    const sectorImg = document.getElementById('sector5');
    sectorImg.setAttribute(
      'src',
      `/img/fireplace/${order.mainBrickColor}/${order.mainBrickColor}_${order.sector5}_5.png`,
    );
  }

  fireplaceImg.setAttribute(
    'src',
    `/img/fireplace/${order.mainBrickColor}/base/${[order.archType, order.archColor].join(
      '_',
    )}.png`,
  );

  const sectorImg = document.getElementById(`sector${sectorIndex}`);
  sectorImg?.setAttribute(
    'src',
    dataAttrValue === 'null'
      ? `/img/fireplace/sector/nothing_${sectorIndex}.png`
      : `/img/fireplace/${order.mainBrickColor}/${order.mainBrickColor}_${dataAttrValue}_${sectorIndex}.png`,
  );
};

for (const key in orderButtons) {
  orderButtons[key][0][0].classList.add('active');
  handleActiveButton(orderButtons[key][0], orderButtons[key][1]);
}
