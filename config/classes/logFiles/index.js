const fs = require('fs');
const MyError = require('../MyError')
const logFileName = "./tm/logFile.json";
const MAX_FILE_SIZE = 5.2 // in mb

let LOADED_FILE = false

let data = {};

// TODO IN FUTURE
// CREATE CHACK CENTRAL DATA TO SAVE IN BLOCK JSON
// USE ONE SETTIMEOUT TO SERVICE CHECKS THE LIST OF OBJECTS TO BE WRITED

const blocks = (() => {
    
    let cell_count = 0
    const MAX_BLOCK = 64
    let version = 0
    let blew = 0
    const getcell = (  ) => cell_count
    const checkcell = (  ) => (getcell() < MAX_BLOCK)
    const sumcell = (  ) => getcell(  ) + 1
    const setcell = value => cell_count = value
    const add = (  ) => {

	setcell( sumcell (  ) )
	return checkcell (  )
    }
    const reset = (  ) => setcell ( 0 )

    const ver = (  ) => version
    const setv = value => version = value
    const news = (  ) => {
	reset (  )
	setv ( ver(  ) + 1 )
    }
    const brek = ups => set ( ups )
    const en = (  ) => {
	blew + 1
	return che (  )
    }
    const che = (  ) => blew < MAX_BLOCK
    const now = (  ) => blew = 0
    return {
	add,
	reset,
	ver,
	news,
	brek,
	en,
	che,
	now
    }
})()

const seeDirectory = ( pathD ) => {

    return (new Promise ((resp, errp) => {
	try {
	    fs.readdir ( pathD ,(err, files) => {
		if ( err ) {
		    errp ( MyError.handler(new MyError({
			name: "SeeERRORDirectory",
			message: "suck directory error",
			obj: err
		    })))
		}
		resp ( files )
	    })
	} catch (e) {
	    errp ( MyError.handler(new MyError({
		name: "seeERRORRead",
		message: "Error in read Directory File",
		obj: e
	    })))
	}
    }))
}

const searchFiles = ( path = '.' ) => {

    return (new Promise((resp, errp) => {

	promo = seeDirectory ( path )
	promo.then ( res => {
	    resp ( res )
	})
	promo.catch ( err => errp ( MyError.handler(new MyError({
	    name: "CheckFilesERROR",
	    message: "Error in search file path",
	    obj: err
	}))))

    }))
}

const checkFiles = ( pathFile = '' ) => {

    return (new Promise ((resp, errp) => {

	let spl = logFileName.split('/')

	if ( pathFile == '' ) {

	    if (spl.length > 1)
		pathFile = spl[spl.length - 2]
	    else
		pathFile = spl[0]
	}

	ser = searchFiles ( pathFile )
	ser.then ( files => {
	    
	    fileName = spl[1]
	    files.forEach ( item => {
		if (item == fileName) {
		    resp(true)
		}
	    })
	    
	    resp(false)
	})
	ser.catch ( err => errp ( MyError.handler(new MyError({
	    name: "CheckFilesERROR",
	    message: "Error in search file path",
	    obj: err
	}))))
    }))
}

const loadLog = (  ) => {

    return (new Promise( (resp, errp) => {
	promised = checkFiles()
	promised.then( res => {
	    try {

		LOADED_FILE = true

		if (res){
		    fs.readFile(logFileName, (err, dataNow) => {
			if ( err ) {
			    errp ( MyError.handler(new MyError({
				name: "LogERRORLoad",
				message: "ReadFile Error",
				obj: err
			    })))
			}
			
			data = JSON.parse(dataNow);
			resp ( true )
		    })
		} else {
		    fs.createWriteStream(logFileName)
		    sol = saveLog (  )
		    sol.then ( res => resp ( false ) )
		    sol.catch (err => errp ( MyError.handler(new MyError({
			name: "LoadSaveERRORFileLog",
			message: "Error in save log of obj JSON in File",
			obj: err
		    }))))
		}
	    } catch (e) {
		errp ( MyError.handler(new MyError({
		    name: "ErrorTHENLoadLog",
		    message: "Erro in process load return",
		    obj: e
		})))
	    }
	})
	promised.catch( err => {
	    errp ( MyError.handler(new MyError({
		name:"LoadFileLogERROR",
		message:"Ckeck the file, error",
		obj: err})))
	})
    }))
}

const sizeofMB = ( object ) => {
    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
	    bytes += 4;
        }
        else if ( typeof value === 'string' ) {
	    bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
	    bytes += 8;
        }
        else if
	    (
		typeof value === 'object'
		    && objectList.indexOf( value ) === -1
	    )
        {
	    objectList.push( value );

	    for( var i in value ) {
                stack.push( value[ i ] );
	    }
        }
    }

    return bytes / 1024 / 1024;
}

const checkVersionFileName = (  ) => {

    return (new Promise((restp, errtp)=> {

	interFileName = ''

	let flag = true

	const vers = (  ) => interFileName = logFileName + '.' + blocks.ver (  )

	vers (  )

	while (flag) {
	    try {
		fs.exists(interFileName, resul => flag = resul)
		if (flag) {
		    blocks.setv ( blocks.ver (  ) + 1 )
		    vers (  )
		}
	    } catch (e) {
		errtp (MyError.handler( new MyError ({
		    name: "CheckERRORVersion",
		    message: "Erro verify file",
		    obj: e
		})))
	    }
	}
	
	restp ( interFileName )
    }))
}


const changeLogFile = () => {

    return (new Promise ((resp, errp) => {

	prom = checkVersionFileName (  )
	prom.then ( resName => {
	    try {

		fs.rename(logFileName, resName,
			  err => errp (MyError.handler( new MyError ({
			      name: "RenameERRORFile",
			      message: "Erro in rename file",
			      obj: err
			  }))))

		resp ( true )
	    } catch (e) {
		errp (MyError.handler( new MyError ({
		    name: "SaveERRORLog",
		    message: "Erro write file",
		    obj: e
		})))
	    }
	})
	prom.catch ( e => {
	    errp (MyError.handler( new MyError ({
		name: "ChangeERRORLogFile",
		message: "Erro verify file",
		obj: e
	    })))
	})
    }))
}

const checkSpace = () => {

    return (new Promise((restp, errtp) => {

	if (!(blocks.en (  ))) {

	    let so = sizeofMB(data)

	    if (so >= MAX_FILE_SIZE) {

		promo = changeLogFile (  )
		promo.then ( res => restp ( !res ) )
		promo.catch ( err => errtp ( MyError.handler(new MyError({
		    name:"changeERRORLogFile",
		    message: "Erro in call change file",
		    obj: {data: dataNew, error: err}
		}))))
		
	    } else {

		restp ( true )
	    }
	}
    }))
}


const saveLog = (  ) => {

    return (new Promise ((resp, errp) => {
	try {

	    let json = JSON.stringify(data)
	    
	    fs.writeFile(logFileName, json, 'utf8', err => {
		if (err) errp ( MyError.handler(new MyError({
		    name: "SaveLogERROR",
		    message: "Erro in save Data",
		    obj: err
		})))

		promo = checkSpace (  )
		promo.then ( res => resp ( res ) )
		promo.catch ( err => errp ( MyError.handler(new MyError({
		    name:"checkERROSpace",
		    message: "Erro in check space of file",
		    obj: {data: dataNew, error: err}
		}))))
	    })
	} catch (e) {
	    errp (MyError.handler( new MyError ({
		name: "SaveERRORLog",
		message: "Erro write file",
		obj: e
	    })))
	}
    }))
}

const ExchangeBlockHistory = (dataNew) => {

    return (new Promise ((resp, errp) => {

	data.history.push(data.logs)
	data.logs = []
	data.logs.push(dataNew)
	
	prom = saveLog()
	prom.then ( res => resp ( res ) )
	prom.catch ( err => errp ( MyError.handler(new MyError({
	    name:"ExchangeERROHistory",
	    message: "Error in save log into history list",
	    obj: dataNew
	}))))
    }))
}

const setObjectGlobal = () => {

    if (!(data.logs)){
	data['logs'] = []
    }
    if (!(data.history)){
	data['history'] = []
    }
}

const upDateLog = (dataJson) => {
    
    return (new Promise((respt, errpt) => {

	if (dataJson instanceof Object){

	    setObjectGlobal (  )

	    if (blocks.add()){

		result = data.logs.push(dataJson)
		
		respt ( result > 0 )
	    } else {
		blocks.reset()
		promised = ExchangeBlockHistory ( dataJson )
		promised.then ( res => respt ( res ) )
		promised.catch ( err => errpt ( err ) )
	    }
	} else {
	    errpt ( MyError.handler(new MyError({
		name: "upDateLogERROR",
		message: "error of insert data into cache log",
		obj: dataJson
	    })))
	}
    }))
}

const registerLogMsg = (msg) => {
    return (new Promise( (resp, errp) => {

	if (msg instanceof Object) {

	    if (!LOADED_FILE) {

		loadLog (  )
	    }

	    let SwapData = {
		date: Date(),
		enabled: true,
		data: {
		    from: msg.us,
		    about: msg.about,
		    meta: msg.meta,
		    obj: msg.obj
		}
	    }
	    
	    up = upDateLog(SwapData)
	    up.then ( res => {
		resp ( res )
	    })
	    up.catch ( err => errp ( MyError.handler(new MyError({
		    name: "ErrorRegisterLog",
		    msg: "Error in update log",
		    obj: err
	    }))))
	} else {
	    errp ( MyError.handler(new MyError({
		name: "RegisterERRRORMsg",
		msg: "Error in data type pass as parameter",
		obj: msg
	    })))
	}
    }))
}

const getLog = (uid) => {
    return data.logs[uid];
}

const getLogList = () => {
    return data.logs;
}

const getHistory = (uid) => {
    return data.history[uid]
}

const getHistoryList = () => {
    return data.history
}


module.exports = {
    registerLogMsg,
    getLogList,
    getLog,
    getHistory,
    getHistoryList
};
