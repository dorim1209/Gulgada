module.exports = (sequelize, DataTypes) => {
  /* user 테이블에 칼럼의 스펙 작성 */
  return sequelize.define(
    "article",
    {
      db_title: { // 사업장 이름
        /* 크기가 20인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_wtype: { //work type 업종
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_sdate: { // 근무 시작 날짜
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(200),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_edate: {// 근무 끝나는 날짜
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(200),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_stime: { //근무 시작 시간(시)
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(200),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_smin: {//근무 시작 시간(분)
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(200),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_etime: {//근무 끝나는 시간(시)
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(200),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_emin: {//근무 끝나는 시간(분)
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(200),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_money: {// 시급
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(200),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_address: {//사업장 주소
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(200),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_description: { // 자세한 설명
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(255),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_img: { //이미지
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(255),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_pubKey: { // 사업주의 공개키
        /* 크기가 100인 문자열 */
        type: DataTypes.STRING(100),
        /* NULL 값 입력 안됨 */
        allowNull: true
      },
      db_closed: { // 공고의 마감 여부
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