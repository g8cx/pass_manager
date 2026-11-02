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

          const li = document.createElement('li');
          const coll_div = document.createElement('div')
          const coll_img = document.createElement('img');
          const coll_name = document.createElement('span');

          li.id = `/collections/${encodeURIComponent(collection.id)}`;
          coll_img.src = '../media/coll_img.png'
          coll_name.textContent = collection.title;

          li.appendChild(coll_div);
          coll_div.appendChild(coll_img);
          coll_div.appendChild(coll_name);
          navigation.appendChild(li);

      });

    } catch (error) {
        console.error('Error loading collections:', error);
    }
}

load_collections();