const { defineConfig } = require('cypress');

module.exports = defineConfig({
    projectId: 'pd4ihu',
    e2e: {
        baseUrl: 'http://localhost:1667',
        viewportWidth: 500,
        viewportHeight: 700,
        defaultCommandTimeout: 10000,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    // Вот ваш второй конфиг
    projectId: "4c5ibw",
    // ... остальные настройки проекта Cypress
});
