if (typeof require == "function") {
    var buster = require("buster");
    buster.terminal = require("../lib/buster-terminal");
}

(function () {
    var assert = buster.assert;
    var t = buster.terminal;

    buster.testCase("Terminal string align test", {
        "max width": {
            "should get width of array of strings": function () {
                assert.equals(t.maxWidth(["a", "b", "hey", "there"]), 5);
            },

            "should get width of array of strings and numbers": function () {
                assert.equals(t.maxWidth(["a", 666782, 2, "there"]), 6);
            },

            "should count width of undefined as 0": function () {
                assert.equals(t.maxWidth([null, undefined, false, ""]), 5);
            }
        },

        "alignment": {
            "should left align text": function () {
                assert.equals(t.alignLeft("Hey there", 13), "Hey there    ");
            },

            "should right align text": function () {
                assert.equals(t.alignRight("Hey there", 13), "    Hey there");
            },

            "should not pad too long text": function () {
                assert.equals(t.alignRight("Hey there", 4), "Hey there");
            }
        }
    });
}());
