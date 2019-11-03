module.exports = (sequelize, DataTypes) => {
  /* user 테이블에 칼럼의 스펙 작성 */
  return sequelize.define(
    "timelog",
    {
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
      db_go: {
        /* 크기가 10인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력 안됨 */
        allowNull: false
      },
      db_leave: {
        /* 크기가 10인 문자열 */
        type: DataTypes.STRING(10),
        /* NULL 값 입력 안됨 */
        allowNull: false
      },
      db_timelog: {
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(200),
        /* NULL 값 입력 안됨 */
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );
};
