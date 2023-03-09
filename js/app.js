document.querySelector('.btn').addEventListener('click', getFetch);
const weaponName = document.querySelector('h2');
const category = document.querySelector('h3');
const description = document.querySelector('h4');
const img = document.querySelector('img');
const scalesList = document.querySelector('.scalingList');
const weaponsList = document.querySelector('.weaponsList');

//fetch weapons list on window load
window.onload = loadWeapons;
function loadWeapons() {
  const url = `https://eldenring.fanapis.com/api/weapons?limit=100`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.data.forEach((obj) => {
        const li = document.createElement('li');
        li.textContent = `${obj.name}`;
        weaponsList.appendChild(li);
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

//deletes previous scaling list items for each new query
function deleteLi() {
  let list = document.querySelector('.scalingList');
  let child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }
}

//fetch function
function fetchAPI(url) {
  deleteLi();
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      weaponName.innerHTML = data.data[0].name;
      category.innerHTML = data.data[0].category;
      description.innerHTML = data.data[0].description;
      img.src = data.data[0].image;
      console.log(
        data.data[0].scalesWith.forEach((obj) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${obj.name} - ${obj.scaling}`;
          scalesList.appendChild(listItem);
        })
      );
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

//fetch specific weapons info by clicking on list name
weaponsList.addEventListener('click', (e) => {
  const pick = e.target.innerHTML;
  const url = `https://eldenring.fanapis.com/api/weapons?name=${pick}?`;
  fetchAPI(url);
});

//fetch specific weapons info by searching
function getFetch() {
  const choice = document.querySelector('input').value;
  const url = `https://eldenring.fanapis.com/api/weapons?name=${choice}?`;
  fetchAPI(url);
}
