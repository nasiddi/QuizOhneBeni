import io_utlis
import pandas as pd


def generate_question(text='', answer='', f1='', f2='', f3='', f4='', img='', audio=''):
    return {
        'q': text,
        'a': {
            answer: True,
            f1: False,
            f2: False,
            f3: False,
            f4: False,
        },
        'img': img,
        'audio': audio,
    }


csv = pd.read_csv('/Users/nadina/code/QuizOhneBeni/api/storage/questions.csv', header=0, delimiter=",", quoting=0, quotechar='"',
                       encoding='utf-8', dtype='str', keep_default_na=False, error_bad_lines=False)
j = {'cat1': {}, 'cat2': {}, 'cat3': {}, 'cat4': {}, 'cat5': {}, 'cat6': {}}
for index, row in csv.iterrows():
    if not row.text:
        break
    j[row['cat']][row.points] = generate_question(text=row.text,
                      answer=row.answer,
                      f1=str(row.f1),
                      f2=str(row.f2),
                      f3=str(row.f3),
                      f4=str(row.f4),
                      img=row.img,
                      audio=row.audio)

pass
print(j)
io_utlis.save_json(j, '/Users/nadina/code/QuizOhneBeni/api/storage/questions.json')































# j = {'cat1': {}, 'cat2': {}, 'cat3': {}, 'cat4': {}, 'cat5': {}, 'cat6': {}}
#
# j['cat1']['10'] = generate_question(
#     text='Wieviele Bücher hat die Bibel?',
#     answer=66,
#     f1=50,
#     f2=55,
#     f3=72,
#     f4=60)
# j['cat1']['30'] = generate_question('Wer gehört nicht zu den ersten vier Jüngern?', 'Bartolomäus', 'Andreas', 'Petrus', 'Philipus', 'Jakobus', audio='elvis.mp3')
# j['cat1']['40'] = generate_question('Welches ist das kürzeste Buch der Bibel (Verse)?', '2. Johannes', 'Obadja', 'Philemon', 'Hiob', 'Titus', audio='elvis.mp3')
# j['cat1']['50'] = generate_question('In welchem Buch wird das dieses Geschöpf beschrieben? Sein Anblick war grauenerregend, und es strotzte vor Kraft. Was es mit seinen gewaltigen Zähnen aus Eisen nicht zermalmte, das zertrat es mit den Füssen. Von den anderen Tieren unterschied es sich völlig. Es hatte zehn Hörner.',
#                                     'Daniel', 'Jesaja', 'Offenbarung', '1. Mose', 'Hohelied', img='movie_4.png')
#
# io_utlis.save_json(j, 'C:\\Users\\Nadina\\Documents\\code\\QuizOhneBeni\\api\\storage\\questions.json')