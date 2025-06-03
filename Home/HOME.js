let box = document.querySelector(".box");
let btnLeft = document.querySelector(".btnLeft");
let btnRight = document.querySelector(".btnRight");
let api = "http://localhost:3000/data";
let start = 0;
let stop = 3;
let data = null
async function get() {
  try {
    let res = await fetch(api);
    data = await res.json()
    getData(await data);
  } catch (error) {
    console.error(error);
  }
}
btnLeft.onclick = () => {
  box.scrollBy({left:-420,behavior:"smooth"})
}
btnRight.onclick = () => {
  box.scrollBy({left:420,behavior:"smooth"})
}
function getData(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("divProduct");

    let imgProduct = document.createElement("img");
    imgProduct.src = e.img;
    imgProduct.style.width = "400px";
    imgProduct.style.height = "200px";

    let h1Name = document.createElement("h3");
    h1Name.innerHTML = e.name;
    h1Name.classList.add("NameProduct");

    let pPrice = document.createElement("p");
    pPrice.innerHTML = `$${e.price}`;
    pPrice.classList.add("Price");

    div.append(
      imgProduct,
      document.createElement("br"),
      document.createElement("br"),
      h1Name,
      document.createElement("br"),
      pPrice
    );
    box.append(div);
  });
}

get();