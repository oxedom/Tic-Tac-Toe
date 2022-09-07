# Tic-Tac-Toe
Tic Tac Toe Assignment - TheOdinProject 


Summary of the project:

This isn't my first Tic Tac Toe project although it was my first time implementing a revealing Moudle pattern design pattern in JS, as well as gaining a depper understanding of Objects and Object Constructors. The project wasn't easy at first but after laying out a structure of three IFFE modules (Dom Game and libs) and one Player Factory Function I started understanding the importance of
design patterns. Reuseablity, easy to implement,remove features and a better way to state manage.

I'm not going to lie, there a few odd functions floating around in that app.js to make the game work (shout out to clearMoves() on line 44 and _checkTie() around line 200... ) but I do like the elegent way of checking for wins in the _checkWin() function, using some and every array methods.

It's not perfect but It does more than enough for X and O and more importantly I felt like I learned a lot more than I was expecting to learn. I hope to god this is my last XO ever because I'm sick of dealing with you!

Oh by the way I added my planning notes down bellow...


Planning stage // 

Features I want
Welcome Screen card that has a PLAY button

- When pressed the welcome card fades out 
Two empty cards apair of Player One Player Two
- player can choose if he is X or O
- Each Player can Choose his Symbol and Color (How to color SVGs)
- Player can choose his playername
- Each players ICON will be his symbol

Game Logic:
Who's turn
3X3 GRID
Each GRID will have have a value from 0-8; (coordinates)
Players has a moves array (Location of Symbols ie 0,1,2 or 0,4,6)
Reset board button
Keep Track of player scores + ties;
NEW GAME restarts


Card Logic:
Starts off at Player One
Player two

