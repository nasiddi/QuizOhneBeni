
import io_utlis

points = {'10': True, '20': True, '30': True, '40': True, '50': True}
cats = ['Bibelwissen', 'Schulwissen', 'Ferien am Meer', 'Nicht gelistet', 'What\'s that Tune?', 'Entertainment']
j = {'cat1': points.copy(), 'cat2': points.copy(), 'cat3': points.copy(), 'cat4': points.copy(), 'cat5': points.copy(), 'cat6': points.copy()}

for i in range(1 , 7):
    j['cat' + str(i)]['name'] = cats[i - 1]
    j['cat' + str(i)]['cat'] = 'cat' + str(i)
io_utlis.save_json(j, 'cat_clicked.json')
