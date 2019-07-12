module.exports = class MyError extends Error
{

    constructor ( ObjectError = {} ) {

	super (  )

	let checkFields = (  ) =>  {

	    ObjectError.name = ( !!ObjectError.name ) ? ObjectError.name  : ''
	    ObjectError.message = ( !!ObjectError.message ) ?
		ObjectError.message  : ''
	    ObjectError.obj = ( !!ObjectError.obj ) ? ObjectError.obj : {}
	}

	checkFields (  )

	this.name = 'MyError:' + ObjectError.name
	this.message = ObjectError.message
	this.obj = ObjectError.obj


    }

    static show ( objerr, flag = false ) {
	console.log("### ERROR ###");
	console.log( objerr.name )
	console.log( objerr.message )
	console.log( objerr.obj )
	if ( flag )
	    console.log( objerr.stack ) 
    }

    static handler ( err ) { // TODO
      
	if ( err instanceof MyError ) {

	    MyError.show ( err, true )
	} else {

	    if ( err instanceof Error ) {

		throw err
	    } else {

		if ( err instanceof Object  ) {
		    
		    MyError.show ( err )
		} else {
		    
		    if (typeof ( err ) == String)
			throw new Error ( err )

		    else throw new Error ( 'MyError: unknow' ) 
		}
	    }
	}

	return err
    }

}
