export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Initialize counter from localStorage if not already set
        if (!localStorage.getItem(`counter-${data.id}`)) {
            localStorage.setItem(`counter-${data.id}`, '0');
        }

        return `
            <div class="card" style="width: 300px;">
                <img class="card-img-top" src="${data.src}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                    <span id="counter-${data.id}">${localStorage.getItem(`counter-${data.id}`)}</span>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", (e) => {
            const counterKey = `counter-${data.id}`;
            const currentCount = parseInt(localStorage.getItem(counterKey), 10);
            localStorage.setItem(counterKey, currentCount + 1);
            document.getElementById(counterKey).textContent = currentCount + 1;
            listener(e); // ensure the listener is called after updating the counter
        });
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
