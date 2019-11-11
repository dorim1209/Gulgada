module.exports = (sequelize, DataTypes) => {
    /* user 테이블에 칼럼의 스펙 작성 */
    return sequelize.define(
        "apply",
        {
            db_apubKey: {
                //applicant public Key 지원자 공개키(주소)
                /* 크기가 20인 문자열 */
                type: DataTypes.STRING(100),
                /* NULL 값 입력 안됨 */
                allowNull: false
            },
            db_articleId: {
                //공고의 index값 (고유함)
                /* 크기가 20인 문자열 */
                type: DataTypes.STRING(20),
                /* NULL 값 입력 안됨 */
                allowNull: false
            },
            db_opubKey: {
                //owner public Key 사업주 공개키(주소)
                /* 크기가 20인 문자열 */
                type: DataTypes.STRING(100),
                /* NULL 값 입력 안됨 */
                allowNull: false
            },
            db_accept: {
                //사업주가 지원자의 지원에 대한 승낙 여부
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