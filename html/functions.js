function category_object(clue, answers){
  this.clue    = clue    ;
  this.answers = answers ;
}
// All in ms
var delay        =   100 ;
var big_delay    =  1000 ;
var bigger_delay =  2000 ;
var timer_start  = 10000 ;
var game_timer   = 1000*60*2 ;
var game_timer_delay = 1000 ;

var n_total   = 0 ;
var n_correct = 0 ;
var paused  = true  ;
var started = false ;
var done    = false ;

var answers_per_category  = 4 ;
var answers_this_category = 4 ;

var category = '' ;
var clue = '' ;
var full_answer = '' ;
var filtered_answer = '' ;
var disenvoweled_answer = '' ;
function stopwatch(){
  if(paused) return ;
  if(done  ) return ;
  timer = timer-delay ;
  var ds = Math.floor((timer%1000)/100) ;
  var s  = Math.floor(timer/1000) ;
  Get('time_seconds').innerHTML = s+'.'+ds+'s' ;
  if(timer<=0){
    make_guess() ;
    paused = true ;
  }
  window.setTimeout(stopwatch,delay) ;
}
function start(){
  document.addEventListener('keydown', keyDown) ;
  prepare_next_clue() ;
  Get('input_guess').value = '' ;
  Get('input_guess').focus() ;
  //Get('input_guess').addEventListener('change', capitalize) ;
}
function end_game(){
  done = true ;
  var message = random_element(response_timeout) ;
  finish_game(message) ;
}
function update_game_time(){
  var s_all = Math.floor(game_timer/1000) ;
  var minutes = Math.floor(s_all/60) ;
  var seconds = s_all - 60*minutes ;
  if(seconds==00){ seconds = '00' ; }
  else if(seconds<10){ seconds = '0' + seconds ; }
  Get('td_game_time').innerHTML = minutes + ':' + seconds ;
  if(done) return ;
  game_timer -= game_timer_delay ;
  window.setTimeout(update_game_time,game_timer_delay) ;
}

function keyDown(evt){
  var keyDownID = window.event ? event.keyCode : (evt.keyCode != 0 ? evt.keyCode : evt.which) ;
  if(keyDownID==8) evt.preventDefault ;
  switch(keyDownID){
    case 32:
      evt.preventDefault() ;
      if(started==false){
        started = true ;
        window.setTimeout(end_game,game_timer) ;
        update_game_time() ;
        prepare_next_clue() ;
      }
      else if(paused==false){
        Get('input_guess').value = Get('input_guess').value + ' '  ;
      }
      break ;
    case 13:
      evt.preventDefault() ;
      if(paused || started==false){
        started = true ;
        prepare_next_clue() ;
      }
      else{
        make_guess() ;
      }
      break ;
    case 27:
       done = true ;
       Get('div_clue'          ).innerHTML = '&nbsp;' ;
       Get('div_missing_vowels').innerHTML = '&nbsp;' ;
       Get('input_guess').value = '' ;
       Get('div_message'       ).className = 'message_neutral' ;
       Get('div_missing_vowels').className = 'div_missing_vowels_neutral' ;
       Get('div_message').innerHTML = 'You scored ' + n_correct + ' out of a possible ' + n_total + ' points.' ;
      break ;
  }
}
function finish_game(message){
  Get('div_clue'          ).innerHTML = '&nbsp;' ;
  Get('div_missing_vowels').innerHTML = '&nbsp;' ;
  Get('input_guess'       ).value = '' ;
  Get('div_message'       ).className = 'message_neutral' ;
  Get('div_missing_vowels').className = 'div_missing_vowels_neutral' ;
  Get('div_message').innerHTML = message + '<br />You scored ' + n_correct + ' out of a possible ' + n_total + ' points.' ;
}
function prepare_next_clue(){
  if(started==false) return ;
  if( paused==false) return ;
  if(   done==true ) return ;
  if(answers_this_category==answers_per_category){
    if(all_categories.length==0){
      finish_game('I\'m sorry, I\'m out of categories.') ;
      return ;
    }
    var index = Math.floor(all_categories.length*Math.random()) ;
    category = all_categories.splice(index,1)[0] ;
    answers_this_category = 0 ;
  }
  answers_this_category++ ;
  clue = category.clue ;
  var index = Math.floor(category.answers.length*Math.random()) ;
  full_answer = category.answers.splice(index,1)[0] ;
  disenvoweled_answer = disenvowel_phrase(full_answer) ;
  spaced_answer = add_spaces(disenvoweled_answer) ;
  filtered_answer = filter_chars(full_answer) ;
  Get('div_missing_vowels').innerHTML = spaced_answer ;
  Get('div_clue').innerHTML = clue ;
  timer = timer_start ;
  paused = false ;
  Get('input_guess').value = '' ;
  Get('input_guess').focus() ;
  Get('div_message').innerHTML = '&nbsp;' ;
  Get('div_message').className = 'message_none' ;
  Get('div_missing_vowels').className = 'div_missing_vowels_neutral' ;
  update_scores() ;
  stopwatch() ;
}
function update_scores(){
  Get('td_score_total'    ).innerHTML = n_total     ;
  Get('td_score_correct'  ).innerHTML = n_correct   ;
  Get('td_score_incorrect').innerHTML = n_total-n_correct ;
}
function disenvowel_phrase(phrase_in){
  var phrase_out = '' ;
  phrase_in = phrase_in.toUpperCase() ;
  var vowels = ['A','E','I','O','U',' '] ;
  var consonants = 'BCDFGHJKLMNPQRSTVWXYZ' ;
  for(var i=0 ; i<phrase_in.length ; i++){
    var escape = false ;
    for(var j=0 ; j<consonants.length ; j++){
      if(phrase_in[i]==consonants[j]) escape = true ;
    }
    if(!escape) continue ;
    phrase_out = phrase_out + phrase_in[i] ;
  }
  return phrase_out ;
}
function add_spaces(phrase_in){
  var l = phrase_in.length ;
  var nSpaces = Math.floor(l/3.0) ;
  for(var i=0 ; i<nSpaces ; i++){
    var success = false ;
    var counter = 0 ;
    while(success==false && counter<1000){
      counter++ ;
      var index = Math.floor(phrase_in.length*Math.random()) ;
      if(index>0 && index<phrase_in.length-1){
        if(phrase_in[index-1]!=' ' && phrase_in[index+1]!=' '){
          phrase_in = phrase_in.substring(0,index) + ' ' + phrase_in.substring(index,phrase_in.length) ;
          success = true ;
        }
      }
    }
  }
  return phrase_in ;
}
function filter_chars(str){
  str = str.replace(/[^a-zA-Z ]/g, '')
  str = str.toUpperCase() ;
  str = str.trim() ;
  return str ;
}
function random_element(arr){
  return arr[Math.floor(arr.length*Math.random())] ;
}
function make_guess(){
  if(paused) return ;
  n_total++ ;
  var guess = Get('input_guess').value ;
  var filtered_guess = filter_chars(guess) ;
  if(filtered_guess==filtered_answer){
    Get('div_missing_vowels').innerHTML = full_answer ;
    Get('div_message'       ).className = 'message_success' ;
    Get('div_missing_vowels').className = 'div_missing_vowels_success' ;
    Get('div_message'       ).innerHTML = random_element(response_correct_guesses  ) ;
    paused = true ;
    n_correct++ ;
  }
  else{
    Get('div_message'       ).className = 'message_failure' ;
    Get('div_missing_vowels').className = 'div_missing_vowels_failure' ;
    Get('div_message'       ).innerHTML = random_element(response_incorrect_guesses) ;
    paused = true ;
  }
  Get('div_missing_vowels').innerHTML = full_answer.toUpperCase() ;
  update_scores() ;
  window.setTimeout(prepare_next_clue, big_delay) ;
}
function Get(id){ return document.getElementById(id) ; }