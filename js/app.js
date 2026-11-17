(() => {
  const $ = (id) => document.getElementById(id);
  const now = new Date();
  let viewDate = new Date(now.getFullYear(), now.getMonth(), 1);
  let selectedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let viewMode = "grid";
  const cities = [
    ["Dhaka","Asia/Dhaka"],["London","Europe/London"],["New York","America/New_York"],
    ["Tokyo","Asia/Tokyo"],["Dubai","Asia/Dubai"],["Sydney","Australia/Sydney"]
  ];
  const monthFmt = new Intl.DateTimeFormat("en", {month:"long",year:"numeric"});
  const fullFmt = new Intl.DateTimeFormat("en", {weekday:"long",month:"long",day:"numeric",year:"numeric"});
  const sameDay = (a,b) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
  const dateKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const ordinal = n => {const s=["th","st","nd","rd"],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);};
  function renderHeader(){
    $("todayDate").textContent = new Intl.DateTimeFormat("en",{day:"numeric",month:"short",year:"numeric"}).format(now);
    $("todayDay").textContent = new Intl.DateTimeFormat("en",{weekday:"long"}).format(now);
    $("localTime").textContent = new Intl.DateTimeFormat("en",{hour:"2-digit",minute:"2-digit"}).format(new Date());
    $("localZone").textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local device time";
    const start = new Date(now.getFullYear(),0,0);
    $("dayOfYear").textContent = Math.floor((now-start)/86400000).toString();
    $("yearNow").textContent = now.getFullYear();
  }
  function buildYearOptions(){
    const sel=$("yearSelect");
    for(let y=1900;y<=2100;y++){const o=document.createElement("option");o.value=y;o.textContent=y;if(y===viewDate.getFullYear())o.selected=true;sel.append(o);}
  }
  function renderCalendar(){
    $("monthTitle").textContent=monthFmt.format(viewDate);
    $("yearSelect").value=viewDate.getFullYear();
    const grid=$("calendarGrid");grid.innerHTML="";
    const weekStart=Number($("weekStart").value);
    const weekdays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    for(let i=0;i<7;i++){const w=document.createElement("div");w.className="weekday";w.textContent=weekdays[(i+weekStart)%7];grid.append(w);}
    const first=new Date(viewDate.getFullYear(),viewDate.getMonth(),1);
    const offset=(first.getDay()-weekStart+7)%7;
    const daysInMonth=new Date(viewDate.getFullYear(),viewDate.getMonth()+1,0).getDate();
    const prevDays=new Date(viewDate.getFullYear(),viewDate.getMonth(),0).getDate();
    const total=Math.ceil((offset+daysInMonth)/7)*7;
    for(let i=0;i<total;i++){
      let d, outside=false;
      if(i<offset){d=new Date(viewDate.getFullYear(),viewDate.getMonth()-1,prevDays-offset+i+1);outside=true;}
      else if(i>=offset+daysInMonth){d=new Date(viewDate.getFullYear(),viewDate.getMonth()+1,i-offset-daysInMonth+1);outside=true;}
      else d=new Date(viewDate.getFullYear(),viewDate.getMonth(),i-offset+1);
      const b=document.createElement("button");b.type="button";b.className="day-cell"+(outside?" outside":"")+(sameDay(d,now)?" today":"")+(sameDay(d,selectedDate)?" selected":"");
      b.setAttribute("aria-label",fullFmt.format(d));b.innerHTML=`<span class="day-number">${d.getDate()}</span>${sameDay(d,now)?'<span class="day-note">TODAY</span>':""}`;
      b.addEventListener("click",()=>{selectedDate=new Date(d);if(outside)viewDate=new Date(d.getFullYear(),d.getMonth(),1);renderAll();});
      grid.append(b);
    }
    renderList();
  }
  function renderList(){
    const list=$("monthList");list.innerHTML="";
    const count=new Date(viewDate.getFullYear(),viewDate.getMonth()+1,0).getDate();
    for(let day=1;day<=count;day++){
      const d=new Date(viewDate.getFullYear(),viewDate.getMonth(),day);
      const b=document.createElement("button");b.type="button";b.className="list-row"+(sameDay(d,selectedDate)?" selected":"");
      const dayName=new Intl.DateTimeFormat("en",{weekday:"long"}).format(d);
      b.innerHTML=`<span class="list-date">${String(day).padStart(2,"0")} ${new Intl.DateTimeFormat("en",{month:"short"}).format(d)}</span><span class="list-day">${dayName}</span><span class="list-meta">${sameDay(d,now)?"TODAY":ordinal(day)+" day"}</span>`;
      b.addEventListener("click",()=>{selectedDate=new Date(d);renderAll();});
      list.append(b);
    }
  }
  function renderDetails(){
    $("selectedHeading").textContent=fullFmt.format(selectedDate);
    $("selectedDescription").textContent=sameDay(selectedDate,now)?"This is today in your device's local calendar.":`You selected ${new Intl.DateTimeFormat("en",{weekday:"long"}).format(selectedDate)}.`;
    const start=new Date(selectedDate.getFullYear(),0,0);
    const dayOfYear=Math.floor((selectedDate-start)/86400000);
    $("selectedOrdinal").textContent=`${ordinal(selectedDate.getDate())} day of the month · ${ordinal(dayOfYear)} day of the year`;
  }
  function renderClocks(){
    $("clockList").innerHTML=cities.map(([city,zone])=>{
      const time=new Intl.DateTimeFormat("en",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true,timeZone:zone}).format(new Date());
      const date=new Intl.DateTimeFormat("en",{weekday:"short",day:"numeric",month:"short",timeZone:zone}).format(new Date());
      return `<div class="city-clock"><span>${city.toUpperCase()}</span><strong>${time}</strong><b>${date}</b></div>`;
    }).join("");
  }
  function renderAll(){renderCalendar();renderDetails();}
  $("prevMonth").addEventListener("click",()=>{viewDate=new Date(viewDate.getFullYear(),viewDate.getMonth()-1,1);renderAll();});
  $("nextMonth").addEventListener("click",()=>{viewDate=new Date(viewDate.getFullYear(),viewDate.getMonth()+1,1);renderAll();});
  function goToday(){viewDate=new Date(now.getFullYear(),now.getMonth(),1);selectedDate=new Date(now.getFullYear(),now.getMonth(),now.getDate());renderAll();}
  $("todayButton").addEventListener("click",()=>{goToday();$("calendar").scrollIntoView({behavior:"smooth"});});
  $("toolbarToday").addEventListener("click",goToday);
  $("yearSelect").addEventListener("change",e=>{viewDate=new Date(Number(e.target.value),viewDate.getMonth(),1);renderAll();});
  $("weekStart").addEventListener("change",renderAll);
  document.querySelectorAll(".view-button").forEach(btn=>btn.addEventListener("click",()=>{
    viewMode=btn.dataset.view;
    document.querySelectorAll(".view-button").forEach(x=>x.classList.toggle("active",x===btn));
    $("calendarGrid").classList.toggle("hidden",viewMode!=="grid");
    $("monthList").classList.toggle("hidden",viewMode!=="list");
  }));
  $("themeToggle").addEventListener("click",()=>document.body.classList.toggle("light"));
  $("menuToggle").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("open"));
  renderHeader();buildYearOptions();renderAll();renderClocks();
  setInterval(()=>{renderHeader();renderClocks();},1000);
})();
