import csv
import os

current_directory = os.path.dirname(os.path.abspath(__file__))

csv_file_path = os.path.join(current_directory, 'frontend_dataset', 'coin_Dogecoin.csv')

data_list = []
ans_list = []

with open(csv_file_path, 'r') as file:
    reader = csv.reader(file)

    for row in reader:
        year = row[3]
        close = row[7]  
        if year == "Date":
            continue
        data_point = {
            "year": year,
            "close": float(close)
        }
        data_list.append(data_point)


last_ten_rows = data_list[-10:]
    
output_file = 'output.txt'
with open(output_file, 'w') as file:
    file.write("data: [\n")
    for row in last_ten_rows:
        year = row["year"]
        close = row["close"]
        year = year[6:10]
        file.write("  {\n")
        file.write(f"    x: \"{year}\",\n")
        file.write(f"    y: {close},\n")
        file.write("  },\n")
    file.write("]\n")