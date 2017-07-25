
// Tic tac toe game where you can choose your hand if you like,
// click start to re-fresh the start new game.
$(document).ready(function(){

  // Global variables
  // All winning combination for myHand
  var arr = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  // for checking if anyone win
  var checkArr = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  var sectionLeft = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // default set
  var myPlayAs = 'o';
  var aiPlayAs = 'x';
  
  var myHand = 0; 
  // choose 'o' or 'x'
  $(".choice").click(function(){
    
    myPlayAs = this.id;
    if (myPlayAs == 'o'){
      aiPlayAs = 'x';
    }
    else{
      aiPlayAs = 'o';
    }
    $(".choice").hide();
  });
  
  //Helper function 1: check if you win the game 
  //param 1: arr,  param 2: int, param 3 string 'o' or 'x', return: boolian
  function updateCheckArray (arr1 = [], handNum, playAs) {
    // all three of each 1st array elemets have the same value && it is the hand value
    function isWin (arr1) {
      for (let i =0; i < 8; i++){
        if (arr1[i][0]==playAs && arr1[i][0]==arr1[i][2] && arr1[i][0]==arr1[i][1]){
          return true;
        }
      }
      return false; 
    }
    arr1.forEach(function (el, i){
      let idx = el.indexOf(handNum);
      //if there is handNum in the array
      if (idx !=-1){
        // replace with 'o' or 'x'
        arr1[i].splice(idx, 1, playAs);
      }
    });
    return isWin;
  }
  
  //Helper function 2 - Search elements in array which contents the int
  //param 1: 2d array, param 2: int, return : array with int elements
  function arrayNumbers (arr1 = [], numToCheck) {
      //set up for return array
      var resultArr = [];
      arr1.forEach(function (el, i){
        var idx = el.indexOf(numToCheck);
        //if there is int in the array
        if (idx !=-1){
          //push the index number to new array
          resultArr.push(i);
          // remove the int from the 2d array
          arr1[i].splice(idx, 1);
        }
      });
      return resultArr;
  }
  
  // helper function 3: which sections you can still click
  // param 1:1d array, param 2:int,  return 1d array
  function updateAvailSection (arr1, hand){
    var idx = arr1.indexOf(hand);
     return arr1.splice (idx, 1);
  }
  
$("#start").click(function(){
    // Reset All winning combination for myHand
  arr = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  // Reset array for checking if anyone win
  checkArr = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  sectionLeft = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Reset hand
  myHand = 0; 
  $(".choice").show();
  $(".section").html('');
  $("h1").html("Let's Play Tic Tac Toe");
});
  
   //Game start, pick the section by click
   $(".section").click(function(){
     // they need to be local variable 
     var result = [];
     var myHandh = 0;
     var aiHand = 0;
     var indexToGo = [];
     
     myHand = parseInt(this.id); 
     // disable to click where is hasbeen clicked
     if (sectionLeft.indexOf(myHand) == -1){ 
       return;
     }
     //Up date which section have been clicked
     console.log(sectionLeft);
     updateAvailSection (sectionLeft, myHand);
     $("#"+ myHand).html(myPlayAs);
    // check if you win 
    var myCheckWin = updateCheckArray (checkArr, myHand, myPlayAs);
    var myWin = myCheckWin (checkArr);
    // If you win put message out
    if (myWin){
      $("h1").html("You Win!")
      //to exit
      return;
     }
 
    //using helper function
    result = arrayNumbers(arr, myHand);
    console.log(arr);
    
    console.log(result);
    // if no result back//// this does not work 
      if (result.length < 1){
        arr.forEach (function (el, i){
          // if any of array has only 2 element left
          if(arr[i].length<=2){
            aiHand = arr[i][0];
          }
        });
         // if still not assigned one yet from arr
        if (aiHand === 0 && arr[0][0] !=[]){
          aiHand = arr[0][0];
        }
        // if arr is empty
        console.log (aiHand)
        console.log (arr)
        if (aiHand ===0 && arr.length === 0){
          aiHand = sectionLeft [0];
        } 
      }

     else{
       // find best hand for aihHand
       result.forEach (function (el, i){
       // if any of arr has only 1 element left
        if(arr[result[i]].length == 1){          
          aiHand = arr[result[i]][0];
        } 
      });
       
      // if still not assigned
      if (aiHand === 0){
        aiHand = arr[result[0]][0];  
      }
    }
    $("#"+ aiHand).html(aiPlayAs);
    updateAvailSection (sectionLeft, aiHand);
    
    // check if anyone win // need to do both ai anf my   
    var aiCheckWin = updateCheckArray (checkArr, aiHand, aiPlayAs);
    var aiWin = aiCheckWin (checkArr);
    // check if win
    if (aiWin){
      $("h1").html("You Lost!")
      // still can click  
        return;
    }
    // update risky group       
    indexToGo = arrayNumbers (arr, aiHand);
    for (let i=0; i < indexToGo.length; i++){
    // delete the group itself - no longer risky
       arr.splice(indexToGo[i]-i, 1);
    }       
    });
  });