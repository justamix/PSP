export class ButtonComponent {
    constructor(parent, title) {
        this.parent = parent
        this.title = title
    }

    render(callback) {
        const element = document.createElement('button')
        element.className = 'btn btn-primary'
        element.innerText = this.title
        this.parent.insertAdjacentElement('beforeend', element).onclick = callback
    }
}