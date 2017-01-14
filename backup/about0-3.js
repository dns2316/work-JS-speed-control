var main = `
<span class="close" id="closeAbout">&times;</span>
<!--img src="images/about1.png" style="width: 35%; height:auto;" /><img src="images/about2.png" style="width: 23%; height:auto; float: right;" /--!>
<p class="MsoNormal" id="aboutFirstP"><span lang=EN-GB>
  LSCR is the London and Southern Counties Railways Consortium, a private sector initiative formed to propose and deliver a new route to fulfil the demand for increased rail capacity between London and the South coast and Essex and Anglia.
<br><br>

 </span></p>
`;
var part1 = `
<p class="MsoNormal"><span lang=EN-GB>
  The route includes the BML2 project <a href="http://www.bml2.co.uk" target="_blank">www.bml2.co.uk</a> with additional proposed improvements to the capacity of the existing route from East Croydon to Lewisham, Canary Wharf, Stratford and Stanstead.
     <br><br>
  The LSCR consortium includes <a href="http://www.creegc.com/en/tabid/173/Default.aspx" target="_blank">CREEC</a>, the largest multi-industry and comprehensive engineering survey & design corporation in China, with survey, design, consulting, general contracting and system integration as the core businesses.
  <br><br></span></p>
  <hr style="border-top: 1px solid #B52C2C;" /><br>
  <p class="MsoNormal"><span lang=EN-GB>
  CREEC is the core enterprise of China Railway Group Ltd. (ranking No. 95 among “World’s Top 500 Companies” in 2011).
  <br><br>
  LSCR is managed by a multi-disciplinary team with expertise in managing international business consortia, national and international rail and metro projects and financial expertise including structured financings and the issuance of new securities.
   <br><br>
</span></p>
`;
var part2 = `
<p class="MsoNormal"><span lang=EN-GB>
  LSCR has initiated a fully privately funded pre-feasibility phase that will enable a comprehensive proposal to be made to Her Majesty’s Government with the clear intention that LSCR may take the fully scoped project forward to completion.
      <br><br>
</span></p>
`;
var printAbout = document.getElementById("outAbout");
var listAbout = main + part1 + part2;
printAbout.innerHTML = listAbout;
