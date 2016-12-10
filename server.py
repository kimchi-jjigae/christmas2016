# -*- coding: utf-8 -*-

from bottle import error, get, post, response, request, route, run, static_file

#######################
### ↓ server code ↓ ###
#######################

# at the very end, we want to send a post request with all the necessary information, modifying and returning the high score list 

def create_highscore(name, score):
    highscore = {
        'name': name,
        'score': score,
    }
    return highscore

class Highscores:
    highscores = []

    def add_highscore(highscore):
    """Adds a highscore entry to the highscores list and returns a top 10 list.

    The top 10 list either: includes the current score, or
    has the current score on the end if it is not part of the top 10.
    The current score is returned with an extra bool.
    """
        for score, index in highscores:
            if(highscore.score > score):
                highscores.insert(highscore, index)
                highscore_index = index
                break

        if(highscore_index < 10):
            top_ten = highscores[0:10]
            top_ten[highscore_index].highlight = True
        else:
            top_ten = highscores[0:10]
            top_ten.append(highscores[highscore_index])
            top_ten[-1].highlight = True

        return top_ten
        



# high scores list:
# sorted list, sorted by high score

# high score:
# - name
# - score

# retrieving high scores:
# add to list
# sort list
# client wants to know self! so have that info, too

#@get('/session_id')
#def create_session_cache():
#    return new_session_id

def valid_score(score):
    validity = True
    if score > INT_MAX / 2:
        validity = False
    return validity

@post('/new_score')
def new_score():
    data = ast.literal_eval(request.body.read())
    score = data['score']
    if(valid_score(score)):
        sort_score(score)

    return tiles.wrapped_tiles()

@route('/<filepath:path>')
def serve_site(filepath):
    return static_file(filepath, root='./site')

@error(404)
def error404(error):
    return "404 Not Found"

run(host='127.0.0.1', port=8000, debug=True, reloader=True)
