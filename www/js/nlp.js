//看47行
var timelist=null;
var placelist=null;
var recallFunc=null;

var foo = function(data){
            
    var time="";
    var place="";
    for(var i=0;i<data[0][0].length;i++){
        if(data[0][0][i]["pos"].localeCompare("nt")==0){
            console.log("nt"+i);
            time+=data[0][0][i]["cont"];
        }else if(data[0][0][i]["pos"].localeCompare("ns")==0){
            place+=data[0][0][i]["cont"];
            console.log("ns"+i);
        }
    }

    var resulttime=intime(time,timelist);
    var resultplace=inplace(place,placelist);
    if(resulttime==null||resultplace==null)
        recallFunc(false,resulttime,resultplace);
    else
        recallFunc(true,resulttime,resultplace);
};

function nlp(textstr, time, place, recall) {
    timelist=time;
    placelist=place;
    recallFunc=recall;

    var base = "http://ltpapi.voicecloud.cn/analysis/?";
    var api_key = "D3t9W7531rYr1ANsPzMaxcsydwgKQAtKFAYeYIta";
    var text = textstr;
    var pattern = "pos";
    var format = "json";
    var callback = "foo";
    var url = base + "api_key="+api_key+"&text="+text+"&pattern="+pattern+"&format="+format+"&callback="+callback;
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
   // console.log(intime("今天中午十二点",[12323,2323467,7333,new Date().getTime(),1232323,124323434]));
}

function inplace(place, placelist ){
    for(var i=0;i<placelist.length;i++){
        if(place.length < placelist[i].length){
            if(placelist[i].indexOf(place) != -1)
                return placelist[i];
        }else{
            if(place.indexOf(placelist[i]) != -1)
                return placelist[i];
        }
    }

    return null;
}


function intime(time,timelist){
    var yb=1970;
    var yt=2020;
    var mb=0;
    var mt=11;
    var db=0;
    var dt=30;
    var hb=0;
    var ht=23;
    var wb=0;
    var wt=6;


    var date=new Date();
    var year=date.getFullYear();
    var day=date.getDate();
    var month=date.getMonth();
    var hour=date.getHours();
    var week=date.getDay();

    if(time.indexOf("今")!=-1){
        db=dt=day;
    }else if(time.indexOf("明")!=-1){
        db=dt=day+1;
    }else if(time.indexOf("后天")!=-1){
        db=dt=day+2;
    }else if(time.indexOf("明后")!=-1){
        db=day+1;
        dt=day+2;
    }else if(time.indexOf("大后天")!=-1){
        db=dt=day+3;
       
    }
////////////////////////////////////////////////////
    if(time.indexOf("日")!=-1){
        var index=time.indexOf("日")-1;
        if(time[index]<='9'&&time[index]>='0'){
            if(time[index-1]=='1'){
                var ind1=time[index]-'0';
               
                db=dt=10+ind1-1;

            }else if(time[index-1]=='2'){
                var ind1=time[index]-'0';
               
                db=dt=20+ind1-1;
            }else{
                var ind1=time[index]-'0';
                db=dt=ind1-1;
            }
        }else if(time[index]=='一'){
            
                if(time.indexOf("二十一日")!=-1)
                    db=dt=20;
           
                else if(time.indexOf("十一日")!=-1)
                    db=dt=10;
                else
                    db=dt=0;
            
            
        }else if(time[index]=='二'){
            
                if(time.indexOf("二十二日")!=-1)
                    db=dt=21;
           
                else if(time.indexOf("十二日")!=-1)
                    db=dt=11;
                else
                    db=dt=1;
            
            
        }else if(time[index]=='三'){
            
                if(time.indexOf("二十三日")!=-1)
                    db=dt=22;
           
                else if(time.indexOf("十三日")!=-1)
                    db=dt=12;
                else
                    db=dt=2;
            
            
        }else if(time[index]=='四'){
            
                if(time.indexOf("二十四日")!=-1)
                    db=dt=23;
           
                else if(time.indexOf("十四日")!=-1)
                    db=dt=13;
                else
                    db=dt=3;
            
            
        }else if(time[index]=='五'){
            
                if(time.indexOf("二十五日")!=-1)
                    db=dt=24;
           
                else if(time.indexOf("十五日")!=-1)
                    db=dt=14;
                else
                    db=dt=4;
            
            
        }else if(time[index]=='六'){
            
                if(time.indexOf("二十六日")!=-1)
                    db=dt=25;
           
                else if(time.indexOf("十六日")!=-1)
                    db=dt=15;
                else
                    db=dt=5;
            
            
        }else if(time[index]=='七'){
            
                if(time.indexOf("二十七日")!=-1)
                    db=dt=26;
           
                else if(time.indexOf("十七日")!=-1)
                    db=dt=16;
                else
                    db=dt=6;
            
            
        }else if(time[index]=='八'){
            
                if(time.indexOf("二十八日")!=-1)
                    db=dt=27;
           
                else if(time.indexOf("十八日")!=-1)
                    db=dt=17;
                else
                    db=dt=7;
            
            
        }else if(time[index]=='九'){
            
                if(time.indexOf("二十九日")!=-1)
                    db=dt=28;
           
                else if(time.indexOf("十九日")!=-1)
                    db=dt=18;
                else
                    db=dt=8;
            
            
        }else if(time[index]=='十'){
            
                if(time.indexOf("二十日")!=-1)
                    db=dt=19;
           
                else 
                    db=dt=9;
            
            
        }
    }

    if(time.indexOf("月")!=-1){
        var index=time.indexOf("月")-1;
        if(time.indexOf("十一月")!=-1||time.indexOf("11月")){
            mb=mt=10;
        }else if(time.indexOf("十二月"||time.indexOf("12月"))!=-1){
            mb=mt=11;
        }else{
            switch(time[index]){
                case '一':mb=mt=0;break;
                case '二':mb=mt=1;break;
                case '三':mb=mt=2;break;
                case '四':mb=mt=3;break;
                case '五':mb=mt=4;break;
                case '六':mb=mt=5;break;
                case '七':mb=mt=6;break;
                case '八':mb=mt=7;break;
                case '九':mb=mt=8;break;
                case '十':mb=mt=9;break;
                case '1':mb=mt=0;break;
                case '2':mb=mt=1;break;
                case '3':mb=mt=2;break;
                case '4':mb=mt=3;break;
                case '5':mb=mt=4;break;
                case '6':mb=mt=5;break;
                case '7':mb=mt=6;break;
                case '8':mb=mt=7;break;
                case '9':mb=mt=8;break;
                case '0':mb=mt=9;break;
            }
        }
    }

    var weekandday=day-week;
    var daysofmonth=30;
    if(month==0||month==2||month==4||month==6||month==7||month==9||month==11){
        daysofmonth=31;
    }else if(month==1)
        daysofmonth=28;


    if(time.indexOf("星期")!=-1){
        
        var index=time.indexOf("星期")+2;
        if(time.indexOf("下星期")!=-1){
            db=(weekandday+7)%daysofmonth;
            dt=(db+7)%daysofmonth;
        }else if(time.indexOf("下个星期")!=-1){
            db=(weekandday+7)%daysofmonth;
            dt=(db+7)%daysofmonth;
        }else if(time.indexOf("下下星期")!=-1){
            db=(weekandday+14)%daysofmonth;
            dt=(db+7)%daysofmonth;
        }else if(time.indexOf("这星期")!=-1){
            db=(weekandday)%daysofmonth;
            dt=(db+7)%daysofmonth;
        }
        switch(time[index]){
            case '一':wb=wt=0;break;
            case '二':wb=wt=1;break;
            case '三':wb=wt=2;break;
            case '四':wb=wt=3;break;
            case '五':wb=wt=4;break;
            case '六':wb=wt=5;break;
            case '日':wb=wt=6;break;
            case '天':wb=wt=6;break;
        }
    }

    if(time.indexOf("周")!=-1){
        var index=time.indexOf("周")+1;
        if(time.indexOf("下周")!=-1){
            db=(weekandday+7)%daysofmonth;
            dt=(db+7)%daysofmonth;
        }else if(time.indexOf("下下周")!=-1){
            db=(weekandday+14)%daysofmonth;
            dt=(db+7)%daysofmonth;
        }else if(time.indexOf("本周")!=-1){
            db=(weekandday)%daysofmonth;
            dt=(db+7)%daysofmonth;
        }else if(time.indexOf("这周")!=-1){
            db=(weekandday)%daysofmonth;
            dt=(db+7)%daysofmonth;
        }

        switch(time[index]){
            case '一':wb=wt=0;break;
            case '二':wb=wt=1;break;
            case '三':wb=wt=2;break;
            case '四':wb=wt=3;break;
            case '五':wb=wt=4;break;
            case '六':wb=wt=5;break;
            case '日':wb=wt=6;break;
            case '末':wb=5;wt=6;break;
        }
    }



    if(time.indexOf("早上")!=-1){
        hb=6;
        ht=11;
    }else if(time.indexOf("晚上")!=-1){
        hb=19;
        ht=23;
    }else if(time.indexOf("凌晨")!=-1){
        hb=0;
        ht=6;
    }else if(time.indexOf("午后")!=-1){
        hb=12;
        ht=15;
    }else if(time.indexOf("上午")!=-1){
        hb=6;
        ht=11;
    }else if(time.indexOf("中午")!=-1){
        hb=10;
        ht=14;
    }else if(time.indexOf("下午")!=-1){
        hb=13;
        ht=19;
    }else if(time.indexOf("夜里")!=-1){
        hb=21;
        ht=23;
    }

    if(time.indexOf("点")!=-1){
        var index=time.indexOf("点")-1;
        if(time[index]<='9'&&time[index]>='0'){
            if(time[index-1]=='1'){
                var ind1=time[index]-'0';
               
                hb=ht=10+ind1;

            }else{
                var ind1=time[index]-'0';
               
                hb=ht=ind1;
            }
        }else if(time[index]=='一'){
            if(hb>10){
                if(time.indexOf("十一点")!=-1)
                    hb=ht=23;
                else
                    hb=ht=13;
            }if(hb==10){
                if(time.indexOf("十一点")!=-1)
                    hb=ht=11;
                else
                    hb=ht=13;
            }else{
                if(time.indexOf("十一点")!=-1)
                    hb=ht=11;
                else
                    hb=ht=1;
            }
        }else if(time[index]=='两'){
            if(hb>=10){
                hb=ht=14;
            }else
                hb=ht=2;
        }else if(time[index]=='三'){
            if(hb>=10){
                hb=ht=15;
            }else
                hb=ht=3;
        }else if(time[index]=='四'){
            if(hb>=10){
                hb=ht=16;
            }else
                hb=ht=4;
        }else if(time[index]=='五'){
            if(hb>=10){
                hb=ht=17;
            }else
                hb=ht=5;
        }else if(time[index]=='六'){
            if(hb>=10){
                hb=ht=18;
            }else
                hb=ht=6;
        }else if(time[index]=='七'){
            if(hb>=10){
                hb=ht=19;
            }else
                hb=ht=7;
        }else if(time[index]=='八'){
            if(hb>=10){
                hb=ht=20;
            }else
                hb=ht=8;
        }else if(time[index]=='九'){
            if(hb>=10){
                hb=ht=21;
            }else
                hb=ht=9;
        }else if(time[index]=='十'){
            if(hb>=10){
                hb=ht=22;
            }else
                hb=ht=10;
        }else if(time[index]=='零'){
            hb=ht=0;
        }else if(time[index]=='二'){
            if(hb>10){
                hb=ht=24;
            }else{
                hb=ht=12;
            }
        }
    }

    for(var i=0;i<timelist.length;i++){
        if(qualify(timelist[i],yb,yt,mb,mt,db,dt,hb,ht,wb,wt)){
            return timelist[i];
        }
    }
    return null;
}

function qualify(time,yb,yt,mb,mt,db,dt,hb,ht,wb,wt){
    var date=new Date(time);
    
    var year=date.getFullYear();
    var day=date.getDate();
    var month=date.getMonth();
    var hour=date.getHours();
    var week=date.getDay();
    
    if(year>=yb&&year<=yt&&day>=db&&day<=dt&&month>=mb&&month<=mt&&hour>=hb&&hour<=ht&&week>=wb&&week<=wt){
        return true;
    }else
        return false;
}