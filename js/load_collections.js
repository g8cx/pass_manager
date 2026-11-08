async function load_collections() {

  try {
        // Загружаем локальный JSON
        const response = await fetch('../data/collections.json');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const navigation = document.querySelector('#collections_navigation');

    // const response = await fetch('/api/collections'); // Получаем ответ с бэка
    // const data = await response.json(); // записываем данные получаемые в виде JSON

    // const navigation = document.querySelector(
    //     '#collections_navigation'
    // );

      navigation.innerHTML = '';

      data.collections.forEach(collection => { // Проходимся внутри JSON и генерируем html тэги
        // HTML elements
        const li = document.createElement('li');
        const coll_content = document.createElement('div');
        const coll_a = document.createElement('a');
        const coll_img = document.createElement('img');
        const coll_name = document.createElement('span');
        const coll_settings = document.createElement('button');

        // SVG element
        const setting_image = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );

        li.id = `/collections/${encodeURIComponent(collection.id)}`;
        li.className = 'tab_btn collection_btn_effects';

        // Div коллекции
        coll_content.className = 'collection_content';

        // <a> коллекции
        coll_a.className = 'collection_a';

        // Картинка коллекции
        coll_img.src = '../assets/images/coll_img.png';
        coll_img.className = 'collection_image';

        // Название коллекции
        coll_name.textContent = collection.title;

        // Кнопка настроек у коллекции
        coll_settings.className = 'collection_setting';
        coll_settings.type = 'button';

        // SVG настройки
        setting_image.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        setting_image.setAttribute('width', '24');
        setting_image.setAttribute('height', '24');
        setting_image.setAttribute('viewBox', '0 0 24 24');
        setting_image.setAttribute('fill', 'none');
        setting_image.setAttribute('stroke', 'currentColor');
        setting_image.setAttribute('stroke-width', '2');
        setting_image.setAttribute('stroke-linecap', 'round');
        setting_image.setAttribute('stroke-linejoin', 'round');
        setting_image.setAttribute('class', 'lucide lucide-ellipsis collection_setting_icon');

        // SVG circles
        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle1.setAttribute('cx', '12');
        circle1.setAttribute('cy', '12');
        circle1.setAttribute('r', '1');

        const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle2.setAttribute('cx', '19');
        circle2.setAttribute('cy', '12');
        circle2.setAttribute('r', '1');

        const circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle3.setAttribute('cx', '5');
        circle3.setAttribute('cy', '12');
        circle3.setAttribute('r', '1');

        setting_image.append(circle1, circle2, circle3);

        // Сборка элементов
        navigation.appendChild(li);
        li.appendChild(coll_content);
        coll_content.append(coll_a, coll_settings);
        coll_a.append(coll_img, coll_name);
        coll_settings.appendChild(setting_image);

      });

    } catch (error) {
        console.error('Error loading collections:', error);
    }
}

load_collections();