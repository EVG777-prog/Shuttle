let cachedLesson = null;
let cachedRates = null;
let cachedTeachers = null;

async function getDataFromGoogleSheet(page, range, sheet_id) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${page}!${range}?key=${GOOGLE_DOCS_API}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function getSheduleArray(data = []) {
  return data.map((lesson) => {
    return {
      level: lesson[0],
      timeStart: lesson[4] ?? "",
      schedule: lesson[1],
      teacher: lesson[2],
      rate: lesson[3],
    };
  });
}

function getRatesArray(data = []) {
  return data.map((rate) => {
    return {
      name: rate[0],
      price: rate[1],
      duration: rate[2],
      details: rate[3] ? rate[3].split(`\n`) : "",
      quantity: rate[4],
    };
  });
}

function getTeachersArray(data = []) {
  return data.map((teacher) => {
    return {
      name: teacher[0],
      description: teacher[1],
      photo: teacher[2],
    };
  });
}

async function getLessons() {
  if (!SHEET_ID) return [];

  if (cachedLesson === null) {
    try {
      // Ваш код для получения данных, например, запрос к серверу
      const dataLessons = await getDataFromGoogleSheet(
        "Lessons",
        "A2:E333",
        SHEET_ID
      );
      const data = getSheduleArray(dataLessons.values);

      cachedLesson = data; // Кэшируем данные
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  return cachedLesson;
}

async function getRates() {
  if (cachedRates === null) {
    try {
      // Ваш код для получения данных, например, запрос к серверу
      const dataRates = await getDataFromGoogleSheet(
        "Rates",
        "A2:E333",
        SHEET_RATES_ID
      );
      const data = getRatesArray(dataRates.values);

      cachedRates = data; // Кэшируем данные
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  return cachedRates;
}

async function getTeachers() {
  if (!SHEET_ID) return [];

  if (cachedTeachers === null) {
    try {
      // Ваш код для получения данных, например, запрос к серверу
      const dataTeachers = await getDataFromGoogleSheet(
        "Teachers",
        "A2:C333",
        SHEET_ID
      );
      const data = getTeachersArray(dataTeachers.values);

      cachedTeachers = data; // Кэшируем данные
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  return cachedTeachers;
}
