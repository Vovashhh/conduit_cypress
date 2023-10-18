const { defineConfig } = require('cypress');

module.exports = defineConfig({
    projectId: 'pd4ihu',
    e2e: {
        baseUrl: 'http://localhost:1667',
        viewportWidth: 1920,
        viewportHeight: 1080,
        defaultCommandTimeout: 3000,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    // Вот ваш второй конфиг
    projectId: "4c5ibw",
    // ... остальные настройки проекта Cypress
});
