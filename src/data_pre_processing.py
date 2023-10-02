import csv
import os

current_directory = os.path.dirname(os.path.abspath(__file__))

csv_file_path = os.path.join(current_directory, 'frontend_dataset', 'coin_Monero.csv')

data_list = []
ans_list = []

with open(csv_file_path, 'r') as file:
    reader = csv.reader(file)

    for row in reader:
        year = row[3][:4]
        close = row[7]  
        if year == "Date":
            continue
        data_point = {
            "year": int(year),
            "close": float(close)
        }
        data_list.append(data_point)
        
yearly_averages = []

year_data = {}
for data_point in data_list:
    year = data_point["year"]
    close = data_point["close"]
    
    if year not in year_data:
        year_data[year] = []
    
    year_data[year].append(close)

for year, closes in year_data.items():
    average_close = sum(closes) / len(closes)
    ans_list.append({"year": year, "close": average_close})
    
# last = data_list[0]['year']
# count = 0
# sum = 0
# for data_point in data_list:
#     if data_point['year'] != last:
#         this = {
#             "year": last,
#             "close": sum/count
#         }
#         data_list.append(data_point)
#         count = 1
#         sum = data_point['close']
#         last = data_point['year']
#     else:
#         count += 1
#         sum += data_point['close']
# for row in data_list:
#     print(row)
# print("data: [")
# for data_point in ans_list:
#     print("  {")
#     print(f"    x: \"{data_point['year']}\",")
#     print(f"    y: {data_point['close']},")
#     print("  },")
# print("]")
output_file = 'output.txt'
with open(output_file, 'w') as file:
    file.write("data: [\n")
    for data_point in ans_list:
        file.write("  {\n")
        file.write(f"    x: \"{data_point['year']}\",\n")
        file.write(f"    y: {data_point['close']},\n")
        file.write("  },\n")
    file.write("]\n")
    
# sum = 0
# count = 0
# for data_point in data_list:
#     year = data_point["year"]
#     close = data_point["close"]
#     if year == 2021:
#         sum += close
#         count += 1
# print(sum/count)