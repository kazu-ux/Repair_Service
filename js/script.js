
//チェックボックス(修理箇所)の要素を非表示にする関数
const removeCheckboxEle = () => {
  document.querySelectorAll(".checkbox").forEach((checkboxEle) => {
    checkboxEle.style.display = "none";
  });
};

//HTMLを表示し終えたら、removeCheckboxEle()を実行する
document.addEventListener("DOMContentLoaded", () => {
  removeCheckboxEle();
});

//選択したデバイス名、または即決価格を取得する関数
const get_select = (element) => {
  const device_select_options = deviceForm.deviceSelect.options;
  console.log(device_select_options);
  if (element == "option_id") {
    return device_select_options[device_select_options.selectedIndex].id;
  }
  else {
    return device_select_options[device_select_options.selectedIndex].value;
  };
};

//選んだセレクトボックスによってチェックボックスの表示・非表示を切り替える
const displayChangeCheckbox = () => {
  //セレクトボックスが変更された際に、表示していたチェックボックスを消す
  removeCheckboxEle();
  const device_name = get_select("option_id");
  //「選択して下さい」を選んだ場合は、何もしない
  if (device_name == "default") { return };
  //セレクトボックスで選択された機種の修理内容を表示する
  document.getElementById(device_name + "_repair").style.display = ""
};

//チェックされた修理金額の配列を作成する(即決価格と送料も含める)
const checkboxChange = () => {
  //送料は定数
  const SHIPPING = Number("520");
  const sokketu_price = get_select("option_value");
  //はじめから配列に即決価格と送料を入れておく
  let elementArr = [Number(sokketu_price), SHIPPING];
  //チェックが入ったボックスをforeachで総当り
  document.getElementsByName("repair_price").forEach(input => {
    input.checked ? elementArr.push(Number(input.value)) : false;
  });
  //配列内の要素数を数えて、0個なら0を入れ、1個以上なら合計金額を出す関数へ送る
  elementArr.length ? total(elementArr) : elementArr.push(Number(0));
  console.log(elementArr);
  showPrice(elementArr)
};

const showPrice = (elementArr) => {
  const sokketu_price = elementArr[0];
  document.getElementById("sokketu_price").innerHTML = String(sokketu_price) + "円";
  const shipping_price = elementArr[1];
  document.getElementById("shipping").innerHTML = String(shipping_price) + "円";

}

//配列の中の数値を全て足す
const total = (elementArr) => {
  let total = elementArr.reduce((a, b) => {
    return a + b;
  });
  console.log(total)
  document.getElementById("total_price").innerHTML = String(total) + "円";
};
const totalValueElement = (total) => {
  const remove_ele = document.getElementById("total_id");
  remove_ele.removeCheckboxEle();
  const test = document.getElementById("total_value");
  test.insertAdjacentHTML('beforeend', "<span id='total_id'>" + total + "円" + "</span>");
}