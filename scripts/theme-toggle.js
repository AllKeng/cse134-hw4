// Function to toggle theme
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Set the new theme in localStorage and the data attribute
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    console.log("ran");
    
    // Update the button icons based on the theme
    if (newTheme === 'dark') {
      document.getElementById('moon-icon').style.display = 'inline';
      document.getElementById('sun-icon').style.display = 'none';
    } else {
      document.getElementById('moon-icon').style.display = 'none';
      document.getElementById('sun-icon').style.display = 'inline';
    }
  }
  
  // Set the initial theme on page load
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set the correct icon based on the theme
    if (savedTheme === 'dark') {
      document.getElementById('moon-icon').style.display = 'inline';
      document.getElementById('sun-icon').style.display = 'none';
    } else {
      document.getElementById('moon-icon').style.display = 'none';
      document.getElementById('sun-icon').style.display = 'inline';
    }
  });
  
  // Add event listener for the theme toggle button
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);