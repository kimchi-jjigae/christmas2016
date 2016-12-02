# -*- coding: utf-8 -*-

from bottle import error, get, post, response, request, route, run, static_file

#######################
### ↓ server code ↓ ###
#######################

# at the very end, we want to send a post request with all the necessary information, modifying and returning the high score list 

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
