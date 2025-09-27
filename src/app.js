import { getTariffBoxData } from "#services/api/wb/wbApi.js";
import { saveOrUpdateTariffs } from "#services/dbService.js";
import { updateGoogleSheets } from "#services/googleSheets.js";

const app = async () => {
    try {
        console.log("Приложение запущено");
        const data = await getTariffBoxData(process.env.WB_API_TOKEN);
        await saveOrUpdateTariffs(data);

        const sheetIds = process.env.GOOGLE_SHEETS_IDS?.split(",") || [];
        if (sheetIds.length > 0) {
            await updateGoogleSheets(sheetIds);
            console.log("таблицы обновлены");
        }

        console.log("цикл завершен");
    } catch (e) {
        console.error(e.message);
    }
};

app();
setInterval(app, 60 * 60 * 1000);
