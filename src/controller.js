const { userRefs } = require("../firebase/configFirestore");

const index = (req, res) => {
  res.status(200).json({
    status: {
      code: 200,
      message: "Success fetching the API",
    },
    data: null,
  });
};

const getUserImg = async(req, res) => {

  try {
    const id = req.params.id || req.query.id;
  
    if (!id) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Bad Request",
        },
        error: "Missing 'id' parameter.",
      });
    }
  
    const snapshot = await userRefs.doc(id).get();
    const imageURL = snapshot.data().imageURLs || [];
    const profileImg = snapshot.data().profileImageURL;

    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      imageURLs: imageURL,
      profileURL: profileImg
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: {
        code: 500,
        message: "Internal Server Error",
      },
      error: error.message,
    });
  }

}

const getUsers = async (req, res) => {
  const id = req.params.id || req.query.id;

  if (id) {
    try {
      const snapshot = await userRefs.doc(id).get();

      if (!snapshot.exists) {
        return res.status(404).json({
          status: {
            code: 404,
            message: "User Not Found",
          },
          data: null,
        });
      }

      const list = { id: snapshot.id, ...snapshot.data() };

      res.status(200).json({
        status: {
          code: 200,
          message: "Success",
        },
        data: list,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: {
          code: 500,
          message: "Internal Server Error",
        },
        error: error.message,
      });
    }
  } else {
    try {
      const snapshot = await userRefs.get();
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const count = snapshot.size;

      res.status(200).json({
        status: {
          code: 200,
          message: "Success",
        },
        total: count,
        data: list,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: {
          code: 500,
          message: "Internal Server Error",
        },
        error: error.message,
      });
    }
  }
};

const addUser = async (req, res) => {
  try {
    const data = req.body;
    await userRefs.add(data);
    res.status(200).json({
      status: {
        code: 200,
        message: "User Added",
      },
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: {
        code: 500,
        message: "Internal Server Error",
      },
      error: error.message,
    });
  }
};


const updateUser = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    const data = req.body;
    await userRefs.doc(id).update(data);
    res.status(200).json({
      status: {
        code: 200,
        message: "User Updated",
      },
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: {
        code: 500,
        message: "Internal Server Error",
      },
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    await userRefs.doc(id).delete();
    res.status(200).json({
      status: {
        code: 200,
        message: "User Deleted",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: {
        code: 500,
        message: "Internal Server Error",
      },
      error: error.message,
    });
  }
};

module.exports = {
  index,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserImg
};
