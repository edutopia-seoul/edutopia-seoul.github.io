const catList = document.getElementById("catList");
const btn = document.getElementById("start_show");

async function getData() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        console.log(data);
        loadNextImage();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

let currentIndex = 0;
let catData = [];

async function loadNextImage( ) {
    try{
        const res = await getData();
        catData.push(res[0]);
        showCurrentImage();
    }catch (error) {
        alert(error);
    }
}

function showCurrentImage() {
    const img = document. createElement("img");
    img. src = catData[currentIndex] ?. url || ''; // 데이터가 없을 때 빈 문자열로 설정
    catList.innerHTML = "";
    catList.appendChild(img);
}

// getData( ) 호줄을 loadNextImage() 내부로 이동
async function startSlideshow() {
    await loadNextImage();

    setInterval(() => {
    currentIndex = (currentIndex + 1) % catData.length;
    showCurrentImage();
}, 5000);
}

btn.onclick = async () => {
    await startSlideshow();
    btn.style.display = 'none';
};
