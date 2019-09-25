-- Up

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    UNIQUE (name)
);

INSERT INTO users
    (name, password)
    VALUES
    ('nadina', '$2b$10$aX5ss2UpyFD9loRGfKXd5exKU/lyR4adxPt2v4MbT4soLVIMQ2fLO'),
    ('timo', '$2b$10$9WwxJkD7vjpTCyglsZSetuiRc3/io9FcMF8y/5sKRyHDO6vmgh29W')
;
-- Down
DROP TABLE users;
