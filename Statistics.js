var Statistics = function() {
}
Statistics.prototype = {
    getStandardDeviationFromArray : function( ary ) {
        var x_bar = this.getMean( ary );
        var n = ary.length - 1;
        var s2 = 0;
        for ( var i in ary ) {
            s2 += Math.pow( ary[i] - x_bar,2);
        }
        s2 /= n;

        var sd = Math.sqrt( s2 );
        return sd;
    },

    getMean : function( ary ) {
        var x_bar = 0;
        var total = 0;
        for ( i in ary ) {
            total += ary[i];
        }
        x_bar = total / ary.length;

        return x_bar;        
    }

};

module.exports.Statistics = Statistics;