export class ProductCardComponent {
    constructor(parent, id) {
        this.parent = parent;
    }


    getHTML(data) {
        return (
            `
                <div class="card" style="width: 300px;">
                    <img class="card-img-top" src="${data.src}" alt="картинка">
                    <div class="card-body">
    
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Открыть</button>                   
                        <button class="btn btn-danger" id="del-card-${data.id}">Удалить</button>
                    </div>
                </div>
            `
        )
    }
    
    addListeners(data, onOpenClick, onDelClick) {
        document
            .getElementById(`click-card-${data.id}`)
            .onclick = onOpenClick
        document
            .getElementById(`del-card-${data.id}`)
            .onclick = () => onDelClick(data.id)
    }


    
    render(data, onOpenClick, onDelClick) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, onOpenClick, onDelClick)
    }
}