function Header() {

  const a = ((sessionStorage.getItem("currentloggedin")));

  const handleClick = event => {
    if (a) {
      const element = document.getElementById('login-header')
      event.preventDefault()
      //element.style.display = "none";
      console.log('disabled');
    }
  };

  // style="pointer-events: none"
  
  return (
    <div className="header">
      <a href="/" className="siteTitle">Picture This</a>
      <ul>
        <li className="active">
          <a href="/browse">Browse</a>
        </li>
        <li className="active">
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className="active">
          <a href="/rec">Recommendations</a>
        </li>
        <li className="active">
          <a href="/quiz">Quiz</a>
        </li>

      </ul>
    </div>
  )
}

export default Header;