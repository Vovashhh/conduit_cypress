import { faker } from '@faker-js/faker';
// нерозумію де помилка()

function generateUser() {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  return { username, email, password };
}

export default { generateUser };
