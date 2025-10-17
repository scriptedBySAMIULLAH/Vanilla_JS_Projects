const languageElement = document.querySelector("#languageSelect");
const messageElement = document.querySelector("#message");
const findBtnElement = document.querySelector("#findBtn");
const refreshBtnElement = document.querySelector("#refreshBtn");
const repoContainerElement = document.querySelector("#repoContainer");
let message,
  cachedRepos = [];
const fetchLanguages = () => {
  fetch("./data/languages.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load languages");
      return res.json();
    })
    .then((languages) => {
      console.log("Languages loaded:", languages);
      populateLanguages(languages);
    })
    .catch((err) => {
      console.error("Error loading languages:", err);
      messageElement.textContent = "Failed to load languages.";
    });
};

const populateLanguages = (languages) => {
  languageElement.innerHTML = '<option value="">Select a language</option>';
  let fragment = document.createDocumentFragment();
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.value.toLowerCase();
    option.textContent = lang.title;
    fragment.appendChild(option);
  });

  languageElement.appendChild(fragment);
};

//repo fetch and we also include loadind states in it.

const removeShimmer=()=>{
  const shimmer = repoContainerElement.querySelector(".shimmer"); 
  if (shimmer) shimmer.remove();
}


const clearCard=()=>{
   const isCard = repoContainerElement.querySelector('.card');
  if (isCard) isCard.remove()
}

const displayRepo = (repo) => {
  clearCard();
  removeShimmer();
  let card = makeRepoCard(repo);
 

  if (!card) return;
  repoContainerElement.appendChild(card); 
  lucide.createIcons();
  refreshBtnElement.classList.remove("hidden");
};

const makeRepoCard = (repo) => {
 
 const card = document.createElement("div");
  card.classList.add(
    "bg-[#0d1117]/80",
    "border",
    "border-pink-500",
    "rounded-2xl",
    "p-5",
    "backdrop-blur-md",
    "shadow-lg",
    "hover:shadow-2xl",
    "hover:-translate-y-1",
    "transition-all",
    "duration-300",
    "ease-out",
    "mb-6",
    "group",
    "space-y-4",
    "card"
  );

  //tilte and img

   const header = document.createElement("div");

   header.classList.add(

    "flex",
    "justify-between",
    "px-2",
    "items-center",
    "mb-2"
   )


  // Title
  const title = document.createElement("h2");
  title.classList.add(
    "text-2xl",
    "font-bold",
    "text-pink-300",
    "group-hover:text-blue-500",
    "transition-colors",
    "hover:underline"
  );
  const img = document.createElement("img");
  img.classList.add(
    "h-16",
    "w-16",
    "rounded-full",
    "object-cover",
    "border",
    "hover:scale-[1.1]",
    "border-gray-600"
  );

  img.setAttribute("loading","lazy")
  img.src=repo?.owner.avatar_url;



  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.textContent = repo.name;
  link.classList.add('text-pink-400')
  title.appendChild(link);

  header.appendChild(img)
  header.appendChild(title)

  // Description
  const description = document.createElement("p");
  description.classList.add("text-gray-200", "mt-2", "leading-relaxed");
  description.textContent = repo.description || "No description available.";

  // Stats container
  const stats = document.createElement("div");
  stats.classList.add(
    "flex",
    "flex-wrap",
    "gap-4",
    "text-base",
    "text-gray-400",
    "mt-4",
    "items-center"
  );

  const stars = document.createElement("p");
stars.innerHTML = `
  <i data-lucide="star" class="inline-block w-6 h-6  text-yellow-400 hover:scale-95 duration-300"></i>
  <span class="text-white font-medium ml-1">${repo.stargazers_count}</span>
`;

const forks = document.createElement("p");
forks.innerHTML = `
  <i data-lucide="git-fork" class="inline-block w-6 h-6 text-blue-400 hover:scale-95 duration-300"></i>
  <span class="text-white font-medium ml-1">${repo.forks_count}</span>
`;

const issues = document.createElement("p");
issues.innerHTML = `
  <i data-lucide="alert-triangle" class="inline-block w-6 h-6 text-red-400 hover:scale-95 duration-300"></i>
  <span class="text-white font-medium ml-1">${repo.open_issues_count}</span>
`;


  stats.append(stars, forks, issues);

  // Footer - language + owner
  const footer = document.createElement("div");
  footer.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "mt-4",
    "text-gray-500",
    "text-base"
  );

  footer.innerHTML = `
    <span class="px-2 py-1 bg-[#21262d] text-gray-300 rounded-md">
      ${repo.language || "Unknown"}
    </span>
    <span class="italic text-white">👤 ${repo.owner?.login || "Unknown"}</span>
  `;

  // Append
  card.append(header, description, stats, footer);
  lucide.createIcons();


  return card;
};

const getRandomRepo = (repos) => {
  let repoNumber = Math.floor(Math.random() * repos.length);

  if (isNaN(repoNumber)) return;

  let repo = repos[repoNumber];

  return repo;
};

const renderRepo = (data) => {
  
  let repo = getRandomRepo(data.items);

  if (!repo) showMessage("Error Fetching repositories");
  displayRepo(repo);
};

const showMessage = (message = "Please Select a Language") => {
   messageElement.textContent = message;
  messageElement.classList.remove("hidden");
removeShimmer()
  messageElement.className =
    "mt-6 text-center border p-4 rounded-md font-semibold transition";

  if (message.includes("Error")) {
    messageElement.classList.add("bg-red-200", "text-red-800", "border-red-400");
  } else if (message.toLowerCase().includes("loading")) {
    messageElement.classList.add("bg-yellow-100", "text-yellow-800", "border-yellow-300");
  } else {
    messageElement.classList.add("bg-green-100", "text-green-800", "border-green-400");
  }                              
};

const showLoadingShimmer = () => {
  repoContainerElement.querySelector('#message').classList.add('hidden');
   clearCard();
    const shimmer = document.createElement("div");
    shimmer.className =
      "animate-pulse bg-[#161b22]/60 border border-gray-500 rounded-xl p-6 backdrop-blur-md shadow-lg mb-6 shimmer";
    shimmer.innerHTML = `
      <div class="h-16 bg-gray-700 rounded-full w-16 border mb-4"></div>
      <div class="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div class="h-4 bg-gray-700 rounded w-5/6"></div>
      <div class="flex gap-4 mt-4">
        <div class="h-4 w-16 bg-gray-700 rounded"></div>
        <div class="h-4 w-16 bg-gray-700 rounded"></div>
        <div class="h-4 w-16 bg-gray-700 rounded"></div>
      </div>
    `;
    repoContainerElement.appendChild(shimmer);
  };

const fetchRepo = async () => {
  let selectedLanguage = languageElement.value;

  showMessage("Loading,please wait... ");
  showLoadingShimmer();

  let githubSearchUrl = `https://api.github.com/search/repositories?q=language:${selectedLanguage}&sort=stars&order=desc&per_page=50`;

  try {
    let res = await fetch(githubSearchUrl);

    if (!res.ok) throw new Error("Unable to fetch data");

    let data = await res.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error("Invalid data format from GitHub API");
    }

    cachedRepos = data.items;

    renderRepo(data);
  } catch (error) {
    showMessage("Error Fetching repositories");
  }
};

fetchLanguages();
showMessage(message);
//listners

languageElement.addEventListener("change", fetchRepo);

refreshBtnElement.addEventListener("click", () => {
  if (cachedRepos.length > 0) {
    let repo = getRandomRepo(cachedRepos);
    displayRepo(repo);
  } else {
    showMessage("No cached repos. Please fetch again.");
  }
});
