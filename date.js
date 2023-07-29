
// exports.getDate= function(){
// let options = {
//     year: 'numeric',
//     weekday:"long",
//     month: 'long',
//     day: 'numeric' };

//   return new Date().toLocaleDateString('fa-IR', options);
// }
exports.getDay= function (){
let options = {
    day: 'numeric' };
    
  let day = new Date().toLocaleDateString('fa-IR', options);

  return day;
}


exports.getOption= function(){
  let options = {
      year: 'numeric',
      weekday:"long",
      month: 'long',
      day: 'numeric' };
  
    return (options);
  }
