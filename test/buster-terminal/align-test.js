var buster = require("buster");
var assert = buster.assert;
var a = require("../../lib/buster-terminal").align;

buster.testCase("Terminal string align test", {
    "max width": {
        "should get width of array of strings": function () {
            assert.equals(a.maxWidth(["a", "b", "hey", "there"]), 5);
        },

        "should get width of array of strings and numbers": function () {
            assert.equals(a.maxWidth(["a", 666782, 2, "there"]), 6);
        },

        "should count width of undefined as 0": function () {
            assert.equals(a.maxWidth([null, undefined, false, ""]), 5);
        }
    },

    "alignment": {
        "should left align text": function () {
            assert.equals(a.alignLeft("Hey there", 13), "Hey there    ");
        },

        "should right align text": function () {
            assert.equals(a.alignRight("Hey there", 13), "    Hey there");
        },

        "should not pad too long text": function () {
            assert.equals(a.alignRight("Hey there", 4), "Hey there");
        }
    }
});
