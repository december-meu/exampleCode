//---------------------------------------------------  
// 判断闰年  
//---------------------------------------------------  
Date.prototype.isLeapYear = function()   
{   
    return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));   
}   
  
//---------------------------------------------------  
// 日期格式化  
// 格式 YYYY/yyyy/YY/yy 表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
//---------------------------------------------------  
//Date.prototype.Format = function(formatStr)   
//{   
//    var str = formatStr;   
//    var Week = ['日','一','二','三','四','五','六'];  
//  
//    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
//    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
//  
////    var month=this.getMonth();
//    var month=this.getMonth()+1;
//    str=str.replace(/MM/,month>9?month.toString():'0' + month);   
//    str=str.replace(/M/g,month);   
//  
//    str=str.replace(/w|W/g,Week[this.getDay()]);   
//  
//    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
//    str=str.replace(/d|D/g,this.getDate());   
//  
//    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
//    str=str.replace(/h|H/g,this.getHours());   
//    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
//    str=str.replace(/m/g,this.getMinutes());   
//  
//    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
//    str=str.replace(/s|S/g,this.getSeconds());   
//  
//    return str;   
//}   
  
//+---------------------------------------------------  
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd   
//+---------------------------------------------------  
function daysBetween(DateOne,DateTwo)  
{   
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
  
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
  
    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
    return Math.abs(cha);  
}  
  
  
//+---------------------------------------------------  
//| 日期计算  
//+---------------------------------------------------  
Date.prototype.DateAdd = function(strInterval, Number) {   
    var dtTmp = this;  
    switch (strInterval) {   
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));  
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));  
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));  
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));  
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));  
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
    }  
}  
  
//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串  
//+---------------------------------------------------  
Date.prototype.DateDiff = function(strInterval, dtEnd) {   
    var dtStart = this;  
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型  
    {   
        dtEnd = StringToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}  
  
//+---------------------------------------------------  
//| 日期输出字符串，重载了系统的toString方法  
//+---------------------------------------------------  
Date.prototype.toString = function(showWeek)  
{   
    var myDate= this;  
    var str = myDate.toLocaleDateString();  
    if (showWeek)  
    {   
        var Week = ['日','一','二','三','四','五','六'];  
        str += ' 星期' + Week[myDate.getDay()];  
    }  
    return str;  
}  
  
//+---------------------------------------------------  
//| 日期合法性验证  
//| 格式为：YYYY-MM-DD或YYYY/MM/DD  
//+---------------------------------------------------  
function IsValidDate(DateStr)   
{   
    var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); //去两边空格;   
    if(sDate=='') return true;   
    //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''   
    //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式   
    var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,'');   
    if (s=='') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D   
    {   
        var t=new Date(sDate.replace(/\-/g,'/'));   
        var ar = sDate.split(/[-/:]/);   
        if(ar[0] != t.getYear() || ar[1] != t.getMonth()+1 || ar[2] != t.getDate())   
        {   
            //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
            return false;   
        }   
    }   
    else   
    {   
        //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
        return false;   
    }   
    return true;   
}   
  
//+---------------------------------------------------  
//| 日期时间检查  
//| 格式为：YYYY-MM-DD HH:MM:SS  
//+---------------------------------------------------  
function CheckDateTime(str)  
{   
    var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;   
    var r = str.match(reg);   
    if(r==null)return false;   
    r[2]=r[2]-1;   
    var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);   
    if(d.getFullYear()!=r[1])return false;   
    if(d.getMonth()!=r[2])return false;   
    if(d.getDate()!=r[3])return false;   
    if(d.getHours()!=r[4])return false;   
    if(d.getMinutes()!=r[5])return false;   
    if(d.getSeconds()!=r[6])return false;   
    return true;   
}   
  
//+---------------------------------------------------  
//| 把日期分割成数组  
//+---------------------------------------------------  
Date.prototype.toArray = function()  
{   
    var myDate = this;  
    var myArray = Array();  
    myArray[0] = myDate.getFullYear();  
    myArray[1] = myDate.getMonth();  
    myArray[2] = myDate.getDate();  
    myArray[3] = myDate.getHours();  
    myArray[4] = myDate.getMinutes();  
    myArray[5] = myDate.getSeconds();  
    return myArray;  
}  
  
//+---------------------------------------------------  
//| 取得日期数据信息  
//| 参数 interval 表示数据类型  
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒  
//+---------------------------------------------------  
Date.prototype.DatePart = function(interval)  
{   
    var myDate = this;  
    var partStr='';  
    var Week = ['日','一','二','三','四','五','六'];  
    switch (interval)  
    {   
        case 'y' :partStr = myDate.getFullYear();break;  
        case 'm' :partStr = myDate.getMonth()+1;break;  
        case 'd' :partStr = myDate.getDate();break;  
        case 'w' :partStr = Week[myDate.getDay()];break;  
        case 'ww' :partStr = myDate.WeekNumOfYear();break;  
        case 'h' :partStr = myDate.getHours();break;  
        case 'n' :partStr = myDate.getMinutes();break;  
        case 's' :partStr = myDate.getSeconds();break;  
    }  
    return partStr;  
}  
  
//+---------------------------------------------------  
//| 取得当前日期所在月的最大天数  
//+---------------------------------------------------  
Date.prototype.MaxDayOfDate = function()  
{   
    var myDate = this;  
    var ary = myDate.toArray();  
    var date1 = (new Date(ary[0],ary[1]+1,1));  
    var date2 = date1.dateAdd(1,'m',1);  
    var result = dateDiff(date1.Format('yyyy-MM-dd'),date2.Format('yyyy-MM-dd'));  
    return result;  
}  
  
//+---------------------------------------------------  
//| 取得当前日期所在周是一年中的第几周  
//+---------------------------------------------------  
Date.prototype.WeekNumOfYear = function()  
{   
    var myDate = this;  
    var ary = myDate.toArray();  
    var year = ary[0];  
    var month = ary[1]+1;  
    var day = ary[2];  
    document.write('< script language=VBScript\> \n');  
    document.write('myDate = Datue(\'\'+month+'-'+day+'-'+year+\'\') \n');  
    document.write('result = DatePart(\'ww\', myDate) \n');  
    document.write(' \n');  
    return result;  
}  
  
//+---------------------------------------------------  
//| 字符串转成日期类型   
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(DateStr)  
{   
  
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
}  

//若要显示:当前日期加时间(如:2009-06-12 12:00)

function formatTimestamp(timestamp)
{ 
	var now = new Date(timestamp);
	
	return formatTime(now);
} 
//若要显示:当前日期加时间(如:2009-06-12 12:00)

function formatTime(date)
    { 
        var now = date
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss=now.getSeconds();
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm+":"; 
        if(ss<10)
        	clock+="0";
        clock+=ss;
        return(clock); 
    } 

//若要显示:当前日期加时间(如:2009-06-12 12:00)

function CurentTime()
    { 
       return formatTime(new Date()); 
    } 


function ChangeDateToString(DateIn)
{
    var Year=0;
    var Month=0;
    var Day=0;

    var CurrentDate="";

    //初始化时间
    Year      = DateIn.getFullYear();
    console.log("year="+Year);
    Month     = DateIn.getMonth()+1;
    Day       = DateIn.getDate();


    CurrentDate = Year + "-";
    if (Month >= 10 )
    {
        CurrentDate = CurrentDate + Month + "-";
    }
    else
    {
        CurrentDate = CurrentDate + "0" + Month + "-";
    }
    if (Day >= 10 )
    {
        CurrentDate = CurrentDate + Day ;
    }
    else
    {
        CurrentDate = CurrentDate + "0" + Day ;
    }
   

    return CurrentDate;
}

///////////////////////////////////////////////////////
// 将日期类型转换成字符串型格式yyyy-MM-dd hh:mm
////////////////////////////////////////////////////////
function ChangeTimeToString(DateIn)
{
    var Year=0;
    var Month=0;
    var Day=0;
    var Hour = 0;
    var Minute = 0;
    var CurrentDate="";

    //初始化时间
    Year      = DateIn.getYear();
    Month     = DateIn.getMonth()+1;
    Day       = DateIn.getDate();
    Hour      = DateIn.getHours();
    Minute    = DateIn.getMinutes();
   

    CurrentDate = Year + "-";
    if (Month >= 10 )
    {
        CurrentDate = CurrentDate + Month + "-";
    }
    else
    {
        CurrentDate = CurrentDate + "0" + Month + "-";
    }
    if (Day >= 10 )
    {
        CurrentDate = CurrentDate + Day ;
    }
    else
    {
        CurrentDate = CurrentDate + "0" + Day ;
    }
    
     if(Hour >=10)
    {
        CurrentDate = CurrentDate + " " + Hour ;
    }
    else
    {
        CurrentDate = CurrentDate + " 0" + Hour ;
    }
    if(Minute >=10)
    {
        CurrentDate = CurrentDate + ":" + Minute ;
    }
    else
    {
        CurrentDate = CurrentDate + ":0" + Minute ;
    }      
    return CurrentDate;
}

function   DateAdd(interval,number,date)  
{  
/* 
  *   功能:实现VBScript的DateAdd功能. 
  *   参数:interval,字符串表达式，表示要添加的时间间隔. 
  *   参数:number,数值表达式，表示要添加的时间间隔的个数. 
  *   参数:date,时间对象. 
  *   返回:新的时间对象. 
  *   var   now   =   new   Date(); 
  *   var   newDate   =   DateAdd( "d ",5,now); 
  *---------------   DateAdd(interval,number,date)   ----------------- 
  */  
        switch(interval)  
        {  
                case   "y "   :   {  
                        date.setFullYear(date.getFullYear()+number);  
                        return   date;  
                        break;  
                }  
                case   "q "   :   {  
                        date.setMonth(date.getMonth()+number*3);  
                        return   date;  
                        break;  
                }  
                case   "m "   :   {  
                        date.setMonth(date.getMonth()+number);  
                        return   date;  
                        break;  
                }  
                case   "w "   :   {  
                        date.setDate(date.getDate()+number*7);  
                        return   date;  
                        break;  
                }  
                case   "d "   :   {  
                        date.setDate(date.getDate()+number);  
                        return   date;  
                        break;  
                }  
                case   "h "   :   {  
                        date.setHours(date.getHours()+number);  
                        return   date;  
                        break;  
                }  
                case   "m "   :   {  
                        date.setMinutes(date.getMinutes()+number);  
                        return   date;  
                        break;  
                }  
                case   "s "   :   {  
                        date.setSeconds(date.getSeconds()+number);  
                        return   date;  
                        break;  
                }  
                default   :   {  
                        date.setDate(d.getDate()+number);  
                        return   date;  
                        break;  
                }  
        }  
}  

/*(function($){ 
	$.extend({ 
	ms_DatePicker: function (options) { 
	   var defaults = { 
	         YearSelector: "#sel_year", 
	         MonthSelector: "#sel_month", 
	         DaySelector: "#sel_day", 
	         FirstText: "--", 
	         FirstValue: 0 
	   }; 
	   var opts = $.extend({}, defaults, options); 
	   var $YearSelector = $(opts.YearSelector); 
	   var $MonthSelector = $(opts.MonthSelector); 
	   var $DaySelector = $(opts.DaySelector); 
	   var FirstText = opts.FirstText; 
	   var FirstValue = opts.FirstValue; 
	 
	   // 初始化 
	   var str = "<option value=\"" + FirstValue + "\">"+FirstText+"</option>"; 
	   $YearSelector.html(str); 
	   $MonthSelector.html(str); 
	   $DaySelector.html(str); 
	 
	   // 年份列表 
	   var yearNow = new Date().getFullYear(); 
	   var yearSel = $YearSelector.attr("rel"); 
	   for (var i = yearNow; i >= 1900; i--) { 
	        var sed = yearSel==i?"selected":""; 
	        var yearStr = "<option value=\"" + i + "\" " + sed+">"+i+"</option>"; 
	        $YearSelector.append(yearStr); 
	   } 
	 
	    // 月份列表 
	    var monthSel = $MonthSelector.attr("rel"); 
	    for (var i = 1; i <= 12; i++) { 
	        var sed = monthSel==i?"selected":""; 
	        var monthStr = "<option value=\"" + i + "\" "+sed+">"+i+"</option>"; 
	        $MonthSelector.append(monthStr); 
	    } 
	 
	    // 日列表(仅当选择了年月) 
	    function BuildDay() { 
	        if ($YearSelector.val() == 0 || $MonthSelector.val() == 0) { 
	            // 未选择年份或者月份 
	            $DaySelector.html(str); 
	        } else { 
	            $DaySelector.html(str); 
	            var year = parseInt($YearSelector.val()); 
	            var month = parseInt($MonthSelector.val()); 
	            var dayCount = 0; 
	            switch (month) { 
	                 case 1: 
	                 case 3: 
	                 case 5: 
	                 case 7: 
	                 case 8: 
	                 case 10: 
	                 case 12: 
	                      dayCount = 31; 
	                      break; 
	                 case 4: 
	                 case 6: 
	                 case 9: 
	                 case 11: 
	                      dayCount = 30; 
	                      break; 
	                 case 2: 
	                      dayCount = 28; 
	                      if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) { 
	                          dayCount = 29; 
	                      } 
	                      break; 
	                 default: 
	                      break; 
	            } 
	                     
	            var daySel = $DaySelector.attr("rel"); 
	            for (var i = 1; i <= dayCount; i++) { 
	                var sed = daySel==i?"selected":""; 
	                var dayStr = "<option value=\"" + i + "\" "+sed+">" + i + "</option>"; 
	                $DaySelector.append(dayStr); 
	             } 
	         } 
	      } 
	      $MonthSelector.change(function () { 
	         BuildDay(); 
	      }); 
	      $YearSelector.change(function () { 
	         BuildDay(); 
	      }); 
	      if($DaySelector.attr("rel")!=""){ 
	         BuildDay(); 
	      } 
	   } // End ms_DatePicker 
	}); 
})(jQuery); */



//时间显示
function tick(divId) {
    var hours, minutes, seconds, xfile;
    var intHours, intMinutes, intSeconds;
    var today, theday;
    today = new Date();
    function initArray() {
        this.length = initArray.arguments.length
        for (var i = 0; i < this.length; i++)
            this[i + 1] = initArray.arguments[i]
    }
    var d = new initArray(
   " 星期日",
   " 星期一",
   " 星期二",
   " 星期三",
   " 星期四",
   " 星期五",
   " 星期六");
    theday = today.getFullYear() + "年" + [today.getMonth() + 1] + "月" + today.getDate() + "日" + d[today.getDay() + 1];
    intHours = today.getHours();
    intMinutes = today.getMinutes();
    intSeconds = today.getSeconds();
    if (intHours == 0) {
        hours = "12:";
        xfile = " 午夜 ";
    } else if (intHours < 12) {
        hours = intHours + ":";
        xfile = " 上午 ";
    } else if (intHours == 12) {
        hours = "12:";
        xfile = " 正午 ";
    } else {
        intHours = intHours - 12
        hours = intHours + ":";
        xfile = " 下午 ";
    }
    if (intMinutes < 10) {
        minutes = "0" + intMinutes + ":";
    } else {
        minutes = intMinutes + ":";
    }
    if (intSeconds < 10) {
        seconds = "0" + intSeconds + " ";
    } else {
        seconds = intSeconds + " ";
    }
    timeString = theday + xfile + hours + minutes + seconds;
    document.getElementById(divId).innerHTML = timeString;
    window.setTimeout("tick();", 100);
}
//根据参数获取当前时间，参数datePrm为"date"时输出格式为"2016-12-19",参数为"datetime"时输出格式为"2016-12-19 18:00:00"
function formatterDate(datePrm){
	var date = new Date();
	var h=date.getHours()> 9 ? date.getHours() : "0" + date.getHours();
	var m=date.getMinutes()> 9 ? date.getMinutes() : "0" + date.getMinutes();
	var s=date.getSeconds()> 9 ? date.getSeconds() : "0" + date.getSeconds();
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	
	var aaa="";
	if(datePrm=="date"){
		aaa=date.getFullYear() + '-' + month + '-' + day;
	}
	if(datePrm=="datetime"){
		aaa=date.getFullYear() + '-' + month + '-' + day + ' ' + h+':'+m+':'+s;
	}
	
	return aaa;
	}
//根据参数获取当前时间，参数beginORNow为"begin"时输出格式为"2016-12-19 00:00:00",参数为"now"时输出格式为"2016-12-19 18:20:34"
function formatterDateBegin (beginORNow) {
	var date = new Date();
	var h=date.getHours()> 9 ? date.getHours() : "0" + date.getHours();
	var m=date.getMinutes()> 9 ? date.getMinutes() : "0" + date.getMinutes();
	var s=date.getSeconds()> 9 ? date.getSeconds() : "0" + date.getSeconds();
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	var aaa="";
	if(beginORNow=="begin"){
		aaa=date.getFullYear() + '-' + month + '-' + day + ' 00:00:00';
	}else if(beginORNow=="now"){
		aaa=date.getFullYear() + '-' + month + '-' + day + ' ' + h+':'+m+':'+s;
	}
	
	
	return aaa;
	}