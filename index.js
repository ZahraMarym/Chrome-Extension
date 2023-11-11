let myLeads=[];
const inputEL=document.getElementById("input-el");
const ulEL=document.getElementById("ul-el");
const inputBtn = document.getElementById("input-btn");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");
inputBtn.addEventListener("click", saveInput);
delBtn.addEventListener("dblclick", delInput);
tabBtn.addEventListener("click",saveTab);

const LeadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));
//console.log(LeadsFromLocalStorage)
if(LeadsFromLocalStorage){
    myLeads=LeadsFromLocalStorage;
    render(myLeads);
}
else{
    console.log("Empty");
}
function saveInput(){
    //console.log("Button CLicked");
    myLeads.push(inputEL.value);
    inputEL.value="";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));

    //myLeads=JSON.stringify(myLeads);
    render(myLeads);
    console.log(localStorage.getItem("myLeads"));
}

function render(leads){
    let listItem="";
    for( i=0;i<leads.length;i++){
    //listItem+="<li><a href='"+leads[i]+"' target='_blank'>"+leads[i]+"</a></li>";
    //template
    listItem+=`
    <li>
        <a href='${leads[i]}' target='_blank'>
            ${leads[i]}
        </a>
    </li>
    `
}
//console.log(listItem);
ulEL.innerHTML=listItem;
}
// for(let i=0;i<myLeads.length;i++){
//     //ulEL.innerHTML+="<li>"+myLeads[i]+"</li>";
//     const li=document.createElement("li")
//     li.textContent=myLeads[i]
//     ulEL.append(li)
// }
function delInput(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);
    //console.log(myLeads);
}
function saveTab(){
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        myLeads.push(tabs[0].url);
        console.log(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
      });
   
}