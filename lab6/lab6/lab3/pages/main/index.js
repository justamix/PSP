"use strict"
import { ButtonComponent } from "../../components/button/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.latestID = 1;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"></div>
            `
        );
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        fetch('http://localhost:8000/stocks')
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const productCard = new ProductCardComponent(this.pageRoot);
                    if (item.title === 'Калькулятор')
                        productCard.render(item, this.clickCalc.bind(this), this.delCard.bind(this));
                    else
                        productCard.render(item, this.clickCard.bind(this), this.delCard.bind(this));
                    this.latestID = item.id + 1;
                });
            });

        // Button for adding new cards
        const btn = new ButtonComponent(this.parent, 'ДОБАВИТЬ НОВУЮ ЖЕНЩИНУ');
        btn.render(this.addNewCard.bind(this));

        // Button for adding new cars
        const btnCar = new ButtonComponent(this.parent, 'ДОБАВИТЬ НОВОГО МУЖЧИНУ');
        btnCar.render(this.addNewCarImage.bind(this));
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    clickCalc() {
        open('pages/calc/main.html', '_self');
    }

    delCard(id) {
        fetch(`http://localhost:8000/stocks/${id}`, { method: 'DELETE' });
    }

    addNewCard() {
        if (!document.stats) {
            document.stats = {};
        }
        document.stats[this.latestID] = 1;

        const UNSPLASH_ACCESS_KEY = 'i5sCuEI94h9nAE-xOZWAqp3wXTbX31lRWsGpLiD4Y6w';

        fetch(`https://api.unsplash.com/photos/random?query=female&client_id=${UNSPLASH_ACCESS_KEY}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                fetch('http://localhost:8000/stocks', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.latestID,
                        src: data.urls.regular,
                        title: 'Женщина ' + this.latestID,
                        text: 'Такой женщины вы ещё не видели! ' + this.latestID,
                    })
                });
            })
            .catch(error => {
                console.error('Error fetching image from Unsplash:', error);
            });
    }

    addNewCarImage() {
        if (!document.stats) {
            document.stats = {};
        }
        document.stats[this.latestID] = 1;

        const UNSPLASH_ACCESS_KEY = 'i5sCuEI94h9nAE-xOZWAqp3wXTbX31lRWsGpLiD4Y6w';

        fetch(`https://api.unsplash.com/photos/random?query=male&client_id=${UNSPLASH_ACCESS_KEY}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                fetch('http://localhost:8000/stocks', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.latestID,
                        src: data.urls.regular,
                        title: 'Мужчина ' + this.latestID,
                        text: 'Такого мужчины вы ещё не видели! ' + this.latestID,
                    })
                });
            })
            .catch(error => {
                console.error('Error fetching image from Unsplash:', error);
            });
    }
}
