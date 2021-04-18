export const dataTime = data => {

    const datatime_ = new Date(data);

    const day = datatime_.getDate() < 10 ? "0"+datatime_.getDate() : datatime_.getDate();
    const month = datatime_.getMonth()+1 < 10 ? "0"+(datatime_.getMonth()+1) : datatime_.getMonth()+1;
    const year = datatime_.getFullYear();

    const min = datatime_.getMinutes() < 10 ? "0"+datatime_.getMinutes() : datatime_.getMinutes() ;
    const hour = datatime_.getHours() < 10 ? "0"+datatime_.getHours() : datatime_.getHours() ;

    return `${year}-${month}-${day} ${hour}:${min}:00`;

}