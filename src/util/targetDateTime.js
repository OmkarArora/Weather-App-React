export function calculateDateTime(offset){
    //input: target place timezone
    let offsetInHours = (offset)/3600;

    //get UTC from local time
    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;

    //form new date from utc and target place offset
    let newDateTime = utc + (3600000 * offsetInHours);
    let convertedDate = new Date(newDateTime);
    return convertedDate;
}
