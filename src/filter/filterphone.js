// export function toMoney(money = 0) {

//     return money.toFixed(2);
// }

export function toPhone(phoneNo) {
    let newphoneNo = phoneNo;
    newphoneNo = newphoneNo.substring(0, 3) + "*****" + newphoneNo.substring(8, 11);
    // if (newMoney) {
    //     newMoney = newMoney.toFixed(2)  //小数点截取后两位
    // } else {
    //     newMoney = 0;
    //     newMoney = newMoney.toFixed(2)
    // }

    return newphoneNo;
}