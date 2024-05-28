export class ButtonGroup {
    constructor(parent, link) {
        this.parent = parent;
    }

    addListeners(listener, title, link) {
        document
            .getElementById("back")
            .addEventListener("click", listener);
        document.getElementById("close").addEventListener("click", () => { 
            window.open(link, '_blank').focus()
            console.log(title)
            let n = localStorage.getItem(title)
            if (!n)
                n = 0
            localStorage.setItem(title, parseInt(n) + 1)
        });
    }

    getHTML() {
        return (
            `
            <div class="btn-group" role="group" aria-label="Простой пример">
                <button type="button" id="back" class="btn btn-primary">Назад</button>
                <button type="button" id="close" class="btn btn-primary">Открыть в новой вкладке</button>
            </div>           
             `
        )
    }

    render(listener, title, link) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('afterend', html)
        this.addListeners(listener, title, link)
    }
}