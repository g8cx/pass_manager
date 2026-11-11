let collectionTemplate = null;

export async function getCollectionTemplate() {
  if (collectionTemplate) {
    return collectionTemplate;
  }

  const response = await fetch(
    '/src/components/sidebar/collection_item.html'
  );

  if (!response.ok) {
    throw new Error('Failed to load collection template');
  }

  const html = await response.text();

  const documentFragment = new DOMParser()
    .parseFromString(html, 'text/html');

  const template = documentFragment.querySelector(
    '#collection_item_template'
  );

  if (!template) {
    throw new Error('Collection template not found');
  }

  collectionTemplate = template;

  return collectionTemplate;
}