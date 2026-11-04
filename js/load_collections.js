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
          // Media materials
          const image = "../media/many_dots.png"

          // HTML elements
          const li = document.createElement('li');
          const coll_a = document.createElement('a')
          const coll_img = document.createElement('img');
          const coll_name = document.createElement('span');
          const coll_settings = document.createElement('button')
          const setting_image = document.createElement('img')

          li.id = `/collections/${encodeURIComponent(collection.id)}`;
          li.className = 'tab_btn'
          // Div для коллекции
          // coll_a.href = ""
          coll_a.className = 'collection_a'
          // Картинка коллекции
          coll_img.src = '../media/coll_img.png'
          coll_img.className = 'collection_image' 
          // Название коллекции
          coll_name.textContent = collection.title;
          // Кнопка настроек у коллекции
          coll_settings.className = 'collection_setting'
          // Картинка для кнопки настроек
          setting_image.src = `${image}`
          
          navigation.appendChild(li);
          li.append(coll_a, coll_settings);
          coll_a.append(coll_img, coll_name);
          coll_settings.appendChild(setting_image);

      });

    } catch (error) {
        console.error('Error loading collections:', error);
    }
}

load_collections();