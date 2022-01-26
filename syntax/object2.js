var o = {
    v1 : 'v1',
    v2 : 'v2',
    f1 : function(){    //메소드(일반함수 아님!!) 안 this는 메소드를 호출한 객체에 바인딩됨
        console.log(this.v1);
    },
    f2 : function(){
        console.log(this.v2);
    }
}

o.f1();
o.f2();