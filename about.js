var main = `
<p class="MsoNormal"><span lang=EN-GB>
  LSCR is the London and Southern Counties Railways Consortium, a private sector
  initiative formed to fulfil the demand for increased rail capacity between London
  and the South Coast and including the BML2 project
  <a href="http://www.bml2.co.uk" target="_blank">www.bml2.co.uk</a> with
  additional proposed improvements to the capacity of the existing Brighton Main-line
   resulting in substantially increased connectivity from East Croydon to Lewisham,
   Canary Wharf, Stratford and Stanstead.
   <br><br>
 </span></p>
`;
var part1 = `
<p class="MsoNormal"><span lang=EN-GB>
  The project enjoys deep cross-party political support built up over the last 30 years
  by the Wealden Line Campaign <a href="http://www.wealdenline.org.uk" target="_blank">http://www.wealdenline.org.uk</a>.
  LSCR is managed by a multi-disciplinary team with expertise in managing
  international business consortia, national and international rail and metro
  projects and financial expertise including structured financings and the issuing
   of new securities. The LSCR consortium includes CREEC, the largest
   multi-industry and comprehensive engineering survey & design corporation
   in China, with survey, design, consulting, general contracting and system
   integration as the core businesses. CREEC is the core enterprise of China Railway
   Group Ltd. (ranking No. 95 among “World’s Top 500 Companies” in 2011).
   <br><br>
</span></p>
`;
var part2 = `
<p class="MsoNormal"><span lang=EN-GB>
  LSCR has initiated a fully privately funded pre-feasibility phase that will enable
  a comprehensive proposal to be made to Her Majesty’s Government with the clear
   intention that LSCR may take the fully scoped project forward to completion, which
    will be a significant benefit to the economy of both London and the South East.
    LSCR is confident that once the pre-feasibility phase is completed its technical plan
     will offer the best hope for a significant improvement in the regions transport links
      and passenger capacity.
      <br><br>
</span></p>
`;
var printAbout = document.getElementById("outAbout");
var listAbout = '<span class="close">&times;</span>' + main + part1 + part2;
printAbout.innerHTML = listAbout;
console.log(listAbout);
