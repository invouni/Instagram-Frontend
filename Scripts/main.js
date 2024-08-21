// Global Variables
const navbar = document.querySelector('.navbar');
const statusBar = document.querySelector('.status-bar');
const bottomBar = document.querySelector('.bottom-bar');
const postBar = document.querySelector('.posts');
let mutedVideo = null;
let active = document.querySelector('.active');
let currentOpen = document.querySelector('.home');
let allPosts = document.querySelector('.all-post')
let reelsPost = document.querySelector('.reels-post')
let allGridPosts = document.querySelector('.grid-posts-all');
let reelsPostGrid = document.querySelector('.grid-reels');
// Function to Update Posts Height Dynamically
const updatePostsHeight = () => {
  const postsHeight = window.innerHeight - (navbar.offsetHeight + statusBar.offsetHeight + bottomBar.offsetHeight);
  postBar.style.height = `${postsHeight}px`;
};

// Function to Toggle Display of Post Info
const togglePostInfoDisplay = (post, par) => {
  const displayValue = post.style.getPropertyValue('--display');
  if (displayValue === "block") {
    post.style.setProperty('--display', "none");
    par.style.height = "auto";
  } else {
    post.style.setProperty('--display', "block");
    par.style.height = "calc(0.8rem * 3)";
  }
};

// Function to Handle Video Mute/Unmute
const toggleVideoMute = (curr) => {
  const muted = curr.muted;
  if (muted) {
    if (mutedVideo === null || mutedVideo.muted) {
      curr.muted = false;
    } else {
      mutedVideo.muted = true;
      curr.muted = false;
    }
    mutedVideo = curr;
  } else {
    mutedVideo.muted = true;
  }
};

// Function to Toggle Icon Class
const toggleIconClass = (curr, class1, class2) => {
  curr.classList.toggle(class1);
  curr.classList.toggle(class2);
};

// Function to Show or Hide Element
const toggleElementVisibility = (selector, bottomValue) => {
  const element = document.querySelector(selector);
  element.style.bottom = bottomValue;
};

// Function to Add a Comment
const addComment = () => {
  const inputBox = document.querySelector('.comment-input');
  const val = inputBox.value.trim();
  if (val === "") return;

  // Create a new comment structure
  const comment = document.createElement('div');
  comment.classList.add('comment');

  const info = document.createElement('div');
  info.classList.add('info');

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerHTML = '<p>Its Name</p>';

  const message = document.createElement('div');
  message.classList.add('message');
  message.innerHTML = `<p>${val}</p>`;

  const logo = document.createElement('div');
  logo.classList.add('logo');

  info.appendChild(name);
  info.appendChild(message);
  comment.appendChild(info);
  comment.appendChild(logo);

  document.querySelector('.comments').appendChild(comment);
  inputBox.value = "";
};
// 

// Main Event Handler for Post Bar
const postBarHandler = (e) => {
  const curr = e.target;
  const par = curr.parentElement;

  if (par.classList.contains("post-info")) {
    const id = par.id;
    const post = document.getElementById(id);
    togglePostInfoDisplay(post, par);
  } else if (curr.tagName === "VIDEO") {
    toggleVideoMute(curr);
  } else if (curr.classList.contains('fa-heart')) {
    toggleIconClass(curr, 'fa-solid', 'fa-regular');
  } else if (curr.classList.contains('fa-bookmark')) {
    toggleIconClass(curr, 'fa-solid', 'fa-regular');
  } else if (curr.classList.contains('fa-comment-dots')) {
    toggleElementVisibility('.commentbox', "0px");
  } else if (curr.classList.contains('fa-share')) {
    toggleElementVisibility('.contacts', "0px");
  }
};
//function 
let bottomBarDivListner = (e) => {
  if (e == active) {
    return;
  }
  active.classList.toggle('active')
  e.classList.toggle('active')

  active = e;
}
//
let openReels = () => {
  let reelsPage = document.querySelector('.reels-page')
  currentOpen.style.display = "none";
  currentOpen.style.opacity = "0";
  reelsPage.style.display = "block";
  reelsPage.style.opacity = "1";
  currentOpen = reelsPage;
}
//
let openHomePage = () => {
  let reelsPage = document.querySelector('.home')
  currentOpen.style.display = "none";
  currentOpen.style.opacity = "0";
  reelsPage.style.display = "block";
  reelsPage.style.opacity = "1";
  currentOpen = reelsPage;
}
//
let openMessenger = () => {
  window.location.href = "https://m.me/vbhv__dev"
}
//
let openGrid = () => {
  if (allPosts.classList.contains('active-devider')) {
    allPosts.classList.remove('active-devider');
    reelsPost.classList.add('active-devider');
    reelsPostGrid.style.display = "grid";
    allGridPosts.style.display = "none";
    allGridPosts.style.opacity = "0";
    reelsPostGrid.style.opacity = "1";
  } else {
    allPosts.classList.add('active-devider');
    reelsPost.classList.remove('active-devider');
    
    reelsPostGrid.style.display = "none";
    allGridPosts.style.display = "grid";
    allGridPosts.style.opacity = "1";
    reelsPostGrid.style.opacity = "0";
  }

}
//
const openProfilePage = () => {
  let profilePage = document.querySelector('.profile-page')
  currentOpen.style.display = "none";
  currentOpen.style.opacity = "0";
  profilePage.style.display = "block";
  profilePage.style.opacity = "1";
  currentOpen = profilePage;
}
//
let removeLoader = () => {
  document.querySelector('.loader').style.display = "none";
  
}
//function to add Listners 
let addListners = (e) => {
  updatePostsHeight();

  postBar.addEventListener('click', postBarHandler);
  // Event Listeners
  document.querySelector('.comment-back-icon').addEventListener('click', () => toggleElementVisibility('.commentbox', "-100%"));
  document.querySelector('.share-back-icon').addEventListener('click', () => toggleElementVisibility('.contacts', "-100%"));
  document.querySelector('.addComment').addEventListener('click', addComment);
  Array.from(document.querySelectorAll('.bottom-bar div')).forEach((bar) => {
    bar.addEventListener('click', () => bottomBarDivListner(bar))
  })
  document.querySelector('.fa-instagram').addEventListener('click', openReels)
  document.querySelector('.fa-house').addEventListener('click', openHomePage)
  document.querySelector('.fa-facebook-messenger').addEventListener('click', openMessenger)
  document.querySelector('.devider').addEventListener('click', openGrid);
  document.querySelector('.profile-icon').addEventListener('click', openProfilePage);
  removeLoader();
}

addEventListener("DOMContentLoaded", addListners);
