CREATE TABLE IF NOT EXISTS symptoms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    severity REAL,
    duration TEXT
);

CREATE TABLE IF NOT EXISTS diseases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    risk_level INTEGER
);

CREATE TABLE IF NOT EXISTS symptom_disease (
    symptom_id INTEGER,
    disease_id INTEGER,
    probability REAL,
    weight REAL,
    FOREIGN KEY(symptom_id) REFERENCES symptoms(id),
    FOREIGN KEY(disease_id) REFERENCES diseases(id)
);

CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symptoms TEXT NOT NULL,
    diagnose TEXT NOT NULL,
    probability REAL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO symptoms (name, description, severity, duration) VALUES
('Головная боль', 'Пульсирующая боль в области головы', 3, 'От нескольких часов до суток'),
('Температура', 'Повышенная температура тела', 4, '3-7 дней'),
('Кашель', 'Сухой или влажный кашель', 2, '1-2 недели'),
('Слабость', 'Общая утомляемость организма', 2, 'Несколько дней'),
('Тошнота', 'Чувство дискомфорта в желудке', 3, '1-2 дня'),
('Боль в горле', 'Дискомфорт при глотании', 3, '5-7 дней'),
('Насморк', 'Заложенность носа', 2, '7-10 дней'),
('Сыпь', 'Кожные высыпания', 3, '2-3 недели'),
('Боль в животе', 'Дискомфорт в области живота', 4, 'Несколько часов - дней'),
('Одышка', 'Затрудненное дыхание', 4, 'Продолжительная');

INSERT OR IGNORE INTO diseases (name, description, category, risk_level) VALUES
('Грипп', 'Острое вирусное заболевание', 'Респираторные', 3),
('ОРВИ', 'Острая респираторная вирусная инфекция', 'Респираторные', 2),
('Ангина', 'Воспаление горла', 'Инфекционные', 3),
('Гастрит', 'Воспаление слизистой желудка', 'Желудочно-кишечные', 2),
('Аллергия', 'Повышенная чувствительность к веществам', 'Иммунные', 2),
('Бронхит', 'Воспаление бронхов', 'Респираторные', 3),
('Ветрянка', 'Вирусное заболевание с сыпью', 'Инфекционные', 2);

INSERT OR IGNORE INTO symptom_disease (symptom_id, disease_id, probability, weight) VALUES
(1, 1, 0.8, 0.9),
(2, 1, 0.9, 1.0),
(3, 1, 0.7, 0.8),
(2, 2, 0.7, 0.8),
(3, 2, 0.6, 0.7),
(6, 3, 0.9, 1.0),
(9, 4, 0.8, 0.9),
(8, 7, 0.7, 0.8),
(4, 5, 0.6, 0.7),
(5, 5, 0.5, 0.6);