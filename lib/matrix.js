var S = require("./buster-terminal");

function add(a, b) {
    return a + b;
}

function initColumns(num) {
    var columns = [];
    for (var i = 0; i < num; ++i) {
        columns.push(0);
    }
    return columns;
}

function verifyColumnCount(columns, count) {
    if (columns.length !== count) {
        throw new TypeError(
            "Row expected to have " + count + " columns, got " + columns.length
        );
    }
}

function textWidth(text) {
    return S.maxWidth(text.split("\n"));
}

function printMultiLine(m, row, col, content, width) {
    var lines = content.split("\n");
    lines.forEach(function (line, num) {
        printLine(m, line, width);
        if (num < lines.length - 1) { m.grid.puts(""); }
    });
}

function printLine(m, text, width) {
    m.grid.print(text + S.repeat(" ", width - text.length) + m.pad());
}

function maxHeight(columns) {
    var height = 0;
    columns.forEach(function (col) {
        var colHeight = col.split("\n").length;
        if (colHeight > height) { height = colHeight; }
    });
    return height;
}

module.exports = {
    create: function (options) {
        return Object.create(this, {
            grid: { value: options.grid || S.createRelativeGrid(options.io) },
            columns: { value: initColumns(options.columns || 1) },
            padding: {
                value: typeof options.padding === "number" ? options.padding : 1
            },
            rows: { value: [] }
        });
    },

    addRow: function (columns) {
        verifyColumnCount(columns, this.columns.length);
        this.printRow(this.rows.length, columns);
        this.rows.push(columns);
    },

    printRow: function (row, columns) {
        columns.forEach(function (col, index) {
            this.printColumn(row, index, col);
        }.bind(this));
        this.grid.puts("");
    },

    printColumn: function (row, col, content) {
        this.grid.go(this.colPos(col), this.rowPos(row));
        var width = this.columnWidth(col, content);
        if (/\n/.test(content)) {
            return printMultiLine(this, row, col, content, width);
        }
        printLine(this, content, width);
    },

    pad: function () {
        return S.repeat(" ", this.padding);
    },

    resizeColumn: function (col, width) {
        this.grid.save();
        this.columns[col] = width;
        this.redraw();
        this.grid.restore();
    },

    redraw: function () {
        this.rows.forEach(function (row, index) {
            this.printRow(index, row);
        }.bind(this));
    },

    columnWidth: function (col, text) {
        var width = textWidth(text);
        if (!this.columns[col]) {
            this.columns[col] = width;
        }
        if (width > this.columns[col]) {
            this.resizeColumn(col, width);
        }
        return this.columns[col];
    },

    colPos: function (col) {
        return this.columns.slice(0, col).reduce(add, 0) + (col * this.padding);
    },

    rowPos: function (row) {
        return this.rows.slice(0, row).reduce(function (sum, row) {
            return sum + maxHeight(row);
        }, 0);
    }
};
