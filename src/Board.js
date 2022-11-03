// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


 /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasRowConflictAt: function(rowIndex) {
      //inputs: rowIndex, return a boolean
      //chessboard.hasRowConflictAt(row1)
      //loop through row
        //if there are multiple 1's
          //return true
      //otherwise return false
      //"this" refers to board
      var row = this.get(rowIndex);
      var count = 0;
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //iterate for each column
        //use hasRowConflictAt for each column
      var rowArray = this.rows()
      for (var i = 0; i < rowArray.length; i++) {
        //checking each row
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; //
    },


    /*
    [ c1 c2 c3 c4
      [0, 0, 0, 0], row1 [0]
      [0, 0, 0, 0], row2 [1]
      [0, 0, 0, 0], row3 [2]
      [0, 0, 0, 0]  row4 [3]
    ]
    */
    //backbone things   this.get(rowIndex)[colIndex]
    // var someBoardName = new Board({ n:4 })
    // someBoardName.togglePiece(rowIndex, colIndex);

    // togglePiece(0, 0);
    // togglePiece(0, 1);
    // [1, 1, 0, 0] row 1
    // someBoardName.board.hasRowConflictAt(row1)

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) { //(row index) (col index)
      //get our rows using this.rows
      //for loop through this.rows
        //var columnValue = this.get(i)[column index]
        //if (columnValue === 1) {count++}
      var rowsArray = this.rows();
      var count = 0;
      for (var i = 0; i < rowsArray.length; i++) {
        if (this.get(i)[colIndex]) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //same logic as rows since the board is n x n
      var rowsArray = this.rows();
      for (var i = 0; i < rowsArray.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    /*
    [ c1 c2 c3 c4
      [0, 0, 0, 0], row1 [0]
      [0, 0, 0, 0], row2 [1]
      [0, 0, 0, 0], row3 [2]      MVP
      [0, 0, 0, 1]  row4 [3]
    ]
    */
    //backbone things   this.get(rowIndex)[colIndex]
    // var someBoardName = new Board({ n:4 })
    // someBoardName.togglePiece(rowIndex, colIndex);

    // togglePiece(0, 0);
    // togglePiece(0, 1);
    // [1, 1, 0, 0] row 1
    // someBoardName.board.hasRowConflictAt(row1)
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    // (+1, +1)

    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(row, column) {
      //if index of (+1, +1) exists
        //check if index of (+1, +1) is 1 ---- recursive call of if statement above
      var rowArray = this.rows();
      for (var diag = 1; diag < rowArray.length - 1; diag++) {
        if (rowArray[row + diag] !== undefined && rowArray[row + diag][column + diag] !== undefined) {
          if (rowArray[row + diag][column + diag] === 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //working on this first to check our inputs
      //iterate through array of rows
        //iterate through first row n times
          //call hasMajorDiagonalConflictAt(n)
      var rowArray = this.rows();
      for (var i = 0; i < rowArray.length; i++) {
        for (var j = 0; j < rowArray[i].length; j++) {
          if (rowArray[i][j] === 1) {
            if (this.hasMajorDiagonalConflictAt(i, j)) {
              return true;
            }
          }
        }
      }
      return false; // fixme
    },


    /*
    [ c1 c2 c3 c4
      [0, 0, 1, 0], row1 [0]
      [0, 0, 0, 0], row2 [1]
      [1, 0, 0, 0], row3 [2]      MVP
      [0, 0, 0, 0]  row4 [3]
    ]
    */
    //backbone things   this.get(rowIndex)[colIndex]
    // var someBoardName = new Board({ n:4 })
    // someBoardName.togglePiece(rowIndex, colIndex);

    // togglePiece(0, 0);
    // togglePiece(0, 1);
    // [1, 1, 0, 0] row 1
    // someBoardName.board.hasRowConflictAt(row1)
    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //(+1, -1)
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(row, column) {
      //same logic as major, but we will be subtracting by diagonal instead
      var rowArray = this.rows();
      for (var diag = 1; diag < rowArray.length; diag++) {
        if (rowArray[row + diag] !== undefined && rowArray[row + diag][column - diag] !== undefined) {
          if (rowArray[row + diag][column - diag] === 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //looking for indexes where there are 1's
      var rowArray = this.rows();
      for (var i = 0; i < rowArray.length; i++) {
        for (var j = 0; j < rowArray[i].length; j++) {
          if (rowArray[i][j] === 1) {
            if (this.hasMinorDiagonalConflictAt(i, j)) {
              return true;
            }
          }
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
 }());

 /*
 n x n chessboard made up of 4 arrays with 4 elements
 [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
 ]
 chessboard[row][column]

 specific rows
  iterate thru row...
  for each index
    if index is 0, continue checking next index
    otherwise if index is 1,
      for each other index...
      if index is 0, continue
      otherwise return true

 specific columns
  to check a single column
  first column: chessboard[rows][0]
  second: chessboard[rows][1]
  ...
  last column: chessboard[rows][n]


 \
 \
  \
   \
    \>

    specific major diag --- top-left to bottom-right  \
  checking chessboard[0][0] with chessboard[1][1]
  or chessboard[rowIndex][colIndex] --> chessboard[rowIndex + 1][colIndex + 1]

     /
    /
   /
  /
 </
 specific minor diag --- top-right to bottom-left  /
  checking chessboard[0][n] with chessboard[1][n - 1]
 */
