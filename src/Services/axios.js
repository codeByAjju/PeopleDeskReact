import axios from "axios";
import { GetLocalStorageToken, removeLocalStorageToken } from "../utils/common.util";
import store, { Persistor } from "../redux/store";
import { logoutSuperAdminAction } from "../redux/AuthSlice";
import { toast } from "react-toastify";
export const APIrequest = async ({
    method,
    url,
    baseURL,
    bodyData,
    cancelFunction,
    queryParams,
    removeHeaders,
}) => {
    try {
        const apiToken = GetLocalStorageToken();
        const axiosConfig = {
            method: method || "GET",
            baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
            headers: {
                "content-type": "application/json",
            },
        };
        if (baseURL) {
            axiosConfig.baseURL = baseURL;
        }
        if (url) {
            axiosConfig.url = url;
        }
        if (bodyData) {
            const bodyPayload = {};
            for (const key in bodyData) {
                if (Object.hasOwnProperty.call(bodyData, key)) {
                    let element = bodyData[key];
                    if (typeof element === "string") {
                        element = element.trim();
                    }
                    if (![null, undefined, NaN].includes(element)) {
                        bodyPayload[key] = element;
                    }
                }
            }
            axiosConfig.data = bodyPayload;
        }
        // Set cancel token if cancel function provided.
        if (cancelFunction) {
            axiosConfig.cancelToken = new axios.CancelToken((cancel) => {
                cancelFunction(cancel);
            });
        }

        // Remove headers if specified.
        if (removeHeaders) {
            delete axiosConfig.headers;
        }

        // Set query parameters if provided.
        if (queryParams) {
            const queryParamsPayload = {};
            for (const key in queryParams) {
                if (Object.hasOwnProperty.call(queryParams, key)) {
                    let element = queryParams[key];
                    if (typeof element === "string") {
                        element = element.trim();
                    }
                    if (!["", null, undefined, NaN].includes(element)) {
                        queryParamsPayload[key] = element;
                    }
                }
            }
            axiosConfig.params = queryParamsPayload;
        }

        if (apiToken) {
            axiosConfig.headers = {
                ...axiosConfig.headers,
                Authorization: `Bearer ${apiToken}`,
            };
        }
        const res = await axios(axiosConfig);
        return res;
    }
    catch (error) {
        const errorRes = error.response;
        if (
            errorRes &&
            errorRes?.status &&
            errorRes?.status === 401
        ) {
            removeLocalStorageToken();
            const currentAuth = store.getState()?.auth;
            if (currentAuth?.userData?.token || currentAuth?.superAdminAuth?.token) {
                store.dispatch(logoutSuperAdminAction());
            }
        }
        if (
            errorRes &&
            errorRes?.status &&
            errorRes?.status === 409
        ) {
            console.log("error :", errorRes?.data?.message);
            toast.warning(errorRes?.data?.message || 'Error Occured');
        }
        console.log(error);
    }
}