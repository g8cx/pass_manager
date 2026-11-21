export const innitSwitchCollections = () => {
  const sidebar = document.querySelector(".sidebar");
  const defaultTemp = document.querySelector("#active");

  let temp = defaultTemp;

  sidebar.addEventListener("click", (event) => {
    const button = event.target.closest(".tab_btn");

    console.log(event.target);

    if (!button || !sidebar.contains(button)) {
      return;
    }

    if (event.target.closest(".collection_setting")) {
      return;
    }

    if (temp !== null) {
      temp.classList.remove("active");
    }

    button.classList.add("active");
    temp = button;
  });
};

innitSwitchCollections();
