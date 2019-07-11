const logFile = require('./index.js')
const MyError = require('../MyError')


const testReadWrite = (  ) => {

}

const tests = ( type ) => {

    switch (type){
    case 1: // Test READWRITE
	
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
	const preparTest = () => {
	    fs = require('fs')
	    const fileNames = './logFile.json'
	    result = fs.existsSync(fileNames)
	    if (result) {
		fs.unlinkSync(fileNames)
	    }
	}
	
	const processREAD = async () => {
	    return (new Promise( (resps, errps) => {
		prom = logFile.loadLog()
		prom.then ( res => {    
		    if ((res == true) || (res == false)) {
			lis = []
			if (res == true) // true if the file exists
			    lis.push("T1")
			else {
			    if (res == false) // false if the false not exists
				lis.push("T2") // and create then
			}
			
			resps({msg: "Sucessful test!", list: lis})
		    } else {
			errps(MyError.handler({
			    name: "ERRORT1",
			    message: "Error Test LOAD",
			    obj: new Error()
			}))
		    }
		})
		prom.catch( err => {
		    MyError({
			name: "Error Process",
			message: "Error in test Process",
			obj: new Error()
		    })
		})
	    }))
	}

	const TD = (async () => {
	
	    preparTest ()
	    try{
		console.log("TEST READWRITE LOG")

		console.log("Frist: LOAD-1")

		res  = await processREAD()
		res2 = await processREAD()
		res.check = res.list[0] == 'T2'
		res2.check = res2.list[0] == 'T1'
		console.log("RES1: ",res)
		console.log("RES2: ",res2)
		
	    } catch (e){
		throw e
	    } finally {
		console.log("OK")
	    }
	})()
	break;

    case 2: // test SAVEDATA
	console.log("TEST SAVEDATA LOG")
	console.log("Frist: SAVE-D1")

/*	// too verbose method of insert log
	const processSave = (async() => { 
	    promsed = logFile.registerLogMsg({
		us: "Test",
		about: "Testing Save File",
		message: "test write json into file",
		obj: {}
	    })

	    promsed.then( res => {
		
		resum = {
		    msg: "Sucessful test!",
		    status: res
		}

		if (res === true)
		    resum['check'] = 'ok'
		else
		    resum['check'] = new MyError({
			name: "ErroSaveLog",
			msg: "Erro in regist LogMsg",
			obj: {status: 'deprecated'}
		    })
		
		console.log(resum)
	    })
	    promsed.catch( err => {
		throw err
	    })
	})

	processSave()*/

	const testLogMsg = (async()=>{ // short method
	    res = await logFile.registerLogMsg({
		us: "Test",
		about: "Testing Save File",
		meta: "test write json into file",
		obj: {}
	    })
	    console.log({'result':res})
	})()
	
	
	break;
    default:
	console.log("done")
    }
}

const main = (  ) => {

    console.log ("Hello, World!")
    console.log (logFile)
    //tests( 1 ) // test READWRITE
    tests( 2 ) // test SAVEDATA
}


main (  )
