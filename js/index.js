var userOX;
var comOX;

var currentturn;

var boardTrack = {"left-top": 0,
             "middle-top": 0,
             "right-top": 0,
             "left-middle": 0,
             "middle-middle": 0,
             "right-middle": 0,
             "left-bottom": 0,
             "middle-bottom": 0,
             "right-bottom": 0 
            };
var isDown;

var mcount = 0;

var mode = 1;

var bO = document.getElementById("O");
var bX = document.getElementById("X");


///// Tic Tac Toe Algorithm inspired by Akshay L Aradhya

//// Start AI

var player = 10; // "O"
var opponent = -10; //"X"

function isMovesLeft(b)
{
  for(var i in b){
      if (b.hasOwnProperty(i))
      {
          if(b[i]==0)
              return true;
  }
  }
  return false;
}

function evaluateline(b,i1,i2,i3){
	var result = b[i1] + b[i2] + b[i3];
    return result;
}
function evaluate(b)
{
    var score;
	score = evaluateline(b,"left-top","middle-top","right-top");
	if(score==30||score==-30)
		return score/3;
	score = evaluateline(b,"left-middle","middle-middle","right-middle");
	if(score==30||score==-30)
		return score/3;
	score = evaluateline(b,"left-bottom","middle-bottom","right-bottom");
	if(score==30||score==-30)
		return score/3;
	score = evaluateline(b,"left-top","left-middle","left-bottom");
	if(score==30||score==-30)
		return score/3;
	score = evaluateline(b,"middle-top","middle-middle","middle-bottom");
	if(score==30||score==-30)
		return score/3;
	score = evaluateline(b,"right-top","right-middle","right-bottom");
	if(score==30||score==-30)
		return score/3;
	score = evaluateline(b,"left-top","middle-middle","right-bottom");
	if(score==30||score==-30)
		return score/3;
	score = evaluateline(b,"right-top","middle-middle","left-bottom");
	if(score==30||score==-30)
		return score/3;
 
    // Else if none of them have won then return 0
    return 0;
}
function minimax(cboard, depth,isMax)
{
    var score = evaluate(cboard);

    // If Maximizer has won the game return his/her
    // evaluated score
    if (score == 10)
        return score;
 
    // If Minimizer has won the game return his/her
    // evaluated score
    if (score == -10)
        return score;
 
    // If there are no more moves and no winner then
    // it is a tie
    if (isMovesLeft(cboard)==false)
        return 0;
 
    // If this maximizer's move
    if (isMax)
    {
        var best = -1000;
//        console.log("find from Max");
        // Traverse all cells
        for(var i in cboard){
                // Check if cell is empty
                if (cboard.hasOwnProperty(i))
                {
					if(cboard[i]==0){
					// Make the move
					  cboard[i] = player;
					  // Call minimax recursively and choose
                    // the maximum value
                      best = Math.max( best,minimax(cboard, depth+1, false) );
                      
                    // Undo the move
                    cboard[i] = 0;
				    }
               
                }
        }
        
        return best;
    }
 
    // If this minimizer's move
    else
    {
        var best = 1000;
//        console.log("find from Min");
        // Traverse all cells
        for(var i in cboard){
                // Check if cell is empty
                if (cboard.hasOwnProperty(i))
                {
					if(cboard[i]==0){
					// Make the move
					  cboard[i] = opponent;
					  // Call minimax recursively and choose
                    // the maximum value
                      best = Math.min( best,minimax(cboard, depth+1, true) );
                      
                    // Undo the move
                    cboard[i] = 0;
				    }
                
                }
        }
        return best;
    }
}

function findBestMove(cboard)
{
    var bestVal = -1000;
    var bestMove;
    console.log("Start to find bestMove; current move: "+mcount);
	var corners = ["left-top","right-top","left-bottom","right-bottom"];

	if((mcount==0||mcount==1)&&cboard["middle-middle"]==0){
		return "middle-middle";
	}
	
	if(mcount==1){
	  var mcorner =  Math.floor(Math.random()*4);
	  return corners[mcorner];
	}

	// Traverse all cells, evalutae minimax function for
    // all empty cells. And return the cell with optimal
    // value.
    for (var i in cboard)
    {
         if (cboard.hasOwnProperty(i))
		 {
            // Check if celll is empty
            if (cboard[i]==0)
            {
                // Make the move
                cboard[i] = player;
  //              console.log(cboard);
                // compute evaluation function for this
                
                var moveVal = minimax(cboard, 0, false);
  //              console.log("moveVal:"+moveVal);
                // Undo the move
                cboard[i] = 0;
 
                // If the value of the current move is
                // more than the best value, then update
                // best/
                if (moveVal > bestVal)
                {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }
    }
 
    console.log("best value: "+bestVal+" best move: "+bestMove);
 
    return bestMove;

}



//// End of AI

function switchVisible() {
    var board1 = document.getElementById("chooseOX");
    var board2 = document.getElementById("checkboard");
//    console.log(board.style.display);

    if (board2.style.display !== 'block') {
   //      console.log("display: "+page2);
         board2.style.display = 'block';
         board1.style.display = 'none';
    }else {
         board2.style.display = 'none';
         board1.style.display = 'block';
    }
            
}

$("#uVu").click(function(){
     $( "h3.text-1" ).text("X first:");
     $( "h3.text-2" ).text("O first:");
     mode = 0;
     var val = $("#chooseOX").css("display");
     if(val!=="block"){
       switchVisible();
     }
     console.log("display value: "+val);
     resetBoard();
	 $("#display-info").text("Vs.");
     $("#UorC").html("<i class='fa fa-user' aria-hidden='true'></i>");
});

$("#uVc").click(function(){
     $( "h3.text-1" ).text("AI first:");
     $( "h3.text-2" ).text("You first:");
     mode = 1;
     var val = $("#chooseOX").css("display");
     if(val!=="block"){
       switchVisible();
     }
     console.log("display value: "+val);
     resetBoard();
	 $("#display-info").text("Vs.");
     $("#UorC").html("<i class='fa fa-laptop' aria-hidden='true'></i>");
});

bO.onclick = function(event){
  if(mode==1){
  userOX = "O";
  comOX = "X";
  console.log("userOX:"+userOX);
  }
  else{
    currentturn = "O";
  }
  switchVisible();
  mcount = 0;
};

bX.onclick = function(event){
  if(mode==1){
  userOX = "X";
  comOX = "O";
  console.log("userOX:"+userOX);
  disableBoard(boardTrack);
  switchVisible();
  mcount = 0;
  
  $("#display-info").text("AI Turn.");
  var timeout = setTimeout(function(){
    enableBoard(boardTrack);
	  var move = findBestMove(boardTrack);
	  console.log("first move:"+move);
	  boardTrack[move] = player;
	  mcount++;
	  var tdid = "#" + move;
	  $(tdid).text(comOX);
    $("#display-info").text("Your Turn.");
  },2000);
  }
  else{
    currentturn = "X";
    switchVisible();
  }
};

$("td").hover(function(){
  var tdid = $(this).prop('id');
  isDown = boardTrack[tdid];
  if(isDown==0){
	if($(this).hasClass("td-color")){
		$(this).removeClass('td-color');
	}
    $(this).toggleClass('hover-color');
	  if(mode==0){
		  $(this).text(currentturn);
	  }else{
		  $(this).text(userOX);
	  }
	  
  }
},function(){
  var tdid = $(this).prop('id');
  isDown = boardTrack[tdid];
  if(isDown==0){
  $(this).text("");
  $(this).removeClass('hover-color');
  }
});



function findVicline(b){
	var score;
	var line = [];
	score = evaluateline(b,"left-top","middle-top","right-top");
	if(score==30||score==-30)
	{   line = ["left-top","middle-top","right-top"];
		return line;		
	}
	score = evaluateline(b,"left-middle","middle-middle","right-middle");
	if(score==30||score==-30){
		line = ["left-middle","middle-middle","right-middle"];
		return line;
	}		
	score = evaluateline(b,"left-bottom","middle-bottom","right-bottom");
	if(score==30||score==-30){
		line = ["left-bottom","middle-bottom","right-bottom"];
		return line;
	}
	score = evaluateline(b,"left-top","left-middle","left-bottom");
	if(score==30||score==-30){
		line = ["left-top","left-middle","left-bottom"];
		return line;
	}		
	score = evaluateline(b,"middle-top","middle-middle","middle-bottom");
	if(score==30||score==-30){
		line = ["middle-top","middle-middle","middle-bottom"];
		return line;
	}
	score = evaluateline(b,"right-top","right-middle","right-bottom");
	if(score==30||score==-30){
		line = ["right-top","right-middle","right-bottom"];
		return line;
	}
	score = evaluateline(b,"left-top","middle-middle","right-bottom");
	if(score==30||score==-30){
		line = ["left-top","middle-middle","right-bottom"];
		return line;
	}
	score = evaluateline(b,"right-top","middle-middle","left-bottom");
	if(score==30||score==-30){
		line = ["right-top","middle-middle","left-bottom"];
		return line;
	}
	
}

function displayVic(b){
	var line = findVicline(b);
    var id;
    console.log("Victory Line: "+line);
	line.forEach(function(element){
        id = "#" + element;
 //       $(id).css("color", "red");
    if($(id).hasClass("hover-color")){
		$(id).removeClass('hover-color');
	}
	if($(id).hasClass("td-color")){
		$(id).removeClass('td-color');
	}
    $(id).toggleClass('victory');
        console.log("vic id: "+id);
	});
    console.log("Display Victory.");
}

function AITurn(board){
  console.log("AI Turn.");
  var bestMove = findBestMove(board);
  var escore;
  console.log("next move:"+bestMove);
  var timeout = setTimeout(function(){
    var moveid = "#"+bestMove;
//    $(moveid).css("color", "white");
    if($(moveid).hasClass('hover-color')){
		$(moveid).removeClass('hover-color');
		
	}
	$(moveid).toggleClass('td-color');
    $(moveid).text(comOX);
    boardTrack[bestMove] = player;
    mcount++;
	if(mcount>=5){
      if(mcount==9){
          console.log("Draw.");
		  $("#display-info").text("Draw.");
        resetGame();
          return;
      }
  escore = evaluate(board);
  if(escore==10){
      console.log("AI Win!!");
	  $("#display-info").text("AI Win!!");
      displayVic(board);
      disableBoard(board);
    resetGame();
	  return;
  }
  }
  $("#display-info").text("Your Turn.");
  },1000);
  

  
}

function disableBoard(board){
    for(var i in board){
        board[i] = -1;
    }
}

function enableBoard(board){
    for(var i in board){
        board[i] = 0;
    }
}

function resetBoard(){
  $("td").text("");
   if($("td").hasClass("hover-color")){
		$("td").removeClass('hover-color');
   }
   if($("td").hasClass("td-color")){
		$("td").removeClass('td-color');
   }
   if($("td").hasClass("victory")){
		$("td").removeClass("victory");
   }
  enableBoard(boardTrack);
  mcount = 0;
}

$("td").mousedown(function(){
  var escore;
  var tdid = $(this).prop('id');
//  $(this).css("color", "white");
//  console.log("User Turn:"+tdid);
  if($(this).hasClass('hover-color')){
		$(this).removeClass('hover-color');
		
	}
  $(this).toggleClass('td-color');
  if(boardTrack[tdid]==0){
  if(mode==1){	  
  boardTrack[tdid] = opponent;
  $(this).text(userOX);
  mcount++;
  if(mcount>=5){
      if(mcount==9){
          console.log("Draw.");
		  $("#display-info").text("Draw.");
        resetGame();
          return;
      }
	  escore = evaluate(boardTrack);
	  if(escore==-10){
          console.log("You Win!!");
		  displayVic(boardTrack);
          disableBoard(boardTrack);
		  $("#display-info").text("You Win!!");
		  return;
	  }
      else{
          $("#display-info").text("AI Turn.");
          AITurn(boardTrack);
      }
  }else{
    $("#display-info").text("AI Turn.");
    AITurn(boardTrack);
  }
  }else{
     $(this).text(currentturn);
	 if(currentturn==="O"){
		 boardTrack[tdid] = player;
		 currentturn = "X";
	 }else{
		 boardTrack[tdid] = opponent;
		 currentturn = "O";
	 }
     mcount++;
	 if(mcount>=5){
		if(mcount==9){
          console.log("Draw.");
		  $("#display-info").text("Draw.");
      resetGame();
          return;
      }
      escore = evaluate(boardTrack);
	  if(escore==-10){
          console.log("X Win!!");
		  displayVic(boardTrack);
          disableBoard(boardTrack);
		  $("#display-info").text("X Win!!");
		  return;
	  }else if(escore==10){
		  console.log("O Win!!");
		  displayVic(boardTrack);
          disableBoard(boardTrack);
		  $("#display-info").text("O Win!!");
      resetGame();
		  return;
	  } 
	 }
	 $("#display-info").text(currentturn+"'s Turn.");
  }
  }
});

function resetGame(){
  var timeout = setTimeout(function(){
    resetBoard();
    switchVisible();
    $("#display-info").text("Vs.");
  },2000);
}