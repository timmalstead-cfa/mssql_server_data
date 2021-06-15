CREATE DATABASE thrive;
GO

USE thrive;

CREATE TABLE organizations
(
    relation_id INT PRIMARY KEY,
    name_english NVARCHAR(MAX),
    name_spanish NVARCHAR(MAX),
    website NVARCHAR(MAX),
    languages_spoken_english NVARCHAR(MAX),
    languages_spoken_spanish NVARCHAR(MAX),
    customers_served_english NVARCHAR(MAX),
    customers_served_spanish NVARCHAR(MAX),
    notes_english NVARCHAR(MAX),
    notes_spanish NVARCHAR(MAX),
    categories_english NVARCHAR(MAX),
    categories_spanish NVARCHAR(MAX),
    tags_english NVARCHAR(MAX),
    tags_spanish NVARCHAR(MAX)
);

CREATE TABLE locations
(
    relation_id INT PRIMARY KEY,
    latitude FLOAT(10),
    longitude FLOAT(10),
    zip INT,
    city NVARCHAR(MAX),
    name NVARCHAR(MAX),
    website NVARCHAR(MAX),
    address NVARCHAR(MAX),
    address_2 NVARCHAR(MAX),
    state NVARCHAR(MAX),
    phone NVARCHAR(MAX),
    email NVARCHAR(MAX),
    notes NVARCHAR(MAX)
);

CREATE TABLE services
(
    relation_id INT PRIMARY KEY,
    name_english NVARCHAR(MAX),
    name_spanish NVARCHAR(MAX),
);

CREATE TABLE schedules
(
    relation_id INT PRIMARY KEY,
    open_time NVARCHAR(MAX),
    close_time NVARCHAR(MAX),
    days NVARCHAR(MAX),
    notes NVARCHAR(MAX)
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

CREATE TABLE is_this_usefuls
(
    relation_id INT PRIMARY KEY IDENTITY(1,1),
    created_at SMALLDATETIME,
    is_useful BIT,
    route NVARCHAR
(MAX),
    language NVARCHAR
(MAX),
    comment NVARCHAR
(MAX)
);

EXEC sp_rename 'organizations.relation_id', 'id', 'COLUMN';
EXEC sp_rename 'locations.relation_id', 'id', 'COLUMN';
EXEC sp_rename 'services.relation_id', 'id', 'COLUMN';
EXEC sp_rename 'schedules.relation_id', 'id', 'COLUMN';
EXEC sp_rename 'is_this_usefuls.relation_id', 'id', 'COLUMN';

BULK INSERT organizations FROM '/mnt/mssql_server_data/data/organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT locations FROM '/mnt/mssql_server_data/data/locations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT services FROM '/mnt/mssql_server_data/data/services.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT schedules FROM '/mnt/mssql_server_data/data/schedules.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT locations_organizations FROM '/mnt/mssql_server_data/data/locations_organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT schedules_locations FROM '/mnt/mssql_server_data/data/schedules_locations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT schedules_organizations FROM '/mnt/mssql_server_data/data/schedules_organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT services_locations FROM '/mnt/mssql_server_data/data/services_locations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT services_organizations FROM '/mnt/mssql_server_data/data/services_organizations.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);

BULK INSERT is_this_usefuls FROM '/mnt/mssql_server_data/data/is_this_useful_processed.csv' WITH ( FIELDTERMINATOR = ',', ROWTERMINATOR = '\n', FIRSTROW=2);