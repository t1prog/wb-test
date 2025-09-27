import { parseDecimal, parseInteger } from "#util/parse.js";

const boxTariffsConfig = (baseUrl, params = {}) => ({
    getUrl: () => {
        const url = new URL(baseUrl);
        Object.keys(params).forEach((param) => {
            url.searchParams.set(param, params[param]);
        });

        return url.toString();
    },
    transform: (data) => {
        if (!Array.isArray(data.warehouseList)) return [];
        return data.warehouseList.map((item) => ({
            warehouse_name: item.warehouseName || "Unknown",
            geo_name: item.geoName || "Unknown",
            delivery_base: item.boxDeliveryBase ? parseDecimal(item.boxDeliveryBase) : 0,
            delivery_coef: item.boxDeliveryCoefExpr ? parseInteger(item.boxDeliveryCoefExpr) : 0,
            delivery_liter: item.boxDeliveryLiter ? parseDecimal(item.boxDeliveryLiter) : 0,
            marketplace_base: item.boxDeliveryMarketplaceBase ? parseDecimal(item.boxDeliveryMarketplaceBase) : 0,
            marketplace_coef: item.boxDeliveryMarketplaceCoefExpr ? parseInteger(item.boxDeliveryMarketplaceCoefExpr) : 0,
            marketplace_liter: item.boxDeliveryMarketplaceLiter ? parseDecimal(item.boxDeliveryMarketplaceLiter) : 0,
            storage_base: item.boxStorageBase ? parseDecimal(item.boxStorageBase) : 0,
            storage_coef: item.boxStorageCoefExpr ? parseInteger(item.boxStorageCoefExpr) : 0,
            storage_liter: item.boxStorageLiter ? parseDecimal(item.boxStorageLiter) : 0,
        }));
    },
});

export default boxTariffsConfig;
