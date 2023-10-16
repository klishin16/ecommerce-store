import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "@/types/notification.types";
import { RootState } from "@/redux";
import { useTypedSelector } from "@/hooks";

interface INotificationsState {
    notifications: INotification[]
}

const initialState: INotificationsState = {
    notifications: [],
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        /**
         * Add a notification to the list
         *
         * @param state - Our current Redux state
         * @param payload - A notification item without an id, as we'll generate this.
         */
        addNotification: (
            state,
            { payload }: PayloadAction<Omit<INotification, 'id'>>
        ) => {
            const notification: INotification = {
                id: nanoid(),
                ...payload,
            }

            state.notifications.push(notification)
        },
        /**
         * Remove a notification from the list
         *
         * @param state - Our current Redux state
         * @param payload - The id of the Notification to dismiss
         */
        dismissNotification: (
            state,
            { payload }: PayloadAction<INotification['id']>
        ) => {
            const index = state.notifications.findIndex(
                (notification) => notification.id === payload
            )

            if (index !== -1) {
                state.notifications.splice(index, 1)
            }
        },
    },
})

const { reducer, actions } = notificationsSlice

// Actions
export const { addNotification, dismissNotification } = actions

export const notificationsActions = {
    addNotification
}

// Hooks
export const useNotifications = () => useTypedSelector(state => state.notifications.notifications);

export default reducer
