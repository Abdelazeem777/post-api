function searchForUser(request, response, User) {
    var userName = request.params.userName;

    const query = { "userName": { '$regex': userName, '$options': 'i' } };

    const options = {
        sort: { userName: 1 },
        projection: { _id: 1, userName: 1, bio: 1, userProfilePicURL: 1, active: 1 },
    };
    User.find(query, options).toArray((error, result) => {
        if (error) {
            console.log("searchForUser: " + error);
            return response.status(500).send(error);
        }
        else {
            result.forEach(obj => renameKey(obj, '_id', 'userID'));
            usersMap = { 'usersList': result };
            return response.send(usersMap);
        }
    });

}
function renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}

module.exports = searchForUser;