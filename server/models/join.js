module.exports = (sequelize, DataTypes) => {
  /* user 테이블에 칼럼의 스펙 작성 */
  return sequelize.define(
    "join",
    {
      db_ptype: {
        /* 크기가 20인 문자열 */
        type: DataTypes.STRING(20),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_name: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(20),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_pnum: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(20),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_pw: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(20),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_birth: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(20),
        /* NULL 값 입력 안됨 */
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );
};
