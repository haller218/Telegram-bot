const logFile = require('./index.js')
const MyError = require('../MyError')


const testReadWrite = (  ) => {

}

const tests = ( type ) => {

    switch (type){
    case 1: // Test READWRITE

	return (new Promise ((rest, errt) => {

	    const preparTest = async() => {
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
			    errps(MyError.handler(new MyError({
				name: "ERRORT1",
				message: "Error Test LOAD",
				obj: new Error()
			    })))
			}
		    })
		    prom.catch( err => {
			errps ( MyError.handler(new MyError({
			    name: "Error Process",
			    message: "Error in test Process",
			    obj: err
			})))
		    })
		}))
	    }

	    const TD = (async () => {
		
		try{
		    console.log("TEST READWRITE LOG")
		    await preparTest ()
		    
		    console.log("Frist: LOAD-1")

		    res  = await processREAD()
		    res2 = await processREAD()
		    res.check = res.list[0] == 'T2'
		    res2.check = res2.list[0] == 'T1'
		    console.log("RES1: ",res)
		    console.log("RES2: ",res2)
		    rest()
		} catch (e){
		    errt(e)
		} finally {
		    console.log("OK")
		}
	    })()}))
	break;

    case 2: // test SAVEDATA
	return (new Promise((rest, errt) =>{
	    console.log("TEST SAVEDATA LOG")
	    console.log("Frist: SAVE-D1")


	    const testLogMsg1 = (async(flag_one = true)=>{ // short method
		res = await logFile.registerLogMsg({
		    us: "Test",
		    about: "Testing Save File",
		    meta: "test write json into file",
		    obj: {}
		})
		flag = res === true
		ob = {msg:'Sucessful test!',
		      'result':res, 'check':flag}
		if (flag_one){
		    console.log (ob)
		}
		return res
	    })

	    const testLotOfData = (async()=>{
		fi = true
		counts = 0
		for (i = 0; i < 300; i++) {
		    fi = fi && await testLogMsg1(false)
		    if (! fi )
			counts = counts + 1
		}
		console.log({msg:'Sucessful test!', 'insert': i, 
			     'result':(String(((i-(counts/i))/i)*100)+'%'), 'check':fi})
		
	    })

	    const main = (async() => {
		testLogMsg1()
		//testLotOfData()
		rest()
	    })()
	}))
    case 3:
	return (new Promise ((respt, errpt) => {

	    const runTest = async (tit = '',conter = 0, flag_one = false) => {

		res = await logFile.registerLogMsg({
		    us: "Test: "+tit,
		    about: "Testing Save File ",
		    meta: "test write json into file",
		    obj: {num: conter, bool: true}
		})

		if (conter > 0)
		    runTest ( tit, conter - 1 , flag_one)
		
		if (flag_one){
		    flag = res === true
		    ob = {msg:'Sucessful test!', type: tit,
			  'result':res, 'check':flag, cont: conter }
		    console.log (ob)
		}
		
		return res
	    }

	    const TD = (() => {
		
		flag = false

		for (i = 0; i < 6; i++){
		    
		    runTest ('T1', i, flag)
		    runTest ('T2', i/2, flag)
		}
	    })()
	    
	}))
	
	break;
    case 4:
	return (new Promisse((res, err) => { // TODO: TEST LOG CGHANGE FILE

	    const testLogMsg1 = (async(flag_one = true)=>{ // short method
		res = await logFile.registerLogMsg({
		    us: "Test",
		    about: "Testing Save File",
		    meta: "test write json into file",
		    obj: {}
		})
		flag = res === true
		ob = {msg:'Sucessful test!',
		      'result':res, 'check':flag}
		if (flag_one){
		    console.log (ob)
		}
		return res
	    })

	    const main = (() => {


		

	    })()

	    
	}))
	
	break;
    default:
	console.log("done")
    }
}

const main = (  ) => {

    console.log ("Hello, World!")
     console.log (logFile)
     /*tests( 1 ).then( res => { // test READWRITE
	 tests( 2 ).then( res => {  // test READFILE
	    tests( 3 ).then( res => { // test ASYNCWRITE
	    })
	})
	})*/
    wat = tests( 2 )
    wat.then (res => console.log( "finsh",res))
    wat.catch ( e => MyError.handler(new MyError({
	name: "TestError",
	message: "Error in test async write",
	obj: err
    })))

/*    uo = tests( 3 )
    uo.then ( res => console.log(res))
    uo.catch ( err => MyError.handler(new MyError({
	name: "TestError",
	message: "Error in test async write",
	obj: err
	})))*/
    
}


main (  )
