import json

file_path = 'convert.json'
with open(file_path, 'r', encoding='utf-8') as file:
    convert = json.load(file)

file_path = 'Exam.js'
lines = []
with open(file_path, 'r', encoding='utf-8') as file:
    for line in file:
        lines.append(line.rstrip('\n'))

for line in lines:
    for key, value in convert.items():
        line = line.replace(key, value)
    print(line)