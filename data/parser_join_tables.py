from typing import List
from csv import reader

final_csv: str = ""

try:
    with open("./join/services_organizations.csv") as csv_data:
        csv_file: List = list(reader(csv_data, delimiter=","))

        for index, page in enumerate(csv_file):
            if(index == 0):
                final_csv += f"{','.join(page)}\n"
                continue
            else:
                first_val, second_val = page[0], page[1]
                is_second_value: bool = bool(second_val)
                if(is_second_value):
                    if(second_val.find(',') != -1):
                        second_value_list: List = second_val.split(',')
                        for value in second_value_list:
                            line_to_insert: str = first_val + ',' + value.strip()
                            final_csv += f"{line_to_insert}\n"
                    else:
                        final_csv += f"{','.join(page)}\n"
                else:
                    final_csv += f"{','.join(page)}\n"

    with open('./join/services_organizations_processed.csv', 'w') as processed_csv:
        processed_csv.write(final_csv)

except Exception as error:
    print(f"#{error.__class__} occured when trying to parse the csv.")
