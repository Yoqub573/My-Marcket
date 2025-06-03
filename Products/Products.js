let pValue = document.querySelector(".pValue");
let SignDialog = document.querySelector(".SignDialog");
let loginForm = document.querySelector(".loginForm");
let api2 = "http://localhost:3000/data2";
let data3 = null;
async function get2() {
  try {
    let res = await fetch(api2);
    data3 = await res.json();
    if (JSON.parse(localStorage.getItem("user")) == null) {
      SignDialog.showModal();
    } else {
      SignDialog.close();
    }
  } catch (error) {
    console.error(error);
  }
}
get2();
loginForm.onsubmit = async (event) => {
  event.preventDefault();
  try {
    let res = await fetch(api2);
    data3 = await res.json();
    data3.forEach((e) => {
      if (
        e.password.toString() ==
          event.target["inpLoginPassword"].value.toString() &&
        e.email.toString() == event.target["inpLoginEmail"].value.toString()
      ) {
        localStorage.setItem("user", JSON.stringify(e));
        loginDialog.close();
      }
    });
  } catch (error) {
    console.error(error);
  }
};
let inpRange = document.querySelector(".inpRange");
let signForm = document.querySelector(".signForm");
signForm.onsubmit = async (event) => {
  event.preventDefault();
  let newData = {
    name: event.target["inpName"].value,
    email: event.target["inpEmail"].value,
    password: event.target["inpPassword"].value,
    status: "User",
    id: data3.length + 1,
  };
  try {
    let res = await fetch(api2, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newData),
    });
    localStorage.setItem("user", JSON.stringify(newData));
    SignDialog.close();
  } catch (error) {
    console.error(error);
  }
};
let cnt = document.querySelector(".cnt");
let link = document.querySelector(".link");
let loginDialog = document.querySelector(".loginDialog");
link.onclick = () => {
  loginDialog.showModal();
  SignDialog.close();
};
let closeDialog = document.querySelector(".closeDialog");
let link2 = document.querySelector(".link2");
link2.onclick = () => {
  SignDialog.showModal();
  loginDialog.close();
};
let showProduct = document.querySelector(".showProduct");
let productDialog = document.querySelector(".productDialog");
let box2 = document.querySelector(".box2");
let data = null;
async function get() {
  try {
    let res = await fetch(api);
    data = await res.json();
    getData(data);
  } catch (error) {
    console.error(error);
  }
}
let All = document.querySelector(".All");
All.onclick = () => {
  get();
};
let Ikea = document.querySelector(".Ikea");
Ikea.onclick = () => {
  data = data.filter((e) => e.status == "Ikea");
  getData(data);
};
let Marcos = document.querySelector(".Marcos");
Marcos.onclick = () => {
  data = data.filter((e) => e.status == "Marcos");
  getData(data);
};
let Caressa = document.querySelector(".Caressa");
Caressa.onclick = () => {
  data = data.filter((e) => e.status == "Caressa");
  getData(data);
};
let Liddy = document.querySelector(".Liddy");
Liddy.onclick = () => {
  data = data.filter((e) => e.status == "Liddy");
  getData(data);
};
let totalPrice = document.querySelector(".totalPrice");
let data2 = JSON.parse(localStorage.getItem("data") || "[]");
totalPrice.innerHTML = data2.reduce((a, e) => (a += e.price * e.colvo), 0);
box2.style.height = "70vh";
cnt.innerHTML = data2.length;
showProduct.onclick = () => {
  productDialog.showModal();
};
closeDialog.onclick = () => {
  productDialog.close();
};
pValue.innerHTML = `Value:$${inpRange.value}`;
inpRange.onchange = () => {
  pValue.innerHTML = `Value:$${inpRange.value}`;
};
localStorage.setItem("counter", 0);
let box = document.querySelector(".box");
let api = "http://localhost:3000/data";
let Search = document.querySelector(".Search");
Search.oninput = async () => {
  try {
    let res = await fetch(`${api}?name=${Search.value}`);
    getData(await res.json());
  } catch (error) {
    console.error(error);
  }
};
function deleteUser(id) {
  data2 = data2.filter((e) => e.id != id);
  localStorage.removeItem("data");
  localStorage.setItem("data", JSON.stringify(data2));
  getData2(data2);
}
function getData2(data) {
  box2.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("divProducts2");

    let imgProduct = document.createElement("img");
    imgProduct.classList.add("imgProduct2");
    imgProduct.src = e.img;
    imgProduct.style.width = "128px";
    imgProduct.style.height = "90px";

    let h1Name = document.createElement("h3");
    h1Name.innerHTML = e.name;
    h1Name.classList.add("NameProduct2");

    let pPrice = document.createElement("p");
    pPrice.innerHTML = `$${e.price * e.colvo}`;
    pPrice.classList.add("Price2");

    let btnDel = document.createElement("img");
    btnDel.src = "./clear.png";
    btnDel.onclick = () => {
      deleteUser(e.id);
      cnt.innerHTML = data2.length;
      totalPrice.innerHTML = data2.reduce(
        (a, e) => (a += e.price * e.colvo),
        0
      );
    };

    let addOne = document.createElement("img");
    addOne.src = "./add_box.png";
    addOne.onclick = () => {
      data2 = data2.map((e2) => {
        if (e2.id == e.id) {
          e.colvo = e.colvo + 1;
          return e;
        } else {
          return e;
        }
      });
      totalPrice.innerHTML = data2.reduce(
        (a, e) => (a += e.price * e.colvo),
        0
      );
      localStorage.removeItem("data");
      localStorage.setItem("data", JSON.stringify(data2));
      getData2(data2);
    };

    let pCnt = document.createElement("p");
    pCnt.innerHTML = e.colvo;

    let delOne = document.createElement("img");
    delOne.src = "./add_box (1).png";
    delOne.onclick = () => {
      if (e.colvo - 1 <= 0) {
        deleteUser(e.id);
        cnt.innerHTML = data2.length;
        totalPrice.innerHTML = data2.reduce(
          (a, e) => (a += e.price * e.colvo),
          0
        );
      } else {
        data2 = data2.map((e2) => {
          if (e2.id == e.id) {
            e.colvo = e.colvo - 1;
            return e;
          } else {
            return e;
          }
        });
        totalPrice.innerHTML = data2.reduce(
          (a, e) => (a += e.price * e.colvo),
          0
        );
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(data2));
        getData2(data2);
      }
    };
    let div3 = document.createElement("div");
    let div2 = document.createElement("div");
    div3.style.display = "flex";
    div3.style.alignItems = "center";
    div3.style.gap = "10px";
    div.style.display = "flex";
    div.style.alignItems = "start";
    div.style.justifyContent = "space-between";
    div3.append(addOne, pCnt, delOne);
    div2.append(h1Name, pPrice, div3);
    div.append(imgProduct, div2, btnDel);
    box2.append(div, document.createElement("br"));
  });
}
function getData(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("div");
    div.classList.add("divProducts");

    let imgProduct = document.createElement("img");
    imgProduct.classList.add("imgProduct");
    imgProduct.src = e.img;
    imgProduct.style.width = "310px";
    imgProduct.style.height = "200px";

    let h1Name = document.createElement("h3");
    h1Name.innerHTML = e.name;
    h1Name.classList.add("NameProduct");

    let pPrice = document.createElement("p");
    pPrice.innerHTML = `$${e.price}`;
    pPrice.classList.add("Price");

    let dataS = JSON.parse(localStorage.getItem("user"));
    let btnAddToCard = document.createElement("button");
    let btnInfo = document.createElement("button");
    let btnDel = document.createElement("button")
    let btnEdit = document.createElement("button")
    if (dataS.status.toString() == "User") {
      btnAddToCard.innerHTML = "ADD TO CART";
      btnAddToCard.classList.add("btnAddCard");
      btnAddToCard.onclick = () => {
        let boolin = false;
        data2.forEach((e2) => {
          if (e2.id == e.id) {
            boolin = true;
          }
        });
        if (boolin) {
          data2 = data2.map((e2) => {
            if (e2.id == e.id) {
              e.colvo = e.colvo += 1;
              localStorage.removeItem("data");
              localStorage.setItem("data", JSON.stringify(data2));
              getData2(data2);
              return e;
            } else {
              return e;
            }
          });
        } else {
          localStorage.removeItem("data");
          data2.push(e);
          localStorage.setItem("data", JSON.stringify(data2));
          totalPrice.innerHTML = data2.reduce(
            (a, e) => (a += e.price * e.colvo),
            0
          );
          cnt.innerHTML = data2.length;
          getData2(data2);
        }
      };
      btnInfo.innerHTML = "ℹ";
      btnInfo.classList.add("btnAddCard");
      btnInfo.style.marginLeft = "10px";
      btnInfo.onclick = () => {
        window.location.href = "/info/info.html";
        localStorage.setItem("id", JSON.stringify(e));
      };
    }
    if (dataS.status.toString() == "Admin"){
      btnDel.innerHTML = "✕"
      btnDel.onclick =async()=>{
        try {
          let res = await fetch(`${api}/${e.id}`,{method:"DELETE"})
          let data =  await res.json()
          get()
        } catch (error) {
          console.error(error);
        }
      }
      btnEdit.innerHTML = 
      btnEdit.onclick = async()=>{
        
      }
    }
    div.append(
      imgProduct,
      document.createElement("br"),
      document.createElement("br"),
      h1Name,
      document.createElement("br"),
      pPrice,
      document.createElement("br")
    );
    if (dataS.status.toString() == "User") {
      div.append(btnAddToCard, btnInfo);
    }
    if (dataS.status.toString() == "Admin"){
      div.append(btnDel)
    }
    box.append(div);
  });
}
getData2(data2);
get();
