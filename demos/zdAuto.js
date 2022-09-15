/*
 * @Descripttion: 郑大刷网课脚本
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-09-13 16:56:27
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-09-14 16:06:39
 */

// msg:文案信息；duration：毫秒数；minWidth：宽度值，单位为rem；
function toast(msg, duration) {
  duration = isNaN(duration) ? 3000 : duration;
  var m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText = "padding: 10px;color: rgb(255, 255, 255);text-align: center;border-radius: 4px;position: fixed;top: 30%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 14px;";

  document.body.appendChild(m);
  setTimeout(function () {
    var d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function () { document.body.removeChild(m) }, d * 1000);
  }, duration);
}


// 章节列表
const chapterList = document.querySelectorAll('ul.ant-tree.ant-tree-directory > li') ?? [];
// 展开所有章节 获取所有视频元素
const videoList = []
let currentPlayIndex = null;
chapterList.forEach((chapter, index) => {
  chapter.querySelector('.ant-tree-switcher i')?.click();
  const chapterVideoEls = chapter.querySelectorAll('ul.ant-tree-child-tree li')
  chapterVideoEls.forEach((chapterVideo, subIndex) => {
    const targetVideo = chapterVideo.querySelector('span.ant-tree-title')
    if (targetVideo?.innerText.includes('视频')) {
      const obj = {
        isSuccessed: targetVideo?.innerText.includes('已完成') ?? false,
        el: targetVideo?.querySelector('span'),
        id: `${index + 1}-${subIndex + 1}`
      }
      if (currentPlayIndex === null && !obj.isSuccessed) {
        currentPlayIndex = videoList.length;
      }
      videoList.push(obj)
    }
  })
})
// 开始播放
videoList[currentPlayIndex]?.el?.click();
console.log(`开始播放：第 ${currentPlayIndex + 1} 集；总集数：${videoList?.length ?? 0}`);
console.log('当前播放元素：', videoList[currentPlayIndex]?.el);
toast(`开始播放：第 ${currentPlayIndex + 1} 集；总集数：${videoList?.length ?? 0}`)

setTimeout(() => {
  const playNext = () => {
    console.log(`播放完成：第 ${currentPlayIndex + 1} 集`);
    videoList[currentPlayIndex].isSuccessed = true;
    if (currentPlayIndex === videoList.length - 1) {
      console.log('✅本课已刷完✅');
      toast('✅本课已刷完✅')
      return;
    }
    for (let i = currentPlayIndex + 1; i < videoList.length; i++) {
      if (!videoList[i]?.isSuccessed) {
        currentPlayIndex = i;
        break;
      }
    }
    console.log(`开始播放：第 ${currentPlayIndex + 1} 集；总集数：${videoList?.length ?? 0}`);
    console.log('当前播放元素：', videoList[currentPlayIndex]?.el);
    toast(`开始播放：第 ${currentPlayIndex + 1} 集；总集数：${videoList?.length ?? 0}`)
    videoList[currentPlayIndex]?.el?.click();
    const newVideoEl = document.querySelector('video');
    // newVideoEl.playbackRate = 1.5;
    newVideoEl.muted = true;
    newVideoEl.play();
    newVideoEl.addEventListener('ended', playNext);
  };
  const videoEl = document.querySelector('video');
  console.log('👋手动播放', videoEl);
  // videoEl.playbackRate = 1.5;
  videoEl.muted = true;
  videoEl.play();
  videoEl.addEventListener('ended', playNext);
  toast('如果自动播放不成功请尝试手动点击播放')
}, 2000)

