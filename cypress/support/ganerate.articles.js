import { faker } from '@faker-js/faker';
//зміни назву файлу, вона прописана з помилкою. Це дуже кидається в очі.
//після зміни назви, не забуть змінити імпорти

export function generateArticle() {
  const title = faker.lorem.sentence();
  const description = faker.lorem.paragraph();
  const article = faker.lorem.paragraphs(1);
  const extraLongArticle = faker.lorem.paragraphs(5); // Генерируем еще более длинный текст статьи


  return {
    title, // заголовок
    description, // описание
    article, // статъя
    extraLongArticle
  };
}

export default { generateArticle };
