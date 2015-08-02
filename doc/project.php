<?php
include_once($_SERVER['FILE_PREFIX']."/project_list/project_object.php") ;
$github_uri   = "https://github.com/aidansean/mssng_vwls" ;
$blogpost_uri = "http://aidansean.com/projects/?tag=mssng_vwls" ;
$project = new project_object("mssng_vwls", "Only Connect Missing Vowels game", "https://github.com/aidansean/mssng_vwls", "http://aidansean.com/projects/?tag=mssng_vwls", "mssng_vwls/images/project.jpg", "mssng_vwls/images/project_bw.jpg", "Once I came across Only Connect I became a big fan, and especially enjoyed the Missing Vowels game.  I thought this could use a game that people could play online to complement the existing \"Connecting Wall\" game.", "Games", "CSS,HTML,JavaScript") ;
?>