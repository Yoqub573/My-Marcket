let api = "http://localhost:3000/data";
let cnt = document.querySelector(".cnt");
let box = document.querySelector(".box");
let h1NameOfProduct = document.querySelector(".h1NameOfProduct");
h1NameOfProduct.innerHTML = `Home / ${
  JSON.parse(localStorage.getItem("id")).name
}`;
let data = JSON.parse(localStorage.getItem("data"));

function getData(e) {
  let img = document.createElement("img");
  img.src = e.img;
  img.classList.add("img");

  let divALL = document.createElement("div");
  let h1Name = document.createElement("h1");
  h1Name.innerHTML = e.name;
  h1Name.classList.add("h1Name");

  let h3Status = document.createElement("h2");
  h3Status.classList.add("h3Status");
  h3Status.innerHTML = `BY ${e.status.toUpperCase()}`;

  let div = document.createElement("div");
  div.style.display = "flex";
  div.style.justifyContent = "space-between";
  div.style.alignItems = "center";

  let h3Price = document.createElement("h3");
  h3Price.classList.add("h3Price");
  h3Price.innerHTML = `$${e.price}`;

  let div2 = document.createElement("div");
  div2.style.display = "flex";
  div2.style.alignItems = "center";
  div2.style.gap = "20px";

  e.color.forEach((e2) => {
    let newDiv = document.createElement("div");
    newDiv.style.backgroundColor = `${e2}`;
    newDiv.style.width = "40px";
    newDiv.style.height = "40px";
    newDiv.style.borderRadius = "4px";
    let cnt = 2;
    newDiv.onclick = () => {
      if (cnt % 2 == 0) {
        newDiv.style.width =  "32px";
        newDiv.style.height = "32px";
        newDiv.style.border = "4px solid  #BA5D2C";
        cnt++;
    } else {
          newDiv.style.width =  "40px";
          newDiv.style.height = "40px";
        newDiv.style.border = "none";
        cnt++;
      }
    };
    div2.append(newDiv);
  });

  let pDescription = document.createElement("p");
  pDescription.innerHTML = e.description;
  pDescription.classList.add("pDescription");

  let btnAddToCart = document.createElement("button");
  btnAddToCart.classList.add("btnAddToCart");
  btnAddToCart.innerHTML = "ADD TO CARD"
  btnAddToCart.onclick = () => {
      let boolin = false;
      data2.forEach((e2) => {
        if (e2.id == e.id) {
          boolin = true;
        }
      });
      if (boolin) {
        data = data.map((e2) => {
          if (e2.id == e.id) {
            e.colvo = e.colvo += 1;
            localStorage.removeItem("data");
            localStorage.setItem("data", JSON.stringify(data));
            getData(data);
            return e;
          } else {
            return e;
          }
        });
      } else {
        localStorage.removeItem("data");
        data.push(e);
        localStorage.setItem("data", JSON.stringify(data));
        totalPrice.innerHTML = data.reduce((a,e)=>a+=(e.price*e.colvo),0)
        cnt.innerHTML = data.length;
        getData2(data);
      }
    };

  div.append(h3Price, div2);
  divALL.append(
    h1Name,
    h3Status,
    document.createElement("br"),
    div,
    document.createElement("br"),
    pDescription,
    document.createElement("br"),
    btnAddToCart
  );
  box.append(img, divALL);
}
getData(JSON.parse(localStorage.getItem("id")));
