import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import { ButtonGroup } from "../../components/btn-group/index.js";

export class ProductPage {
    constructor(parent, id, link) {
        this.parent = parent
        this.id = id
        this.link
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()

        this.parent.insertAdjacentHTML('beforeend', html)
    
        //const backButton = new BackButtonComponent(this.pageRoot)
        //backButton.render(this.clickBack.bind(this))

        const buttonGroup = new ButtonGroup(this.pageRoot, this.link)
        
    
        fetch('//localhost:8000/stocks/' + this.id)
        .then((res) => res.json())
        .then((data) => {
            const stock = new ProductComponent(this.pageRoot)
            console.log(data)
            buttonGroup.render(this.clickBack.bind(this), data.title, data.src)
            stock.render(data)
        })
    }
    
}