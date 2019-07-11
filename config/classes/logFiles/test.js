const logFile = require('./index.js')



const testReadWrite = (  ) => {

}

const tests = ( type ) => {

    switch (type){
    case 1: // Test READWRITE
	console.log("TEST READWRITE LOG")

	console.log("Frist: LOAD-1")
	
/*	// Deprecated Method of Test
	promised = logFile.loadLog()
	promised.then( res => {
	    if ((res == true) || (res == false))
		console.log("Sucessful test")
	    else
		console.log("Error Something")
	})
	promised.catch( err => {
	    throw err
	})
*/
	const testa = async () => {
	    res = await logFile.loadLog()
	    if ((res == true) || (res == false)) {
		console.log("Sucessful test!")
	    } else {
		console.log("Error in test!")
	    }
	}

	testa()
	
	break;
    default:
	console.log("done")
    }
}

const main = (  ) => {

    console.log ("Hello, World!")
    console.log (logFile)
    tests( 1 ) // test READWRITE
}


main (  )
