var buster = require("buster");
var helper = require("./helper");
var terminal = require("../lib/buster-terminal");

buster.testCase("Matrix", {
    setUp: function () {
        this.terminal = helper.createAsciiTerminal(this);
        this.grid = terminal.createRelativeGrid(this.terminal);
    },

    "creates grid from io": function () {
        var m = terminal.createMatrix({ io: this.terminal, columns: 1 });
        m.addRow(["Text"]);
        assert.stdout("Text \n");
    },

    "add row": {
        "fails for wrong number of columns": function () {
            var m = terminal.createMatrix({ columns: 2 });
            assert.exception(function () { m.addRow(["Hey"]); });
            assert.exception(function () { m.addRow(["Hey", "There", "Oops"]); });
        }
    },

    "one column": {
        setUp: function () {
            this.matrix = terminal.createMatrix({ grid: this.grid, columns: 1 });
        },

        "prints text": function () {
            this.matrix.addRow(["Text"]);
            assert.stdout("Text \n");
        },

        "prints text with padding": function () {
            var m = terminal.createMatrix({ grid: this.grid, columns: 1, padding: 2 });
            m.addRow(["Text"]);
            assert.stdout("Text  \n");
        },

        "prints text without padding": function () {
            var m = terminal.createMatrix({ grid: this.grid, columns: 1, padding: 0 });
            m.addRow(["Text"]);
            assert.stdout("Text\n");
        },

        "prints text on two rows": function () {
            this.matrix.addRow(["Text"]);
            this.matrix.addRow(["Book"]);
            assert.stdout("Text \n" +
                          "Book \n");
        },

        "prints multi-line text": function () {
            this.matrix.addRow(["Text\nBook"]);
            assert.stdout("Text \n" +
                          "Book \n");
        },

        "prints all columns at same width": function () {
            this.matrix.addRow(["Text"]);
            this.matrix.addRow(["TV"]);
            assert.stdout("Text \n" +
                          "TV   \n");
        },

        "prints row after multi-line text": function () {
            this.matrix.addRow(["Text\nBook"]);
            this.matrix.addRow(["TV"]);
            assert.stdout("Text \n" +
                          "Book \n" +
                          "TV   \n");
        }
    },

    "two columns": {
        setUp: function () {
            this.matrix = terminal.createMatrix({ grid: this.grid, columns: 2 });
        },

        "prints two columns": function () {
            this.matrix.addRow(["One", "Two"]);
            assert.stdout("One Two \n");
        }
    },

    "redrawing": {
        "replaces single column": function () {
            var m = terminal.createMatrix({ grid: this.grid, columns: 1 });
            m.addRow(["One"]);
            m.redraw();
            assert.stdout("One \n");
        },

        "replaces matrix with itself": function () {
            var m = terminal.createMatrix({ grid: this.grid, columns: 2 });
            m.addRow(["One", "Two"]);
            m.addRow(["1", "2"]);
            m.redraw();
            assert.stdout("One Two \n" +
                          "1   2   \n");
        }
    },

    "resizing": {
        setUp: function () {
            this.matrix = terminal.createMatrix({ grid: this.grid, columns: 2 });
        },

        "resizes first column": function () {
            this.matrix.addRow(["A", "B"]);
            this.matrix.addRow(["C", "D"]);
            this.matrix.resizeColumn(0, 10);
            assert.stdout("A          B \n" +
                          "C          D \n");
        },

        "resizes second column": function () {
            this.matrix.addRow(["A", "B"]);
            this.matrix.addRow(["C", "D"]);
            this.matrix.resizeColumn(1, 10);
            assert.stdout("A B          \n" +
                          "C D          \n");
        },

        "resizes middle column": function () {
            var m = terminal.createMatrix({ grid: this.grid, columns: 3 });
            m.addRow(["A", "B", "C"]);
            m.addRow(["D", "E", "F"]);
            m.resizeColumn(1, 10);
            assert.stdout("A B          C \n" +
                          "D E          F \n");
        },

        "expands columns to fit wider content": function () {
            this.matrix.addRow(["One", "Two"]);
            this.matrix.addRow(["Three", "4"]);
            assert.stdout("One   Two \n" +
                          "Three 4   \n");
        },

        "reflows entire matrix": function () {
            this.matrix.addRow(["1", "2"]);
            this.matrix.addRow(["Three", "Four"]);
            assert.stdout("1     2    \n" +
                          "Three Four \n");
        },

        "reflows matrix when resizing all columns": function () {
            var m = terminal.createMatrix({ grid: this.grid, columns: 3 });
            m.addRow(["1", "2", "3"]);
            m.addRow(["One", "Two", "Three"]);
            assert.stdout("1   2   3     \n" +
                          "One Two Three \n");
        }
    },

    "// does all the things with colors": "Finish the plain thing first"
});
