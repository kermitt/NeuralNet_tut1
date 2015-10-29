

UnitBase = function() {
    this.PASS = "PASS";
    this.FAIL = "FAIL";
};

UnitBase.prototype = {
    assertEquals: function(a, b) {
        return a === b ? this.PASS : this.FAIL;
    },

    assertUnequals: function(a, b) {
        return a === b ? this.PASS : this.FAIL;
    },

    assertCloseEnough: function(actual, goal, fuzz) {
        var verdict = this.FAIL;
            if (actual < (goal + fuzz) && actual > (goal - fuzz)) {
                verdict = this.PASS;
            }
        
        return verdict;
    }
};
module.exports.UnitBase = UnitBase;