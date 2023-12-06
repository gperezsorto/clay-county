const table = document.getElementById('info')
const sec = document.getElementById('sec')

// this function will get data from the localhost:3000/api
// and display it in the table

async function getList(filter) {
  const response = await fetch('http://localhost:3000/api/filter/' + filter, { method: 'GET' })
    .then((res) => {
      return res.json();
    })
    .then((data) => {

      for (item of data) {
        if (item["SEC"] !== "") {
          let opt = document.createElement('option')
          opt.value = item["SEC"]
          opt.textContent = item["SEC"]

          sec.appendChild(opt)
        }
      }
    })
    .catch((error) => console.error('Error:', error))
}

getList('SEC')

async function getData(filter, param) {
  const response = await fetch('http://localhost:3000/api/' + filter + '/' + param, { method: 'GET' })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.length)
      for (item of data) {
        let row = document.createElement('tr')
        let date = document.createElement('td')
        let type = document.createElement('td')

        date.textContent = item["DATE"]
        type.textContent = item["SEC"]

        row.appendChild(date)
        row.appendChild(type)
        table.appendChild(row)
      }
    })
    .catch((error) => console.error('Error:', error))

  console.log(response)

}

sec.addEventListener('change', (e) => {
  table.innerHTML = ''
  console.log(e.target.value)
  getData('sec', e.target.value)
})


