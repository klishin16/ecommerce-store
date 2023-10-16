import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ESettingsKinds, EThemes, ISettings, ISettingsSaveDto } from "@ecommerce-store/common";
import { SettingsService } from "@/services/settings.service";


export interface ISettingsState {
    isLoaded: boolean;
    theme: EThemes;
    optionalFunctions: ISettings<ESettingsKinds.OPTIONAL_FUNCTION>[];
}

const initialState: ISettingsState = {
    isLoaded: false,
    theme: EThemes.DARK,
    optionalFunctions: []
}

const saveSettings = createAsyncThunk(
    "settings/save",
    async (payload: ISettingsSaveDto, thunkAPI) => {
        try {
            return await SettingsService.save(payload);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

const loadSettings = createAsyncThunk(
    "settings/load",
    async (_, thunkAPI) => {
        try {
            return await SettingsService.load()
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, {payload}: PayloadAction<EThemes>) => {
            return ({
                ...state,
                theme: payload
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                console.log('here', action.payload)
                state.optionalFunctions = action.payload
                    .filter((item) => item.kind === ESettingsKinds.OPTIONAL_FUNCTION)
                state.isLoaded = true;
            })
    }
})

export const settingsReducer = settingsSlice.reducer;
export const settingsActions = {
    ...settingsSlice.actions,
    loadSettings,
    saveSettings
};
