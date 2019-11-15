module.exports = (sequelize, DataTypes) => {
    /* user 테이블에 칼럼의 스펙 작성 */
    return sequelize.define(
        "contract",
        {
            articleId: {
                // 공고 번호
                /* 크기가 20인 문자열 */
                type: DataTypes.STRING(20),
                /* NULL 값 입력 안됨 */
                allowNull: false
            },
            owner_key: {
                // 사업주 key
                /* 크기가 100인 문자열 */
                type: DataTypes.STRING(100),
                /* NULL 값 입력 안됨 */
                allowNull: true
            },
            worker_key: {
                // 근로자 key
                /* 크기가 100인 문자열 */
                type: DataTypes.STRING(100),
                /* NULL 값 입력 안됨 */
                allowNull: true
            },
            is_sign: {
                // 계약되었는지 여부
                /* 크기가 10인 문자열 */
                type: DataTypes.STRING(10),
                /* NULL 값 입력 안됨 */
                allowNull: true
            }
        },
        {
            timestamps: false
        }
    );
};