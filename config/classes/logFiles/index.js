const fs = require('fs');
const MyError = require('../MyError')
const logFileName = "./logFile.json";


let data = {};

const blocks = () => {
    
    let block_count = 0
    const MAX_BLOCK = 64
    const check = () => block_count < MAX_BLOCK
    const sum = () = block_count + 1
    const set = value => block_count = value
    const add = () => {
	if (check())
	    return set(sum())
	else
	    return false
    }
    const reset = () => block_count = 0

    return {
	add,
	reset
    }
}

const lock = ( (  ) => {
    let fileLocked = false;
    const on = (  ) => fileLocked = true
    const off = (  ) => fileLocked = false
    const get = (  ) => fileLocked
    const push = (  ) => fileLocked = !( get (  ) )
    return {
	on,
	off,
	get,
	push
    }
})()

const checkFiles = ( pathFile = '' ) => {

    if ( !pathFile ) {
	pathFile = logFileName
    }

    return (new Promise((resp, errp) => {
	fs.readdir('.',(err, files) => {
	    if ( err ) {
		errp ( MyError.handler({
		    name: "File ERROR",
		    message: "No files in directory logFile",
		    obj: err
		}))
	    }
	    
	    fileName = pathFile.split('/')[1]
	    files.forEach ( item => {
		if (item == fileName) {
		    resp(true)
		}
	    })
	    resp(false)
	})
    }))
}

const loadLog = (  ) => {

    return (new Promise( (resp, errp) => {
	promised = checkFiles()
	promised.then( res => {
	    if (res){
		fs.readFile(logFileName, (err, dataNow) => {
		    if ( err ) {
			MyError.handler({
			    name: "LogERRORLoad",
			    message: "ReadFile Error",
			    obj: err
			})
		    }

		    data = JSON.parse(dataNow);
		    resp ( true )
		})
	    } else {
		
		fs.createWriteStream(logFileName)
		saveLog (  )
		resp ( false )
	    }})
	promised.catch( err => {
	    errp ( MyError.handler({
		name:"LoadFileLogERROR",
		message:"Load the file error",
		obj: err}))
	})
    }))
}

const checkSpace = () => {
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
    console.log(sizeof(data))
}

const saveLog = (  ) => {

    if(!(lock.get())){

	const json = JSON.stringify(data)

	return (new Promise ((resp, errp) => {

	    lock.push()

	    fs.writeFile(logFileName, json, 'utf8', err => {
		if (err) errp ( MyError.handler({
		    name: "SaveLogERROR",
		    message: "Erro in save Data",
		    obj: err
		}))

		resp(!(lock.push()))
	    })
	}))
    }
}

const exchangeBlockHistory = (dataNew) => {

    
}

const upDateLog = (dataJson) => {
    
    if (!(data.logs)){
	data['logs'] = []
    }
    if (dataJson instanceof Object){

	if (blocks.add())
	    data.logs.push(dataJson)
	} else {
	    exchangeBlockHistory (dataJson)
	    blocks.reset()
	}
    } else {
	throw MyError({
	    name: "upDateLogERROR",
	    message: "error of insert data into cache log",
	    obj: dataJSON
	})
    }
}

const registerLogMsg = (msg) => {

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
    
    return (new Promise( (resp, errp) => {
	
	upDateLog(SwapData)
	promised = saveLog()
	promised.then( res => {
	    resp ( res )
	})
	promised.catch( err => {
	    errp ( err )
	})
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
