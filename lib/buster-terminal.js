var S = require("./buster-terminal/strings");

module.exports = {
    color: false,
    bright: false,

    // Clear screen: "\x1b[1;1H\x1b[2J"

    create: function (opt) {
        var instance = Object.create(this);

        if (opt && typeof opt.color === "boolean") {
            instance.color = opt.color;
        }

        if (opt && typeof opt.bright === "boolean") {
            instance.bright = opt.bright;
        }

        return instance;
    },

    colorize: function (str, color) {
        if (!this.color) { return str; }

        return (this.bright ? "\x1b[1m" : "") +
            "\x1b[" + color + "m" + str + "\x1b[0m";
    },

    bold: function (str) {
        if (!this.color) { return str; }
        return "\x1b[1m" + str + "\x1b[0m";
    },

    red: function (str) {
        return this.colorize(str, 31);
    },

    yellow: function (str) {
        return this.colorize(str, 33);
    },

    green: function (str) {
        return this.colorize(str, 32);
    },

    purple: function (str) {
        return this.colorize(str, 35);
    },

    cyan: function (str) {
        return this.colorize(str, 36);
    },

    grey: function (str) {
        if (!this.color) { return str; }
        str = "\x1b[38;5;8m" + str + "\x1b[0m";
        return this.bright ? "\x1b[1m" + str + "\x1b[0m" : str;
    },

    up: function (n) {
        if (!n) { return ""; }
        return "\x1b[" + n + "A";
    },

    down: function (n) {
        if (!n) { return ""; }
        return "\x1b[" + n + "B";
    },

    fwd: function (n) {
        if (!n) { return ""; }
        return "\x1b[" + n + "C";
    },

    save: function () {
        return "\x1b7";
    },

    restore: function () {
        return "\x1b8";
    },

    move: function (callback) {
        var str = this.save();
        str += callback.call(this);
        str += this.restore();

        return str;
    },

    stripSeq: function (str) {
        str = str.replace(/\x1b(\[|\(|\))[;?0-9]*[0-9A-Za-z]/g, "");
        str = str.replace(/\x1b(\[|\(|\))[;?0-9]*[0-9A-Za-z]/g, "");
        str = str.replace(/[\x03|\x1a]/, "");

        return str;
    },

    get labeledList () {
        return require("./buster-terminal/labeled-list");
    },

    get strings() {
        return require("./buster-terminal/strings");
    }
};
