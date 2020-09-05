import { NotificationService } from "./services";

export default {
    install(Vue) {
        Vue.prototype.$nativeNotifications = NotificationService;
    }
};