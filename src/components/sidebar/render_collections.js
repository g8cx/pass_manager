import { getCollectionTemplate } from './template_service.js';

export async function renderCollections(collections, container) {
  const template = await getCollectionTemplate();

  const fragment = document.createDocumentFragment();

  collections.forEach(collection => {
    const item = template.content.firstElementChild.cloneNode(true);

    item.dataset.collectionId = collection.id;

    item.querySelector('[data-role="collection_name"]')
      .textContent = collection.title;

    fragment.append(item);
  });

  container.replaceChildren(fragment);
}
