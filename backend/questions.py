
import io_utlis



def generate_question(text, answer, f1, f2, f3, f4):
    return {
        'q': text,
        'a': {
            str(answer): True,
            str(f1): False,
            str(f2): False,
            str(f3): False,
            str(f4): False,
        }
    }


j = {'cat1': {}, 'cat2': {}, 'cat3': {}, 'cat4': {}, 'cat5': {}, 'cat6': {}}

j['cat1']['10'] = generate_question('Wieviele Bücher hat die Bibel?', 66, 50, 55, 72, 60)
j['cat1']['30'] = generate_question('Wer gehört nicht zu den ersten vier Jüngern?', 'Bartolomäus', 'Andreas', 'Petrus', 'Philipus', 'Jakobus')
j['cat1']['40'] = generate_question('Welches ist das kürzeste Buch der Bibel (Verse)?', '2. Johannes', 'Obadja', 'Philemon', 'Hiob', 'Titus')
j['cat1']['50'] = generate_question('In welchem Buch wird das dieses Geschöpf beschrieben? Sein Anblick war grauenerregend, und es strotzte vor Kraft. Was es mit seinen gewaltigen Zähnen aus Eisen nicht zermalmte, das zertrat es mit den Füssen. Von den anderen Tieren unterschied es sich völlig. Es hatte zehn Hörner.',
                                    'Daniel', 'Jesaja', 'Offenbarung', '1. Mose', 'Hohelied')

io_utlis.save_json(j, 'C:\\Users\\nadina\\Documents\\code\\QuizOhneBeni\\api\\storage\\questions.json')