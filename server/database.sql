CREATE DATABASE gitfit;

\c gitfit;

CREATE TABLE exercises (
    id VARCHAR(4) PRIMARY KEY,
    name VARCHAR(30),
    split VARCHAR(4),
    zone CHAR(1),
    notes VARCHAR(50)
);

CREATE TABLE journal (
    id SERIAL PRIMARY KEY,
    workout_date DATE DEFAULT CURRENT_DATE,
    split_option VARCHAR(4),
    rep_range_option VARCHAR(4),
    exercise1_id VARCHAR(4) REFERENCES exercises (id),
    exercise2_id VARCHAR(4) REFERENCES exercises (id),
    exercise3_id VARCHAR(4) REFERENCES exercises (id),
    exercise4_id VARCHAR(4) REFERENCES exercises (id),
    exercise5_id VARCHAR(4) REFERENCES exercises (id),
    notes VARCHAR(200)
);

INSERT INTO exercises (id, name, split, zone, notes)
VALUES ('DL', 'Deadlift', 'Full', '1', 'King of all lifts'),
       ('S', 'Squat', 'Legs', '1', NULL),
       ('BP', 'Barbell Bench Press', 'Push', '1', NULL),
       ('Ro', 'Barbell Row', 'Pull', '1', NULL),
       ('OP', 'Overhead Press', 'Push', '1', NULL),
       ('PU', '(Weighted) Pull Up', 'Pull', '2', NULL),
       ('DeRo', 'Dead Row', 'Pull', '1', NULL),
       ('HCRo', '1-Arm High Cable Row', 'Pull', '1', NULL),
       ('MRo', 'Meadows Row', 'Pull', '1', NULL),
       ('DbRo', '1-Arm Tripod DB Row', 'Pull', '1', NULL),
       ('LPd', 'Lat Pulldown', 'Pull', '2', NULL),
       ('DbPo', 'DB Pullover', 'Pull', '2', NULL),
       ('SAPd', 'Straight Arm Pushdown', 'Pull', '2', NULL),
       ('ADbC', 'Alternating DB Curls', 'Pull', '3', NULL),
       ('BbC', 'Barbell Curls', 'Pull', '3', NULL),
       ('CU', 'Chin Up', 'Pull', '3', NULL),
       ('IDbC', 'Incline DB Curl', 'Pull', '3', NULL),
       ('DbBP', 'DB Bench Press', 'Push', '1', NULL),
       ('IBP', 'Incline Bench Press', 'Push', '1', NULL),
       ('WD', 'Weighted Dip', 'Push', '1', NULL),
       ('DbSP', 'DB Squeeze Press', 'Push', '1', NULL),
       ('UDbB', 'Underhand DB Bench Press', 'Push', '1', NULL),
       ('CC', 'Cable Crossover', 'Push', '2', NULL),
       ('H1CC', 'Heavy 1-Arm Crossover', 'Push', '2', NULL),
       ('LtHC', 'Low to High Crossover', 'Push', '2', NULL),
       ('DBPo', 'DB Upper Chest Pullover', 'Push', '2', NULL),
       ('LTE', 'Lying Tricep Extension', 'Push', '3', NULL),
       ('RPd', 'Rockaway Pushdown', 'Push', '3', NULL),
       ('DbK', 'DB Kickback', 'Push', '3', NULL),
       ('IDbP', 'Incline DB Powerbombs', 'Push', '3', NULL),
       ('Leg1', 'Leg Mock 1', 'Legs', '1', NULL),
       ('Leg2', 'Leg Mock 2', 'Legs', '2', NULL),
       ('Leg3', 'Leg Mock 3', 'Legs', '2', NULL),
       ('Leg4', 'Leg Mock 4', 'Legs', '3', NULL),
       ('Leg5', 'Leg Mock 5', 'Legs', '3', NULL);

-- Mock Data
INSERT INTO journal (workout_date, split_option, rep_range_option, exercise1_id, exercise2_id, exercise3_id, exercise4_id, exercise5_id, notes)
VALUES (CURRENT_DATE + (random() * interval '365 days'), 'Push', 'High', 'OP', 'S', 'OP', 'DL', 'BP', 'Chest day workout'),
       (CURRENT_DATE + (random() * interval '365 days'), 'Pull', 'Low', 'Ro', 'Ro', 'OP', 'DL', 'Ro', 'Back day workout'),
       (CURRENT_DATE + (random() * interval '365 days'), 'Push', 'High', 'DL', 'S', 'OP', 'DL', 'S', 'Chest day workout'),
       (CURRENT_DATE + (random() * interval '365 days'), 'Legs', 'Low', 'DL', 'Ro', 'OP', 'OP', 'Ro', 'Heavy legs today'),
       (CURRENT_DATE + (random() * interval '365 days'), 'Pull', 'High', 'S', 'DL', 'OP', 'DL', 'Ro', 'Focus on arms.');
