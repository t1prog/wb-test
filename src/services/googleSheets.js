import { google } from "googleapis";
import { getLatestTariffs } from "./dbService.js";
import env from "#config/env.js";

const _sheets = async () => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: env.GOOGLE_CREDENTIALS_PATH,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        return sheets;
    } catch (e) {
        console.error("Google Sheets API:\n" + e);
        return {};
    }
};

/**
 * Обновляет все указанные Google-таблицы
 *
 * @param {string[]} sheetIds - Массив ID таблиц
 */
const updateGoogleSheets = async (sheetIds) => {
    try {
        const sheets = await _sheets();

        const tariffs = await getLatestTariffs();

        if (tariffs.length === 0) {
            console.log("Нет данных для обновления таблиц");
            return;
        }
        const values = [
            // Заголовки
            [
                "Склад",
                "Регион",
                "Логистика (%)",
                "FBS (%)",
                "Хранение (%)",
                "Лог. база (₽)",
                "Лог. литр (₽)",
                "FBS база (₽)",
                "FBS литр (₽)",
                "Хран. база (₽)",
                "Хран. литр (₽)",
            ],
            ...tariffs.map((t) => [
                t.warehouse_name,
                t.geo_name,
                t.delivery_coef,
                t.marketplace_coef,
                t.storage_coef,
                t.delivery_base,
                t.delivery_liter,
                t.marketplace_base,
                t.marketplace_liter,
                t.storage_base,
                t.storage_liter,
            ]),
        ];

        for (const sheetId of sheetIds) {
            try {
                await sheets.spreadsheets.values.update({
                    spreadsheetId: sheetId,
                    range: "stocks_coefs!A1",
                    valueInputOption: "RAW",
                    resource: { values },
                });

                console.log(`Таблица ${sheetId} обновлена`);
            } catch (error) {
                console.error(`Ошибка обновления таблицы ${sheetId}:`, error.message);
            }
        }
        console.log(`Обновлено ${sheetIds.length} таблиц с ${tariffs.length} записями`);
    } catch (e) {
        console.error("Ошибка в updateGoogleSheets:", error.message);
        throw error;
    }
};

/**
 * Создаёт новую Google-таблицу
 *
 * @param {string} credentialsPath
 * @param {string} title
 * @returns {Promise<string>} ID новой таблицы
 */
const createTestSpreadsheet = async () => {};

export { updateGoogleSheets };
