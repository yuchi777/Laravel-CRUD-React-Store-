//轉換幣值
export const formatPrice = (cents) =>{
    //parseInt() 函式能將輸入的字串轉成整數。
    return parseInt(cents*5).toLocaleString('ja-JP',{
        style:'currency',
        currency:'JPY',
        minimumFractionDigits:0
    })
}