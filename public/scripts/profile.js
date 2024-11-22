function checkTokenAndRedirect(redirectUrl) {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        window.location.href = redirectUrl;
    }
  }
  
  checkTokenAndRedirect('/views/homePage.html');

const userName = document.getElementById('userName')

userName.innerHTML = sessionStorage.getItem('userName')

