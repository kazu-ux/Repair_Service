
//チェックボックスを非表示にする
const remove = () => {
  document.getElementsByName("checkbox").forEach((checkboxEle) => {
    checkboxEle.style.display = "none"
  });
};

document.addEventListener("DOMContentLoaded", () => {
  remove();
});

//セレクトボックスの操作
const selectboxChange = () => {

  //選択されたときに、selectタグ要素を取得する
  const select1 = document.form1.select1;

  //選択された選択肢が上から何番目かを数字で取得する
  const selected_num = select1.selectedIndex;
  console.log(selected_num)
  //選択された選択肢のidを文字列で取得する
  const selected_id = select1.options[selected_num].id;
  if (selected_id == "default") { return };
  console.log(selected_id);
  //セレクトボックスが変更された際に、表示していたチェックボックスを消す
  remove();
  //セレクトボックスで選択された機種の修理内容を表示する
  document.getElementById(selected_id).style.display = ""

  console.log("change")
};

//チェックされた修理金額の配列を作成する
const checkboxChange = () => {
  let elementArr = [];
  document.getElementsByName("repair_place").forEach(test => {
    test.checked ? elementArr.push(test.value) : false;
  });
  elementArr.length ? total(elementArr) : totalValueElement(Number(0));
};
const total = (elementArr) => {
  let total = elementArr.reduce((a, b) => {
    return Number(a) + Number(b);
  });
  console.log(total)
  totalValueElement(total);
  return total
};
const totalValueElement = (total) => {
  const remove_ele = document.getElementById("total_id");
  remove_ele.remove();
  const test = document.getElementById("total_value");
  test.insertAdjacentHTML('beforeend', "<span id='total_id'>" + total + "円" + "</span>");
}