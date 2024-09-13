import apiclient from './client';

const login = (userName,userPassword) => {
    return apiclient.post('/login/authenticate',{
        userName: userName,
        userPassword: userPassword,
    });
};

export default{
    login,
}