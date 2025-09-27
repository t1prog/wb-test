import db from "#db/connection.js";
import { format } from "date-fns";

/**
 * Сохраняет или обновляет тарифы на текущую дату
 *
 * @param {Array} tariffs - Массив тарифов из WB API
 */
const saveOrUpdateTariffs = async (tariffs) => {
    const today = format(new Date(), "yyyy-MM-dd");
    await db("wb_tariffs").where("date", today).del();

    const records = tariffs.map((item) => ({
        date: today,
        warehouse_name: item.warehouse_name,
        geo_name: item.geo_name,
        delivery_base: item.delivery_base,
        delivery_coef: item.delivery_coef,
        delivery_liter: item.delivery_liter,
        marketplace_base: item.marketplace_base,
        marketplace_coef: item.marketplace_coef,
        marketplace_liter: item.marketplace_liter,
        storage_base: item.storage_base,
        storage_coef: item.storage_coef,
        storage_liter: item.storage_liter,
    }));

    if (records.length > 0) {
        await db("wb_tariffs").insert(records);
    }

    console.log("Данные сохранены в БД");
};

/**
 * Получает список всех дат, за которые есть данные
 *
 * @returns {Promise<Array>}
 */
const getDatesWithTariffs = async () => {
    return await db("wb_tariffs").select("date").distinct("date").orderBy("date", "desc");
};

/**
 * Получает последние тарифы за сегодня
 *
 * @returns {Promise<Array>}
 */
const getLatestTariffs = async () => {
    const today = format(new Date(), "yyyy-MM-dd");
    return await getTariffsByDate(today);
};

/**
 * Получает тарифы за конкретную дату
 *
 * @param {string} date - Дата в формате YYYY-MM-DD
 * @returns {Promise<Array>}
 */
const getTariffsByDate = async (date) => {
    return await db("wb_tariffs").where("date", date).orderBy("delivery_coef", "asc");
};

export { getDatesWithTariffs, getLatestTariffs, getTariffsByDate, saveOrUpdateTariffs };
