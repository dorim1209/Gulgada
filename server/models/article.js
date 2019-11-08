module.exports = (sequelize, DataTypes) => {
  /* user 테이블에 칼럼의 스펙 작성 */
  return sequelize.define(
    "article",
    {
      db_title: {
        /* 크기가 20인 문자열 */
        type: DataTypes.STRING(20),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_wtype: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(20),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_sdate: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_edate: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_stime: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_smin: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_etime: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_emin: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_money: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_address: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(20),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_description: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(1000),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_img: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_pubKey: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );
};
