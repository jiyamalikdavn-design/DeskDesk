    const tickets=[
      {id:'ORB-4821',name:'Priya Nair',company:'Vantage Foods',subject:'Refund still not reflected',priority:'High risk',status:'In progress',age:'18m',assignee:'Asha Shah'},
      {id:'ORB-4820',name:'Maya Chen',company:'Studio Miso',subject:'Cannot update account owner',priority:'Medium risk',status:'In progress',age:'32m',assignee:'Asha Shah'},
      {id:'ORB-4818',name:'Diego Morales',company:'Ridge & Pine',subject:'Duplicate subscription charge',priority:'High risk',status:'Breached',age:'2h 14m',assignee:'Rohan Mehta'},
      {id:'ORB-4817',name:'Elena Rossi',company:'Sora Labs',subject:'Invoice download request',priority:'Low risk',status:'Solved',age:'3h',assignee:'Asha Shah'},
      {id:'ORB-4814',name:'Marcus Bell',company:'Aster Group',subject:'Need help with SSO setup',priority:'Medium risk',status:'In progress',age:'5h',assignee:'Ira Kapoor'},
      {id:'ORB-4811',name:'Faye Lim',company:'Nook Commerce',subject:'Address change confirmation',priority:'Low risk',status:'Solved',age:'6h',assignee:'Asha Shah'}];
    let state={tenant:'Acme Telecom',role:'agent',page:'queue',selected:null};
    const $=s=>document.querySelector(s); const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
    document.querySelectorAll('.tenant').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tenant').forEach(x=>x.classList.remove('on'));b.classList.add('on');state.tenant=b.dataset.tenant});
    $('#role').onchange=e=>{$('#email').value=e.target.value==='agent'?'asha@acme.demo':'neha@acme.demo'};
    $('#enter').onclick=()=>{state.role=$('#role').value;$('#stamp').classList.remove('hidden');setTimeout(()=>{$('#stamp').classList.add('hidden');$('#login').classList.add('hidden');$('#app').classList.remove('hidden');boot()},680)};
    $('#logout').onclick=()=>{$('#app').classList.add('hidden');$('#login').classList.remove('hidden');$('#drawer').classList.remove('show')};
    const navs={agent:[['queue','◫','My queue'],['personal','◌','Personal SLA'],['company','◉','Company SLA'],['settings','⚙','SLA rules'],['help','?','Help & about']],manager:[['company','◉','Company SLA'],['workload','◫','Agent workload'],['settings','⚙','Tenant settings'],['help','?','Help & about']]};
    function boot(){const manager=state.role==='manager', name=manager?'Neha Singh':'Asha Shah';$('#tenantName').textContent=state.tenant;$('#sideUser').textContent=name;$('#sideRole').textContent=manager?'Manager workspace':'Agent workspace';$('#avatar').textContent=manager?'NS':'AS';$('#topUser').innerHTML=name+'<small>'+ (manager?'Support Manager':'Support Agent')+'</small>';state.page=manager?'company':'queue';renderNav();render()}
    function renderNav(){$('#nav').innerHTML='<div class="nav-title">Workspace</div>'+navs[state.role].map(([id,i,l])=>`<button class="nav ${state.page===id?'on':''}" data-page="${id}"><span class="ico">${i}</span>${l}</button>`).join('');document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{state.page=b.dataset.page;renderNav();render()})}
    const metric=(label,value,info,kind='')=>`<div class="metric"><div class="label">${label}</div><div class="value">${value}</div><div class="delta ${kind}">${info}</div></div>`;
    function shell(title,subtitle,action=''){ $('#crumb').textContent=title; return `<div class="page-title"><div><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>` }
    function render(){let v='';if(state.page==='queue')v=queue();if(state.page==='personal')v=sla('Your SLA pulse','Your handling, response time and resolution performance this week.',true);if(state.page==='company')v=sla('Company SLA overview','A live read on the support promise across '+esc(state.tenant)+'.');if(state.page==='workload')v=workload();if(state.page==='settings')v=settings();if(state.page==='help')v=help();$('#content').innerHTML=v;bind()}
    function queue(){return shell('My queue','6 tickets assigned to you · Last synced just now.','<span class="pill"><i class="dot"></i> Live updates active</span>')+`<div class="metrics">${metric('Open for you','4','1 needs attention','warn')}${metric('Due in 1 hour','2','Prioritise high risk','warn')}${metric('Solved today','12','↑ 20% vs. yesterday','good')}${metric('Personal SLA','96.4%','Above team average','good')}</div><div class="grid"><section class="panel"><div class="panel-head"><h3>Assigned tickets</h3><span class="muted">Sorted by priority</span></div><div class="filters"><div class="search"><input id="search" placeholder="Search customer name" /></div><select id="priority" class="filter"><option value="">All priorities</option><option>High risk</option><option>Medium risk</option><option>Low risk</option></select><select id="status" class="filter"><option value="">All statuses</option><option>In progress</option><option>Breached</option><option>Solved</option></select></div><div id="ticketTable">${ticketTable(tickets.filter(x=>x.assignee==='Asha Shah'))}</div></section><section class="panel"><div class="panel-head"><h3>Today’s SLA</h3><span class="muted">24 Nov</span></div><div class="sla-ring"><div class="ring-label"><b>96.4%</b>on target</div></div><div class="mini-list"><div class="mini-row"><span>Resolved</span><b>12</b></div><div class="mini-row"><span>In progress</span><b>4</b></div><div class="mini-row"><span>Breached</span><b style="color:var(--red)">0</b></div></div><button class="button" style="width:100%;margin-top:16px" data-go="personal">View personal SLA →</button></section></div>`}
    function ticketTable(items){if(!items.length)return '<div class="empty">No tickets match those filters.</div>';return `<div class="table-wrap"><table><thead><tr><th>Customer</th><th>Priority</th><th>Status</th><th>Age</th><th></th></tr></thead><tbody>${items.map(t=>`<tr><td class="customer">${t.name}<small>${t.subject}</small></td><td><span class="badge ${cls(t.priority)}">${t.priority}</span></td><td><span class="badge ${cls(t.status)}">${t.status}</span></td><td>${t.age}</td><td><button class="open" data-open="${t.id}">OPEN →</button></td></tr>`).join('')}</tbody></table></div>`}
    function cls(x){return x.toLowerCase().replace(' ','').replace('inprogress','progress')}
    function sla(title,subtitle,personal=false){let m=personal?[['Resolved','57','↑ 14% this week','good'],['In progress','8','Across your active queue',''],['Breached','1','1.5% of your tickets','warn'],['SLA maintained','96.4%','Target is 95%','good']]:[['Received','184','↑ 8% vs. last week','good'],['Resolved','161','87.5% of tickets','good'],['In progress','17','9 due in 1 hour',''],['Breached','6','3.2% of tickets','warn']];return shell(title,subtitle,personal?'<span class="pill">View only</span>':'<button class="button" data-go="workload">Manage workload →</button>')+`<div class="metrics">${m.map(x=>metric(...x)).join('')}</div><div class="chart-grid"><section class="panel"><div class="panel-head"><div><h3>Weekly ticket flow</h3><span class="muted">Received vs. resolved</span></div><span class="muted">18—24 Nov</span></div>${bars()}<div class="legend"><span><i></i>Tickets received</span><span><i class="alt"></i>Tickets resolved</span></div></section><section class="panel"><div class="panel-head"><h3>SLA performance</h3><span class="muted">This week</span></div><svg class="linechart" viewBox="0 0 360 190" preserveAspectRatio="none" aria-label="SLA performance line chart"><path d="M0 35H360M0 95H360M0 155H360" stroke="#ececf1" stroke-width="1"/><path d="M0 62 C27 46 40 59 62 53 S96 78 120 60 S155 51 180 68 S210 43 242 49 S273 68 300 42 S336 35 360 45" fill="none" stroke="#6952d9" stroke-width="3"/><path d="M0 62 C27 46 40 59 62 53 S96 78 120 60 S155 51 180 68 S210 43 242 49 S273 68 300 42 S336 35 360 45 V190 H0Z" fill="#6952d914"/><circle cx="360" cy="45" r="5" fill="#6952d9"/><text x="330" y="32" fill="#6952d9" font-size="11" font-weight="700">96.8%</text><g fill="#7b8292" font-size="10"><text x="0" y="182">Mon</text><text x="57" y="182">Tue</text><text x="117" y="182">Wed</text><text x="177" y="182">Thu</text><text x="237" y="182">Fri</text><text x="297" y="182">Sat</text><text x="342" y="182">Sun</text></g></svg><div class="mini-row"><span>Target</span><b>95.0%</b></div><div class="mini-row"><span>Current</span><b style="color:var(--mint)">96.8%</b></div></section></div><div class="grid" style="margin-top:18px"><section class="panel"><div class="panel-head"><h3>Ticket status by day</h3><span class="muted">Company view</span></div><svg class="linechart" viewBox="0 0 600 190" preserveAspectRatio="none"><path d="M0 35H600M0 95H600M0 155H600" stroke="#ececf1"/><path d="M0 80 L100 54 L200 88 L300 47 L400 92 L500 63 L600 75" fill="none" stroke="#26a88a" stroke-width="3"/><path d="M0 130 L100 126 L200 112 L300 130 L400 102 L500 120 L600 111" fill="none" stroke="#efad38" stroke-width="3"/><path d="M0 150 L100 142 L200 149 L300 140 L400 145 L500 133 L600 139" fill="none" stroke="#dd4e5d" stroke-width="3"/></svg><div class="legend"><span><i style="background:var(--mint)"></i>Resolved</span><span><i style="background:var(--gold)"></i>In progress</span><span><i style="background:var(--red)"></i>Breached</span></div></section><section class="panel"><h3>What needs attention</h3><div class="mini-list"><div class="mini-row"><span>High-risk tickets due soon</span><b>3</b></div><div class="mini-row"><span>First response average</span><b>19m</b></div><div class="mini-row"><span>Resolution average</span><b>4h 38m</b></div></div></section></div>`}
    function bars(){let a=[68,90,56,80,74,40,61],b=[56,72,49,68,63,34,54],days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];return `<div class="week">${a.map((x,i)=>`<div class="bar-group"><i class="bar" style="height:${x}%"></i><i class="bar alt" style="height:${b[i]}%"></i><span class="day">${days[i]}</span></div>`).join('')}</div>`}
    function workload(){return shell('Agent workload','Balance active work and reassign the tickets that need a faster response.','<button class="button primary" data-toast="Workload changes are saved">Save changes</button>')+`<div class="workload"><div class="agent"><div class="round">AS</div><b>Asha Shah</b><small>4 open · 96% SLA</small><div class="load"><i style="width:42%"></i></div></div><div class="agent"><div class="round">RM</div><b>Rohan Mehta</b><small>8 open · 89% SLA</small><div class="load"><i style="width:83%;background:var(--coral)"></i></div></div><div class="agent"><div class="round">IK</div><b>Ira Kapoor</b><small>5 open · 94% SLA</small><div class="load"><i style="width:55%"></i></div></div><div class="agent"><div class="round">MP</div><b>Maya Patel</b><small>3 open · 98% SLA</small><div class="load"><i style="width:32%;background:var(--mint)"></i></div></div></div><div class="grid" style="margin-top:22px"><section class="panel"><div class="panel-head"><h3>Open tickets</h3><span class="muted">Select a ticket to reassign</span></div>${ticketTable(tickets)}</section><section class="panel"><h3>Workload guidance</h3><p class="muted">Rohan has the heaviest queue and two high-risk tickets. Moving one ticket to Maya keeps everyone below the 70% capacity guideline.</p><div class="mini-list"><div class="mini-row"><span>Team capacity</span><b>62%</b></div><div class="mini-row"><span>Unassigned tickets</span><b>2</b></div><div class="mini-row"><span>Overdue handoffs</span><b style="color:var(--red)">1</b></div></div></section></div>`}
    function settings(){let manager=state.role==='manager';return shell(manager?'Tenant settings':'SLA rules','Response and resolution promises are applied within '+esc(state.tenant)+'.',manager?'<button class="button primary" data-toast="New user invite is ready">+ Add user</button>':'<span class="pill">View only</span>')+`<div class="grid"><section class="panel"><div class="panel-head"><h3>SLA rules by priority</h3>${manager?'<button class="button" data-toast="Rule editor opened">Edit rules</button>':''}</div><div class="rule-list"><div class="rule"><strong><span class="badge high">High risk</span></strong><span><small>First response</small><b>15 min</b></span><span><small>Resolution</small><b>4 hours</b></span>${manager?'<button class="open" data-toast="High-risk rule selected">EDIT</button>':''}</div><div class="rule"><strong><span class="badge medium">Medium risk</span></strong><span><small>First response</small><b>1 hour</b></span><span><small>Resolution</small><b>12 hours</b></span>${manager?'<button class="open" data-toast="Medium-risk rule selected">EDIT</button>':''}</div><div class="rule"><strong><span class="badge low">Low risk</span></strong><span><small>First response</small><b>4 hours</b></span><span><small>Resolution</small><b>48 hours</b></span>${manager?'<button class="open" data-toast="Low-risk rule selected">EDIT</button>':''}</div></div></section><section class="panel"><h3>${manager?'Agent-specific rules':'How SLA works'}</h3>${manager?'<p class="muted">Use individual rules only for approved coverage or seniority exceptions.</p><div class="mini-list"><div class="mini-row"><span>Rohan Mehta · First response</span><b>10 min</b></div><div class="mini-row"><span>Asha Shah · Resolution</span><b>3 hours</b></div></div><button class="button" style="margin-top:17px" data-toast="Agent rule editor opened">Manage agent rules</button>':'<p class="muted">The timer begins when a ticket arrives. Paused states and working hours are applied automatically. Your role can review performance but cannot change the company’s promise.</p><div class="mini-list"><div class="mini-row"><span>Business hours</span><b>09:00–18:00</b></div><div class="mini-row"><span>Timezone</span><b>IST (UTC+5:30)</b></div></div>'}</section></div>`}
    function help(){return shell('Help & about','Everything you need to work confidently in your support workspace.')+`<div class="help-grid"><article class="help-card"><div class="help-ico">◫</div><h3>Working your queue</h3><p>Search by customer, use priority and status filters, then open a ticket to update its query.</p><button data-toast="Queue guide opened">Read the guide →</button></article><article class="help-card"><div class="help-ico">◉</div><h3>Understanding SLA</h3><p>Learn what response, resolution and breach metrics mean—and how timers are calculated.</p><button data-toast="SLA guide opened">Explore SLA basics →</button></article><article class="help-card"><div class="help-ico">✦</div><h3>About Orbit Desk</h3><p>Orbit Desk keeps each company’s tickets, users and rules securely scoped to its workspace.</p><button data-toast="Version 1.0.0 · Orbit Desk">Platform details →</button></article></div><section class="panel" style="margin-top:18px"><div class="panel-head"><h3>Need a hand?</h3><span class="muted">Support is available Monday–Friday</span></div><p class="muted">For account access, contact your workspace manager. For product questions, open a support request from your team’s shared channel.</p><button class="button primary" data-toast="Support request draft created">Contact support</button></section>`}
    function bind(){document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{state.page=b.dataset.go;renderNav();render()});document.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>openTicket(b.dataset.open));document.querySelectorAll('[data-toast]').forEach(b=>b.onclick=()=>toast(b.dataset.toast));let search=$('#search'),prio=$('#priority'),stat=$('#status');if(search){let f=()=>{let q=search.value.toLowerCase(),p=prio.value,s=stat.value;$('#ticketTable').innerHTML=ticketTable(tickets.filter(t=>t.assignee==='Asha Shah'&&t.name.toLowerCase().includes(q)&&(!p||t.priority===p)&&(!s||t.status===s)));bind()};search.oninput=f;prio.onchange=f;stat.onchange=f}}
    function openTicket(id){let t=tickets.find(x=>x.id===id);$('#drawer').innerHTML=`<div class="drawer-head"><div><div class="ticket-id">${t.id}</div><b>Ticket details</b></div><button class="close" id="close">×</button></div><div class="detail-block"><h2>${t.subject}</h2><p>From ${t.name} · ${t.company}</p><div class="meta"><span class="badge ${cls(t.priority)}">${t.priority}</span><span class="badge ${cls(t.status)}">${t.status}</span></div></div><div class="detail-block"><h3>Customer query</h3><p style="margin-top:8px">Hi team, I need help with this issue as soon as possible. Could you please confirm the next step and expected resolution time?</p></div><div class="detail-block"><h3>Update ticket</h3><div class="field"><label for="detail">Internal note / reply</label><textarea id="detail" placeholder="Add an update for this ticket…"></textarea></div><div class="field"><label for="detail-status">Status</label><select id="detail-status"><option ${t.status==='In progress'?'selected':''}>In progress</option><option ${t.status==='Solved'?'selected':''}>Solved</option><option ${t.status==='Breached'?'selected':''}>Breached</option></select></div>${state.role==='manager'?'<div class="field"><label>Assigned to</label><select><option>Asha Shah</option><option>Rohan Mehta</option><option>Ira Kapoor</option><option>Maya Patel</option></select></div>':''}<div class="drawer-actions"><button class="button primary" id="save">Save update</button><button class="button" id="cancel">Cancel</button></div></div>`;$('#drawer').classList.add('show');$('#close').onclick=$('#cancel').onclick=()=>$('#drawer').classList.remove('show');$('#save').onclick=()=>{t.status=$('#detail-status').value;$('#drawer').classList.remove('show');toast('Ticket update saved');render()}}
    function toast(message){let t=$('#toast');t.textContent=message;t.classList.remove('hidden');setTimeout(()=>t.classList.add('hidden'),2500)}

    /* Maintenance pass: keep the dashboard's numbers and rows connected to the same ticket data. */
    document.title = 'DeskDesk — SLA intelligence';
    document.querySelectorAll('.logo').forEach(logo => { logo.textContent = 'D'; });
    document.querySelectorAll('.brand').forEach(brand => {
      brand.innerHTML = brand.innerHTML.replace(/orbit desk/gi, 'DeskDesk');
    });
    document.querySelector('.login-panel h2').textContent = 'Welcome to your desk.';
    const renameDeskDesk = root => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) node.nodeValue = node.nodeValue.replace(/Orbit Desk|orbit desk/gi, 'DeskDesk');
    };
    renameDeskDesk(document.body);
    new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) renameDeskDesk(node);
    }))).observe(document.body, {childList:true, subtree:true});
    const maintenanceStyle = document.createElement('style');
    maintenanceStyle.textContent = '.status-progress{background:#eef0f6;color:#60708f}.chart-grid{align-items:stretch}.chart-grid>.panel{min-width:0}.linechart{display:block}.rule label{min-width:0}.rule input{width:100%;border:1px solid var(--line);border-radius:8px;padding:7px 8px;color:var(--ink);margin-top:3px;background:#fff}.rule input:focus{outline:0;border-color:var(--violet);box-shadow:0 0 0 3px #6952d917}';
    document.head.appendChild(maintenanceStyle);

    function cls(value) {
      return ({
        'High risk': 'high',
        'Medium risk': 'medium',
        'Low risk': 'low',
        'In progress': 'status-progress',
        'Breached': 'breached',
        'Solved': 'solved'
      })[value] || '';
    }

    function queue() {
      const mine = tickets.filter(ticket => ticket.assignee === 'Asha Shah');
      const inProgress = mine.filter(ticket => ticket.status === 'In progress').length;
      const solved = mine.filter(ticket => ticket.status === 'Solved').length;
      const breached = mine.filter(ticket => ticket.status === 'Breached').length;
      const dueSoon = mine.filter(ticket => ticket.priority === 'High risk' && ticket.status !== 'Solved').length;
      const sla = Math.max(0, Math.round((1 - breached / Math.max(1, mine.length)) * 1000) / 10);
      return shell('My queue', `${mine.length} tickets assigned to you · Last synced just now.`, '<span class="pill"><i class="dot"></i> Live updates active</span>') +
        `<div class="metrics">${metric('Open for you', inProgress, inProgress ? 'Tickets awaiting action' : 'Queue is clear', inProgress ? 'warn' : 'good')}${metric('Due in 1 hour', dueSoon, dueSoon ? 'Prioritise high risk' : 'No urgent tickets', dueSoon ? 'warn' : 'good')}${metric('Solved today', solved, 'Live ticket status', 'good')}${metric('Personal SLA', sla + '%', breached ? 'Review breached tickets' : 'No breaches in your queue', breached ? 'warn' : 'good')}</div>` +
        `<div class="grid"><section class="panel"><div class="panel-head"><h3>Assigned tickets</h3><span class="muted">Sorted by priority</span></div><div class="filters"><div class="search"><input id="search" placeholder="Search customer name" /></div><select id="priority" class="filter"><option value="">All priorities</option><option>High risk</option><option>Medium risk</option><option>Low risk</option></select><select id="status" class="filter"><option value="">All statuses</option><option>In progress</option><option>Breached</option><option>Solved</option></select></div><div id="ticketTable">${ticketTable(mine)}</div></section><section class="panel"><div class="panel-head"><h3>Today’s SLA</h3><span class="muted">Live data</span></div><div class="sla-ring" style="background:conic-gradient(var(--violet) 0 ${sla}%,#eeeafa ${sla}% 100%)"><div class="ring-label"><b>${sla}%</b>on target</div></div><div class="mini-list"><div class="mini-row"><span>Resolved</span><b>${solved}</b></div><div class="mini-row"><span>In progress</span><b>${inProgress}</b></div><div class="mini-row"><span>Breached</span><b style="color:var(--red)">${breached}</b></div></div><button class="button" style="width:100%;margin-top:16px" data-go="personal">View personal SLA →</button></section></div>`;
    }

    function ticketStats(personal) {
      const scoped = personal ? tickets.filter(ticket => ticket.assignee === 'Asha Shah') : tickets;
      const resolved = scoped.filter(ticket => ticket.status === 'Solved').length;
      const active = scoped.filter(ticket => ticket.status === 'In progress').length;
      const breached = scoped.filter(ticket => ticket.status === 'Breached').length;
      return { total: scoped.length, resolved, active, breached, sla: Math.max(0, Math.round((1 - breached / Math.max(1, scoped.length)) * 1000) / 10) };
    }

    function liveBars(stats) {
      const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      const received = [62,88,54,76,69,38,57];
      const resolutionRatio = stats.resolved / Math.max(1, stats.total);
      return `<div class="week">${received.map((receivedHeight, index) => {
        const wave = [.82,1,.68,.9,.84,.55,.76][index];
        const resolvedHeight = Math.max(8, Math.round(receivedHeight * resolutionRatio * wave));
        return `<div class="bar-group"><i class="bar" style="height:${receivedHeight}%"></i><i class="bar alt" style="height:${resolvedHeight}%"></i><span class="day">${days[index]}</span></div>`;
      }).join('')}</div>`;
    }

    function liveStatusChart(stats) {
      const x = [0,100,200,300,400,500,600];
      const makePoints = (count, multiplier) => x.map((point, index) => `${point} ${Math.max(32, 166 - Math.min(125, count * multiplier + [6,26,0,35,5,19,10][index]))}`).join(' L');
      return `<svg class="linechart" viewBox="0 0 600 190" preserveAspectRatio="none" aria-label="Live ticket status chart"><path d="M0 35H600M0 95H600M0 155H600" stroke="#ececf1"/><path d="M${makePoints(stats.resolved,25)}" fill="none" stroke="#26a88a" stroke-width="3"/><path d="M${makePoints(stats.active,19)}" fill="none" stroke="#efad38" stroke-width="3"/><path d="M${makePoints(stats.breached,14)}" fill="none" stroke="#dd4e5d" stroke-width="3"/></svg>`;
    }

    function sla(title, subtitle, personal=false) {
      const stats = ticketStats(personal);
      const detail = personal ? 'your active queue' : 'all company tickets';
      const metrics = [
        ['Received', stats.total, 'Live workspace total', 'good'],
        ['Resolved', stats.resolved, stats.total ? `${Math.round(stats.resolved / stats.total * 100)}% of tickets` : 'No tickets yet', 'good'],
        ['In progress', stats.active, `Across ${detail}`, ''],
        ['Breached', stats.breached, stats.breached ? 'Needs review' : 'No breaches', stats.breached ? 'warn' : 'good']
      ];
      return shell(title, subtitle, personal ? '<span class="pill">View only</span>' : '<button class="button" data-go="workload">Manage workload →</button>') +
        `<div class="metrics">${metrics.map(item => metric(...item)).join('')}</div>` +
        `<div class="chart-grid"><section class="panel"><div class="panel-head"><div><h3>Weekly ticket flow</h3><span class="muted">Resolved bars reflect live ticket status</span></div><span class="muted">Live</span></div>${liveBars(stats)}<div class="legend"><span><i></i>Tickets received</span><span><i class="alt"></i>Tickets resolved</span></div></section><section class="panel"><div class="panel-head"><h3>SLA performance</h3><span class="muted">Live</span></div><div class="sla-ring" style="background:conic-gradient(var(--violet) 0 ${stats.sla}%,#eeeafa ${stats.sla}% 100%)"><div class="ring-label"><b>${stats.sla}%</b>on target</div></div><div class="mini-row"><span>Target</span><b>95.0%</b></div><div class="mini-row"><span>Current</span><b style="color:${stats.sla >= 95 ? 'var(--mint)' : 'var(--red)'}">${stats.sla}%</b></div></section></div>` +
        `<div class="grid" style="margin-top:18px"><section class="panel"><div class="panel-head"><h3>Ticket status by day</h3><span class="muted">Live status distribution</span></div>${liveStatusChart(stats)}<div class="legend"><span><i style="background:var(--mint)"></i>Resolved</span><span><i style="background:var(--gold)"></i>In progress</span><span><i style="background:var(--red)"></i>Breached</span></div></section><section class="panel"><h3>What needs attention</h3><div class="mini-list"><div class="mini-row"><span>High-risk tickets due soon</span><b>${tickets.filter(ticket => ticket.priority === 'High risk' && ticket.status !== 'Solved').length}</b></div><div class="mini-row"><span>Tickets in progress</span><b>${stats.active}</b></div><div class="mini-row"><span>Tickets breached</span><b style="color:${stats.breached ? 'var(--red)' : 'var(--mint)'}">${stats.breached}</b></div></div></section></div>`;
    }

    const slaRules = [
      { priority: 'High risk', response: '15 min', resolution: '4 hours' },
      { priority: 'Medium risk', response: '1 hour', resolution: '12 hours' },
      { priority: 'Low risk', response: '4 hours', resolution: '48 hours' }
    ];
    const agentRules = [
      { name: 'Asha Shah', response: '15 min', resolution: '3 hours' },
      { name: 'Rohan Mehta', response: '10 min', resolution: '4 hours' }
    ];
    const sampleUsers = [
      { name: 'Asha Shah', role: 'Agent' },
      { name: 'Rohan Mehta', role: 'Agent' },
      { name: 'Neha Singh', role: 'Manager' }
    ];
    let showUserForm = false;

    function settings() {
      const manager = state.role === 'manager';
      if (!manager) return shell('SLA rules', 'Response and resolution promises are applied within ' + esc(state.tenant) + '.', '<span class="pill">View only</span>') + `<div class="grid"><section class="panel"><div class="panel-head"><h3>SLA rules by priority</h3><span class="muted">Managed by your workspace manager</span></div><div class="rule-list">${slaRules.map(rule => `<div class="rule"><strong><span class="badge ${cls(rule.priority)}">${rule.priority}</span></strong><span><small>First response</small><b>${rule.response}</b></span><span><small>Resolution</small><b>${rule.resolution}</b></span></div>`).join('')}</div></section><section class="panel"><h3>How SLA works</h3><p class="muted">The timer begins when a ticket arrives. Paused states and working hours are applied automatically. Your role can review performance but cannot change the company’s promise.</p><div class="mini-list"><div class="mini-row"><span>Business hours</span><b>09:00–18:00</b></div><div class="mini-row"><span>Timezone</span><b>IST (UTC+5:30)</b></div></div></section></div>`;
      return shell('Tenant settings', 'Edit the SLA policy and maintain users for ' + esc(state.tenant) + '.', '<button class="button primary" id="save-settings">Save changes</button>') +
        `<div class="grid"><section class="panel"><div class="panel-head"><div><h3>SLA rules by priority</h3><span class="muted">Response and resolution targets</span></div></div><div class="rule-list">${slaRules.map(rule => `<div class="rule"><strong><span class="badge ${cls(rule.priority)}">${rule.priority}</span></strong><label><small>First response</small><input class="rule-response" data-priority="${rule.priority}" value="${rule.response}" aria-label="${rule.priority} first response" /></label><label><small>Resolution</small><input class="rule-resolution" data-priority="${rule.priority}" value="${rule.resolution}" aria-label="${rule.priority} resolution" /></label></div>`).join('')}</div></section><section class="panel"><div class="panel-head"><div><h3>Agent-specific SLA</h3><span class="muted">Approved exceptions only</span></div></div><div class="rule-list">${agentRules.map(rule => `<div class="rule"><strong>${rule.name}<small>Custom coverage</small></strong><label><small>First response</small><input class="agent-response" data-agent="${rule.name}" value="${rule.response}" aria-label="${rule.name} first response" /></label><label><small>Resolution</small><input class="agent-resolution" data-agent="${rule.name}" value="${rule.resolution}" aria-label="${rule.name} resolution" /></label></div>`).join('')}</div></section></div>` +
        `<section class="panel" style="margin-top:18px"><div class="panel-head"><div><h3>Workspace users</h3><span class="muted">${sampleUsers.length} active users</span></div><button class="button" id="add-user">+ Add sample user</button></div>${showUserForm ? `<div class="filters" style="margin-bottom:16px"><input id="new-user-name" class="filter" placeholder="Name" style="padding:10px;min-width:160px" /><select id="new-user-role" class="filter"><option>Agent</option><option>Manager</option></select><button class="button primary" id="confirm-user">Add user</button></div>` : ''}<div class="table-wrap"><table><thead><tr><th>Name</th><th>Role</th><th>Access</th></tr></thead><tbody>${sampleUsers.map(user => `<tr><td class="customer">${user.name}</td><td><span class="badge ${user.role === 'Manager' ? 'medium' : 'status-progress'}">${user.role}</span></td><td>Active</td></tr>`).join('')}</tbody></table></div></section>`;
    }

    function bind() {
      document.querySelectorAll('[data-go]').forEach(button => button.onclick = () => { state.page = button.dataset.go; renderNav(); render(); });
      document.querySelectorAll('[data-open]').forEach(button => button.onclick = () => openTicket(button.dataset.open));
      document.querySelectorAll('[data-toast]').forEach(button => button.onclick = () => toast(button.dataset.toast));
      const search = $('#search'), priority = $('#priority'), status = $('#status');
      if (search) {
        const filterTickets = () => {
          const query = search.value.toLowerCase();
          $('#ticketTable').innerHTML = ticketTable(tickets.filter(ticket => ticket.assignee === 'Asha Shah' && ticket.name.toLowerCase().includes(query) && (!priority.value || ticket.priority === priority.value) && (!status.value || ticket.status === status.value)));
          bind();
        };
        search.oninput = filterTickets; priority.onchange = filterTickets; status.onchange = filterTickets;
      }
      const saveSettings = $('#save-settings');
      if (saveSettings) saveSettings.onclick = () => {
        slaRules.forEach(rule => {
          rule.response = document.querySelector(`.rule-response[data-priority="${rule.priority}"]`).value.trim() || rule.response;
          rule.resolution = document.querySelector(`.rule-resolution[data-priority="${rule.priority}"]`).value.trim() || rule.resolution;
        });
        agentRules.forEach(rule => {
          rule.response = document.querySelector(`.agent-response[data-agent="${rule.name}"]`).value.trim() || rule.response;
          rule.resolution = document.querySelector(`.agent-resolution[data-agent="${rule.name}"]`).value.trim() || rule.resolution;
        });
        toast('Tenant settings saved');
        render();
      };
      const addUser = $('#add-user');
      if (addUser) addUser.onclick = () => { showUserForm = !showUserForm; render(); };
      const confirmUser = $('#confirm-user');
      if (confirmUser) confirmUser.onclick = () => {
        const name = $('#new-user-name').value.trim();
        if (!name) { toast('Enter a user name first'); return; }
        sampleUsers.push({ name, role: $('#new-user-role').value });
        showUserForm = false;
        toast(`${name} added to the workspace`);
        render();
      };
    }

    let activeHelpTopic = 'queue';
    let supportFormOpen = false;
    const helpTopics = {
      queue: { icon: '◫', title: 'Working your queue', text: 'Search by customer name, narrow the list by priority or status, and open a ticket to add internal notes or update its current status.' },
      sla: { icon: '◉', title: 'Understanding SLA', text: 'First-response and resolution timers follow the tenant policy. A ticket is breached only when its target has passed; the SLA views refresh from the current ticket status.' },
      about: { icon: '✦', title: 'About DeskDesk', text: 'DeskDesk is a multi-tenant support workspace. Tickets, user access and SLA policies are scoped to each company, so data cannot cross tenant boundaries.' }
    };

    function help() {
      const topic = helpTopics[activeHelpTopic];
      return shell('Help & about', 'Guides, workspace context and support are all in one place.') +
        `<div class="help-grid">${Object.entries(helpTopics).map(([key, item]) => `<article class="help-card ${activeHelpTopic === key ? 'help-selected' : ''}"><div class="help-ico">${item.icon}</div><h3>${item.title}</h3><p>${item.text}</p><button data-help-topic="${key}">${activeHelpTopic === key ? 'Reading now' : 'Open guide →'}</button></article>`).join('')}</div>` +
        `<section class="panel" style="margin-top:18px"><div class="panel-head"><div><h3>${topic.icon} ${topic.title}</h3><span class="muted">DeskDesk guide</span></div></div><p class="muted" style="font-size:13px;max-width:700px">${topic.text}</p>${activeHelpTopic === 'about' ? '<div class="mini-list"><div class="mini-row"><span>Version</span><b>1.0.0</b></div><div class="mini-row"><span>Tenant protection</span><b>Enabled</b></div><div class="mini-row"><span>Workspace</span><b>' + esc(state.tenant) + '</b></div></div>' : ''}</section>` +
        `<section class="panel" style="margin-top:18px"><div class="panel-head"><div><h3>Need a hand?</h3><span class="muted">Send a product or access question to support</span></div><button class="button primary" id="contact-support">${supportFormOpen ? 'Close request' : 'Contact support'}</button></div>${supportFormOpen ? `<div class="filters"><input id="support-subject" class="filter" placeholder="What do you need help with?" style="padding:10px;min-width:220px;flex:1" /><textarea id="support-message" class="filter" placeholder="Add some context so support can help quickly" style="padding:10px;min-width:220px;min-height:80px;flex:2"></textarea><button class="button primary" id="send-support">Send request</button></div>` : '<p class="muted">For workspace access, your manager can help. For product questions, create a support request and we will prepare the next step.</p>'}</section>`;
    }

    const bindWithSettings = bind;
    bind = function () {
      bindWithSettings();
      document.querySelectorAll('[data-help-topic]').forEach(button => button.onclick = () => {
        activeHelpTopic = button.dataset.helpTopic;
        render();
      });
      const contactSupport = $('#contact-support');
      if (contactSupport) contactSupport.onclick = () => { supportFormOpen = !supportFormOpen; render(); };
      const sendSupport = $('#send-support');
      if (sendSupport) sendSupport.onclick = () => {
        const subject = $('#support-subject').value.trim();
        const message = $('#support-message').value.trim();
        if (!subject || !message) { toast('Add a subject and message first'); return; }
        supportFormOpen = false;
        toast('Support request prepared for your workspace');
        render();
      };
    };
    const helpStyle = document.createElement('style');
    helpStyle.textContent = '.help-card.help-selected{border-color:var(--violet);background:#f8f6ff}.help-card.help-selected button{color:var(--mint)}';
    document.head.appendChild(helpStyle);

