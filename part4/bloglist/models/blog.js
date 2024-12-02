const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      text: String,
      user: {
        id: mongoose.Schema.Types.ObjectId,
        username: String,
        name: String,
      },
    },
  ],
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // Convertir el _id del blog principal
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    // Convertir el _id de los comentarios
    if (returnedObject.comments) {
      returnedObject.comments = returnedObject.comments.map((comment) => {
        return {
          ...comment,
          id: comment._id.toString(), // Convertir _id a id
          _id: undefined, // Eliminar _id con guion bajo
        };
      });
    }
  },
});


module.exports = mongoose.model("Blog", blogSchema);
