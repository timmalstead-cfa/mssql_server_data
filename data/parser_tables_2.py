from typing import List
from csv import reader

final_csv: str = ""

try:
    with open("/Users/tim/Documents/Code_For_America/mssql_server_data/data/reworking_data/organizations.csv") as csv_data:
        csv_file: List = list(reader(csv_data, delimiter=","))

        for index, page in enumerate(csv_file):
            if(index == 0):
                final_csv += f"{','.join(page)}\n"
                continue
            else:
                for column in range(1, 14):
                    if(page[column]):
                        page[column] = page[column].replace("\"", "'")

            final_string: str = f"{','.join(page)}\n"

            final_csv += final_string

    with open('/Users/tim/Documents/Code_For_America/mssql_server_data/data/reworking_data/organizations_processed.csv', 'w') as processed_csv:
        processed_csv.write(final_csv)

except Exception as error:
    print(f"#{error.__class__} occured when trying to parse the csv.")
