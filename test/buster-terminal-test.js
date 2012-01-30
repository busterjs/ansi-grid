var buster = require("buster");
var assert = buster.assert;
var terminal = require("../lib/buster-terminal");

buster.testCase("Buster terminal", {
    setUp: function () {
        this.io = {
            out: "",
            print: function (str) { this.out += str; },
            puts: function (str) { this.out += str + "\n"; }
        };
    },

    "with default settings": {
        setUp: function () {
            this.t = terminal.create();
        },

        "should not colorize text": function () {
            assert.equals(this.t.colorize("String", 31), "String");
        },

        "should not color text red": function () {
            assert.equals(this.t.red("String"), "String");
        },

        "should not color text green": function () {
            assert.equals(this.t.green("String"), "String");
        },

        "should not color text yellow": function () {
            assert.equals(this.t.yellow("String"), "String");
        },

        "should not color text purple": function () {
            assert.equals(this.t.purple("String"), "String");
        },

        "should not color text cyan": function () {
            assert.equals(this.t.cyan("String"), "String");
        },

        "should not color text grey": function () {
            assert.equals(this.t.grey("String"), "String");
        },

        "should not bold text": function () {
            assert.equals(this.t.bold("String"), "String");
        }
    },

    "with colors": {
        setUp: function () {
            this.t = terminal.create({ color: true });
        },

        "should colorize text": function () {
            assert.equals(this.t.colorize("String", 31),
                          "\x1b[31mString\x1b[0m");
        },

        "should color text red": function () {
            assert.equals(this.t.red("String"), "\x1b[31mString\x1b[0m");
        },

        "should color text green": function () {
            assert.equals(this.t.green("String"), "\x1b[32mString\x1b[0m");
        },

        "should color text yellow": function () {
            assert.equals(this.t.yellow("String"), "\x1b[33mString\x1b[0m");
        },

        "should color text purple": function () {
            assert.equals(this.t.purple("String"), "\x1b[35mString\x1b[0m");
        },

        "should color text cyan": function () {
            assert.equals(this.t.cyan("String"), "\x1b[36mString\x1b[0m");
        },

        "should color text grey": function () {
            assert.equals(this.t.grey("String"), "\x1b[38;5;8mString\x1b[0m");
        },

        "should bold text": function () {
            assert.equals(this.t.bold("String"), "\x1b[1mString\x1b[0m");
        }
    },

    "with bright colors": {
        setUp: function () {
            this.t = terminal.create({ color: true, bright: true });
        },

        "should colorize text brightly": function () {
            assert.equals(this.t.colorize("String", 31),
                          "\x1b[1m\x1b[31mString\x1b[0m");
        },

        "should color text bright red": function () {
            assert.equals(this.t.red("String"), "\x1b[1m\x1b[31mString\x1b[0m");
        },

        "should color text bright green": function () {
            assert.equals(this.t.green("String"),
                          "\x1b[1m\x1b[32mString\x1b[0m");
        },

        "should color text bright yellow": function () {
            assert.equals(this.t.yellow("Str"), "\x1b[1m\x1b[33mStr\x1b[0m");
        },

        "should color text bright purple": function () {
            assert.equals(this.t.purple("Str"), "\x1b[1m\x1b[35mStr\x1b[0m");
        },

        "should color text bright cyan": function () {
            assert.equals(this.t.cyan("String"),
                          "\x1b[1m\x1b[36mString\x1b[0m");
        },

        "should color text bright grey": function () {
            assert.equals(this.t.grey("String"),
                          "\x1b[1m\x1b[38;5;8mString\x1b[0m\x1b[0m");
        },

        "should bold text": function () {
            assert.equals(this.t.bold("String"), "\x1b[1mString\x1b[0m");
        }
    },

    "moving": {
        setUp: function () {
            this.t = terminal.create({ color: true, bright: true });
        },

        "should move one line up": function () {
            assert.equals(this.t.up(1), "\x1b[1A");
        },

        "should not move up anywhere": function () {
            assert.equals(this.t.up(0), "");
            assert.equals(this.t.up(), "");
        },

        "should move one line down": function () {
            assert.equals(this.t.down(1), "\x1b[1B");
        },

        "should not move down anywhere": function () {
            assert.equals(this.t.down(0), "");
            assert.equals(this.t.down(), "");
        },

        "should move two columns forward": function () {
            assert.equals(this.t.fwd(2), "\x1b[2C");
        },

        "should not move forward anywhere": function () {
            assert.equals(this.t.fwd(0), "");
            assert.equals(this.t.fwd(), "");
        },

        "should save position": function () {
            assert.equals(this.t.save(), "\x1b7");
        },

        "should restore position": function () {
            assert.equals(this.t.restore(), "\x1b8");
        },

        "should move in transaction": function () {
            var str = this.t.move(function () {
                return this.up(2) + this.fwd(4) + this.down(1);
            });

            assert.equals(str, "\x1b7\x1b[2A\x1b[4C\x1b[1B\x1b8");
        },

        "should strip ansi escape characters": function () {
            assert.equals(this.t.stripSeq(this.t.red(this.t.yellow("Hey"))),
                          "Hey");
        }
    }
});
