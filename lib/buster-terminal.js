if (typeof buster != "object") {
    var buster = {};
}

buster.terminal = {
    maxWidth: function (strings) {
        for (var i = 0, l = strings.length, width = 0; i < l; i++) {
            width = Math.max((strings[i] == null ? "" : "" + strings[i]).length, width);
        }

        return width;
    },

    alignLeft: function (string, width) {
        return string + this.padding(string, width);
    },

    alignRight: function (string, width) {
        return this.padding(string, width) + string;
    },

    padding: function (string, width) {
        var padding = "";

        while (width - string.length - padding.length > 0) {
            padding += " ";
        }

        return padding;
    }
};

if (typeof module == "object" && typeof require == "function") {
    module.exports = buster.terminal;
}
