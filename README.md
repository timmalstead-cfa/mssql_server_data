# ThriveSBC Server Data

A simple instance of MS SQL Server to created to help understand the shape of data to be used for the [ThriveSBC](https://github.com/codeforamerica/sb_reentry_app) project.

## Setup

### Install Docker

The simplest (I feel) way to get a clean install of MS Sql Server going is via Docker.

Clone the repo and download [Docker Desktop](https://www.docker.com/products/docker-desktop) and install.

### Starting Docker

Once Docker is installed, input the following in your CLI:

`sudo docker run -d -v **ABSOLUTE_PATH_TO_MSSQL_SERVER_DATA_FOLDER**/mssql_server_data/data:/mnt/mssql_server_data/data -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Dev_Ms_SQL_Server_2019" -p 1433:1433 --name SQL_SERVER_2019 mcr.microsoft.com/mssql/server:2019-latest`

replacing `**ABSOLUTE_PATH_TO_MSSQL_SERVER_DATA_FOLDER**` with the absolute path in your system leading to the cloned repo. This will map that directory to `/mnt/mssql_server_data/data` and allow you to access the contents of that folder from inside the Docker container.

### Seeding the Database

Once that is up and running, enter:

`sudo docker exec -it SQL_SERVER_2019 "bash"`

on a fresh terminal window.

Once you are on the command line of the container, enter:

`/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "Dev_Ms_SQL_Server_2019" -i /mnt/mssql_server_data/data/seed_database.sql`

to seed the database.
