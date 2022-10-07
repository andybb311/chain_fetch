// Assign/declare fetched chain data variable as a global array
const d = [];

// Add options to DOM select input
// o = object
// id = select element's id
function addOptions(o,id) {
let e = document.getElementById(`${id}`);
Object.entries(o).forEach(([key, value]) => {
    let opt = new Option(key, value);
    e.add(opt); 
});
}

// fetch chain API
fetch('https://chainid.network/chains.json')
.then((res) => res.json())
.then((data) => {
    Object.values(data).forEach((value) => {
    Object.entries(value).forEach(([k,v]) => {
        if (k === 'name') {
        let temp = {};
        temp[`${v}`] = value;
        addOptions(temp,'select-chain'); 
        d.push(value);
        }
    })
    })
    // onLoad-> select 1st record as default (ethereum)
    selectedChain();
})
.catch(e => console.error(e));

// event handler -> display selected chain params
function selectedChain(i) {
let o = document.getElementById('select-chain');
let s = document.getElementById('selected-chain');
let t = o[o.selectedIndex].text;
if (!i) i = o.selectedIndex;

console.log(`d[${i}]: `,d[i]);
if (s.textContent) s.innerHTML ='';
Object.entries(d[i]).forEach(([k,v]) => {
    if (typeof v ==='object' || typeof v ==='array') {
    Object.entries(v).forEach(([k2,v2]) => {
        if (typeof v2 ==='object' || typeof v2 ==='array') {
        Object.entries(v2).forEach(([k3,v3]) => {
            s.innerHTML += `<p>[${k}] [${k2}] ${k3}: ${v3}</p>`
        })
        } else s.innerHTML += `<p>[${k}] ${k2}: ${v2}</p>`
    });
    } else s.innerHTML += `<p>${k}: ${v}</p>`;
});
}