export default function sortTransactions(creditData,debitData){
    let sortedArray=[];
    let i=0,j=0;
    while(i<creditData.length && j<debitData.length){
        let time1=new Date(creditData[i].time);
        let time2=new Date(debitData[j].time);

        if(time1<time2){
            sortedArray.push({...creditData[i],transactionType:'credit'});
            i++;
        }
        else{
            sortedArray.push({...debitData[j],transactionType:'debit'});
            j++
        }
    }

    while(i<creditData.length){
        sortedArray.push({...creditData[i],transactionType:'credit'});
        i++;
    }

    while(j<debitData.length){
        sortedArray.push({...debitData[j],transactionType:'debit'});
        j++
    }
    return sortedArray;

}