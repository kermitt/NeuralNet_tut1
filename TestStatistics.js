var Statistics = require("./Statistics").Statistics;

var UnitTest = function() {
    this.stats = new Statistics();
    this.standardDeviation();
    this.mean();
    this.z_score();
}
UnitTest.prototype = {

    z_score : function() {
        var sd = 23.7;
        var x_bar = 145.2;
        var observation = 175;

        var actual = this.stats.z_score(sd,x_bar,observation);
        actual = actual.toFixed(2);
        var expected = 1.26;

        this.verdict(expected == actual, "z_score: " + actual);
    },

    standardDeviation: function() {
        var expected = 14.63;
        var ary = [3, 5, 7, 7, 38];
        var actual = this.stats.getStandardDeviationFromArray(ary);
        actual = actual.toFixed(2);
        this.verdict(expected == actual, "standardDeviation: " + actual);
    },

    mean: function() {
        var data = this.stanfordWeightMeasurementsClassData();

        var f = data["females"];
        var m = data["males"];
        var all = m;
        for (var i in f) {
            all.push(f[i]);
        }
        var expected = 145.15;
        var actual = this.stats.getMean(all);
        actual = actual.toFixed(2);
        this.verdict(expected == actual, "mean: " + actual);
    },
    stanfordWeightMeasurementsClassData: function() {
        var males = [140, 145, 160, 190, 155, 165, 150, 190, 195, 138, 160, 155, 153, 145, 170, 175, 175, 170, 180, 135,
            170, 157, 130, 185, 190, 155, 170, 155, 215, 150, 145, 155, 155, 150, 155, 150, 180, 160, 135, 160,
            130, 155, 150, 148, 155, 150, 140, 180, 190, 145, 150, 164, 140, 142, 136, 123, 155
        ];

        var females = [140, 120, 130, 138, 121, 125, 116, 145, 150, 112, 125, 130, 120, 130, 131, 120, 118, 125, 135, 125,
            118, 122, 115, 102, 115, 150, 110, 116, 108, 95, 125, 133, 110, 150, 108
        ];

        return {
            "males": males,
            "females": females
        };

    },

    verdict: function(isOk, msg) {
        var v = isOk ? "PASS" : "FAIL";
        console.log(v + "\t" + msg);
    }
};

var test = new UnitTest();