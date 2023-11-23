import axios from "axios";

export const errorHandler = (error: unknown): string => {
    if (error === null) throw new Error('Unrecoverable error!! Error is null!')
    if (axios.isAxiosError(error)) {
        //here we have a type guard check, error inside this will be treated as AxiosError
        const response = error?.response
        const request = error?.request
        const config = error?.config // here we have access the config used to make the api call (we can make a retry using this conf)

        if (error.code === 'ERR_NETWORK') {
            return 'Connection problems...';
        } else if (error.code === 'ERR_CANCELED') {
            return 'Connection canceled...';
        }
        if (response) {
          /** Сообщение в ошибке */
          const message = Array.isArray(response.data.message) ? response.data.message[0] : response.data.message;
            //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
            const statusCode = response?.status
            if (statusCode === 404) {
                return message ?? 'The requested resource does not exist or has been deleted';
            } else if (statusCode === 401) {
                // ошибка авторизации
                return message ?? 'Please login to access this resource';
            } else if (statusCode === 400 || statusCode === 422) {
                // ошибка валидации или исполнения запроса на сервере
                return Array.isArray(response.data.message) ? response.data.message[0] : response.data.message;
            }
        } else if (request) {
            //The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            return 'No response... ¯\\_(ツ)_/¯';
        }
    }

    return 'No response 2... ¯\\_(ツ)_/¯'
}
