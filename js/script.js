
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

//即決価格を取得する関数
const get_sokketu = () => {
  //選択されたときに、selectタグ要素を取得する
  const select1 = document.form1.deviceName;
  //選択された選択肢が上から何番目かを数字で取得する
  const selected_num = select1.selectedIndex;
  console.log("上から" + selected_num + "番目")
  //選択された選択肢のvalueを文字列で取得する
  const selected_value = select1.options[selected_num].value;
  return selected_value;
}

//選んだセレクトボックスによってチェックボックスの表示・非表示を切り替える
const displayChangeCheckbox = (device_name) => {
  //セレクトボックスが変更された際に、表示していたチェックボックスを消す
  removeCheckboxEle();
  //「選択して下さい」を選んだ場合は、何もしない
  if (device_name == "default") { return };
  //セレクトボックスで選択された機種の修理内容を表示する
  document.getElementById(device_name + "_repair").style.display = ""
};

//チェックされた修理金額の配列を作成する(即決価格と送料も含める)
const checkboxChange = () => {
  //送料は定数
  const SHIPPING = Number("520");
  //はじめから配列に即決価格と送料を入れておく
  let elementArr = [Number(get_sokketu()), SHIPPING];
  //チェックが入ったボックスをforeachで総当り
  document.getElementsByName("repair_price").forEach(test => {
    test.checked ? elementArr.push(Number(test.value)) : false;
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