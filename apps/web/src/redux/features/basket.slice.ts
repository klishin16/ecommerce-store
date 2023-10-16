import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketService } from "@/services";
import { addNotification } from "@/redux/features/notifications.slice";
import { IBasketState } from "@/types/basket.types";
import { errorHandler } from "@/functions/error-handler";
import { RootState } from "@/redux";
import { IDevice, IUser } from "@ecommerce-store/common";


const initialState: IBasketState = {
    isLoading: false,
    purchases: null,
    id: null
}

const loadUserBasket = createAsyncThunk(
    "basket/load",
    async (user: IUser, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as RootState).auth.token;
            if (!token) {
                return thunkAPI.rejectWithValue('No auth token');
            }
            const basket = user.basketId ?
                await BasketService.fetch(token, user.basketId) :
                await BasketService.create(token, { userId: user.id })

            thunkAPI.dispatch(addNotification({
                title: 'Basket',
                message: basket.id?.toString() || '',
                type: 'success',
            }));
            console.log('basket', basket)
            return basket;
        } catch (error) {
            thunkAPI.dispatch(
                addNotification({
                    title: 'Basket loading error',
                    message: errorHandler(error),
                    type: 'error'
                })
            );

            return thunkAPI.rejectWithValue(error);
        }
    }
)

const addDevice = createAsyncThunk(
    "basket/addDevice",
    async ({ device, amount }: { device: IDevice, amount: number }, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            console.log('state', state)
            const token = state.auth.token;
            const basket = state.basket
            if (!token) {
                return thunkAPI.rejectWithValue('No auth token')
            }
            if (!basket.id) {
                return thunkAPI.rejectWithValue('No basket id')
            }
            return await BasketService.addDevice(token, { deviceId: device.id, basketId: basket.id, amount })
        } catch (error) {
            thunkAPI.dispatch(
                addNotification({
                    title: 'Basket device add error',
                    message: errorHandler(error),
                    type: 'error'
                })
            );

            return thunkAPI.rejectWithValue('some value (-_-)');
        }
    }
)

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadUserBasket.pending, state => {
                state.isLoading = true;
            })
            .addCase(loadUserBasket.fulfilled, (state, action) => {
                state.id = action.payload.id ?? null
                state.purchases = action.payload.purchases
                state.isLoading = false;
            })
            .addCase(loadUserBasket.rejected, (state, action) => {
                state.isLoading = false;
            })
            // Успешное добавление товара -> добавляем в purchases[]
            .addCase(addDevice.fulfilled, (state, action) => {
                state.purchases?.push(action.payload)
            })
    }
})

export const basketReducer = basketSlice.reducer;

export const basketActions = {
    loadUserBasket,
    addDevice
}
