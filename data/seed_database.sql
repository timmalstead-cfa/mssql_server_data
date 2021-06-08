CREATE DATABASE thrive;
GO

USE thrive;

CREATE TABLE organizations
(
    relation_id INT PRIMARY KEY,
    name_english VARCHAR(MAX),
    name_spanish VARCHAR(MAX),
    website VARCHAR(MAX),
    languages_spoken_english VARCHAR(MAX),
    languages_spoken_spanish VARCHAR(MAX),
    customers_served_english VARCHAR(MAX),
    customers_served_spanish VARCHAR(MAX),
    notes_english VARCHAR(MAX),
    notes_spanish VARCHAR(MAX),
    categories_english VARCHAR(MAX),
    categories_spanish VARCHAR(MAX),
    tags_english VARCHAR(MAX),
    tags_spanish VARCHAR(MAX)
);

CREATE TABLE locations
(
    relation_id INT PRIMARY KEY,
    latitude FLOAT(10),
    longitude FLOAT(10),
    zip INT,
    city VARCHAR(MAX),
    name VARCHAR(MAX),
    website VARCHAR(MAX),
    address VARCHAR(MAX),
    address_2 VARCHAR(MAX),
    state VARCHAR(MAX),
    phone VARCHAR(MAX),
    email VARCHAR(MAX),
    notes VARCHAR(MAX)
);

CREATE TABLE services
(
    relation_id INT PRIMARY KEY,
    name_english VARCHAR(MAX),
    name_spanish VARCHAR(MAX)
);

CREATE TABLE schedules
(
    relation_id INT PRIMARY KEY,
    open_time VARCHAR(MAX),
    close_time VARCHAR(MAX),
    days VARCHAR(MAX),
    notes VARCHAR(MAX)
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

BULK INSERT organizations FROM '/mnt/mssql_server_data/data/organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT locations FROM '/mnt/mssql_server_data/data/locations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT services FROM '/mnt/mssql_server_data/data/services.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT schedules FROM '/mnt/mssql_server_data/data/schedules.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT locations_organizations FROM '/mnt/mssql_server_data/data/locations_organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT schedules_locations FROM '/mnt/mssql_server_data/data/schedules_locations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT schedules_organizations FROM '/mnt/mssql_server_data/data/schedules_organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT services_locations FROM '/mnt/mssql_server_data/data/services_locations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT services_organizations FROM '/mnt/mssql_server_data/data/services_organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);