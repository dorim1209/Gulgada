module.exports = (sequelize, DataTypes) => {
  /* user 테이블에 칼럼의 스펙 작성 */
  return sequelize.define(
    "apply",
    {
      db_apubKey: {
        /* 크기가 20인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: false
      },
      db_articleId: {
        /* 크기가 20인 문자열 */
        type: DataTypes.STRING(20),
        /* NULL 값 입력 안됨 */
        allowNull: false
      },
      db_opubKey: {
        /* 크기가 20인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: false
      },
      db_accept: {
        /* 크기가 20인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력됨 */
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );
};
