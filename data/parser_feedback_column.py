from typing import List
from csv import reader

final_csv: str = ""

try:
    with open("/Users/tim/Documents/Code_For_America/mssql_server_data/data/is_this_useful.csv") as csv_data:
        csv_file: List = list(reader(csv_data, delimiter=","))

        for index, page in enumerate(csv_file):
            if(index == 0):
                final_csv += f"{','.join(page)}\n"
                continue
            else:
                for index, column in enumerate(page):
                    if(index == 1):
                        column_as_list: List = column.split(' ')
                        column_as_list[1] += ':00'

                        date: List = column_as_list[0].split('/')
                        date.reverse()

                        mapped_dates: List = [string.rjust(
                            2, '0') for string in date]

                        column_as_list[0] = '-'.join(mapped_dates)
                        page[index] = " ".join(column_as_list)

            final_string: str = f"{','.join(page)}\n"

            final_csv += final_string

    with open('/Users/tim/Documents/Code_For_America/mssql_server_data/data/is_this_useful_processed.csv', 'w') as processed_csv:
        processed_csv.write(final_csv)

except Exception as error:
    print(f"#{error.__class__} occured when trying to parse the csv.")
