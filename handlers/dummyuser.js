const users = [];

export function userJoin(id, username){
    const user = {id, username};

    users.push(user);
    console.log(users, "users");

    return user;
}

console.log("user out", users);

export function getUser(id){
    return users.find(user => user.id === id);
}

export function userDisconnect(id){
    const index = getUser(id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}