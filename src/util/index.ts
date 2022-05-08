export const fileByBase64 = (file: File, callback: (data: string | null | ArrayBuffer) => void) => {
  var reader = new FileReader();
  // 传入一个参数对象即可得到基于该参数对象的文本内容
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    if (e.target) {
      console.log(e?.target.result);
      callback(e?.target?.result)
    }
  };
}