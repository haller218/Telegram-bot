const MyError = require('./index.js')

let verifyClass =  ( ) => {


  console.log(MyError);
}

let testErrorInstanceof = (  ) => {

  // MyError.handler ( new Error ( 'normal' ) ) // ok

  MyError.handler ( new MyError ({
    message: 'my',
    name: 'Error',
    obj: [1,2,3]
  }) )

  // MyError.handler ( new TypeError ( 'oder' ) )// ok
}


let Main = ( (  ) => {

  console.log("Testing MyError Class");
  // verifyClass (  )
  testErrorInstanceof (  )


} )(  )
