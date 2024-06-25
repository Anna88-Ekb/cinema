'use strict'
const movies = [
  {
    'name': 'Бэтмен', 'path': 'images/movies/betmen.png',
    'descr': 'После двух лет поисков правосудия на улицах Готэма Бэтмен становится для горожан олицетворением беспощадного возмездия. Когда в городе происходит серия жестоких нападений на высокопоставленных чиновников, улики приводят Брюса Уэйна в самые тёмные закоулки преступного мира, где он встречает Женщину-Кошку, Пингвина, Кармайна Фальконе и Загадочника. Теперь под прицелом оказывается сам Бэтмен, которому предстоит отличить друга от врага и восстановить справедливость во имя Готэма.',
    'country': 'США', 'age': '16+', 'duration': '118 мин.', 'type': 'Фильм', 'basic_price': 400, 'morning_discount': 0.7, 'rise': 1.1
  },
  {
    'name': 'Человек-паук', 'path': 'images/movies/spiderman.png',
    'descr': 'Питер Паркер – обыкновенный школьник. Однажды он отправился с классом на экскурсию, где его кусает странный паук-мутант. Через время парень почувствовал в себе нечеловеческую силу и ловкость в движении, а главное – умение лазать по стенам и метать стальную паутину. Свои способности он направляет на защиту слабых. Так Питер становится настоящим супергероем по имени Человек-паук, который помогает людям и борется с преступностью. Но там, где есть супергерой, рано или поздно всегда объявляется и суперзлодей...',
    'country': 'США', 'age': '12+', 'duration': '121 мин.', 'type': 'Фильм', 'basic_price': 500, 'morning_discount': 0.9, 'rise': 1.5
  },
  {
    'name': 'Марио', 'path': 'images/movies/mario.png',
    'descr': 'Братья-водопроводчики Марио и Луиджи открывают портал в подземный город, из которого должны вызволить пленённую принцессу Пич и сразиться с заклятым врагом Боузером.',
    'country': 'США, Япония', 'age': '', 'duration': '92 мин.', 'type': 'Мультфильм', 'basic_price': 450, 'morning_discount': 0.75, 'rise': 1.1
  },
  {
    'name': 'Капитан Марвел', 'path': 'images/movies/woman.png',
    'descr': 'После столкновения с враждующими инопланетными расами пилот военно-воздушных сил Кэрол Дэнверс обретает суперсилу и становится неуязвимой. Ей предстоит совладать со своими новыми способностями, чтобы противостоять могущественному врагу.',
    'country': 'США, Австралия', 'age': '18+', 'duration': '123 мин.', 'type': 'Фильм', 'basic_price': 390, 'morning_discount': 0.7, 'rise': 1.3
  },
  {
    'name': 'Джокер', 'path': 'images/movies/joker.png',
    'descr': 'Готэм, начало 1980-х годов. Комик Артур Флек живет с больной матерью, которая с детства учит его «ходить с улыбкой». Пытаясь нести в мир хорошее и дарить людям радость, Артур сталкивается с человеческой жестокостью и постепенно приходит к выводу, что этот мир получит от него не добрую улыбку, а ухмылку злодея Джокера.',
    'country': 'США, Канада', 'age': '18+', 'duration': '122 мин.', 'type': 'Фильм', 'basic_price': 500, 'morning_discount': 0.9, 'rise': 1.8
  },
  {
    'name': 'Властелин Колец 2', 'path': 'images/movies/rings.png',
    'descr': 'Повелитель сил тьмы Саурон направляет свою бесчисленную армию под стены Минас-Тирита, крепости Последней Надежды. Он предвкушает близкую победу, но именно это мешает ему заметить две крохотные фигурки — хоббитов, приближающихся к Роковой Горе, где им предстоит уничтожить Кольцо Всевластья.',
    'country': 'Новая Зеландия, США', 'age': '12+', 'duration': '201 мин.', 'type': 'Фильм', 'basic_price': 300, 'morning_discount': 0.7, 'rise': 1.1
  },
  {
    'name': 'Шрек Навсегда', 'path': 'images/movies/shrek.png',
    'descr': 'Под грузом воспоминаний о днях, когда он чувствовал себя «настоящим огром», Шрэк поддается на уговоры сладкоголосого Румпельштильцхена и заключает с ним договор. Сразу после этого Шрэк оказывается в альтернативной реальности Тридевятого королевства, где все поставлено с ног на голову: на огров здесь охотятся, Румпельштильцхен восседает на троне, а Шрэк и Фиона даже не знакомы. ',
    'country': 'США', 'age': '18+', 'duration': '90 мин.', 'type': 'Мультфильм', 'basic_price': 400, 'morning_discount': 0.6, 'rise': 1.9
  },
  {
    'name': 'Черепашки-ниндзя', 'path': 'images/movies/turtles.png',
    'descr': 'Четверо братьев-черепах, всю жизнь скрывавшихся от мира людей в канализациях Нью-Йорка и обучавшихся ниндзюцу, отправляются на поверхность и пытаются жить как нормальные подростки. С помощью своей новой подруги Эйприл О’Нил они выходят на след печально известного преступного синдиката и армии мутантов.',
    'country': 'США', 'age': '13+', 'duration': '99 мин.', 'type': 'Мультфильм', 'basic_price': 400, 'morning_discount': 0.6, 'rise': 1.3
  },
  {
    'name': 'Укрытие', 'path': 'images/movies/ukrytie-silo.png',
    'descr': 'Измученный апокалиптическими видениями мужчина пытается понять, защищать ему свою семью от приближающегося шторма или от самого себя.',
    'country': 'США', 'age': '18+', 'duration': '121 мин.', 'type': 'Фильм', 'basic_price': 300, 'morning_discount': 0.95, 'rise': 1
  },
  {
    'name': 'Человек на Луне', 'path': 'images/movies/vkosmose.png',
    'descr': 'История одной из важнейших космических миссий ХХ века – высадки человека на Луну, – показанная глазами астронавта Нила Армстронга. Какую цену ему и всей Америке пришлось заплатить за эту экспедицию?',
    'country': 'США', 'age': '18+', 'duration': '140 мин.', 'type': 'Фильм', 'basic_price': 400, 'morning_discount': 0.7, 'rise': 1.2
  },
  {
    'name': 'Русалочка', 'path': 'images/movies/rusalochka.png',
    'descr': 'Русалочку Ариэль, одну из дочерей морского царя Тритона, ужасно интересует человечество. Несмотря на неодобрение отца, она поднимается к поверхности и спасает попавшего в кораблекрушение принца Эрика. Узнав об этом, Тритон приходит в ярость и навсегда запрещает дочери покидать морское дно — этим и решает воспользоваться морская ведьма Урсула. В обмен на голос она даёт Ариэль ноги, но у девушки есть только три дня: если к закату третьего дня она не разделит с Эриком поцелуй настоящей любви, то навсегда попадёт в собственность ведьмы.',
    'country': 'США', 'age': '13+', 'duration': '135 мин.', 'type': 'Фильм', 'basic_price': 500, 'morning_discount': 0.7, 'rise': 1.1
  },
  {
    'name': 'Хищные птицы', 'path': 'images/movies/Suicide_Squad.png',
    'descr': 'Харли Квинн рассталась с Джокером и через некоторое время сообщила об этом всему Готэму, взорвав тот самый химзавод. Девушка больше не тоскует по несостоявшимся отношениям — ей некогда, так как она также потеряла неприкосновенность, и теперь за ней охотятся разной степени криминализованности граждане, желающие отомстить. А в это время ставший крёстным отцом Готема Роман Сайонис очень жаждет вернуть пропавший бриллиант, который стащила у его подручного малолетняя карманница.',
    'country': 'США', 'age': '18+', 'duration': '109 мин.', 'type': 'Фильм', 'basic_price': 400, 'morning_discount': 0.6, 'rise': 1
  },
  {
    'name': 'Аватар: Путь воды', 'path': 'images/movies/avatar.png',
    'descr': 'После принятия образа аватара солдат Джейк Салли становится предводителем народа на\'ви и берет на себя миссию по защите новых друзей от корыстных бизнесменов с Земли. Теперь ему есть за кого бороться — с Джейком его прекрасная возлюбленная Нейтири. Когда на Пандору возвращаются до зубов вооруженные земляне, Джейк готов дать им отпор.',
    'country': 'США', 'age': '13+', 'duration': '192 мин.', 'type': 'Фильм', 'basic_price': 600, 'morning_discount': 0.8, 'rise': 1.6
  },
  {
    'name': 'Пушистые мошенники', 'path': 'images/movies/zveropoi-sing-movie-gitara.png',
    'descr': 'Бельгийский остроумный мультфильм про двух лесных супергероев — бельчонка Тьюма и ежиху Латте. Когда в их родной лес приходит беда и начинается засуха, они вызываются спасти сородичей от верной гибели. Им предстоит совершить опасное путешествие и добыть главный магический артефакт этого мира — бриллиант, который хранит король медведей. Только он может вызвать ливень и помочь животным не умереть от жажды.',
    'country': 'Бельгия', 'age': '6+', 'duration': '81 мин.', 'type': 'Мультфильм', 'basic_price': 400, 'morning_discount': 0.6, 'rise': 1.5
  },
  {
    'name': 'Монстры завоеватели', 'path': 'images/movies/Monsters_Alien.png',
    'descr': 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Проектах семь имеет курсивных сих родного?',
    'country': 'Германия', 'age': '18+', 'duration': '150 мин.', 'type': 'Фильм', 'basic_price': 500, 'morning_discount': 0.7, 'rise': 1.1
  },
  {
    'name': 'Штурмовая винтовка', 'path': 'images/movies/Assault_rifle_Two.png',
    'descr': 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Проектах семь имеет курсивных сих родного?',
    'country': 'США', 'age': '18+', 'duration': '170 мин.', 'type': 'Фильм', 'basic_price': 350, 'morning_discount': 0.7, 'rise': 1.1
  },
  {
    'name': 'Мастер и Маргарита', 'path': 'images/movies/master.png',
    'descr': 'Москва, 1930-е годы. Популярный драматург обвиняется в антисоветчине: спектакль по его пьесе отменяют, а самого его выгоняют из союза литераторов. В не самый лучший момент своей жизни он встречает глубоко несчастную в браке красавицу Маргариту и начинает новый роман, героями которого становятся люди из его окружения, в том числе — мистический персонаж Воланд, списанный со знакомого иностранца.',
    'country': 'Россия', 'age': '18+', 'duration': '157 мин.', 'type': 'Фильм', 'basic_price': 600, 'morning_discount': 0.4, 'rise': 1.3
  },
  {
    'name': 'Сто лет тому вперед', 'path': 'images/movies/100.png',
    'descr': 'Они живут в разных мирах. Коля Герасимов — в сегодняшней Москве, Алиса Селезнева — на сто лет позже. Коля — обычный парень, ему нет дела до будущего. Алису не отпускает прошлое: она пытается найти маму, которую потеряла, когда была совсем ребенком. Встреча Алисы и Коли станет началом невероятных приключений, в которых им предстоит отвоевать у космических пиратов Вселенную, восстановить ход времени и обрести самое дорогое: любовь и дружбу.',
    'country': 'Россия', 'age': '6+', 'duration': '157 мин.', 'type': 'Фильм', 'basic_price': 550, 'morning_discount': 0.9, 'rise': 1.6
  },
  {
    'name': 'Сердитые птички', 'path': 'images/movies/angry-birds.png',
    'descr': 'На тропическом острове, где живут нелетающие птицы, царит атмосфера радости и счастья. Красная птица Ред с самого детства чувствовал себя изгоем, поэтому ничего удивительного, что теперь он не вписывается в окружающую действительность и не разделяет всеобщего оптимизма. Однажды на райский остров прибывают зелёные свиньи, и дружелюбные птицы устраивают им радушный приём, но кроме Реда никто не замечает, что свиньи задумали подлость.',
    'country': 'США', 'age': '6+', 'duration': '97 мин.', 'type': 'Мультфильм', 'basic_price': 300, 'morning_discount': 0.6, 'rise': 1.1
  },
  {
    'name': 'Путешествие медведей', 'path': 'images/movies/Brown_Bears.png',
    'descr': 'Не рыбачьте там, где ловят рыбу медведи. Если вы увидели медведя, а он вас не видит, спокойно уходите. Если медведь вас увидел, но не учуял, обозначьте себя шумом и приготовьте фальшвеер или газовый баллон. Медведи в большинстве своем звери любопытные. Если медведь подошел близко, надо шуметь и изображать свои решительные намерения, но не агрессивность. Никогда не рычать! ',
    'country': 'Россия', 'age': '6+', 'duration': '127 мин.', 'type': 'Фильм', 'basic_price': 300, 'morning_discount': 0.7, 'rise': 1.1
  }
];


const halls = [];


const users = {'admin': {
  'password': '1234',
  'tickets': [],
  'email': 'mars88@mail.ru',
  'phone': '+79028754085',
  'preferred_contcts': {'mail': 'true', 'phone': 'true', 'account': 'true'},
  'pdn': 'true',
  'newsletter': 'true'
}, 
'main': {
  'password': '1234',
  'tickets': [],
  'email': 'anna_sav@mail.ru',
  'phone': '+79028754084',
  'preferred_contcts': {'mail': 'true', 'phone': 'true', 'account': 'true'},
  'pdn': 'true',
  'newsletter': 'true'
}, 

}

function getRandomDatetime() {
  let today = new Date();
  let maxDay = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  let diff = Math.round((maxDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  let random = Math.floor(Math.random() * (diff + 1));
  let newDate = today.getDate() + random;
  let newHour = Math.floor(Math.random() * (22 - 9 + 1) + 9);
  let day_res = new Date(today.getFullYear(), today.getMonth(), newDate, newHour, 0);
  let dayTostr = `${day_res.getDate()}.${day_res.getMonth() + 1}.${day_res.getFullYear()}.${day_res.getHours()}.${day_res.getMinutes()}`;
  let datetime = dayTostr.split('.').map((el) => (el.length < 2 ? '0' + el : el)).join('.');
  datetime = datetime.substring(0, 10) + ' ' + datetime.substring(11).replace('.', ':');
  return datetime;
}

function sortDateStr(arr, key = false) {
  arr.sort((a, b) => {
    let key_a, key_b;
    if (key) {
      key_a = a[key];
      key_b = b[key];
    } else {
      key_a = a;
      key_b = b;
    }
    const monthA = Number(key_a.slice(3, 5));
    const monthB = Number(key_b.slice(3, 5));
    if (monthA === monthB) {
      const dayA = Number(key_a.slice(0, 2));
      const dayB = Number(key_b.slice(0, 2));
      if (dayA === dayB) {
        const hourA = Number(key_a.slice(11, 13));
        const hourB = Number(key_b.slice(11, 13));
        return hourA - hourB;
      }
      return dayA - dayB;
    }
    return monthA - monthB;
  });
  return arr;
}

function createSessionsDatetime(max_count_sessions) {
  let arr = [];
  while (arr.length < max_count_sessions) {
    arr.push(getRandomDatetime());
  }
  return Array.from(new Set(arr));
}

function getRandomMovie() {
  const arr = movies.map(el => el.name);
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomMovieType(type) {
  if (type) {
    const arr = ['2D', '3D'];
    return arr[Math.floor(Math.random() * arr.length)];
  } else {
    return '2D';
  }
}

function addReserveToHalls(max_reserv, month) {
  let today = new Date();
  let purchased_seats = function (thisMonth = today.getMonth(), maxMonth = today.getMonth() + 3) {
    let min = 0, max = 0;
    if (thisMonth === month - 1) { min = Math.ceil(max_reserv * 0.4); max = max_reserv; }
    else if (maxMonth === month - 1) { min = Math.ceil(max_reserv * 0.1); max = Math.ceil(max_reserv * 0.3); }
    else { min = Math.ceil(max_reserv * 0.2); max = Math.ceil(max_reserv * 0.6); };
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  return purchased_seats();
}

function createdHalls({ max_count_sessions = 15, max_reserv = 15, type = false }) {
  const arr = [];
  const created_seanses = createSessionsDatetime(max_count_sessions);
  for (let i = 0; i < created_seanses.length; i++) {
    const obj = {};
    obj['datetime'] = created_seanses[i].substring(0, 16);
    obj['movie'] = getRandomMovie();
    obj['type'] = getRandomMovieType(type);
    obj['reserv'] = addReserveToHalls(max_reserv, +(created_seanses[i].substring(3, 5)));
    arr.push(obj);
  }
  return arr;
}

function addPricetoHallsSession(hall) {
  for (let i = 0; i < hall.length; i++) {
    for (let j = 0; j < movies.length; j++) {
      if (hall[i].movie === movies[j].name) {
        const time = hall[i].datetime.substring(11, 13);
        let price = null;
        if (+time > 6 && +time < 12) {
          price = +movies[j].basic_price * + movies[j].morning_discount;
        } else if (+time >= 18 && +time <= 23) {
          price = +movies[j].basic_price * + movies[j].rise;
        } else {
          price = +movies[j].basic_price;
        }
        if (price) {
          hall[i]['price'] = parseInt(price);
        } else {
          hall[i]['price'] = 'Уточняйте по телефону';
        }
        continue;
      }
    }
  }
}

function createHalls1Array() {
  const arr = [[], []];
  while (arr[0].length < 2) {
    let new_arr = [];
    while (new_arr.length < 14) {
      new_arr.push('');
    }
    arr[0].push(new_arr);
  }

  while (arr[1].length < 4) {
    let new_arr = [];
    while (new_arr.length < 16) {
      new_arr.push('');
    }
    arr[1].push(new_arr);
  }

  return arr;
};

function createHallsAnotherArray() {
  let arr = [];
  while (arr.length < 3) {
    let new_arr = [];
    while (new_arr.length < 6) {
      new_arr.push('');
    }
    arr.push(new_arr);
  }
  return arr;
}

function reservedHallsArray(arrs, length, reserv = 0) {
  let mixed_arr = createRandomReservMix(createRandomReservArr(length, reserv));
  let filled_arr = [];

  for (let arr1 of arrs) {
    let el1 = [];
    if (Array.isArray(arr1)) {
      for (let arr2 of arr1) {
        if (Array.isArray(arr2)) {
          el1.push(mixed_arr.splice(0, arr2.length));
        } else {
          el1 = mixed_arr.splice(0, arr1.length);
          break;
        }
      }
    } 
    filled_arr.push(el1);
  }

  function createRandomReservArr(length, reserv) {
    let arr = [];
    let count = 0;
    while (arr.length < length) {
      count < reserv ? arr.push(true) : arr.push(false);
      count++;
    }
    return arr;
  }

  function createRandomReservMix(arr) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      let ranomInd = Math.floor(Math.random() * arr.length);
      let temp = arr[i];
      arr[i] = arr[ranomInd];
      arr[ranomInd] = temp;
    }
    return arr;
  }

  return filled_arr;

}

const param_halls = [{ max_count_sessions: 200, max_reserv: 92 },
{ max_count_sessions: 100, type: true, max_reserv: 18 }, { max_count_sessions: 200, type: true, max_reserv: 18 }];
param_halls.forEach(el => halls.push(createdHalls(el)));
halls.forEach(hall => addPricetoHallsSession(sortDateStr(hall, 'datetime')));

/* console.log(halls[2][halls[2].length - 1].reserv); */

halls[0].forEach(el => {
  if (el.reserv) {
    el.reserv = reservedHallsArray(createHalls1Array(), 92, el.reserv);
  }
});
halls[1].forEach(el => {
  if (el.reserv) {
    el.reserv = reservedHallsArray(createHallsAnotherArray(), 18, el.reserv);
  }
});
halls[2].forEach(el => {
  if (el.reserv) {
    el.reserv = reservedHallsArray(createHallsAnotherArray(), 18, el.reserv);
  }
});


function getMovieList(movies) {
  let arr = [];
  for (let i = 0; i < movies.length; i++) {
    arr.push(movies[i].name);
  }
  return arr;
}

function sortText(arr) {
  return arr.sort((a, b) => {
    if (a > b) { return 1 }
    if (a < b) { return -1 }
  });
}


function sortObj(obj) {
  const new_obj = {};
  let arr = sortNumBeforeText(Object.keys(obj));
  arr.forEach(el => {
    Object.keys(obj).forEach((e, i) => {
      if (el === e) {
        new_obj[el] = Object.values(obj)[i];
      }
    });
  });
  return new_obj;
}

function sortNumBeforeText(arr) {
  return arr.sort((a, b) => {
    const A = parseInt(a);
    const B = parseInt(b);
    const a_num = !isNaN(A);
    const b_num = !isNaN(B);
    const a_plus = a.endsWith('+');
    const b_plus = b.endsWith('+');

    // Если оба являются числами или числами с плюсом
    if (a_num && b_num) {
      if (A !== B) {
        return A - B;
      } else {
        // Одинаковые числа, но один из них с плюсом
        if (a_plus && !b_plus) {
          return 1; // С плюсом идет после
        } else if (!a_plus && b_plus) {
          return -1; // Без плюса идет перед
        } else {
          return 0; // Оба одинаковые (например, "13+" и "13+")
        }
      }
    }

    // Если только один из них является числом или числом с плюсом
    if (a_num && !b_num) {
      return -1; // Число идет перед строкой
    } else if (!a_num && b_num) {
      return 1; // Строка идет после числа
    }

    // Оба являются строками
    return a - b;
  });
}



/* console.log(halls[0][halls[0].length-1].reserv); */



