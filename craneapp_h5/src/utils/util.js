import {
    JSEncrypt
} from 'jsencrypt'
import { message } from 'ant-design-vue'
//防抖 immediate 表示第一次是否立即执行
function debounce(fn, delay = 1000, immediate) {
    let timer = null
    let flag = true
    if (immediate) {
        return function () {
            clearTimeout(timer)
            if (flag) {
                fn.apply(this, arguments)
                flag=false
            }
            timer = setTimeout(() => {
                flag = true
            }, delay);
        }
    }
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay);
    }
}

// 加密
function encrypt(word, rsaKey) {
    let encryptor = new JSEncrypt()
    encryptor.setPublicKey(rsaKey)
    let wordEncryp = encryptor.encrypt(word) // 对密码进行加密
    return wordEncryp
}
// 下拉数据处理


//检测手机号 phone [String]输入的手机号
function checkPhone(phone) {
    let flag = true
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
        flag = false
    } else {
        flag = true
    }
    return flag
}
  //格式化时间
  function formatDate(formatdate, type) {
    let datetime = new Date(formatdate);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let result1 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 10 ? '0' + date : date)
    let result2 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1))

    if (type == 'day') return result1;
    if (type == 'month') return result2
  }
  //通过url下载
  function downloadUrl(name,url){
    let aTag =document.createElement('a')
    aTag.download=name;
    aTag.href=url;
    aTag.target='_blank'
    document.body.appendChild(aTag)
    aTag.click()
    aTag.remove()
    message.destroy()
  }
  //文件转为blob
  function fileToBlob(url){
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = () => {
            if (xhr.status === 200) {
              return resolve(xhr.response);
            }else{
              return reject()
            }
          };
          xhr.send();
        });
  }

  //获取具体选中的车型
  function getSelectCraneType(craneType,treeData){
    let craneTypeArr=[]
    craneType.length&&craneType.forEach((element) => {
      if (element.length == 1) {
        let data = treeData.filter((type) => type.value == element[0])[0];
        data.children.forEach((tonnage) => {
          tonnage.children.forEach((item) => {
            craneTypeArr.push(item.value);
          });
        });
      }
      if (element.length == 2) {
        let data = treeData.filter((type) => type.value == element[0])[0];
        data.children.forEach((tonnage) => {
          if (tonnage.value == element[1]) {
            tonnage.children.forEach((item) => {
              craneTypeArr.push(item.value);
            });
          }
        });
      }
      if (element.length == 3) {
        craneTypeArr.push(element[2]);
      }
    });
    return craneTypeArr

  }
 
 
  


export {
    debounce,
    encrypt,
    checkPhone,
    formatDate,
    downloadUrl,
    fileToBlob,
    getSelectCraneType
}

