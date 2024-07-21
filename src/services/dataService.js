// src/services/dataService.js

// async function loadCustomHeaderRow(sheet, rowIndex = 2) { // 0-basierter Index, 2 entspricht der dritten Zeile
//   try {
//     // Lade die ersten paar Zeilen des Sheets
//     const rows = await sheet.read({ limit: rowIndex + 1 });

//     if (rows.length <= rowIndex) {
//       throw new Error("Nicht genügend Zeilen im Sheet");
//     }

//     // Verwende die Zeile am spezifizierten Index als Header
//     const headerRow = rows[rowIndex];

//     // Setze diese Zeile als Header für zukünftige Operationen
//     sheet.setHeaderRow(headerRow);

//     return true;
//   } catch (error) {
//     console.error("Fehler beim Laden der benutzerdefinierten Header-Zeile:", error);
//     return false;
//   }
// }

// // Verwendung:
// async function hasCustomHeaders(sheet) {
//   try {
//     await loadCustomHeaderRow(sheet, 2); // 2 für die dritte Zeile
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

