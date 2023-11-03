/*水印配置*/
//声明 
let watermark = {set:null,out:null}
//水印配置 
let setWatermark = (str) => {
    let id = '#map'
    // 移除水印 判断
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    //创建画布
    let createCanvas = document.createElement('canvas')
    // 设置canvas画布大小
    createCanvas.width = 375 //宽度
    createCanvas.height = 330 //高度

    //创建Context2D对象作为2D渲染的上下文。
    let Context2D = createCanvas.getContext('2d')
    /*水印样式调整配置*/
    Context2D.rotate(-20 * Math.PI / 100) // 水印旋转角度
    Context2D.font = 'bold 19px Vedana' //水印文字大小
    Context2D.fillStyle = '' //水印颜色 HEX格式,可使用red 或者rgb格式
    Context2D.textAlign = 'center' //水印水平位置
    Context2D.textBaseline = 'middle' //水印垂直位置
    Context2D.fillText(str, createCanvas.width / 4.5, createCanvas.height / 2)

    //创建元素
    let createDiv = document.createElement('div')
    createDiv.id = id
    //水印默认设置
    createDiv.style.pointerEvents = 'none' //水印层事件穿透 让水印不阻止交互事件
    createDiv.style.top = '70px' //水印顶部距离
    createDiv.style.left = '0px' //水印左侧距离
    createDiv.style.opacity = '0.08' //水印透明度
    createDiv.style.position = 'fixed' //水印定位
    createDiv.style.zIndex = '100000' //水印样式优先显示
    createDiv.style.width = document.documentElement.clientWidth - 100 + 'px' //水印宽度
    createDiv.style.height = document.documentElement.clientHeight - 100 + 'px' //水印高度
    createDiv.style.background = 'url(' + createCanvas.toDataURL('image/png') + ') left top repeat' //水印显示(关键代码)
    document.body.appendChild(createDiv) //在指定元素节点的最后一个子节点之后添加节点
    return id
}

// 此方法只允许调用一次
watermark.set = (str) => {
    let id = setWatermark(str)
    //设置间隔
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(str)
        }
    }, 500)
    //改变大小时执行
    window.onresize = () => {
        setWatermark(str)
    }
}

const outWatermark = (id) => {
let k=document.getElementById(id)
  if (document.getElementById(id) !== null) {
    let div = document.getElementById(id)
    div.style.display = 'none'   //这里没有生效
    div.style.opacity='0'
    
  }
}
watermark.out = () => {
  const str = '#map'
  outWatermark(str)
}


export default watermark
