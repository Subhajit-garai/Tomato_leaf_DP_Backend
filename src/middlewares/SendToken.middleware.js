
// create token and saving in cookies

export const  SendToken = (User,statusCode ,res,message) => {
    let token = User.generateToken();
    const options = {
         expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), 
         httpOnly: true , 
         sameSite: 'None',
         secure: true,
        }
    res.status(statusCode).cookie("token", token, options).json({ success: true, message:message})
}
