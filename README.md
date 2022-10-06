# chain_fetch
 
 
************************** 
Web3 Dev Resource
**************************
 
 About:

chain_fetch.html for use with the chainid.network API
https://chainid.network/chains.json

 Use Case:

Quickly sort through chain info fetched from the chainid.network API


 js Code:

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



Free to use.
Released under the MIT License.


**************************
Begin License.
**************************


Copyright (c) 2022 forthepeoplebythepeople@protonmail.com


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


**************************
End License
**************************
