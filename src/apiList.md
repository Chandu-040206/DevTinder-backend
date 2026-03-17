# DevTinder

## authRouter
    - POST /signUp
    - POST /login
    - POST /logOut

## profileRouter 
    - GET /profile/view
    - POST /profile/edit
    - POST /profile/password

## connectionRequestRouter
    - POST /request/send/:status/:userId
    - POST /request/review/:status/:requestId

## userRouter
    - GET /user/requests/received
    - GET /user/connections
    - GET /user/feed

status - ignored , interested , accepted , rejected