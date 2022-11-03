/*           _
  ___  ___ | |_   _____ _ __ ___
 / __|/ _ \| \ \ / / _ \ '__/ __|
 \__ \ (_) | |\ V /  __/ |  \__ \
 |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// [0, 0, 1, 0],
// [0, 0, 0, 0],
// [1, 0, 0, 0],
// [0, 0, 0, 0]
// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*IOCE ====================================
input: n, for an n x n matrix
output: an n x n matrix of n rooks with no conflicts

*/

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
 };

 // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
 window.countNRooksSolutions = function(n) {
  var solutionCount = ; //something like n(n-1)(n-2)

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
 };

 // return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
 window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
 };

 // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
 window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
 };


 /*
 return array of arrays for given n
 for one rook solution
  MVP...
  starting from [0][0]... place a rook
    iterating thru the row, we place a rook at every [0][0 ... n]
      since we know rooks can't be on the same row we don't have to place a rook on every index in a row
  actually I think the MVP would be to start with [0][0], iterate thru every index and for every index place a rook ->
    if there is a row conflict or column conflict remove the rook and go to the next index
      so it will go thru each row, each column from [0][0] to [n][n]
    return at the end
    would only give us one solution basically

 for multiple solutions we need to create trees to branch into other ways for every single valid move
  starting from [0][0] gives us one solution, we should have n solutions for every way you can place a rook in the first row
 */
