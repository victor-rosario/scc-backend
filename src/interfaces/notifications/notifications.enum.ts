export enum NotificationTypesEnum {
    AUTH = 'AUTH',
    ORDER = 'ORDER'
}

export enum NotificationEventsEnum {
    NEW_NOTIFICATION = 'notification:new'
}

export type NotificationTypes = `${NotificationTypesEnum}`