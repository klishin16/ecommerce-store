import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNotification } from "@/redux/features/notifications.slice";
import { DevicesService } from "@/services";
import { errorHandler } from "@/functions/error-handler";
import { IDevicesFilters } from "@/app/components/devices/devices-filter";
import { IDevice } from "@ecommerce-store/common";

export interface IDevicesState {
    devices: IDevice[],
    isLoading: boolean;
}

const initialState: IDevicesState = {
    devices: [],
    isLoading: false
}

const fetchDevices = createAsyncThunk(
    "devices/load",
    async (_, thunkAPI) => {
        console.log('loadDevices')
        try {
            const devices = await DevicesService.fetchAll();
            console.log('devices', devices)
            thunkAPI.dispatch(addNotification({
                title: 'Devices',
                message: 'Devices loaded successfully',
                type: 'success',
            }));
            return devices;
        } catch (error) {
            thunkAPI.dispatch(
                addNotification({
                    title: 'Devices loading error',
                    message: errorHandler(error),
                    type: 'error'
                })
            );
            return thunkAPI.rejectWithValue('some value (-_-)');
        }
    })

const fetchDevicesWithFilter = createAsyncThunk(
    "devices/loadWithFilter",
    async (filters: IDevicesFilters,thunkAPI) => {
        console.log('loadDevices')
        try {
            const devices = await DevicesService.fetchWithFilters(filters);
            console.log('devices', devices)
            thunkAPI.dispatch(addNotification({
                title: 'Devices',
                message: 'Devices loaded successfully',
                type: 'success',
            }));
            return devices;
        } catch (error) {
            thunkAPI.dispatch(
                addNotification({
                    title: 'Devices loading error',
                    message: errorHandler(error),
                    type: 'error'
                })
            );
            return thunkAPI.rejectWithValue('some value (-_-)');
        }
    })

const createDevice = createAsyncThunk(
    "devices/create",
    async ({ token, payload }: { token: string; payload: any }, thunkAPI) => {
        console.log('createDevice')
        try {
            const devices = await DevicesService.create(token, payload);
            console.log('devices', devices)
            thunkAPI.dispatch(addNotification({
                title: 'Devices',
                message: 'Device created successfully',
                type: 'success',
            }));
            return devices;
        } catch (error) {
            thunkAPI.dispatch(
                addNotification({
                    title: 'Device creation error',
                    message: errorHandler(error),
                    type: 'error'
                })
            );
            return thunkAPI.rejectWithValue('some value (-_-)');
        }
    })

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDevices.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchDevices.fulfilled, (state, action) => {
                // Devices fetched successfully
                console.log('got', action)
                state.devices = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchDevices.rejected, (state, action) => {
                // Login failed
                state.isLoading = false;
            })
            .addCase(fetchDevicesWithFilter.fulfilled, (state, action) => {
                // Devices fetched successfully
                console.log('got', action)
                state.devices = action.payload;
            })
    }
})

export const devicesReducer = devicesSlice.reducer;
export const devicesActions = {
    fetchDevices,
    fetchDevicesWithFilter,
    createDevice
}
