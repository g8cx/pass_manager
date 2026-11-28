export async function getCollections() {
  const response = await fetch(
      '/data/collections.json'
  );

  if (!response.ok) {
    throw new Error('Failed to load collections');
  }

  const data = await response.json();

  return data.collections;
}
