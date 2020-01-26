const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};

//use function to pass in user color input and api data, then return template that will ultimately go into the generated profile pdf
function generateHTML(colorInput, githubData, githubStars) {
    // console.log(colorInput.color);
    // console.log(githubData);
    // console.log(githubStars);

    return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[colorInput.color].wrapperBackground};
         padding-top: 10px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[colorInput.color].headerBackground};
         color: ${colors[colorInput.color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[colorInput.color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         img {
            border: 3px solid #cccccc;
            width: 380px;
            height: 380px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[colorInput.color].headerBackground};
           color: ${colors[colorInput.color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }
         a {
          text-decoration: none;
          color: #9ebad7;
          font-weight: bold;
          padding-left: 20px;
          padding-right: 20px;
          padding-botton: 0px;
          font-size: larger;
        }
         a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         .footer {
          position: fixed;
          width: 100%;
          bottom: 0;
          flex: 1;
          text-align: center;
          }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="row">
            <div class="col">
              <div class="card">
                <h4>GitHub Developer Profile</h4>
                <br>
                <img src="${githubData.data.avatar_url}" alt="User Photo">

                  <div class="card">
                    <span>
                    <h1>Hi! <br> My Name is ${githubData.data.name}</h1>
                    <a href="https://www.google.com/maps/place/${githubData.data.location}">${githubData.data.location} <i class="fas fa-location-arrow"></i></a>
                      <a href="${githubData.data.html_url}" target="_blank"> Github Profile <i class="fas fa-external-link-alt"></i></a>
                      <a href="${githubData.data.blog}" target="_blank"> Blog <i class="fas fa-external-link-alt"></i></a>
                    </span>
                  </div>

              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div><h3>${githubData.data.bio}<h3></div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <p><h3>Public Repositories <br> ${githubData.data.public_repos}</h3></p>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <p><h3>GitHub Stars <br> ${githubStars}</h3></p>
              </div>
            </div>
          </div>

          <div class="row">  
            <div class="col">
              <div class="card">
                <p><h3>Followers <br> ${githubData.data.followers}</h3></p>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <p><h3>Following <br> ${githubData.data.following}</h3></p>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Profile compiled by GitHub</p>
          </footer>

      </body>
</html>`;
}

//make the generateHTML available externally using module.exports
module.exports = generateHTML;