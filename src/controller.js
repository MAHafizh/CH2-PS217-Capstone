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

// const addImgUser = async (req, res) => {
//     try{
//         const id = req.params.id || req.query.id
//         const file = req.uploadedFile;

//         const bucket = storage.bucket('testing-project-92c7c.appspot.com');
//         const fileUpload = bucket.file(`userImages/${id}/${file.name}`);
//         await fileUpload.save(file.data);

//         const [url] = await fileUpload.getSignedUrl({
//             action: 'read',
//             expires: '12-12-2024'
//         });

//         await userRefs.doc(id).update({
//             userimage: url
//         });

//         res.status(200).json({
//             status: {
//                 code: 200,
//                 message: "Images Added"
//             },
//             data: url
//         });
//     } catch(error) {
//         console.error(error);
//         res.status(500).json({
//             status: {
//                 code: 500,
//                 message: "Internal Server Error"
//             },
//             error: error.message
//         });
//     }
// }

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
  //addImgUser,
};
