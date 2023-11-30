const userRefs = require('../firebase/config');

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
        const snapshot = await userRefs.get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        res.status(200).json({
            status: {
                code: 200,
                message: "Success"
            },
            data: list
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            status: {
                code: 500,
                message: "Internal Server Error"
            },
            error: error.message
        });
    }
}

const addUsers = async (req, res) => {
    try{
        const data = req.body;
        await userRefs.add(data);
        res.status(200).json({
            status: {
                code: 200,
                message: "User Added"
            },
            data: data
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            status: {
                code: 500,
                message: "Internal Server Error"
            },
            error: error.message
        });
    }
}

module.exports = {
    index,
    getUsers,
    addUsers
};