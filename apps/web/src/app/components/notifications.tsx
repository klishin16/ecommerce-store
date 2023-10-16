'use client'
import { useNotifications } from "@/redux/features/notifications.slice";
import { notification } from "antd";
import { INotification } from "@/types/notification.types";
import { useEffect } from "react";

export const Notifications = () => {
    const notifications = useNotifications();
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (notification: INotification) => {
        api[notification.type]({
            message: notification.title,
            description: notification.message,
            placement: "bottomRight",
        });
    };

    useEffect(() => {
        if (notifications.length) {
            openNotification(notifications[notifications.length - 1])
        }
    }, [notifications, openNotification])

    return <>{contextHolder}</>
}
