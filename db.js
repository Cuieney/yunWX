const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = 'sh-cynosdbmysql-grp-9vgzkja4.sql.tencentcdb.com:23024'.split(":");

const sequelize = new Sequelize("iching", 'root', 'Cui221107', {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  openid: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  }
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
}

async function createQueue(openid, cursor) {
  const length = await Counter.count()
  const res = await Counter.findOne({
      where: {
        openid,
      }
  });
  console.log('res', res, length)
  if (!res) {
    console.log('cursor', cursor)
    const res = await Counter.create({
        count: cursor + 1,
        status: false,
        openid,
    })
    console.log('res',res)
    return {
      success: 200,
      result: res
    }
  } else {
    const res = await Counter.update({
      where: {
        openid,
      },
      status: res.count < cursor
    })
    console.log('update', res)

    return {
      success: 200,
      result: res
    }
  }
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
  createQueue
};
