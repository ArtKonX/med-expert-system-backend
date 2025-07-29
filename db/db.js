const sqlite3 = require('sqlite3').verbose();
const fs = require('fs').promises;
const path = require('path');

// Все таблицы
const tabels = ['symptoms', 'diseases', 'symptom_disease', 'results']

let db;

async function initDB() {
    try {

        // Соединение с бд
        db = new sqlite3.Database('./database.db', (err) => {

            if (err) {
                console.error('Не удалось подключиться к базе данных: ', err.message);
            } else {
                console.log('Подключение к базе данных прошло успешно!');
            }
        })

        // Проверяем созданы ли таблицы
        const isTabelsList = await Promise.all(tabels.map(async (table) => {
            return await checkTables(table)
        }))

        const isEveryTabels = isTabelsList.every(elem => elem === true);

        // Если не созданы, то создаем
        if (!isEveryTabels) {

            const DBInitPath = path.join(__dirname, 'db-init.sql');

            // Проверяем существует ли файл db-init.sql
            try {
                await fs.access(DBInitPath);

                console.log('Файл иницилизации SQL найден - ', DBInitPath);
            } catch (err) {
                throw new Error(`Файл инициализации БД не найден по пути: ${DBInitPath}, ${err.message}`);
            }

            // Читаем содержимое файла
            const sqlReadStream = await fs.readFile(DBInitPath, 'utf8');

            const commandsList = sqlReadStream.split(';').map(elem => elem.trim());

            // Выполняем каждый скрипт
            for (const elem of commandsList) {
                if (elem.trim()) {
                    await new Promise((resolve, reject) => {
                        db.serialize(() => {
                            db.run(elem, function (err) {
                                if (err) {
                                    console.error('Ошибка выполнения SQL команды: ', err.message);
                                    reject(err);
                                } else {
                                    console.log('SQL команда выполнен успешно!');
                                    resolve();
                                }
                            });
                        });
                    });
                }
            }
        }

    } catch (err) {
        console.error('Ошибка при инициализации базы данных: ', err.message);
    }
}

async function checkTables(tableName) {
    try {

        // Проверяем созданую таблицу
        return await new Promise(async (resolve, reject) => {
            await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [tableName],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(`Таблица - ${tableName} уже создана!`)
                        resolve(!!row);
                    }
                });
        });
    } catch (err) {
        console.error('Ошибка при проверке таблиц: ', err.message);
    }
}

// Вызываем инициализацию и проверку
initDB()

module.exports = {
    db: {
        all: (query, params = []) => {
            return new Promise((resolve, reject) => {
                db.all(query, params, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                });
            });
        },
        get: (query, params = []) => {
            return new Promise((resolve, reject) => {
                db.get(query, params, (err, row) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(row)
                    }
                })
            })
        },
        run: (query, params = []) => {
            return new Promise((resolve, reject) => {
                db.run(query, params, function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({ success: true })
                    }
                })
            })
        }
    }
}