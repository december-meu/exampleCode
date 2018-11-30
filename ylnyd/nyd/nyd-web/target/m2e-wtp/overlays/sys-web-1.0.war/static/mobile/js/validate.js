//检查是否为数字
   function validateNumber(obj){
// 	   console.log("obj="+obj);
//      var reg = new RegExp("^(([1-9]\d*)|\d)(\.\d{1,2})?$");
//      
//   if(!/^(([1-9]\d*)|\d)(\.\d{1,2})?$/.test(obj)){
// 	   console.log("obj1="+obj);
//       return true;
////       /^(([1-9]\d*)|\d)(\.\d{1,2})?$/
//   }else 
	   if(/^-?(([1-9]\d*)|\d)(\.\d{1,2})?$/.test(obj)){
 	   console.log("obj2="+obj);
       return true;
		
   }else{
	   return false;
   }
   
 }
   //身份证号码判断
   function isCardNo(card)
	{
	   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	   if(reg.test(card) === false)
	   {
	       alert("身份证输入不合法");
	       return  false;
	   }else {return true; }
	}
   //手机号码判断
	function checkPhone(phone){ 			     
	    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
	        alert("手机号码有误，请重填");  
	        return false; 
	    } else {return true; }
	}
	//邮箱地址判断
	function checkEmail(email) {
		isEmail1=/^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/;
		 isEmail2=/^.*@[^_]*$/;
		 if(!(isEmail1.test(email)&&isEmail2.test(email))){
		 alert("email错误，请重新填写");
		 return false; 
		}else {return true; }
	}     