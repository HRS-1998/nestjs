import  Excel from 'exceljs';
import {message} from 'ant-design-vue'

//excel水印
async function createWsSheet(staff, data, name) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(data);
    const img = setWatermark(staff)
    const imageId1 = workbook.addImage({
        base64: img,
        extension: 'png'
    }) 
    const worksheet = workbook.getWorksheet('Sheet1')
    worksheet.addBackgroundImage(imageId1)
    workbook.xlsx.writeBuffer().then((res) => {
        saveAs(res, name);
    })
}
function setWatermark(str) {
    // 创建一个画布
    let can = document.createElement('canvas')
    // 设置画布的长宽
    can.width = 500
    can.height = 400
    let cans = can.getContext('2d')
    // 旋转角度
    cans.rotate(-60 * Math.PI / 220)
    cans.font = '18px Vedana'
    // 设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = ''
    // 设置文本内容的当前对齐方式
    cans.textAlign = 'left'
    // 设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'middle'
    //透明度
    cans.globalAlpha = '0.2' //水印透明度
    let initY = can.height
    cans.fillText(str, 0, initY)
    var dataURL = can.toDataURL('image/png')
    console.log(dataURL)
    return dataURL
}
function saveAs(data, name) {
    const urlObject = window.URL || window.webkitURL || window;
    const export_blob = new Blob([data]);
    const save_link = document.createElement('a');
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name + '.xlsx';
    save_link.click();
    save_link.remove()
    window.URL.revokeObjectURL(export_blob)
    message.destroy()
}

export function excelDownload(url, fileName, words,info) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType ='blob';
    //xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
    // 为了避免大文件影响用户体验，建议加loading

    message.loading(info,0)
    xhr.onload = () => {
        if (xhr.status === 200) {
            // let blob=new Blob([xhr.response])
            createWsSheet(words, xhr.response, fileName)
            // 获取文件blob数据并保存
            // saveAs(xhr.response, fileName);
    

        }
    };
    xhr.send();
}
