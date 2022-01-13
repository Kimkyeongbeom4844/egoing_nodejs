var args = process.argv
console.log(args[2]); //args[0] : nodejs런타임설치 정보, args[1] : 해당 파일경로, args[2] ~ : 입력값 
console.log('A');
console.log("B");
if(args[2] === '1'){
    console.log("C1");
}
else {
    console.log("C2");
}
console.log("D");