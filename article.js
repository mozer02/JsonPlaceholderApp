window.onload = async function () {
  await loadListData();
  renderSidebar(postData, usersData);
  openContainer();
};
var postData = [];
var usersData = [];
var commentsData = [];

const loadListData = async () => {
  const postResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  postData = await postResponse.json();
  const userResponse = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  usersData = await userResponse.json();
  const commentsResponse = await fetch(
    "https://jsonplaceholder.typicode.com/comments"
  );
  commentsData = await commentsResponse.json();
  console.log("postData", postData);
  console.log("usersData", usersData);
  console.log("commentsData", commentsData);
};

const renderSidebar = (postDataSource, usersDataSource) => {
  const containerTitle = document.getElementById("articleTitle");
  containerTitle.innerHTML = "";
  usersDataSource.forEach((element) => {
    postDataSource.forEach((element1) => {
      if (element.id == element1.userId) {
        containerTitle.innerHTML += `<div class="list-group list-group-flush border-bottom scrollarea mb-1">
        <button
          onclick='openContainer(${element1?.id},${element1?.userId}),Comments(${element1?.id})'
          class="list-group-item list-group-item-action active py-3 lh-tight"
          aria-current="true"
        >
          <div
            class="d-flex w-100 align-items-center justify-content-between"
          >
            <strong class="mb-1">${element1.title}</strong>
            <small>${element.username}</small>
          </div>
        </button>
      </div>`;
      }
    });
  });
};

//   for (let i = 0; i < usersDataSource.length; i++) {
//     for (let j = 0; j < postDataSource.length; j++) {
//       if (usersDataSource[i].id == postDataSource[j].userId) {
//         containerTitle.innerHTML += `<div class="list-group list-group-flush border-bottom scrollarea mb-1">
//         <button
//           onclick='openContainer(${postDataSource[j]?.id},${postDataSource[j]?.userId}),Comments(${postDataSource[j]?.id})'
//           class="list-group-item list-group-item-action active py-3 lh-tight"
//           aria-current="true"
//         >
//           <div
//             class="d-flex w-100 align-items-center justify-content-between"
//           >
//             <strong class="mb-1">${postDataSource[j].title}</strong>
//             <small>${usersDataSource[i].username}</small>
//           </div>
//         </button>
//       </div>`;
//       }
//     }
//   }
// };

const openContainer = (id, uId) => {
  const containerTitle = document.getElementById("containerArticle");
  const commentArticles = document.getElementById("commentArticle");
  if (id) {
    containerTitle.innerHTML = ` <div class="card mb-3 mt-5">
      <h3>${usersData[uId - 1].name} </h3>
      <div class="card-body">
        <h5 class="card-title">${postData[id - 1].title}</h5>
        <p class="card-text">
          ${postData[id - 1].body}
        </p>
        <p class="card-text">
          <div id="commentsArticle">
            <!-- Comments-->
          </div>
        </p>
      </div>
    </div>`;
  } else {
    containerTitle.innerHTML = ` <div class="card mb-3 mt-5">
      <h3>${usersData[0].name} </h3>
      <div class="card-body">
        <h5 class="card-title">${postData[0].title}</h5>
        <p class="card-text">
          ${postData[0].body}
        </p>
        <p class="card-text">
          <div id="commentsArticle">
            <!-- Comments-->
          </div>
        </p>
      </div>
    </div>`;
    commentsData.forEach((element) => {
      if (element.postId === 1) {
        commentArticles.innerHTML += `
          <div class="mb-3" style="background-color: lightgray;">
          <div style="color: mediumblue;"><b>Name :</b> ${element.name}</div>
          <div ><b>Email :</b> ${element.email}</div>
          <div ><b>Comment :</b> ${element.body}</div></div>`;
      }
    });
  }

  console.log("id :", id);
};

const Comments = (id) => {
  const deneme = document.getElementById("commentArticle");
  deneme.innerHTML = "";

  if (id) {
    commentsData.forEach((element) => {
      if (id === element.postId) {
        deneme.innerHTML += `
          <div class="mb-3" style="background-color: lightgray;">
          <div style="color: mediumblue;"><b>Name :</b> ${element.name}</div>
          <div ><b>Email :</b> ${element.email}</div>
          <div ><b>Comment :</b> ${element.body}</div></div>`;
      }
    });
  }
};

const SearchData = (event) => {
  let searcText = event.target.value;
  const filterData = postData.filter((x) =>
    new RegExp(searcText, "i").test(x.title)
  );
  renderSidebar(filterData, usersData);
};
