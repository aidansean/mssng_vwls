from project_module import project_object, image_object, link_object, challenge_object

p = project_object('mssng_vwls', 'Only Connect Missing Vowels game')
p.domain = 'http://www.aidansean.com/'
p.path = 'mssng_vwls'
p.preview_image_ = image_object('http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg', 408, 287)
p.github_repo_name = 'mssng_vwls'
p.mathjax = False
p.links.append(link_object(p.domain, 'marathon', 'Live page'))
p.introduction = 'Once I came across Only Conncet I became a big fan, and especially enjoyed the Missing Vowels game.  I thought this could use a game that people could play online to complement the existing "Connecting Wall" game.'
p.overview = '''The user is given a series of consonants and has to type the complete phrase, with vowels, into the input.  Event listeners handle all the user interaction and update the score when the enter key is pressed.  The quiz is timed so that the user gets 10 seconds per clue.  The categories are separate from the rest of the code to make it easier for contributors to add new categories (although in reality they still email me lists instead of sending me an updated file).'''

p.challenges.append(challenge_object('The user interface had to be very intuitive.', 'After a few iterations I made the interface as simple as possible.  The interface matches the show quite well, making it easier.  Even so, the uers has to type the answers instead of speaking them, and some users have complained that the string matching should be tolerant of simple mistakes.', 'Resolved, to be revisited'))

p.challenges.append(challenge_object('The style should match the show, as much as possible.', 'This project gave an excellent opportunity to work on CSS styling and it was a lot of fun to come up with the colour scheme to match the show.', 'Resolved'))
