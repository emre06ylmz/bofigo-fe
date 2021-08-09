import React from "react";
import { message, Icon, Notification } from "antd";


export const messageSuccess = message => {
    message.success(message);
}


export const messageError = message => {
    message.error(message);
}