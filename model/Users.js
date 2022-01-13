const Sequalize = require('sequelize');
const db = require('../config/db');
const Projects = require('../model/Projects')
const bcrypt = require('bcrypt-nodejs')

const Users = db.define('users',{
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: Sequalize.STRING(60),
        allowNull: false,
        validate:{
            isEmail:{
                msg: 'Add a valid Email'
            },
            notEmpty:{
                msg: 'Email cannot be empty'
            }

        },
        unique:{
            args: true,
            msg: 'User already exist'
        }
        
    },
    password:{
        type: Sequalize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'Password cannot be empty'
            }
        }
    },
    active: {
        type: Sequalize.INTEGER,
        defaultValue: 0
    },
    token: Sequalize.STRING,
    expiration: Sequalize.DATE

},{
    hooks:{
        beforeCreate(user){
            user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10));
        }
    }
});

Users.prototype.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

Users.hasMany(Projects);

module.exports = Users;