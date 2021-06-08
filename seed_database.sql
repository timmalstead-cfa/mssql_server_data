CREATE DATABASE thrive;
GO

USE thrive;

CREATE TABLE organizations
(
    relation_id INT PRIMARY KEY,
    name_english TEXT,
    name_spanish TEXT,
    website TEXT,
    languages_spoken_english TEXT,
    languages_spoken_spanish TEXT,
    customers_served_english TEXT,
    customers_served_spanish TEXT,
    notes_english TEXT,
    notes_spanish TEXT,
    categories_english TEXT,
    categories_spanish TEXT,
    tags_english TEXT,
    tags_spanish TEXT
);

CREATE TABLE locations
(
    relation_id INT PRIMARY KEY,
    latitude FLOAT(10),
    longitude FLOAT(10),
    zip INT,
    city TEXT,
    name TEXT,
    website TEXT,
    address TEXT,
    address_2 TEXT,
    state TEXT,
    phone TEXT,
    email TEXT,
    notes TEXT
);

CREATE TABLE services
(
    relation_id INT PRIMARY KEY,
    name_english TEXT,
    name_spanish TEXT
);

CREATE TABLE schedules
(
    relation_id INT PRIMARY KEY,
    open_time TEXT,
    close_time TEXT,
    days TEXT,
    notes TEXT
);

CREATE TABLE locations_organizations
(
    locations_id INT,
    organizations_id INT
);

CREATE TABLE schedules_locations
(
    schedules_id INT,
    locations_id INT
);

CREATE TABLE schedules_organizations
(
    schedules_id INT,
    organizations_id INT
);

CREATE TABLE services_locations
(
    services_id INT,
    locations_id INT
);

CREATE TABLE services_organizations
(
    services_id INT,
    organizations_id INT
);

EXEC sp_rename 'organizations.relation_id', 'id', 'COLUMN';
EXEC sp_rename 'locations.relation_id', 'id', 'COLUMN';
EXEC sp_rename 'services.relation_id', 'id', 'COLUMN';
EXEC sp_rename 'schedules.relation_id', 'id', 'COLUMN';

BULK INSERT organizations FROM '/mnt/mssql_server_data/organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT locations FROM '/mnt/mssql_server_data/locations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT services FROM '/mnt/mssql_server_data/services.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT schedules FROM '/mnt/mssql_server_data/schedules.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT locations_organizations FROM '/mnt/mssql_server_data/locations_organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT schedules_locations FROM '/mnt/mssql_server_data/schedules_locations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT schedules_organizations FROM '/mnt/mssql_server_data/schedules_organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT services_locations FROM '/mnt/mssql_server_data/services_locations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT services_organizations FROM '/mnt/mssql_server_data/services_organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);