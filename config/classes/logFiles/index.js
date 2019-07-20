const fs = require('fs');
const MyError = require('../MyError')
const logFileName = "./tm/logFile.json";
const MAX_FILE_SIZE = 5.2 // in mb

let data = {};

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

	set ( sum (  ) )
	return check (  )
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

    return (new Promisse ((resp, errp) => {
	try {
	    fs.readdir ( pathD ,(err, files) => {
		if ( err ) {
		    errp ( MyError.handler(new MyError({
			name: "SeeERRORDirectory",
			message: "suck directory error"
			obj: err
		    })))
		}
		resp ( files )
	    })
	} catch (e) {
	    errp ( MyError.handler(new MyError({
		name: "seeErrorTHENDirectory",
		message: "Erro in THEN body seeDirectory",
		obj: e
	    })))
	}

    }))
}

const searchFiles = ( path = '.' ) => {

    return (new Promise((resp, errp) => {
	try {
	    promo = seeDirector ( path )
	    promo.then ( res => {
		resp ( res )
	    })
	    peomo.catch ( err => errp ( MyError.handler(new MyError({
		name: "CheckFilesERROR",
		message: "Error in search file path",
		obj: err
	    }))))
	} catch (e) {
	    errp ( MyError.handler(new MyError({
		name: "searchErrorTHENFiles",
		message: "Erro in THEN body searchFile",
		obj: e
	    })))
	} 
    }))
}

const checkFiles = ( pathFile = '' ) => {

    return (new Promise ((resp, errp) => {

	spl = logFileName.split('/')

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
		    saveLog (  )
		    resp ( false )
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
		message:"Load the file error",
		obj: err})))
	})
    }))
}

const sizeof = ( object ) => {
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
    return bytes;
}

const changeLogFile = () => {

    return (new Promise ((res, err) => {

	checkFiles
    }))
}

const checkSpace = () => {

    return (new Promise((restp, errtp) => {
	try {
	    if (blocks.en (  )) {
		so = sizeof(data)

		so = so / 1024 / 1024

		if (so >= MAX_FILE_SIZE) {

		    promo = changeLogFile (  )
		    promo.then ( res => restp ( res ) )
		    promo.catch ( err => errtp ( MyError.handler(new MyError({
			name:"changeERRORLogFile",
			message: "Erro in rename logFile archive",
			obj: dataNew
		    }))))
		    
		} else {
		    return false
		}
	    }
	} catch (e) {
	    errtp (MyError.handler( new MyError ({
		name: "CheckERRORTHENSpace",
		message: "Erro THEN Check Space File",
		obj: e
	    })))
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

		bi = true
		
		promo = checkSpace (  )
		promo.then ( res => bi = bi && res )
		promo.catch ( err => errp ( MyError.handler(new MyError({
		    name:"checkERROSpace",
		    message: "Erro in check space of file",
		    obj: dataNew
		}))))

		resp ( bi )
	    })
	} catch (e) {
	    errp (MyError.handler( new MyError ({
		name: "SaveERRORTHENLog",
		message: "Erro THEN write file",
		obj: e
	    })))
	}
    }))
}

const ExchangeBlockHistory = (dataNew) => {

    return (new Promise ((resp, errp) => {
	try {
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
	} catch (e) {
	    errp (MyError.handler(new MyError ({
		name: "ExchangeTHENBlockERROR",
		msg:"Error in put new data into history",
		obj: e
	    })))		
	}
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
	try {
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
	} catch (e) {
	    errpt ( MyError.handler(new MyError({
		name: "UpDateTHENLogERROR",
		message: "Error in updatelog data",
		obj: e
	    })))
	}
    }))
}

const registerLogMsg = (msg) => {
    return (new Promise( (resp, errp) => {

	if (msg instanceof Object) {
	    try {
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
		up.catch ( err => {
		    
		    errp ( MyError.handler(new MyError({
			name: "ErrorRegisterLog",
			msg: "Error in update log",
			obj: err
		    })))
		})
	    } catch (e) {
		errp ( MyError.handler(new MyError({
		    name: "RegisterTHENERRRORMsg",
		    msg: "Error in data handler to register msg",
		    obj: msg
		})))
	    }
	} else {
	    errp ( MyError.handler(new MyError({
		name: "RegisterERRRORMsg",
		msg: "Error in data type pass as parameter",
		obj: msg
	    })))
	}
    }))
}

const getMsg = (uid) => {
    return users[uid];
}

const getLogList = () => {
    return Object.keys(users);
}

const setMetaData = (uid, key, val) => {
    users[uid].data[key] = val;
    saveUsers();
}

const getMetaData = (uid, key) => {
    return users[uid].data[key];
}

const assertCounter = (uid, id) => {
    if(users[uid]) {
        if(users[uid].counter) {
            if(users[uid].counter[id]) {
                if("value" in users[uid].counter[id]) {
                    return true;
                }
                else {
                    users[uid].counter[id].value = 0;
                }
            }
            else {
                users[uid].counter[id] = {};
                users[uid].counter[id].value = 0;
                saveUsers();
            }
        }
        else {
            users[uid].counter = {};
            if(users[uid].count && id == '0') {//old counter detected, migrate count
                users[uid].counter[id] = {value: users[uid].count};
                delete users[uid].count;
            }
            else {
                users[uid].counter[id] = {};
                users[uid].counter[id].value = 0;
            }
            saveUsers();
        }
    }
    else {
        //console.log("[ERROR] User ID", uid, "does not exist in database");
        var usr = {enabled: true, data: {from: undefined, chat: undefined, error: "user was not initialized properly"}, counter: {"0": {"value": 1}}};
        users[uid] = usr;
        saveUsers();
    }
}

const setCounter = (uid, id, val) => {
    assertCounter(uid, id);
    users[uid].counter[id].value = val;
    saveUsers();
}

const getCounter = (uid, id) => {
    assertCounter(uid, id);
    return users[uid].counter[id].value;
}

const getAllCounters = (uid) => {
    assertCounter(uid, '0');
    return users[uid].counter;
}

module.exports = {
    loadLog,
    registerLogMsg,
    getLogList,
    setMetaData,
    getMetaData,
    setCounter,
    getCounter,
    getAllCounters
};
