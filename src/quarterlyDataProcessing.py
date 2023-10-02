import csv
import os

def find(a):
    if int(a[3:]) <= 3 and int(a[3:]) >= 1:
        return a[:2]+'-1'
    if int(a[3:]) <= 6 and int(a[3:]) >= 3:
        return a[:2]+'-2'
    if int(a[3:]) <=9  and int(a[3:]) >=6:
        return a[:2]+'-3'
    if int(a[3:]) <=12 and int(a[3:]) >=9:
        return a[:2]+'-4'

current_directory = os.path.dirname(os.path.abspath(__file__))

csv_file_path = os.path.join(current_directory, 'frontend_dataset', 'coin_BinanceCoin.csv')

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

count = {}
quarterdata = {}
ans_list = []

for data_point in data_list:
    year = data_point["year"]
    close = data_point["close"]
    month = year[2:7]
    quarter=find(month)
    if quarter not in quarterdata:
        quarterdata[quarter] = []
    
    quarterdata[quarter].append(close)

for quarter, closes in quarterdata.items():
    average_close = sum(closes) / len(closes)
    ans_list.append({"quarter": quarter, "close": average_close})

ans_list = ans_list[-10:]

# for data_point in ans_list:
#     print(data_point)
# print("data: [")
# for data_point in ans_list:
#     print("  {")
#     print(f"    x: \"{data_point['quarter']}\",")
#     print(f"    y: {data_point['close']},")
#     print("  },")
# print("]")
with open("output.txt", "w") as file:
    file.write("data: [\n")
    for data_point in ans_list:
        file.write("  {\n")
        file.write(f"    x: \"{data_point['quarter']}\",\n")
        file.write(f"    y: {data_point['close']},\n")
        file.write("  },\n")
    file.write("]\n")