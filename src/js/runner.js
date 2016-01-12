//////////////////
//Runner Module //
//////////////////

/**
 * Run a generator function
 * @param  {Function} gen - Generator function to run
 * @return {Promise}
 */
function run(gen) {
    //Get arguments for generator from run() function call
    var args = [].slice.call(arguments, 1), it;

    //Create iterator in this context
    it = gen.apply(this, args);

    //Return Promise
    return Promise.resolve()
        .then(
            function handleNext(value) {
                //Run to the next 'yield' statement
                var next = it.next(value);

                return (function handleResult(next) {
                    //If generator has completed
                    if (next.done) {
                        //Return 'return' value
                        return next.value;
                    }
                    //If it has not completed
                    else {
                        //Return a promise for the next value
                        return Promise.resolve(next.value)
                            .then(
                                //Recurse back to the next 'yield / return' statment
                                handleNext,
                                //If Promise is rejected send error to generator for handling
                                function handleError(error) {
                                    return Promise.resolve(it.throw(error))
                                        .then(handleResult);
                                }
                            );
                    }
                })(next);
            }
        );
}



///////////////////
//Module Exports //
///////////////////

module.exports.run = run;
