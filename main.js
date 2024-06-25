'use strict'
//ПЕРЕМЕННЫЕ
const section_premiere = document.querySelector('.premiere');
const about_us = document.querySelector('.about_us');
const premiere_slider_prev = document.querySelector('.premiere_slider_prev');
const premiere_slider_next = document.querySelector('.premiere_slider_next');
const menu_main_list = document.querySelector('.menu_main_list');
const entrance_form_btn = document.querySelector('.entrance_form_btn');
const contacts = document.querySelector('.contacts');
const footer = document.querySelector('#footer');
const pages = document.querySelectorAll('.pages');
const main_page = menu_main_list.querySelectorAll('.main_page');
const second_page = menu_main_list.querySelectorAll('.second_page');
const spider_man_img = document.querySelector('.spider-man');
const today_buy_btn = document.querySelector('.today_buy_btn');
const main_container = document.querySelectorAll('.container');
//СОЗДАНИЕ ЭЛЕМЕНТОВ
const div = document.createElement('div');
const p = document.createElement('p');
const h3 = document.createElement('h3');
const h4 = document.createElement('h4');
const span = document.createElement('span');
const ul = document.createElement('ul');
const li = document.createElement('li');
const input = document.createElement('input');
const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
const tr = document.createElement('tr');
const th = document.createElement('th');
const td = document.createElement('td');
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ДЛЯ ЧАСТОГО ИСП.
const months = [
  'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
];
const all_nums = '0123456789';
const abc = 'abcdefghijklmnopqrstuvwxyz';
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const rus_abc = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const RUS_ABC = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const symbols = './?><!@#$%^&*()-_=+';
const symbols_mini = '.-_';
//СОБЫТИЯ
entrance_form_btn.addEventListener('click', openEntranceForm);
contacts.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: footer.parentElement.clientHeight,
    behavior: "smooth"
  });
})

/* movie_list_btn.addEventListener('click', getVisibleMovieList); */

//Подменю меню
Array.from(menu_main_list.children).forEach(el => {
  let li_child = el.querySelector('ul');
  if (li_child) {
    el.addEventListener('mouseover', () => {
      li_child.classList.toggle('visibility');
    })
    el.addEventListener('mouseout', () => {
      li_child.classList.toggle('visibility');
    })
  }
});

//Навигация по страницам

main_page.forEach(link => link.addEventListener('click', openMainPage));

function openMainPage() {
  if (pages[0].classList.contains('unblock')) {
    pages[0].classList.remove('unblock');
    pages[1].classList.add('unblock');
  }
  if (spider_man_img.classList.contains('unblock')) {
    spider_man_img.classList.remove('unblock');
  }
}

second_page.forEach(link => link.addEventListener('click', function () {
  if (pages[1].classList.contains('unblock')) {
    pages[1].classList.remove('unblock');
    pages[0].classList.add('unblock');
  }
  if (!spider_man_img.classList.contains('unblock')) {
    spider_man_img.classList.add('unblock');
  }
}));

today_buy_btn.addEventListener('click', () => {
  pages[1].classList.remove('unblock');
  pages[0].classList.add('unblock');
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
});

//Форма входа, регистрации, восстановления пароля
//НАЧАЛО

function openEntranceForm() {
  // ПЕРЕМЕННЫЕ ФОРМ
  const forms = document.querySelectorAll('.entrance_form_big_container form');
  const [entrance_form, registration_form, restore_password_form] = forms;
  const form_close = document.querySelector('.entrance_form_close');
  const entrance_form_menu = entrance_form.querySelectorAll('a');
  const [registration_btn, restore_password_btn] = entrance_form_menu;
  let select = document.querySelector('.restore_password_form select');
  const reset_pass_type = select.nextElementSibling.querySelector('input');
  const entrance = entrance_form.querySelector('input[type="button"]');
  const hide_pass = entrance_form.querySelector('.password+svg');
  let prev_form_btn;
  entrance_form.parentElement.parentElement.style.display = 'block';
  entrance_form.style.display = 'block';
  document.body.style.overflowY = 'hidden';

  //СОБЫТИЯ
  // Закрыть форму входа и регистрации
  form_close.addEventListener('click', closeEntranceForm, { once: true });
  //Смена пароля в первой форме
  hide_pass.addEventListener('click', hidePass);
  // Обработчик кнопки регистрации
  registration_btn.addEventListener('click', handleRegistrationBtnClick);
  // Обработчик кнопки восстановления пароля
  restore_password_btn.addEventListener('click', handleRestorePasswordBtnClick);
  //Проверка вводимых данных для входа в аккаунт
  entrance.addEventListener('click', openUserAccount);


  //ФУНКЦИИ
  function closeEntranceForm() {
    entrance_form.parentElement.parentElement.style.display = 'none';
    forms.forEach(el => { el.style.display = 'none'; el.reset(); });
    document.body.style.overflowY = 'scroll';
    registration_btn.removeEventListener('click', handleRegistrationBtnClick);
    restore_password_btn.removeEventListener('click', handleRestorePasswordBtnClick);
    if (prev_form_btn) {
      prev_form_btn.removeEventListener('click', handlePrevFormBtnClick);
    }
    hide_pass.removeEventListener('click', hidePass);
    resetForm();
  }

  function resetForm() {
    if (hide_pass.previousElementSibling.type == 'password') { hidePass({ passes: [hide_pass] }) };
    const pass = registration_form.querySelector('#registration_form_pass');
    const repeat_pass = registration_form.querySelector('#registration_form_repeat_pass');
    const passes = [pass, repeat_pass];
    const agreement = document.querySelectorAll('.agreement input[type="checkbox"]');
    if (agreement[0]) {
      agreement[0].nextElementSibling.style.backgroundColor = '';
    }
    if (pass.type == 'password' || repeat_pass.type == 'password') {
      pass.type = 'text';
      repeat_pass.type = 'text';
    }
    passes.forEach(el => el.removeEventListener('click', hidePasses));
    const entrance_form_errors = document.querySelectorAll('.entrance_form>div>p');
    const registration_form_errors = registration_form.querySelectorAll('.registration_form fieldset>div>label+div>input');
    if (entrance_form_errors) { entrance_form_errors.forEach(el => el.parentElement.removeChild(el)); };
    select = document.querySelector('.restore_password_form select');
    if (select.classList.contains('red_color')) { select.classList.remove('red_color') };
    select.removeEventListener('change', installInputType);
    if (reset_pass_type.parentElement.lastElementChild.tagName === 'P') {
      reset_pass_type.parentElement.removeChild(reset_pass_type.parentElement.lastElementChild);
    }
    if (reset_pass_type) { reset_pass_type.className = ''; }
    registration_form_errors.forEach(el => {
      if (el.parentElement.lastElementChild.tagName === 'P') {
        el.parentElement.removeChild(el.parentElement.lastElementChild);
      }
    })
  }

  function returnBack(prev) {
    entrance_form.reset();
    prev.parentElement.reset();
    prev.parentElement.style.display = 'none';
    entrance_form.style.display = 'block';
    prev.removeEventListener('click', handlePrevFormBtnClick);
    resetForm();
  }

  function handleRegistrationBtnClick(e) {
    e.preventDefault();
    openRegistrationForm();
  }

  function openRegistrationForm() {
    const phone = registration_form.querySelector('.phone');
    const email = registration_form.querySelector('.email');
    const login = registration_form.querySelector('#registration_form_login');
    const pass = document.querySelector('#registration_form_pass');
    const repeat_pass = document.querySelector('#registration_form_repeat_pass');
    const reg_btn = registration_form.querySelector('input[type="button"]');
    const passes = [pass.nextElementSibling, repeat_pass.nextElementSibling];
    passes.forEach(el => el.addEventListener('click', hidePasses));
    //МЕТКА
    if (phone) {
      phone.addEventListener('input', () => {
        validatePhoneNums(phone);
      });
      phone.addEventListener('change', () => {
        validatePhoneLength(phone);
      });
    }

    if (email) {
      email.addEventListener('input', () => {
        spaceInputCheck(email);
      });
      email.addEventListener('change', () => {
        validateEmailLength(email);
      });
    }

    if (login) {
      login.addEventListener('input', () => {
        spaceInputCheck(login);
      });
      login.addEventListener('change', () => {
        validateLoginLength(login);
      });
    }

    if (pass && repeat_pass) {

      pass.addEventListener('input', () => {
        spaceInputCheck(pass);
      });
      repeat_pass.addEventListener('input', () => {
        spaceInputCheck(repeat_pass);
      });

      pass.addEventListener('change', () => {
        validatePasswordLength(pass);
      });
      repeat_pass.addEventListener('change', () => {
        if (repeat_pass.value.trim() != pass.value.trim()) {
          postAHint(repeat_pass, `Пароли должны совпадать`);
        }
      });
      repeat_pass.addEventListener('paste', (e) => {
        e.preventDefault();
        postAHint(repeat_pass, `Запрещено вставлять значение в поле`);
      });
    }

    entrance_form.style.display = 'none';
    registration_form.style.display = 'block';
    prev_form_btn = registration_form.querySelector('.prev_form_btn');
    prev_form_btn.addEventListener('click', handlePrevFormBtnClick);
    reg_btn.addEventListener('click', userRegistration);
  }

  function hidePasses() {
    let pass = document.querySelector('#registration_form_pass');
    let repeat_pass = document.querySelector('#registration_form_repeat_pass');
    const passes = [pass.nextElementSibling, repeat_pass.nextElementSibling];
    hidePass({ passes: passes });
  }

  function handleRestorePasswordBtnClick(e) {
    e.preventDefault();
    openRestorePasswordForm();
  }

  function openRestorePasswordForm() {
    entrance_form.style.display = 'none';
    restore_password_form.style.display = 'block';
    prev_form_btn = restore_password_form.querySelector('.prev_form_btn');
    prev_form_btn.addEventListener('click', handlePrevFormBtnClick);
    select.addEventListener('change', installInputType);
    const restore_password_form_btn = restore_password_form.querySelector('input[type="button"]');
    restore_password_form_btn.addEventListener('click', sendResetPasswData);
  }

  function handlePrevFormBtnClick(e) {
    e.preventDefault();
    returnBack(prev_form_btn);
  }

  function installInputType() {
    reset_pass_type.className = `${select[select.selectedIndex].value}`;
    /* if(reset_pass_type.value.length>0) {reset_pass_type.value=''}; */
    if (reset_pass_type.classList.contains('phone')) {
      if (reset_pass_type.value.length > 0) { reset_pass_type.value = '' };
      reset_pass_type.addEventListener('input', validatePhoneNumsResetPass);
    } else {
      reset_pass_type.removeEventListener('input', validatePhoneNumsResetPass);
    }
  }

  function validatePhoneNumsResetPass() {
    validatePhoneNums(reset_pass_type);
  }

  if (select) {
    select.addEventListener('change', installInputType);
  }

  function openUserAccount() {
    const errors = document.querySelectorAll('.entrance_form>div>p');
    if (errors) { errors.forEach(el => el.parentElement.removeChild(el)); };
    const login = this.parentElement.querySelector('.login');
    const password = this.parentElement.querySelector('.password');
    if (`${login.value.trim()}` in users && password.value.trim() === users[login.value.trim()].password) {
      entrance_form_btn.removeEventListener('click', openEntranceForm);
      entrance_form_btn.textContent = login.value.trim();
      entrance_form_btn.title = "Личный кабинет находится на техническом обслуживании";
      closeEntranceForm();
    }

    if (login.value.trim().length === 0 || password.value.trim().length === 0) {
      if (login.value.trim().length === 0) {
        postAHint(login, "Заполните поле");
      }
      if (password.value.trim().length === 0) {
        postAHint(password, "Заполните поле");
      }
    } else {
      if (`${login.value.trim()}` in users && password.value.trim() != users[login.value.trim()].password) {
        postAHint(password, "Неверный пароль");
      }
      if (!(`${login.value.trim()}` in users)) {
        postAHint(login, "Неверный логин");
      }
    }
  }

  function sendResetPasswData() {
    const input = reset_pass_type;
    if (select.classList.contains('red_color')) {
      select.classList.remove('red_color');
    }
    if (input.parentElement.lastElementChild.tagName === 'P') {
      input.parentElement.removeChild(input.parentElement.lastElementChild);
    }

    if (select.selectedIndex === 0 || input.value.trim().length === 0) {
      if (select.selectedIndex === 0) {
        select.classList.add('red_color');
        select.addEventListener('click', function () {
          select.classList.remove('red_color');
        })
      }
      if (input.value.trim().length === 0) {
        postAHint(input, "Заполните поле");
      }
    } else {
      if (select.selectedIndex === 1 && input.classList.contains('login')) {
        `${input.value.trim()}` in users ? closeEntranceForm() : postAHint(input, "Данные не найдены");
      }
      if (select.selectedIndex === 2 && input.classList.contains('phone')) {
        const phones = Object.values(users).filter(el => {
          const temp = input.value.trim();
          return el.phone === temp.substring(0, 2) + temp.substring(3, 6) + temp.substring(7, 10) + temp.substring(11, 13) + temp.substring(14);
        });
        phones.length > 0 ? closeEntranceForm() : postAHint(input, "Данные не найдены");
      }
      if (select.selectedIndex === 3 && input.classList.contains('email')) {
        Object.values(users).filter(el => el.email === input.value.trim().toLowerCase()).length > 0 ? closeEntranceForm() : postAHint(input, "Данные не найдены");
      }
    }
  }

  function userRegistration() {
    const registration_form = document.querySelectorAll('.registration_form fieldset>div>label+div>input');
    const [email, phone, login, pass, pass_repeat] = registration_form;
    const contacts = document.querySelectorAll('.send_ticket_type input[type="checkbox"]');
    const agreement = document.querySelectorAll('.agreement input[type="checkbox"]');
    let temp = [...registration_form].every(el => el.value.trim().length > 0);
    if (temp && agreement[0].checked) {
      if (pass.value.trim() != pass_repeat.value.trim()) {
        postAHint(pass_repeat, `Пароли должны совпасть`);
      } else {
        if (validateEmailLength(email) && validatePhoneLength(phone) && validateLoginLength(login) && validatePasswordLength(pass)) {
          const users_email = Object.values(users).filter(el => el.email === email.value.trim().toLowerCase());
          const users_phone = Object.values(users).filter(el => el.phone === phone.value.substring(0, 2) + phone.value.substring(3, 6) + phone.value.substring(7, 10) + phone.value.substring(11, 13) + phone.value.substring(14));
          if (`${login.value.trim()}` in users) {
            postAHint(login, `Логин занят, восстановите доступ`);
          } else if (users_phone.length > 0) {
            postAHint(phone, `Номер используется, восстановите доступ`);
          } else if (users_email.length > 0) {
            postAHint(email, `Почта используется, восстановите доступ`);
          } else {
            users[login.value.trim()] = {
              'password': `${pass.value.trim()}`,
              'tickets': [],
              'email': `${email.value.trim().toLowerCase()}`,
              'phone': `${phone.value.substring(0, 2) + phone.value.substring(3, 6) + phone.value.substring(7, 10) + phone.value.substring(11, 13) + phone.value.substring(14)}`,
              'preferred_contcts': { 'mail': `${contacts[0].checked}`, 'phone': `${contacts[1].checked}`, 'account': 'true' },
              'pdn': `${agreement[0].checked}`,
              'newsletter': `${agreement[1].checked}`
            };
            closeEntranceForm();
          }
        }
      }
    } else {
      registration_form.forEach(el => {
        if (el.value.trim().length < 1) {
          postAHint(el, `Заполните поле`);
        }
      })
      if (!agreement[0].checked) {
        agreement[0].nextElementSibling.style.backgroundColor = '#e14234';
      }
    }

  }
}

//КОНЕЦ
//МЕТКА


function hidePass({ passes = false }) {
  if (!passes) { this.previousElementSibling.type == 'text' ? this.previousElementSibling.type = 'password' : this.previousElementSibling.type = 'text'; }
  else {
    passes.forEach(el => {
      el.previousElementSibling.type == "text" ? el.previousElementSibling.type = "password" : el.previousElementSibling.type = "text";
    });
  }
}

//разместить подсказку
function postAHint(input, text_error) {
  const p = document.createElement('p');
  p.textContent = text_error;
  if (input.parentElement.lastElementChild.tagName === 'P') {
    input.parentElement.removeChild(input.parentElement.lastElementChild);
  }
  input.parentElement.append(p);
  input.addEventListener('input', function () {
    if (this.parentElement.lastElementChild.tagName === 'P') {
      this.parentElement.removeChild(this.parentElement.lastElementChild);
    }
  }, { once: true });
}


(function createSliderElem(movies) {
  const slider = document.querySelector('.premiere_slider');
  if (slider.children.length === 0) {
    for (let i = 0; i < movies.length; i++) {
      const slider_item = div.cloneNode(false);
      slider_item.className = 'premiere_slider_item unblock';
      slider_item.style.cssText += `background-image: url(${movies[i]['path']});`;
      const div1 = div.cloneNode(false);
      const div2 = div.cloneNode(false);
      const div3 = div.cloneNode(false);
      div3.className = 'premiere_slider_item_film_info';
      const div4 = div.cloneNode(false);
      const div5 = div.cloneNode(false);
      div5.className = 'premiere_slider_item_film_date';
      const title = h3.cloneNode(false);
      title.innerText = `${movies[i]['name'] || ''}`
      title.className = 'premiere_slider_item_name';
      const subtitle = h4.cloneNode(false);
      subtitle.innerText = 'Ближайшие показы:';
      const inp = input.cloneNode(false);
      inp.className = 'premiere_slider_item_btn btn_main_style btn_ordinary';
      inp.type = 'button';
      inp.value = 'Приобрести билет';
      const list = ul.cloneNode(false);
      const descr = p.cloneNode(false);
      descr.innerText = `${movies[i]['descr'] || ''}`
      const country = p.cloneNode(false);
      country.innerText = 'Страна:';
      const age = p.cloneNode(false);
      age.innerText = 'Возраст:';
      const duration = p.cloneNode(false);
      duration.innerText = 'Длительность:';
      const country_value = span.cloneNode(false);
      country_value.innerText = `${movies[i]['country'] || '-'}`;
      const age_value = span.cloneNode(false);
      age_value.innerText = `${movies[i]['age'] || 'Отсутствуют'}`;
      const duration_value = span.cloneNode(false);
      duration_value.innerText = `${movies[i]['duration'] || ''}`;

      //Размещение
      slider_item.append(div1);
      div1.append(title, div2);
      div2.append(div3, inp);
      div3.append(div4, div5);
      div4.append(descr, country, age, duration);
      div5.append(subtitle, list);
      country.append(country_value);
      age.append(age_value);
      duration.append(duration_value);
      slider.appendChild(slider_item);

      let upcoming_shows = Array.from(new Set(getMovieDates(movies[i].name))).slice(0, 3);
      upcoming_shows.forEach(show => {
        let list_item = document.createElement('li');
        list_item.innerText = show.substring(0, 16) || '';
        list.appendChild(list_item);
      });
    }
  }
  if (slider.children.length !== 0) {
    getSliderVisible(slider.children);
    const btns = document.querySelectorAll('.premiere_slider_item_btn');
    btns.forEach(btn => btn.addEventListener('click', function (e) {
      e.preventDefault();
      const movie_name = btn.parentElement.parentElement.querySelector('.premiere_slider_item_name');
      openBuyForm({ name: movie_name.textContent });
    }));
  }

}(movies));

function getSliderVisible(obj) {
  let i = 0;
  let j = null;
  let pauseSlider = false;

  function installPauseOnSlider() {
    if (!pauseSlider) {
      pauseSlider = true;
      const elems = document.querySelectorAll('.centered');
      elems.forEach((el) => el.classList.remove('centered'));
      this.classList.add('centered');
    }
  }

  function unInstallPauseOnSlider() {
    if (pauseSlider) {
      this.classList.remove('centered');
      pauseSlider = false;
      showSlides();
    }
  }

  function showSlides() {
    if (j !== null) obj[j].classList.remove('centered');
    let arr = Array.from(obj).slice(i, i + 3);
    arr.forEach(el => {
      el.classList.remove("unblock");
      el.addEventListener('mouseenter', installPauseOnSlider);
      el.addEventListener('mouseleave', unInstallPauseOnSlider);
    });
    let centerIndex = Math.floor(arr.length / 2);
    arr[centerIndex].classList.add('centered');
  }

  function hideSlides(arr, next_el_visible = true) {
    arr.forEach(el => {
      el.classList.add("unblock");
      el.removeEventListener('mouseenter', installPauseOnSlider);
      el.removeEventListener('mouseleave', unInstallPauseOnSlider);
    });
    j = i + 1;
    if (next_el_visible) {
      ((i + 1) % (obj.length - 1) <= obj.length - 3) ? (i = (i + 1) % (obj.length - 1)) : (i = 0);
    } else {
      if (i > 0) { i-- }
      else { i = obj.length - 3; }
    }
    showSlides();
  }

  setInterval(function () {
    if (!pauseSlider) hideSlides(Array.from(obj).slice(i, i + 3));
  }, 8000);
  showSlides();

  function getNextSlider() {
    pauseSlider = true;
    hideSlides(Array.from(obj).slice(i, i + 3));
  }

  function getPrevSlider() {
    pauseSlider = true;
    if (i > 0) {
      i--;
      let view = document.querySelectorAll('.premiere_slider_item:not(.unblock)');
      view.forEach((el) => el.classList.remove('centered'));
      view[0].previousElementSibling.classList.remove('unblock');
      view[2].classList.add('unblock');
      view = document.querySelectorAll('.premiere_slider_item:not(.unblock)');
      view[1].classList.add('centered');
    }
    hideSlides(Array.from(obj).slice(i, i + 3), false);
  }
  premiere_slider_next.addEventListener('click', getNextSlider);
  premiere_slider_prev.addEventListener('click', getPrevSlider);
}

function getMovieDates(movie_name) {
  let arr = [];
  halls.forEach(hall => hall.forEach(el => {
    if (el.movie == movie_name) {
      arr.push(el.datetime);
    }
  }));
  return sortDateStr(arr);
}

function getHallsToday({ index, day = false, month = false, price = false, full_datetime = false }) {
  let today = new Date();
  (!day && !month) ? today = new Date() : today = new Date(today.getFullYear(), month, day);
  today = `${today.getDate()}.${today.getMonth() + 1}`.split('.').map(el => el.length < 2 ? '0' + el : el).join('.');
  let arr = [];
  for (let obj = 0; obj < halls[index].length; obj++) {
    let today_obj = {};
    if (halls[index][obj].datetime.substring(0, 5) === today) {
      today_obj['name'] = halls[index][obj].movie;
      !full_datetime ? today_obj['time'] = halls[index][obj].datetime.substring(11) : today_obj['time'] = halls[index][obj].datetime;
      today_obj['type'] = halls[index][obj].type;
      if (price === true) {
        today_obj['price'] = halls[index][obj].price;
      }
      arr.push(today_obj);
    }
  }
  return arr;
}

(function createElementHalls() {
  const halls = document.querySelectorAll('.hall');
  halls.forEach((hall, index) => {
    let arr = getHallsToday({ index });
    if (arr.length > 0) {
      let table = document.createElement('table');
      let thead = document.createElement('thead');
      let tbody = document.createElement('tbody');
      let thead_tr = document.createElement('tr');
      let thead_text = ['Название', 'Время', 'Тип'];
      for (let ths = 0; ths < thead_text.length; ths++) {
        let th = document.createElement('th');
        th.innerText = thead_text[ths];
        thead_tr.append(th);
      }
      thead.append(thead_tr);
      for (let i = 0; i < arr.length; i++) {
        let tr = document.createElement('tr');
        let seance = Object.values(arr[i]);
        for (let el = 0; el < seance.length; el++) {
          let td = document.createElement('td');
          td.innerText = seance[el];
          tr.append(td);
        }
        tbody.append(tr);
      }
      table.append(thead, tbody);
      hall.append(table);
    } else {
      let no_cinema = p.cloneNode(false);
      no_cinema.innerText = "Сегодня киносеансы не проводятся";
      hall.append(no_cinema);
    }
    /*     const tds_title = document.querySelectorAll('.halls div:nth-child(3) thead tr th:last-child');
        tds_title.forEach(td => {
          td.title = 'Cортировать';
        }); */
  });

  for (let i = 1; i < halls.length; i++) {
    let childs = Array.from(halls[i].children).some(el => el.tagName === 'TABLE');
    if (childs) { addSortType(halls[i]) };
  }

}());

function addSortType(hall, last_child_prev = false) {
  const table = hall.querySelector('table');
  let trs_length = table.querySelectorAll('tbody tr').length;
  const th_title = table.querySelector('th:last-child');
  if (trs_length > 1) {
    th_title.title = 'Сортировать';
    th_title.className = 'down';
    th_title.addEventListener('click', () => {
      sortingTable(table, th_title, last_child_prev);
    });
  }
}

function sortingTableAlg(trs, name_class, last_child_prev = false) {
  let trs_sorted = Array.from(trs).sort((a, b) => {
    let A, B;

    if (last_child_prev) {
      A = a.lastElementChild.previousElementSibling.innerHTML;
      B = b.lastElementChild.previousElementSibling.innerHTML;
    } else {
      A = a.lastElementChild.innerHTML;
      B = b.lastElementChild.innerHTML;
    }

    if (name_class === 'down') {
      if (A > B) return 1;
      if (A < B) return -1;
      return 0;
    }

    if (name_class === 'up') {
      if (A > B) return -1;
      if (A < B) return 1;
      return 0;
    }
  });

  return trs_sorted;
}

function sortingTable(table, th_title, last_child_prev = false) {
  let tbody = table.querySelector('tbody');
  let new_tbody = document.createElement('tbody');
  let trs = Array.from(tbody.querySelectorAll('tr'));
  let sortedTrs = sortingTableAlg(trs, th_title.className, last_child_prev);
  new_tbody.append(...sortedTrs);
  table.replaceChild(new_tbody, tbody);
  th_title.className = th_title.className === 'down' ? 'up' : 'down';
}

(function getCalendarTableVisible() {
  const caledar_container = document.querySelector('.cinema_sessions_calendar_slider_container');
  let caledar_container_tables = caledar_container.querySelectorAll('table');
  for (let i = 0; i < 4; i++) {
    let table = createCalendarTable();
    table.className = `table${i}`;
    caledar_container.append(table);
  }
  caledar_container_tables = caledar_container.querySelectorAll('table');
  createSchedules(createCalendarDay(caledar_container_tables));
  createTableSlider();
}());

function createCalendarTable() {
  const table = document.createElement('table');
  const caption = document.createElement('caption');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const thead_tr = document.createElement('tr');
  const days_of_week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  days_of_week.forEach(day => {
    const th = document.createElement('th');
    const span = document.createElement('span');
    span.innerText = day;
    th.append(span);
    thead_tr.append(th);
  });
  for (let i = 0; i < 5; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      let td = document.createElement('td');
      tr.append(td);
    }
    tbody.append(tr);
  }
  thead.append(thead_tr);
  table.append(caption, thead, tbody);
  return table;
}

function createCalendarDay(tables) {
  tables.forEach((table, ind) => {
    const tbody_tds = table.querySelectorAll('td');
    const caption = table.querySelector('caption');
    const today = new Date();
    const this_month = new Date(today.getFullYear(), today.getMonth() + ind, 1);
    const next_month = new Date(today.getFullYear(), today.getMonth() + ind + 1, 1);
    caption.innerText = months[this_month.getMonth()];
    let start_date = 0;
    let start = 0;
    this_month.getDay() != 0 ? start_date = this_month.getDay() - 1 : start_date = 6;

    if (this_month.getMonth() === today.getMonth()) {
      start_date = start_date + today.getDate() - 1;
      start = today.getDate() - 1;
    }

    const diff = function () {
      if (ind < 3) {
        return (next_month - this_month) / (1000 * 60 * 60 * 24);
      }
      else {
        return today.getDate();
      }
    };


    for (let i = start, j = start_date; i < diff(); i++, j++) {
      let a = document.createElement('a');
      let span = document.createElement('span');
      span.innerText = i + 1;
      a.title = 'Расписание';
      a.append(span);
      tbody_tds[j].append(a);
    }
  });
  return tables;
}


function createTableSlider() {
  const prev = document.querySelector('.cinema_sessions_calendar_prev');
  const next = document.querySelector('.cinema_sessions_calendar_next');
  let tables = document.querySelectorAll('.cinema_sessions_calendar_slider_container table');
  prev.style.display = 'none';
  let i = 0;
  next.addEventListener('click', function () {
    if (i < tables.length) {
      tables = document.querySelectorAll('.cinema_sessions_calendar_slider_container table');
      tables[0].parentElement.insertAdjacentElement('beforeend', tables[0]);
      prev.style.display = 'block';
      i++;
    }
    if (i === tables.length - 1) {
      this.style.display = 'none';
    }
  });
  prev.addEventListener('click', function () {
    if (i < tables.length) {
      tables = document.querySelectorAll('.cinema_sessions_calendar_slider_container table');
      tables[tables.length - 1].parentElement.insertAdjacentElement('afterbegin', tables[tables.length - 1]);
      next.style.display = 'block';
      i--;
    }
    if (i === 0) {
      this.style.display = 'none';
    }
  });

}

function createSchedules(tables) {
  const today = new Date();
  const months = [];
  let i = 0;
  while (months.length < tables.length) {
    months.push(today.getMonth() + i);
    i++;
  }
  i = 0;
  tables.forEach((table, table_index) => {
    const links = table.querySelectorAll('tbody a');
    links.forEach(link => link.addEventListener('click', function (e) {
      e.preventDefault();
      getSessionOnClick(link, table_index, months);
    }))
  })
}

function getSessionOnClick(link, table_index, months) {
  const span = link.querySelector('span');
  const arr = halls.map((hall, ind) => getHallsToday({ index: ind, day: span.innerText, month: months[table_index], price: true, full_datetime: true }));
  try500(arr);
  /* getHallsToday({index:0, day: span.innerText, month: months[table_index]}); */
}

//таблицы расписаний календаря
function try500(arr) {
  const cinema_sessions_halls = document.querySelector('.cinema_sessions_halls');
  let cinema_sessions_hall = document.querySelectorAll('.cinema_sessions_hall');
  if (cinema_sessions_hall.length > 0) {
    cinema_sessions_hall.forEach(el => el.parentNode.removeChild(el));
  }
  arr.forEach((el, ind) => {
    const div = document.createElement('div');
    div.className = 'cinema_sessions_hall';
    const h4 = document.createElement('h4');
    h4.innerText = `Зал ${ind + 1}`;
    if (el.length > 0) {
      let table = document.createElement('table');
      let thead = document.createElement('thead');
      let tbody = document.createElement('tbody');
      let thead_tr = document.createElement('tr');
      let thead_text = ['Название', 'Время', 'Тип', 'Цена'];
      for (let ths = 0; ths < thead_text.length; ths++) {
        let th = document.createElement('th');
        th.innerText = thead_text[ths];
        thead_tr.append(th);
      }
      thead.append(thead_tr);
      for (let i = 0; i < el.length; i++) {
        let tr = document.createElement('tr');
        let td_btn = document.createElement('td');
        td_btn.setAttribute('data-hall', `${ind}`);

        let link_btn = document.createElement('a');
        td_btn.className = 'session_buy_btn';
        link_btn.textContent = 'Купить';
        td_btn.append(link_btn);
        let seance = Object.values(el[i]);
        td_btn.setAttribute('data-datetime', `${seance[1]}`);
        td_btn.setAttribute('data-movie-name', `${seance[0]}`);
        td_btn.setAttribute('data-price', `${seance[3]}`);
        seance[1] = seance[1].substring(11);
        for (let e = 0; e < seance.length; e++) {
          let td = document.createElement('td');
          td.innerText = seance[e];
          tr.append(td);
        }
        tr.append(td_btn);
        tbody.append(tr);
      }
      table.append(thead, tbody);
      div.append(h4, table);
      cinema_sessions_halls.append(div);
    } else {
      let no_cinema = document.createElement('p');
      no_cinema.innerText = "Киносеансы не проводятся";
      div.append(h4, no_cinema);
      cinema_sessions_halls.append(div);
    }
  });

  cinema_sessions_hall = document.querySelectorAll('.cinema_sessions_hall');
  for (let s = 0; s < cinema_sessions_hall.length; s++) {
    let childs = Array.from(cinema_sessions_hall[s].children).some(e => e.tagName === 'TABLE');
    if (childs) { addSortType(cinema_sessions_hall[s], true) };
  }

  const session_buy_btn = document.querySelectorAll('.session_buy_btn a');
  session_buy_btn.forEach(a => a.addEventListener('click', function (e) {
    e.preventDefault();
    openBuyForm({
      name: a.parentElement.dataset.movieName, date: a.parentElement.dataset.datetime.substring(0, 10),
      time: a.parentElement.dataset.datetime.substring(11), hall_ind: a.parentElement.dataset.hall
    });
  }));
}

(function getVisibleMovieList() {
  const cinema_sessions_filter = document.querySelector('.cinema_sessions_filter');
  const includes = Array.from(cinema_sessions_filter.children).some(child => child.tagName.toLowerCase() === 'ul');
  if (includes === false) {
    let arr = sortText(getMovieList(movies));
    const ul = document.createElement('ul');
    arr.forEach(el => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.innerText = el;
      li.append(a);
      ul.append(li);
    });
    cinema_sessions_filter.insertAdjacentElement('beforeend', ul);
  }

  const input = cinema_sessions_filter.querySelector('input');
  const ul_list = cinema_sessions_filter.querySelector('ul');
  const ul_a = ul_list.querySelectorAll('a');
  ul_a.forEach(el => el.addEventListener('click', function (e) {
    e.preventDefault();
    insertValue(el, input);
  }));

  input.addEventListener('focus', function () {
    ul_list.classList.add('block');
    cinema_sessions_filter.classList.add('gradient');
  });

  const movie_list_btn = document.querySelector('.movie_list_btn');
  input.addEventListener('input', findTextOverlap);
  movie_list_btn.addEventListener('click', function () {
    ul_list.classList.toggle('block');
    cinema_sessions_filter.classList.toggle('gradient');
  });

  const search_list_btn = document.querySelector('.search_list_btn');
  search_list_btn.addEventListener('click', addSearchedMovieOnCalendar);

})();

function insertValue(el, input) {
  input.value = el.innerText;
}

function findTextOverlap() {
  const max = +this.getAttribute('maxlength');
  const ul_a = document.querySelectorAll('.cinema_sessions_filter ul a');
  if (ul_a.length > 0) {
    if (this.value.trim().length > 1) {
      const search_value = this.value.trim().toLowerCase();
      let arr = sortText(getMovieList(movies));
      let filtered = arr.filter(el => el.toLowerCase().includes(search_value));
      if (filtered.length > 0) {
        ul_a.forEach(a => {
          const text = a.textContent;
          const index = text.toLowerCase().indexOf(search_value);
          if (index !== -1) {
            const before = text.substring(0, index);
            const match = text.substring(index, index + search_value.length);
            const after = text.substring(index + search_value.length);
            a.innerHTML = before + '<mark class=\'marked\'>' + '<b>' + match + '</b>' + '</mark>' + after;
          }
        });
        this.setAttribute('maxlength', this.value.length + 1); //  maxlength  длинa + 1
      } else {
        this.setAttribute('maxlength', this.value.length);
      }
    } else {
      this.setAttribute('maxlength', max);
      ul_a.forEach(a => {
        const mark = a.querySelectorAll('.marked');
        mark.forEach(el => {
          const text = el.textContent;
          if (text !== null) {
            el.insertAdjacentText('beforebegin', text);
            el.remove();
          }
        })
      });
    }
  }
}

function addSearchedMovieOnCalendar() {
  const input = this.parentElement.querySelector('input');
  let arr_low = Array.from(getMovieList(movies)).map(el => el.toLowerCase());
  let movie_ind = arr_low.indexOf(input.value.trim().toLowerCase());
  if (arr_low.includes(input.value.trim().toLowerCase())) {
    let unq_movie_dates = getMovieDates(movies[movie_ind].name).map((el => el.substring(0, 5)));
    unq_movie_dates = Array.from(new Set(unq_movie_dates));
    addBgcMovieOnCalendar(unq_movie_dates, movie_ind);
  } else {
    const cinema_sessions_filter_error = this.parentElement.previousElementSibling;
    const error_text = cinema_sessions_filter_error.querySelector('p');
    const error_btn = cinema_sessions_filter_error.querySelector('button');
    this.parentElement.style.display = 'none';
    cinema_sessions_filter_error.style.display = 'block';
    error_text.textContent = 'Подходящие по запросу результаты отсутствуют';
    error_btn.addEventListener('click', function () {
      this.parentElement.style.display = 'none';
      this.parentElement.nextElementSibling.style.display = 'flex';
    }, { once: true });
  }
}

function addBgcMovieOnCalendar(unq_movie_dates, movie_ind) {
  const date = new Date();
  let tables = document.querySelectorAll('.cinema_sessions_calendar_slider_container table');
  tables = Array.from(tables).sort((a, b) => {
    const table1 = +a.className[a.className.length - 1];
    const table2 = +b.className[b.className.length - 1];
    return table1 - table2;
  });
  /* console.log(tables); */
  const all_links_with_bgc = document.querySelectorAll('.cinema_sessions_calendar_slider_container table a>span');
  all_links_with_bgc.forEach(el => el.parentElement.style = '');
  let current_months_str = [];
  tables.forEach((t, ind) => current_months_str.push(date.getMonth() + ind + 1));
  current_months_str = current_months_str.map(month => month.toString().length > 1 ? month.toString() : '0' + month);
  const obj_unq_movie_dates = {};
  for (let i = 0; i < current_months_str.length; i++) {
    let arr = [];
    for (let j = 0; j < unq_movie_dates.length; j++) {
      if (unq_movie_dates[j].substring(3) === current_months_str[i]) {
        arr.push(unq_movie_dates[j].substring(0, 2));
      }
    }
    obj_unq_movie_dates[i] = arr;
  }



  for (let table = 0, days = 0; table < tables.length, days < Object.values(obj_unq_movie_dates).length; table++, days++) {
    if (Object.values(obj_unq_movie_dates)[days].length === 0) {
      continue;
    } else {
      let spans = tables[table].querySelectorAll('a>span');
      let month_days = Object.values(obj_unq_movie_dates)[days];
      for (let day = 0; day < month_days.length; day++) {
        for (let span = 0; span < spans.length; span++) {
          if (+month_days[day] === +spans[span].innerHTML) {
            spans[span].parentElement.style.cssText = `background-image: url(${movies[movie_ind]['path']});`
            continue;
          }
        }
      }
      /*     console.log('конец даты') */
    }
  }

}

function createAfishaMovies({ arrs = movies, obj = false }) {
  if (obj) {
    arrs = arrs.filter((el => {
      return (!obj.type || el.type === obj.type) &&
        ((!obj.age || el.age === obj.age) || (obj.age === 'Отсутствуют' && el.age === '')) &&
        (!obj.country || el.country === obj.country || el.country.includes(obj.country));
    }));
  }


  let filtered_films_container = document.querySelector('.filtered_films_container');
  const div = document.createElement('div');
  div.className = 'filtered_films_container';
  let i = 0;
  while (i < arrs.length) {
    const filtered_films = document.createElement('div');
    const filtered_films_resize = document.createElement('button');
    const filtered_films_descr = filtered_films.cloneNode(false);
    const filtered_films_descr_div = document.createElement('div');
    const btn_buy = document.createElement('button');
    const h4_title = h4.cloneNode(false);
    filtered_films.classList.add('filtered_films', 'filtered_films_cards');
    filtered_films_resize.classList.add('filtered_films_resize', 'filtered_films_resize_toBig');
    filtered_films_descr.classList.add('filtered_films_descr', 'unblock');
    btn_buy.classList.add('btn_main_style', 'btn_ordinary', 'afisha_btn');
    h4_title.innerText = `${arrs[i].name}`;
    btn_buy.innerText = 'Приобрести билет';
    const val = [`<p>${arrs[i].descr}</p>`, `<p>Страна:<span>${arrs[i].country}</span></p>`,
    `<p>Возрастные ограничения:<span>${arrs[i].age}</span></p>`, `<p>Длительность:<span>${arrs[i].duration || ''}</span></p>`];
    let j = 0;
    while (j < val.length) {
      filtered_films_descr_div.innerHTML += `${val[j]}`;
      j++;
    }
    filtered_films_descr.append(h4_title, filtered_films_descr_div, btn_buy);
    filtered_films.append(filtered_films_resize, filtered_films_descr);
    filtered_films.style.backgroundImage = `url(${arrs[i]['path']}`;

    i++;
    div.append(filtered_films);
  }
  filtered_films_container.parentElement.replaceChild(div, filtered_films_container);
  filtered_films_container = document.querySelector('.filtered_films_container');
  const filtered_films_resize_btns = filtered_films_container.querySelectorAll('.filtered_films>.filtered_films_resize');
  filtered_films_resize_btns.forEach(btn => {
    btn.title = 'Развернуть';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      changeScaleFilteredFilms(btn);
    });
  });
  const afisha_btn = document.querySelectorAll('.afisha_btn');
  afisha_btn.forEach(btn => btn.addEventListener('click', function (e) {
    e.preventDefault();
    const mov_name = btn.parentElement.querySelector('h4');
    openBuyForm({ name: mov_name.textContent });
  }))
}

function changeScaleFilteredFilms(btn) {
  const films_cards = btn.parentElement.parentElement.querySelectorAll('.filtered_films');
  if (btn.classList.contains('filtered_films_resize_toBig')) {
    films_cards.forEach(card => card.classList.add('unblock'));
    btn.parentElement.classList.remove('unblock');
    btn.parentElement.classList.remove('filtered_films_cards');
    btn.parentElement.classList.add('filtered_films_full_screen');
    btn.nextElementSibling.classList.toggle('unblock');
    btn.classList.remove('filtered_films_resize_toBig');
    btn.classList.add('filtered_films_resize_toSmall');
    btn.title = 'Свернуть';
  } else if (btn.classList.contains('filtered_films_resize_toSmall')) {
    films_cards.forEach(card => card.classList.remove('unblock'));
    btn.parentElement.classList.add('filtered_films_cards');
    btn.parentElement.classList.remove('filtered_films_full_screen');
    btn.nextElementSibling.classList.toggle('unblock');
    btn.classList.add('filtered_films_resize_toBig');
    btn.classList.remove('filtered_films_resize_toSmall');
    btn.title = 'Развернуть';
  }
}

createAfishaMovies({ arrs: movies });


(function createFilterFilms(movies) {
  let countries = [];
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].country.includes(',')) {
      let temp = movies[i].country.split(', ');
      for (let j = 0; j < temp.length; j++) {
        countries.push(temp[j]);
      }
    } else {
      countries.push(movies[i].country);
    }
  }
  countries = sortText(countries);
  const countries_obj = {};
  countries.forEach(country => {
    countries_obj[country] = countries.filter(c => c == country).length;
  });

  let type = movies.map(type => type.type);
  type = sortText(type);
  const type_obj = {};
  type.forEach(typ => {
    type_obj[typ] = type.filter(t => t == typ).length;
  });

  let ages = movies.map(age => age.age == undefined || age.age == '' ? 'Отсутствуют' : age.age);

  const ages_obj = {};
  ages.forEach(age => {
    ages_obj[age] = ages.filter(a => a == age).length;
  });


  function createdListofFilters(obj, title, name) {
    const filter_films_container = document.querySelector('.filter_films_container');
    const filter_films = document.createElement('div');
    const h4 = document.createElement('h4');
    const ul = document.createElement('ul');
    h4.innerText = `${title}`;
    ul.classList.add('vertical', 'checkbox_style');
    filter_films.classList.add('filter_films');
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const li = document.createElement('li');
      const span1 = document.createElement('span');
      const span2 = span1.cloneNode(false);
      const span3 = span1.cloneNode(false);
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.title = 'Нажмите для применения фильтра';
      input.type = 'checkbox';
      input.name = `${name}`;
      input.value = `${Object.keys(obj)[i]}`;
      label.innerText = `${Object.keys(obj)[i]}`;
      span3.innerText = `${Object.values(obj)[i]}`;
      span1.append(input, span2);
      label.append(span3);
      li.append(span1, label);
      ul.append(li);
    }
    filter_films.append(h4, ul);
    filter_films_container.append(filter_films);
  }

  const filters_titles = ['Раздел', 'Страны', 'Возрастные ограничения'];
  createdListofFilters(type_obj, filters_titles[0], 'type');
  createdListofFilters(countries_obj, filters_titles[1], 'country');
  createdListofFilters(sortObj(ages_obj), filters_titles[2], 'age');

  const filter_films_all = document.querySelectorAll('.filter_films');
  filter_films_all.forEach(input => {
    const inputs = input.querySelectorAll('input');
    inputs.forEach((inp, ind) => {
      inp.addEventListener('change', function () {
        inp.checked ? applyInputFilter(inp, ind, inputs) : resetInputFilter(inp, ind, inputs);
      });
    }, { once: true });
  });

}(movies));

function applyInputFilter(inp, ind, inputs) {
  inputs.forEach((inp_dis, i) => {
    if (i !== ind) {
      inp_dis.disabled = true;
      inp_dis.style.cursor = 'auto';
      inp_dis.nextElementSibling.style.backgroundColor = '#e14234';
      inp_dis.title = 'Можно применить только один фильтр';
    }
  });
  const test = document.querySelectorAll('.filter_films_container input:checked');
  let test2 = {};
  Array.from(test).forEach((t) => {
    test2[t.name] = t.value;
  });
  createAfishaMovies({ obj: test2 });
}

function resetInputFilter(inp, ind, inputs) {
  inputs.forEach((inp_dis) => {
    inp_dis.disabled = false;
    inp_dis.style.cursor = 'pointer';
    inp_dis.nextElementSibling.style.backgroundColor = '';
    inp_dis.title = 'Нажмите для применения фильтра';
  }
  );
  const test = document.querySelectorAll('.filter_films_container input:checked');
  let test2 = {};
  Array.from(test).forEach((t, i) => {
    test2[t.name] = t.value;
  });
  createAfishaMovies({ obj: test2 });
}


function createPlaces(hall, ind) {
  const hall_reserv = hall.reserv;
  const buy_form_get_place = document.querySelector('.buy_form_get_place');
  const table = document.createElement('table');
  table.setAttribute('data-hall', ind.toString());
  table.setAttribute('data-movie', hall.movie);
  table.setAttribute('data-day', hall.datetime.substring(0, 10));
  table.setAttribute('data-time', hall.datetime.substring(11, 16));
  if (ind > 0) {
    let tbody = document.createElement('tbody');
    for (let trs = 0; trs < hall_reserv.length; trs++) {
      let tr = document.createElement('tr');
      for (let tds = 0; tds < hall_reserv[trs].length; tds++) {
        let td = document.createElement('td');
        if (!hall_reserv[trs][tds]) {
          let input = document.createElement('input');
          let span = document.createElement('span');
          input.type = 'checkbox';
          input.setAttribute('data-place', `${tds + 1}`);
          input.setAttribute('data-row', `${trs + 1}`);
          input.setAttribute('data-price', `${hall.price}`);
          td.title = `Ряд: ${trs + 1} Место: ${tds + 1}`;
          td.append(input, span);
        }
        tr.append(td);
      }
      tbody.append(tr);
    }
    table.append(tbody);
  } else {
    for (let tbodyes = 0; tbodyes < hall_reserv.length; tbodyes++) {
      let tbody_new = document.createElement('tbody');
      tbody_new.classList.add('buy_form_get_place_tbody');
      for (let trs = 0; trs < hall_reserv[tbodyes].length; trs++) {
        let tr = document.createElement('tr');
        let tds_all = hall_reserv[tbodyes][trs];
        for (let tds = 0; tds < tds_all.length; tds++) {
          let td = document.createElement('td');
          if (!tds_all[tds]) {
            td.title = `Ряд: ${trs + 1 + tbodyes + tbodyes} Место: ${tds + 1}`;
            let input = document.createElement('input');
            input.setAttribute('data-place', `${tds + 1}`);
            input.setAttribute('data-row', `${trs + 1 + tbodyes + tbodyes}`);
            input.setAttribute('data-price', `${hall.price}`);
            let span = document.createElement('span');
            input.type = 'checkbox';
            td.append(input, span);
          }
          tr.append(td);
        }
        tbody_new.append(tr);
      }
      table.append(tbody_new);
    }
  }

  buy_form_get_place.append(table);
  addSumToBuyForm(table);
  /*   const free_places = document.querySelectorAll('.buy_form_get > .buy_form_get_place >table td > input[type="checkbox"]');
    addSumToBuyForm(buy_form_get_place, free_places); */
}


//НАЧАЛО

function openBuyForm({ name, date, time, hall_ind }) {
  const buy_form_big_container = document.querySelector('.buy_form_big_container');
  const buy_form_close = document.querySelector('.buy_form_close');
  const form = document.querySelector('.buy_form');
  const movie_name = form.querySelector('.buy_form_choiсe_filter_name span');
  const movie_time = form.querySelector('.buy_form_choiсe_filter_time span');
  const buy_form_btn = form.querySelector('.buy_form_btn');
  const phone = form.querySelector('.phone');
  const email = form.querySelector('.email');
  const buy_form_choiсe_error = document.querySelector('.buy_form_choiсe_error');
  let buy_form_choiсe_filter_time_add = document.querySelector('.buy_form_choiсe_filter_time_add');
  let buy_form_choiсe_filter_hall_add = document.querySelector('.buy_form_choiсe_filter_hall_add');
  let buy_form_get_place = document.querySelector('.buy_form_get_place');

  buy_form_big_container.classList.remove('unblock');
  document.body.style.overflowY = 'hidden';
  movie_name.innerText = name;
  date && time ? movie_time.innerText = date + ' ' + time : movie_time.innerText = '';

  buy_form_close.addEventListener('click', function (e) {
    e.preventDefault();
    closeFunc();
  }, { once: true });

  function closeFunc() {
    const buy_form_errors = document.querySelectorAll('.buy_form_get_contacts>div>div');
    if (buy_form_errors) {
      buy_form_errors.forEach(el => {
        if (el.lastElementChild.tagName === 'P') { el.removeChild(el.lastElementChild) };
      })
    }
    buy_form_big_container.classList.add('unblock');
    document.body.style.overflowY = 'scroll';
    buy_form_choiсe_filter_time_add = document.querySelector('.buy_form_choiсe_filter_time_add');
    buy_form_choiсe_filter_hall_add = document.querySelector('.buy_form_choiсe_filter_hall_add');
    buy_form_get_place = document.querySelector('.buy_form_get_place');
    if (buy_form_choiсe_filter_time_add) { buy_form_choiсe_filter_time_add.parentElement.removeChild(buy_form_choiсe_filter_time_add) };
    if (buy_form_choiсe_filter_hall_add) { buy_form_choiсe_filter_hall_add.parentElement.removeChild(buy_form_choiсe_filter_hall_add) };
    if (buy_form_get_place) { buy_form_get_place.parentElement.removeChild(buy_form_get_place) };
    removeTextSale();
    form.reset();
  }

  if (name && !date && !time && !hall_ind) {
    const movie_list = Array.from(getMovieList(movies)).map(el => el.toLowerCase());
    const ind = movie_list.indexOf(name.toLowerCase());
    if (!movie_time.parentElement.classList.contains('unblock')) {
      movie_time.parentElement.classList.add('unblock');
    }

    !buy_form_choiсe_filter_time_add ? movie_name.parentElement.parentElement.append(createFormDateTimeChoice(ind)) : buy_form_choiсe_filter_time_add.parentElement.replaceChild(createFormDateTimeChoice(ind), buy_form_choiсe_filter_time_add);

    //Календарь
    const select_month_in_form = form.querySelector('#buy_form_select_month');
    let input_in_form = document.querySelector('.buy_form input[type="date"]');
    let select_time_in_form = document.querySelector('#buy_form_select_time');


    select_month_in_form.addEventListener('change', function (e) {
      e.preventDefault();
      const datalist_in_form = form.querySelector('datalist');
      if (input_in_form.hasAttribute('disabled')) {
        input_in_form.removeAttribute('disabled');
      }
      if (!datalist_in_form) {
        input_in_form.parentElement.append(createDaysListOnCalendarStandart(select_month_in_form[select_month_in_form.selectedIndex].value, ind, input_in_form));
      } else {
        input_in_form.parentElement.replaceChild(createDaysListOnCalendarStandart(select_month_in_form[select_month_in_form.selectedIndex].value, ind, input_in_form), datalist_in_form);
      }
    })

    input_in_form.addEventListener('change', function () {
      removeTextSale();
      buy_form_get_place = document.querySelector('.buy_form_get_place');
      buy_form_choiсe_filter_hall_add = document.querySelector('.buy_form_choiсe_filter_hall_add');
      if (buy_form_get_place) { buy_form_get_place.parentElement.removeChild(buy_form_get_place) };
      if (buy_form_choiсe_filter_hall_add) { buy_form_choiсe_filter_hall_add.parentElement.removeChild(buy_form_choiсe_filter_hall_add) };
      let options = createTimeListOnCalendarStandart(this.value, ind);
      if (options) {

        if (select_time_in_form.hasAttribute('disabled')) { select_time_in_form.removeAttribute('disabled') };
        if (select_time_in_form.children.length < 2) {
          select_time_in_form.append(...options);
        } else {
          const select_time_temp = select_time_in_form.firstChild;
          select_time_temp.selected = true;
          Array.from(select_time_in_form.children).forEach(el => el.parentElement.removeChild(el));
          select_time_in_form.append(select_time_temp, ...options);
        }
        input_in_form = document.querySelector('.buy_form input[type="date"]');
        select_time_in_form = document.querySelector('#buy_form_select_time');

      } else {
        const select_time_temp = select_time_in_form.firstChild;
        Array.from(select_time_in_form.children).forEach(el => el.parentElement.removeChild(el));
        select_time_in_form.append(select_time_temp);
        select_time_temp.selected = true;
        select_time_in_form.disabled = true;
        returnErrorText(buy_form_choiсe_error, "Выбирайте дату из предложенного списка!", 10000);
        /*         select_time_in_form = document.querySelector('#buy_form_select_time'); */
      }

    });

    select_time_in_form.addEventListener('change', function (e) {
      e.preventDefault();
      removeTextSale();
      let future_schema_obj = getHallsListOnCalendarStandart(input_in_form.value, select_time_in_form.value, ind);
      const buy_form_get = document.querySelector('.buy_form_get');
      const buy_form_choiсe_list = document.querySelector('.buy_form_choiсe_list');
      const buy_form_get_place = document.querySelector('.buy_form_get_place');
      const buy_form_choiсe_filter_hall_add = document.querySelector('.buy_form_choiсe_filter_hall_add');

      if (buy_form_get_place) {
        buy_form_get_place.parentElement.removeChild(buy_form_get_place);
      }
      if (buy_form_choiсe_filter_hall_add) {
        buy_form_choiсe_filter_hall_add.parentElement.removeChild(buy_form_choiсe_filter_hall_add);
      }

      if (Object.keys(future_schema_obj).length == 1) {
        const new_buy_form_get_fieldset = document.createElement('fieldset');
        new_buy_form_get_fieldset.classList.add('buy_form_get_place');
        new_buy_form_get_fieldset.innerHTML = '<legend>Выберите место<span>*</span></legend>';
        buy_form_get.append(new_buy_form_get_fieldset);
        createPlaces(Object.values(future_schema_obj)[0], Object.keys(future_schema_obj)[0]);

      } else {
        const new_f = document.createElement('fieldset');
        new_f.classList.add('buy_form_choiсe_filter_hall_add');
        new_f.innerHTML = '<legend>Выберите зал для просмотра<span>*</span></legend>';
        new_f.append(createCheckBoxesMenu(buy_form_choiсe_list.className + '_hall', ['send_ticket_type', 'gorizontal', 'checkbox_style'], ["Зал"], Object.keys(future_schema_obj)));
        buy_form_choiсe_list.insertAdjacentElement('afterend', new_f);

        const select_halls = new_f.querySelectorAll('input[type="checkbox"]');
        select_halls.forEach((checkbox, checkbox_ind) => {
          checkbox.addEventListener('click', function () {
            select_halls.forEach((block, block_ind) => {
              block.disabled = checkbox.checked && checkbox_ind !== block_ind;
              if (block.disabled) {
                block.nextElementSibling.style.backgroundColor = '#e14234';
                block.style.cursor = 'auto';
                block.title = 'Можно выбрать один зал';
              } else if (block.checked) {
                block.title = 'Нажмите, чтобы изменить выбор';
                block.nextElementSibling.style.backgroundColor = '#484079';
                block.style.cursor = 'pointer';
              } else {
                block.nextElementSibling.style.backgroundColor = 'white';
                block.style.cursor = 'pointer';
                block.title = 'Нажмите для применения фильтра';
              }
            });

            if (checkbox.checked) {
              const new_buy_form_get_fieldset = document.createElement('fieldset');
              new_buy_form_get_fieldset.classList.add('buy_form_get_place');
              new_buy_form_get_fieldset.innerHTML = '<legend>Выберите место<span>*</span></legend>';
              buy_form_get.append(new_buy_form_get_fieldset);
              createPlaces(future_schema_obj[checkbox.value], +checkbox.value);
            } else {
              const buy_form_get_fieldset = buy_form_get.querySelector('.buy_form_get_place');
              if (buy_form_get_fieldset) {
                buy_form_get.removeChild(buy_form_get_fieldset);
                removeTextSale();
              }
            }
          });
        });
      }
    });

  } else if (name && date && time && hall_ind) {
    if (movie_time.parentElement.classList.contains('unblock')) {
      movie_time.parentElement.classList.remove('unblock');
    }
    const hall = halls[hall_ind].filter(el => el.movie === name && el.datetime === date + ' ' + time);
    if (hall && hall.length == 1) {
      const buy_form_get = document.querySelector('.buy_form_get');
      const new_buy_form_get_fieldset = document.createElement('fieldset');
      new_buy_form_get_fieldset.classList.add('buy_form_get_place');
      new_buy_form_get_fieldset.innerHTML = '<legend>Выберите место<span>*</span></legend>';
      !buy_form_get_place ? buy_form_get.append(new_buy_form_get_fieldset) : buy_form_get_place.replaceChild(new_buy_form_get_fieldset, buy_form_get_place);
      createPlaces(hall[0], +hall_ind);
    } else {
      closeFunc();
    }
  }
  //ПОЧТИ КОНЕЦ
  if (phone) {
    phone.addEventListener('input', (e) => {
      e.preventDefault();
      validatePhoneNums(phone);
    })
    phone.addEventListener('change', (e) => {
      e.preventDefault();
      validatePhoneLength(phone);
    })
  }

  if (email) {
    email.addEventListener('input', (e) => {
      e.preventDefault();
      spaceInputCheck(email);
    })
    email.addEventListener('change', (e) => {
      e.preventDefault();
      validateEmailLength(email);
    })
  }

  buy_form_btn.addEventListener('click', function func() {
    const table = form.querySelector('.buy_form_get_place>table');
    let inputs = null;
    if (table) {
      inputs = table.querySelectorAll('input:checked');
    }
    if (!inputs || !table || inputs.length == 0) {
      returnErrorText(buy_form_choiсe_error, "Выберите места для покупки", 5000);
    }

    if (email.value.trim().length == 0 || phone.value.trim().length == 0) {
      if (email.value.trim().length == 0) {
        postAHint(email, `Заполните поле`);
      }
      if (phone.value.trim().length == 0) {
        postAHint(phone, `Заполните поле`);
      }
    }

    if (table && inputs.length > 0 && validateEmailLength(email) && validatePhoneLength(phone)) {

      for (let key in users) {
        if (users[key].email == email.value.trim().toLowerCase()
          && users[key].phone == phone.value.substring(0, 2) + phone.value.substring(3, 6) + phone.value.substring(7, 10) + phone.value.substring(11, 13) + phone.value.substring(14)
        ) {
          users[key].tickets.push({
            'movie_name': `${table.dataset.movie}`,
            'movie_day': `${table.dataset.day}`,
            'movie_time': `${table.dataset.time}`,
            'movie_hall': `${+table.dataset.hall + 1}`,
            'movie_row': [...inputs].map(el => el.dataset.row),
            'movie_place': [...inputs].map(el => el.dataset.place),
          });
        }
      }
      console.log(users);
      chamgeReserv(table, inputs);
      closeFunc();
      openAfterBuyTicketPage(table, inputs);
      this.removeEventListener('click', func);
    }
  })
};

//КОНЕЦ

function chamgeReserv(table, inputs) {
  inputs = Array.from(inputs);
  let need_reserv = halls[+table.dataset.hall].filter(el => {
    if (el.movie == table.dataset.movie && el.datetime == (table.dataset.day + ' ' + table.dataset.time)) { return el; }
  });
  const hall_reserv = need_reserv[0].reserv;
  if (+table.dataset.hall > 0) {
    for (let i = 0; i < hall_reserv.length; i++) {
      for (let j = 0; j < hall_reserv[i].length; j++) {
        for (let inp = 0; inp < inputs.length; inp++) {
          if (+inputs[inp].dataset.row - 1 == i && +inputs[inp].dataset.place - 1 == j) {
            hall_reserv[i][j] = true;
            continue;
          }
        }
      }
    }
  } else {
    for (let arr = 0; arr < hall_reserv.length; arr++) {
      let val = hall_reserv[arr];
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < val[i].length; j++) {
          for (let inp = 0; inp < inputs.length; inp++) {
            if (+inputs[inp].dataset.row - 1 - arr - arr == i && +inputs[inp].dataset.place - 1 == j) {
              hall_reserv[arr][i][j] = true;
              continue;
            }
          }
        }
      }
    }
  }
}

function createDaysListOnCalendarStandart(month, ind, select) {
  let upcoming_shows = getMovieDates(movies[ind].name);
  upcoming_shows = upcoming_shows.filter(m => m.substring(3, 5) === month);
  upcoming_shows = Array.from(new Set(upcoming_shows.map(m => m = m.substring(6, 10) + '-' + m.substring(3, 5) + '-' + m.substring(0, 2))));

  const date_list = document.createElement('datalist');
  date_list.setAttribute('id', `${select.getAttribute('list')}`);
  upcoming_shows.forEach(el => {
    const option = document.createElement('option');
    option.value = el;
    date_list.append(option);
  });
  return date_list;
}

function createTimeListOnCalendarStandart(text_data, movie_ind) {
  const normalize_data = text_data.split('-').reverse().join('.');
  let arr = [];
  halls.forEach((hall) => hall.forEach(el => {
    if (el.datetime.substring(0, 10) === normalize_data && el.movie === movies[movie_ind].name) {
      arr.push(el.datetime.substring(11) + ' - ' + el.price + ' рублей');
    }
  }));
  arr = Array.from(new Set(arr));

  let res = [];
  arr.forEach(el => {
    const option = document.createElement('option');
    option.innerText = el;
    option.value = el.substring(0, 5);
    res.push(option);
  })

  if (res.length > 0) {
    return res;
  } else {
    return false;
  }
}

function getHallsListOnCalendarStandart(text_data, time, movie_ind) {
  const normalize_data = text_data.split('-').reverse().join('.') + ' ' + time;
  let obj = {};
  halls.forEach((hall, hall_ind) => hall.forEach((el, el_ind) => {
    if (el.datetime.substring(0) === normalize_data && el.movie === movies[movie_ind].name) {
      obj[hall_ind] = el;
      //тест два на одно время
      //obj[hall_ind + 1] = el;
    }
  }));

  if (Object.keys(obj).length > 0) {
    return obj;
  } else {
    return false;
  }
}

function createCheckBoxesMenu(name, classes, list_text, list_val) {

  const ul = document.createElement('ul');
  ul.classList.add(...classes);
  for (let i = 0; i < list_val.length; i++) {
    const li = document.createElement('li');
    const span1 = document.createElement('span');
    const span2 = span1.cloneNode(false);
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.title = 'Нажмите для применения фильтра';
    input.type = 'checkbox';
    input.name = `${name}`;
    input.value = `${list_val[i]}`;
    label.innerText = `${list_text[i] || list_text[0]} ${(+list_val[i]) + 1}`;
    span1.append(input, span2);
    li.append(label, span1);
    ul.append(li);
  }
  return ul;
}

function addSumToBuyForm(table) {
  const buy_form_get_place_checked = document.querySelector('.buy_form_get_place_checked');
  const total_price = document.querySelector('.total_price span');
  table.addEventListener('click', function (e) {
    if (e.target.tagName === "INPUT") {
      let input = e.target;
      let count = document.querySelectorAll('.buy_form_get_place_checked ul');
      if (input.checked === true) {
        const ul = document.createElement('ul');
        ul.className = `${input.dataset.row}-${input.dataset.place}`;
        ul.append(...createListAboutPlace(input, table));
        buy_form_get_place_checked.append(ul);
        count = document.querySelectorAll('.buy_form_get_place_checked ul');
        if (Array.from(count).length < 3) {
          total_price.textContent = (+total_price.textContent || 0) + +input.dataset.price;
        } else {
          total_price.textContent = Math.round(Array.from(count).length * +input.dataset.price * 0.7);
          if (!total_price.classList.contains('total_price_sale')) {
            total_price.classList.add('total_price_sale');
          }
        };
      }
      if (input.checked === false) {
        const buy_form_get_place_checked_uls = document.querySelectorAll('.buy_form_get_place_checked ul');
        buy_form_get_place_checked_uls.forEach(el => {
          if (el.className === `${input.dataset.row}-${input.dataset.place}`) {
            el.remove();
            count = document.querySelectorAll('.buy_form_get_place_checked ul');
            if (Array.from(count).length < 3) {
              total_price.textContent = Math.round(Array.from(count).length) * +input.dataset.price || 0;
              if (total_price.classList.contains('total_price_sale')) {
                total_price.classList.remove('total_price_sale');
              }
            } else {
              total_price.textContent = Math.round((Array.from(count).length) * +input.dataset.price * 0.7);
            }
          }
        });

      }
    }
  })

  /*   free_places.forEach(input => input.addEventListener('click', function () {
      let count =  document.querySelectorAll('.buy_form_get_place_checked ul');
      if(input.checked === true) {
        const ul = document.createElement('ul');
        ul.className=`${input.dataset.row}-${input.dataset.place}`;
        ul.append(...createListAboutPlace(input, table));
        buy_form_get_place_checked.append(ul);
        count =  document.querySelectorAll('.buy_form_get_place_checked ul');
        if(Array.from(count).length < 3 ) {
          total_price.textContent = (+total_price.textContent || 0) + +input.dataset.price;
        } else {
          total_price.textContent = Math.round(Array.from(count).length * +input.dataset.price * 0.7);
          if(!total_price.classList.contains('total_price_sale')) {
            total_price.classList.add('total_price_sale');
          }
        };
      }
      if(input.checked === false) {
        const buy_form_get_place_checked_uls = document.querySelectorAll('.buy_form_get_place_checked ul');
        buy_form_get_place_checked_uls.forEach(el => {
          if(el.className === `${input.dataset.row}-${input.dataset.place}`) {
            el.remove();
            count =  document.querySelectorAll('.buy_form_get_place_checked ul');
            if(Array.from(count).length < 3 ) {
              total_price.textContent = Math.round(Array.from(count).length) * +input.dataset.price || 0;
              if(total_price.classList.contains('total_price_sale')) {
                total_price.classList.remove('total_price_sale');
              }
            } else {
              total_price.textContent = Math.round((Array.from(count).length) * +input.dataset.price * 0.7);
            }
          }
        });
  
      }
    }))
   */

}

function createListAboutPlace(input, table) {
  let li1 = document.createElement('li');
  let span1 = document.createElement('span');
  li1.innerText = `Дата: `;
  span1.innerText = table.dataset.day;
  li1.append(span1);

  let li2 = document.createElement('li');
  let span2 = document.createElement('span');
  li2.innerText = `Время: `;
  span2.innerText = table.dataset.time;
  li2.append(span2);

  let li3 = document.createElement('li');
  let span3 = document.createElement('span');
  li3.innerText = `Ряд: `;
  span3.innerText = input.dataset.row;
  li3.append(span3);

  let li4 = document.createElement('li');
  let span4 = document.createElement('span');
  li4.innerText = `Место: `;
  span4.innerText = input.dataset.place;
  li4.append(span4);

  let li5 = document.createElement('li');
  let span5 = document.createElement('span');
  li5.innerText = `Цена: `;
  span5.innerText = input.dataset.price;
  li5.append(span5);
  return [li1, li2, li3, li4, li5];
}

function removeTextSale() {
  const buy_form_get_place = document.querySelector('.buy_form_get_place');
  const buy_form_get_place_checked_uls = document.querySelectorAll('.buy_form_get_place_checked ul');
  const total_price = document.querySelector('.total_price span');
  if (buy_form_get_place_checked_uls) { buy_form_get_place_checked_uls.forEach(el => el.remove()) };
  if (total_price.classList.contains('total_price_sale')) { total_price.classList.remove('total_price_sale') };
  if (total_price) { total_price.textContent = '0' };
}

function validatePhoneNums(input) {
  const start_phone = '+7';
  let value = input.value.trim();

  if (!value.startsWith(start_phone)) {
    value = start_phone + '()';
  }

  let after_start_phone_nums = value.substring(3);

  if (after_start_phone_nums[0] === '0') {
    value = start_phone + '()';
  } else {
    let res = [];
    for (let i = 0; i < after_start_phone_nums.length; i++) {
      if (all_nums.includes(after_start_phone_nums[i])) {
        res.push(after_start_phone_nums[i]);
      }
    }

    let formatted = start_phone;

    if (res.length > 0) {
      formatted += '(' + res.slice(0, 3).join('') + ')';
    } else {
      formatted += '()';
    }

    if (res.length > 3) {
      formatted += res.slice(3, 6).join('');
    }

    if (res.length > 6) {
      formatted += '-' + res.slice(6, 8).join('');
    }

    if (res.length > 8) {
      formatted += '-' + res.slice(8, 10).join('');
    }

    value = formatted;
  }

  input.value = value;
}

function validatePhoneLength(input) {
  let arr_nums = Array.from(input.value).filter(el => all_nums.includes(el));
  if (arr_nums.length < 11) {
    return postAHint(input, "Номер телефона должен содержать 11 цифр");
  }
  if (input.value.includes(' ')) {
    return postAHint(input, "Пробелы не допускаются");
  }
  return true;
}

function returnErrorText(parent, text, time) {
  const parent_start_text = parent.textContent;
  parent.textContent = text;
  setTimeout(function () {
    text === parent_start_text ? parent.textContent = "" : parent.textContent = parent_start_text;
  }, time);
}

function spaceInputCheck(input) {
  if (input.value.indexOf(' ') != -1) { input.value = input.value.split(' ').join('') };
}

function validateEmailLength(input) {
  if (input.value.length < 6) {
    return postAHint(input, "Не менее 6 символов");
  }

  if (input.value.length > 30) {
    input.value = input.value.substring(0, 30);
    return postAHint(input, "Допускается 30 символов к вводу");
  };

  if (input.value.includes(' ')) {
    return postAHint(input, "Пробелы не допускаются");
  }

  if (!abc.includes(input.value[input.value.length - 1]) && !ABC.includes(input.value[input.value.length - 1])
    && !rus_abc.includes(input.value[input.value.length - 1]) && !RUS_ABC.includes(input.value[input.value.length - 1]) && !all_nums.includes(input.value[input.value.length - 1])) {
    return postAHint(input, "Доменная зона не может заканчиваться на символ");
  }

  let temp = input.value.split('@');

  if (temp.length != 2) {
    return postAHint(input, "Поле почты должно содержать @");
  }


  let check_temp_rus = temp[0].split('').some(el => {
    if (rus_abc.includes(el) || RUS_ABC.includes(el)) {
      return true;
    }
  })

  if (check_temp_rus) {
    return postAHint(input, "Имя почты не должно содержать кириллицу");
  }


  let domain = input.value.substring(input.value.lastIndexOf('@') + 1);
  let check_ru = [...domain].every(el => rus_abc.includes(el) || RUS_ABC.includes(el) || all_nums.includes(el) || '._-'.includes(el));
  let check_en = [...domain].every(el => abc.includes(el) || ABC.includes(el) || all_nums.includes(el) || '._-'.includes(el));

  if (!check_en && !check_ru) {
    return postAHint(input, "В доменной зоне должен быть один алфавит");
  }


  if (!rus_abc.includes(domain[0]) && !RUS_ABC.includes(domain[0]) && !abc.includes(domain[0]) && !ABC.includes(domain[0]) && !all_nums.includes(domain[0])) {
    return postAHint(input, "За знаком @ только буквенно-числовые символы");
  }


  if (!domain.includes('.')) {
    return postAHint(input, "Доменная зона должна разделяться точкой");
  }

  let domain_zone = domain.substring(domain.lastIndexOf('.') + 1);
  if (domain_zone.length < 2) {
    return postAHint(input, "Доменная зона должна содержать два символа и больше");
  }

  return true;

};

function createFormDateTimeChoice(ind) {
  const fieldset = document.createElement('fieldset');
  fieldset.innerHTML = '<legend>Выберите время сеанса<span>*</span></legend>';
  fieldset.classList.add('buy_form_choiсe_filter_time_add');
  const uniq_months = Array.from(new Set(getMovieDates(movies[ind].name).map(el => el.substring(3, 5))));
  const uniq_months_ind = uniq_months.map(el => +el - 1);
  const select_month = document.createElement('select');
  const select_month_option_title = document.createElement('option');
  select_month.setAttribute('name', 'buy_form_select_month');
  select_month.setAttribute('id', 'buy_form_select_month');
  select_month_option_title.value = 'default';
  select_month_option_title.innerText = 'Месяц';
  const select_time = document.createElement('select');
  const select_time_option_title = document.createElement('option');
  select_time.setAttribute('name', 'buy_form_select_time');
  select_time.setAttribute('id', 'buy_form_select_time');
  select_time_option_title.value = 'default';
  select_time_option_title.innerText = 'Время';
  select_time.disabled = true;
  select_month_option_title.selected = true;
  select_month_option_title.disabled = true;
  select_time_option_title.selected = true;
  select_time_option_title.disabled = true;

  select_month.append(select_month_option_title);
  select_time.append(select_time_option_title);

  for (let m = 0, mi = 0; m < uniq_months.length, mi < uniq_months_ind.length; m++, mi++) {
    const option = document.createElement('option');
    option.value = uniq_months[m];
    option.innerText = `${months[uniq_months_ind[mi]]}`;
    select_month.append(option);
  }
  const select_days = document.createElement('input');
  select_days.type = 'date';
  select_days.disabled = true;
  select_days.setAttribute('list', 'days_list');
  fieldset.append(select_month, select_days, select_time);
  return fieldset;
}

function openAfterBuyTicketPage(table, inputs) {
  let ticket_info = document.querySelector('.ticket_info');
  main_container.forEach(el => el.classList.toggle('unblock'));
  window.scrollTo(0, 0);
  if (inputs.length > 1) {
    const ticket_back = document.querySelector('.ticket_back');
    inputs.forEach((el, ind) => {
      if (ind > 0) {
        let ticket_additional = ticket_info.cloneNode(true);
        ticket_back.before(ticket_additional);
      }
    }
    );
  }
  ticket_info = document.querySelectorAll('.ticket_info');
  for (let i = 0; i < ticket_info.length; i++) {
    const arr = [table.dataset.movie, table.dataset.day, table.dataset.time, +table.dataset.hall + 1, inputs[i].dataset.row, inputs[i].dataset.place];
    const ticket_additional_info_list = ticket_info[i].querySelectorAll('ul>li:nth-child(n+2)>span');
    const movie_img_container = ticket_info[i].querySelector('.movie_img_container>div');
    const movie_path = movies.filter(el => {
      if (el.name.trim().toLowerCase() == table.dataset.movie.trim().toLowerCase()) {
        return el;
      }
    });
    movie_img_container.style.backgroundImage = `url(${movie_path[0].path})`;
    for (let j = 0; j < ticket_additional_info_list.length; j++) {
      ticket_additional_info_list[j].innerText = arr[j];
    }
  }
  const btn = document.querySelector('.ticket_back');
  btn.addEventListener('click', function () {
    main_container.forEach(el => el.classList.toggle('unblock'));
    openMainPage();
    window.scrollTo(0, 0);
    if (ticket_info.length > 1) {
      ticket_info.forEach((el, ind) => {
        if (ind >= 1) {
          el.parentElement.removeChild(el);
        }
      })
    }
    /*     const ticket_additional_info_list = ticket_info[0].querySelectorAll('ul>li:nth-child(n+2)>span');
        ticket_additional_info_list.forEach(el=>el.textContent=''); */
  }, { once: true })

}

function validateLoginLength(input) {
  if (input.value.length < 8) {
    return postAHint(input, "Не менее 8 символов");
  }

  if (input.value.length > 20) {
    input.value = input.value.substring(0, 20);
    return postAHint(input, "Допускается 20 символов к вводу");
  };

  if (input.value.includes(' ')) {
    return postAHint(input, "Пробелы не допускаются");
  }

  [...input.value].forEach(el => {
    if (!abc.includes(el) && !ABC.includes(el) && !all_nums.includes(el) && !symbols.includes(el)) {
      return postAHint(input, `Логин должен состоять из латинских символов, цифр или ${symbols}`);
    }
  })
  return true;
}

function validatePasswordLength(input) {
  if (input.value.length < 10) {
    return postAHint(input, "Не менее 10 символов");
  }

  if (input.value.length > 30) {
    input.value = input.value.substring(0, 30);
    return postAHint(input, "Допускается 30 символов к вводу");
  };

  if (input.value.includes(' ')) {
    return postAHint(input, "Пробелы не допускаются");
  }

  [...input.value].forEach(el => {
    if (!abc.includes(el) && !ABC.includes(el) && !all_nums.includes(el) && !symbols.includes(el)) {
      return postAHint(input, `Пароль должен состоять из латинских символов, цифр или ${symbols}`);
    }
  })

  let temp_abc = [...input.value].every(el => abc.includes(el));
  let temp_ABC = [...input.value].every(el => ABC.includes(el));
  let temp_nums = [...input.value].every(el => all_nums.includes(el));
  let temp_symbols = [...input.value].every(el => symbols.includes(el));

  if (temp_abc || temp_ABC || temp_nums || temp_symbols) {
    return postAHint(input, `Пароль должен состоять из различного типа символов`);
  }

  return true;
}


/* function validatePasswordLength(input){} */
