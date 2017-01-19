import Sequelize from 'sequelize';

export const db = new Sequelize(
  'meteor-starter',
  'apollo',
  'okmmpl,,',
  {
    host: 'dbs',
    dialect: 'postgres'
  }
);

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

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post };
