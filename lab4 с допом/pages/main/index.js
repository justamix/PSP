import {ProductPage} from "../product/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId, peer_id, accessToken} from "../../modules/consts.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    get pageRoot() {
        return document.getElementById('main-page');
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap">
                    <div id="input-container" class="w-100 p-3">
                        <input type="text" id="post-input" class="form-control" placeholder="Введите текст для публикации"/>
                        <button id="post-button" class="btn btn-primary mt-2">Опубликовать</button>
                    </div>
                <div/>
            `
        );
    }
        
    getData() {
        ajax.post(urls.getConversationMembers(peer_id), (data) => {
            this.renderData(data.response.profiles);
        });
    }
    
    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }
    
    handlePost() {
        const postInput = document.getElementById('post-input').value;
        if (postInput) {
            ajax.post(urls.wallPost(groupId, accessToken, postInput), (data) => {
                if (data.response && data.response.post_id) {
                    alert('Пост успешно опубликован!');
                } else {
                    alert('Произошла ошибка при публикации поста.');
                }
            });
        } else {
            alert('Введите текст для публикации.');
        }
    }
    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        document.getElementById('post-button').addEventListener('click', this.handlePost.bind(this));
    
        this.getData();
    }
}
