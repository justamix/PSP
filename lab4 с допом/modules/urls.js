import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getGroupInfo(id) {
        return `${this.url}/groups.getById?group_ids=${id}&fields=photo_400_orig&${this.commonInfo}`
    }

    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getConversationMembers(peer_id) {
        return `${this.url}/messages.getConversationMembers?peer_id=${peer_id}&fields=photo_400_orig&${this.commonInfo}`
    }
    wallPost(group_id, token, message) { 
        return `https://api.vk.com/method/wall.post?owner_id=-${group_id}&message=${message}&access_token=${token}&v=5.131`
    }
}

export const urls = new Urls()