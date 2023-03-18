let imagesData = [{
    url: "images/project-1.jpg",
    city: "Rostov-on-Don",
    cityApart:  "LCD admiral",
    area: "81 m2",
    repairTime: "3.5 months"
}, {
    url: "images/project-2.jpg",
    city: "Sochi",
    cityApart: "Thieves",
    area: "105 m2",
    repairTime: "4 months"
}, {
    url: "images/project-3.jpg",
    city: "Rostov-on-Don",
    cityApart: "Patriotic",
    area: "93 m2",
    repairTime: "3 months"
}]

function initSlider() {
    if (!imagesData || !imagesData.length) return;

    let sliderMain = document.querySelector(".slider-main");
    let sliderImg = sliderMain.querySelector(".project-slider-items");
    let navSlider = document.querySelector(".project-slider-navigation");
    let projectDescription = document.querySelector(".project-description");
    let sliderContainer = document.querySelector(".slider-container");

    initImagesData();
    initArrows();
    initDots();
    initList();

    function initImagesData() {
        imagesData.forEach((imgData, index) => {
            let active = "";
            if (index === 0) active = " active";
            let imgTag = `<img src="${imagesData[index].url}" data-index="${index}" class="img-slider${active}" alt="${imagesData[index].city} ${imagesData[index].cityApart}">`;
            sliderImg.innerHTML += imgTag;

            let cityTag = `<p data-index="${index}" class="no-active${active}">${imagesData[index].city}<br>
                           ${imagesData[index].cityApart}</p>`
                           projectDescription.querySelector(".city-data").innerHTML += cityTag;

            let areaTag = `<p data-index="${index}" class="no-active${active}">${imagesData[index].area}</p>`;
            projectDescription.querySelector(".apartment-data").innerHTML += areaTag;

            let timeTag = `<p data-index="${index}" class="no-active${active}">${imagesData[index].repairTime}</p>`;
            projectDescription.querySelector(".time-data").innerHTML += timeTag;
        });
    }

    function initArrows() {        

        navSlider.querySelectorAll(".slider-arrow").forEach(arrow => {
            arrow.addEventListener("click", function() {
                let curNumber = +sliderImg.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = curNumber === 0 ? imagesData.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === imagesData.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        })
    }

    function initDots() {
        imagesData.forEach((image, index) => {
            let dot = `<span class="dot-navigation ${index===0 ? "active" : ""}" data-index="${index}"></span>`;
            navSlider.querySelector(".dots").innerHTML += dot;
        });
        navSlider.querySelectorAll(".dot-navigation").forEach(dot => {
            dot.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            });
        });
    }

    function initList() {
        sliderMain.querySelectorAll(".list-item").forEach(urlProject => {
            urlProject.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            });
        });
    }

    function moveSlider(num) {

        sliderContainer.querySelectorAll(".active").forEach((index) => {
            index.classList.remove("active");
        });

        sliderContainer.querySelectorAll(`[data-index="${num}"]`).forEach((index) => {
            index.classList.add("active");
        });

    }
}

document.addEventListener("DOMContentLoaded", initSlider);