
//チェックボックスを非表示にする
const remove = () => {
  document.getElementsByName("checkbox").forEach((checkboxEle) => {
    checkboxEle.style.display = "none"
  });
};

document.addEventListener("DOMContentLoaded", () => {
  remove();
});

const selectboxChange = () => {

  //選択されたときに、selectタグ要素を取得する
  const select1 = document.form1.select1;

  //選択された選択肢が上から何番目かを数字で取得する
  const selected_num = select1.selectedIndex;
  //選択された選択肢のvalueを文字列で取得する
  const selected_value = select1.options[selected_num].value;
  console.log(selected_value);
  remove();
  document.getElementById(selected_value).style.display = ""

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