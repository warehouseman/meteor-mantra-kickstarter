import Sequelize from 'sequelize';
// import casual from 'casual';
// import _ from 'lodash';
// import Mongoose from 'mongoose';
// import rp from 'request-promise';

// //MONGO CONNECTORS
// const mongo = Mongoose.connect('mongodb://localhost:3001/views');

// const ViewSchema = Mongoose.Schema({
//     postId: Number,
//     views: Number,
// });

// const Views = Mongoose.model('views', ViewSchema);

// //REST CONNECTOR
// const FortuneCookie = {
//     getOne() {
//         return rp('http://fortunecookieapi.com/v1/cookie')
//                 .then((res) => JSON.parse(res))
//     .then((res) => {
//             return res[0].fortune.message;
//     });
//     },
// };

//SQL CONNECTORS
//secure your passwords:
//https://medium.com/@SamCorcos/up-and-running-with-meteor-settings-settings-json-3090d4c259ea#.hheg3c7k8
export const db = new Sequelize('meteor-starter', 'apollo', 'okmmpl,,', {
  host: 'dbs',
  dialect: 'postgres'
});

const AuthorModel = db.define('author', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
    _id: { type: Sequelize.STRING },
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// // create mock data with a seed, so we always get the same
// casual.seed(123);
// db.sync({ force: true }).then(() => {
//     _.times(10, () => {
//         return AuthorModel.create({
//             firstName: casual.first_name,
//             lastName: casual.last_name,
//         }).then((author) => {
//             return author.createPost({
//                 title: `A post by ${author.firstName}`,
//                 text: casual.sentences(3),
//             }).then((post) => {
//                 // create some View mocks
//                 return Views.update(
//                     { postId: post.id },
//                     { views: casual.integer(0, 100) },
//                     { upsert: true });
//             });
//         });
//     });
// });

const Author = db.models.author;
const Post = db.models.post;

// export { Author, Post, Views, FortuneCookie };
export { Author, Post };
