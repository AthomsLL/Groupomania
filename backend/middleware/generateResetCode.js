exports.generateResetCode = () => {
    let minCode = 102467;
    let maxCode = 999989;

    let resetCode = Math.floor(Math.random() * (maxCode - minCode + 1)) + minCode;

    return resetCode;
}