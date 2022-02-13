const button = document.querySelector('#btn')
const resDiv = document.querySelector('.res')

const data = [{
    firstName: 'Miguel',
    age: '26'
},{
    firstName: 'Ceci',
    age: '24'
}]

button.addEventListener('click', postData)


async function postData(){
    const response = await fetch('http://localhost:3000/dbpost', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
     const parsedRes = await response.json()
     resDiv.textContent = `1st Person first Name: ${parsedRes[0].firstName}, age: ${parsedRes[0].age}; 2nd Person first Name: ${parsedRes[1].firstName}, age: ${parsedRes[1].age}`
}