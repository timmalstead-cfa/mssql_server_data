from typing import List
from csv import reader

final_csv: str = ""

accented_chars = ['Á', 'É', 'Í', 'Ñ', 'Ó', 'Ú', 'Ü',
                  'á', 'é', 'í', 'ñ', 'ó', 'ú', 'ü', '¿', '¡']
standard_chars = ['A', 'E', 'I', 'N', 'O', 'U', 'U',
                  'a', 'e', 'i', 'n', 'o', 'u', 'u', '?', '!']

try:
    with open("./schedules.csv") as csv_data:
        csv_file: List = list(reader(csv_data, delimiter=","))

        for index, page in enumerate(csv_file):
            if(index == 0):
                final_csv += f"{','.join(page)}\n"
                continue
            else:
                for column in range(1, 5):
                    if(page[column]):
                        page[column] = "\"" + page[column] + "\""
                        page[column] = page[column].replace('\n', '')
                        page[column] = page[column].replace(',', '<&&>')
                        for char in page[column]:
                            if char in accented_chars:
                                accented_char_index = accented_chars.index(
                                    char)
                                page[column] = page[column].replace(
                                    char, standard_chars[accented_char_index])

            final_string: str = f"{','.join(page)}\n"

            final_csv += final_string

    with open('./schedules_processed.csv', 'w') as processed_csv:
        processed_csv.write(final_csv)

except Exception as error:
    print(f"#{error.__class__} occured when trying to parse the csv.")
