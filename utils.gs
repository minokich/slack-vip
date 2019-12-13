/*
* コテハン/トリップが指定されていれば設定する。未指定であれば名無しとして設定する。
* ひとまず、名無しのみ
*/
function createName(postUser, kotehan){
  var userName = "{res_no} 名前：以下、VIPがお送りします ：{date} ID：{id}  "
  return userName.replace("{res_no}", getResNo()).replace("{date}", getDateTime()).replace("{id}", createId(postUser));
}

function gateDate(){
  return Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd')
}

function getDateTime(){
  return Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss')
}

function getResNo(){
  var res_no = 1*PropertiesService.getScriptProperties().getProperty('res_no');
  if(res_no === 1000){
    res_no = 0
  }
  ++res_no
  setResNo(res_no)
  return String(res_no).split('.')[0];// GASで num:1 が str:1.0と変換されるので小数点以下を切り捨て
}

function setResNo(resNo){
  PropertiesService.getScriptProperties().setProperty('res_no', resNo)
}

function createId(postUser){
  var txt = postUser + "hogemoge" + gateDate()
  var txtHash = '';
  var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, txt, Utilities.Charset.UTF_8 );
  
  for ( i = 0; i < rawHash.length; i++ ) {
    var hashVal = rawHash[i];
    
    if ( hashVal < 0 ) {
      hashVal += 256;
    };
    if ( hashVal.toString( 16 ).length == 1 ) {
      txtHash += '0';
    };  
    txtHash += hashVal.toString( 16 );
  };
  
  return txtHash.substr( 0, 6 );
}

function getToken(){
  return PropertiesService.getScriptProperties().getProperty('slack_token')
}