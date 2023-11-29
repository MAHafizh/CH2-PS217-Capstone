const usersRef = require('../firebase/config');

const index = (req, res) => {
    res.status(200).json({
        status: {
            code: 200,
            message: "Success fetching the API",
        },
        data: null,
    });
};

const getUsers = async (req, res) => {
    try{
        const snapshot = await usersRef.get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.send(list);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    index,
    getUsers
};
