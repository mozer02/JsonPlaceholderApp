window.onload = async function () {
  await loadData();
  renderHtml(data);
};
var data = [];
const loadData = async () => {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  data = await response.json();
  console.log(data);
};

const renderHtml = async (dataSource) => {
  const container = document.getElementById("accordionExample");
  container.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    container.innerHTML += `<div class="accordion-item">
    <h2 class="accordion-header" id="heading${i}">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse${i}"
        aria-expanded="true"
        aria-controls="collapse${i}"
      >
        ${dataSource[i].title}
      </button>
    </h2>
    <div
      id="collapse${i}"
      class="accordion-collapse collapse"
      aria-labelledby="heading${i}"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        ${dataSource[i].body} 
        <input type="button" style="float: right" value="Detaylar" onclick="store(${i})"/> 
      </div>
    </div>
  </div>`;
  }
};

const store = (id) => {
  var param = id + 1;
  var url = "http://127.0.0.1:5500/article.html?id=" + param.toString();
  location.href = url;
};
