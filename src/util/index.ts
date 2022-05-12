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

export const toDataURL = (src: string, callback: (data: string) => void)  => {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalHeight;
    ctx?.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL();
    callback(dataURL);
  };
  img.src = src;
}