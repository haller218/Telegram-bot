const fs = require('fs');
const MyError = require('../MyError')
const logFileName = "./logFile.json";


var data = {};
var fileLocked = false;

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
		fs.readFile(logFileName, (err, data) => {
		    if ( err ) {
			MyError.handler({
			    name: "LogERRORLoad",
			    message: "ReadFile Error",
			    obj: err
			})
		    }
		    
		    data = JSON.parse(data);
		    resp ( true )
		})
	    } else {
		
		fs.createWriteStream(logFileName)
		saveLog (  )
		resp ( false )
	    }})
	promised.catch( err => {
	    errp ( MyError({
		name:"LoadFileLogERROR",
		message:"Load the file error",
		obj: err}))
	})
    }))
}

const saveLog = (  ) => {
	if(!fileLocked){
		fileLocked = true;
		var json = JSON.stringify(data);
		fs.writeFile(logFileName, json, 'utf8', err => {
			if (err) throw err;
			fileLocked = false;
		})
	}
}

const registerLogMsg = (msg) => {
    var uid = msg.chat.id;
    var usr = {enabled: true, data: {from: msg.from, chat: msg.chat}};
    users[uid] = usr;
    saveUsers();
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
