import {MainPage} from "./pages/main/index.js";
// Функция для очистки локального хранилища при выходе
function clearLocalStorageOnExit() {
    window.addEventListener('beforeunload', () => {
        // Удаляем только те ключи, которые нам нужны
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('counter-')) {
                localStorage.removeItem(key);
            }
        });
    });
}

// Инициализируем функцию очистки локального хранилища
clearLocalStorageOnExit();
const root = document.getElementById('root');

const mainPage = new MainPage(root);
mainPage.render();  