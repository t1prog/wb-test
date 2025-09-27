import axios from "axios";
import { wbConfigs } from "./wbConfigs.js";
import { format } from "date-fns";

const getData = async (token, config) => {
    try {
        const params = {
            url: config.getUrl(),
            data: {
                headers: {
                    Authorization: token,
                },
            },
        };

        const data = await fetchData(params);

        return config.transform(data);
    } catch (e) {
        console.error("Error in getData:", e);
    }
};

const fetchData = async (params) => {
    try {
        const response = await axios.get(params.url, params.data);
        return response.data.response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const status = e.response?.status;
            const statusText = e.response?.statusText || "Unknown error";
            throw new Error(`Error un fetchData: (${params.url}): ${status} ${statusText}`);
        }
        throw e;
    }
};

const getTariffBoxData = async (token) => {
    const baseUrl = "https://common-api.wildberries.ru/api/v1/tariffs/box";
    const params = {
        date: format(new Date(), "yyyy-MM-dd"),
    };
    const config = wbConfigs.boxTariffsConfig(baseUrl, params);
    const data = await getData(token, config);

    return data;
};

export { getTariffBoxData };
