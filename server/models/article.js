module.exports = (sequelize, DataTypes) => {
  /* user 테이블에 칼럼의 스펙 작성 */
  return sequelize.define(
    "article",
    {
      db_title: {
        /* 크기가 20인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_date: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_money: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_address: {
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
