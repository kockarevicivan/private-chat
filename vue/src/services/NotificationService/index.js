import { PERMISSION_STATUS } from "./types";

class NotificationService {
    constructor() {
        this.permissionStatus = localStorage.getItem("native-notifications-permission");
    }

    setPermissionStatus(status = PERMISSION_STATUS.DEFAULT) {
        localStorage.setItem("native-notifications-permission", status);
        this.permissionStatus = status;
    } 

    requestPermission({ onGranted, onDenied }) {
        Notification.requestPermission()
        .then(result => {
            this.setPermissionStatus(result);

            if(result === PERMISSION_STATUS.DENIED || result === PERMISSION_STATUS.DEFAULT)
                onDenied && onDenied();
            
            if(result === PERMISSION_STATUS.GRANTED)
                onGranted && onGranted();
        })
    }

    notify( title, message ) {
        new Notification(title, {
            body: message,
            icon: "/images/logo.png"
        })
    }

    permissionGranted = () => this.permissionStatus === PERMISSION_STATUS.GRANTED
}

export default new NotificationService();
export { 
    PERMISSION_STATUS
};
